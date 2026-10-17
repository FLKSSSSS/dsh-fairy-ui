'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawn}=require('node:child_process'),{pathToFileURL}=require('node:url');
const chrome=[process.env.FAIRY_BROWSER,'C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p=>p&&fs.existsSync(p));
const pause=ms=>new Promise(r=>setTimeout(r,ms));
class CDP{
 constructor(url){this.ws=new WebSocket(url);this.pending=new Map();this.id=0;this.errors=[];this.ready=new Promise((r,j)=>{this.ws.onopen=r;this.ws.onerror=j});this.ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=this.pending.get(m.id);this.pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')this.errors.push(m.params)}}
 async call(method,params={}){await this.ready;return new Promise((resolve,reject)=>{const id=++this.id;this.pending.set(id,{resolve,reject});this.ws.send(JSON.stringify({id,method,params}))})}
 async eval(expression){const r=await this.call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
 async click(rect){const x=rect.left+rect.width/2,y=rect.top+rect.height/2;await this.call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,x,y});await this.call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,x,y})}
}
function browserFixture(dir){
 const source=fs.readFileSync(process.env.FAIRY_BROWSER_SOURCE||path.join(__dirname,'../lib/client.js'),'utf8');
 const modules=['dom-adapter','composer-attachments','composer-marker-projection','composer-branch-position','composer-material-layer','settings-write','mascot-scale-control','native-width-boundary'].map(name=>{const begin=source.indexOf('//#region src/client/'+name+'.js');return source.slice(begin,source.indexOf('//#endregion',begin))});
 const begin=source.indexOf('\tfunction injectStyles()'),end=source.indexOf('\n\tvar init_style',begin);
 const setup=fs.readFileSync(path.join(__dirname,'fixtures/composer-setup.js'),'utf8');
 const runtime=`const __commonJSMin=cb=>{let m;return()=>{if(!m){m={exports:{}};cb(m.exports,m)}return m.exports}};const require_client_dom=()=>({FAIRY_VOICE_CONTROL_ATTRIBUTE:'data-dsh-fairy-voice-control'});const STYLE_ID='dsh-fairy-visual-style';\n`;
 fs.writeFileSync(path.join(dir,'fixture.js'),runtime+modules.join('\n')+source.slice(begin,end)+setup);
 let html=fs.readFileSync(path.join(__dirname,'fixtures/composer-native.html'),'utf8');
 html=html.replace('<style>','<style>:root{--dsw-alias-label-primary:#e8f2fa;--dsw-alias-button-info-fill:#4579ec;--dsw-alias-button-info-hover:#376ad7}');
 fs.writeFileSync(path.join(dir,'fixture.html'),html);
 fs.copyFileSync(path.join(__dirname,'fixtures/composer-native.css'),path.join(dir,'native.css'));
}
const inside=(a,b)=>a.left>=b.left-1&&a.right<=b.right+1&&a.top>=b.top-1&&a.bottom<=b.bottom+1;
test('native composer keeps painted, clickable controls and editable text through image/queue/steer/stop transitions',{skip:!chrome&&'Set FAIRY_BROWSER to Chromium for browser regression',timeout:90000},async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'fairy-composer-browser-'));browserFixture(dir);
 const child=spawn(chrome,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+path.join(dir,'user'),'about:blank'],{windowsHide:true,stdio:'ignore'});let c;
 t.after(async()=>{if(c){await c.call('Browser.close').catch(()=>{});c.ws.close()}child.kill()});
 let port;for(let i=0;i<80;i++){try{port=Number(fs.readFileSync(path.join(dir,'user/DevToolsActivePort'),'utf8').split('\n')[0]);break}catch{await pause(100)}}assert(port,'browser started');
 const tabs=await(await fetch(`http://127.0.0.1:${port}/json`)).json();c=new CDP(tabs.find(x=>x.type==='page').webSocketDebuggerUrl);
 await c.call('Page.enable');await c.call('Runtime.enable');await c.call('Page.navigate',{url:pathToFileURL(path.join(dir,'fixture.html')).href});
 for(let i=0;i<50&&await c.eval('typeof setup')!=='function';i++)await pause(30);
 assert.deepEqual(c.errors,[],'fixture loads without browser errors');
 const labels=['发送消息','排队发送','插话发送','停止生成','Send message','Queue message','Steer message','Stop generating'];
 const results=[];
 for(const width of [1380,900,600])for(const scale of [1,1.25])for(const theme of ['light','dark']){
  await c.call('Emulation.setDeviceMetricsOverride',{width:Math.round(width/scale),height:Math.round(822/scale),deviceScaleFactor:scale,mobile:false});
  for(const attachments of [false,true]){
   await c.eval(`setup(${JSON.stringify({height:attachments?264:168,context:true,hero:false,attachments,text:'输入测试'})});document.documentElement.setAttribute('data-dsh-fairy-theme','${theme}');window.nativeRow=card.querySelector('[data-dsh-fairy-composer-row]');window.trailing=nativeRow.lastElementChild;window.primary=send;window.primaryParent=primary.parentElement;window.voiceParent=document.querySelector('[data-dsh-fairy-voice-control]')?.parentElement;window.beforeHeight=seat.getBoundingClientRect().height;window.nativeClicks=0;primary.onclick=()=>nativeClicks++;`);
   if(attachments)await c.eval(`(()=>{const rail=card.querySelector('[data-slot="conversation.input.attachments"]').firstElementChild;rail.style.height='96px';rail.innerHTML='<img alt="fixture image" style="width:80px;height:80px" src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22%3E%3Crect width=%2280%22 height=%2280%22 fill=%22%233b86df%22/%3E%3C/svg%3E">';})()`);
   for(const label of labels){
    const dual=/排队|插话|Queue|Steer/.test(label);
    await c.eval(`clear();primary.setAttribute('aria-label',${JSON.stringify(label)});primary.disabled=false;trailing.querySelector('[data-test-stop]')?.remove();${dual?`{const stop=document.createElement('button');stop.type='button';stop.className='RlGAzG_primary';stop.setAttribute('aria-label','停止生成');stop.setAttribute('data-test-stop','true');stop.textContent='■';stop.onclick=()=>window.stopClicks=(window.stopClicks||0)+1;trailing.insertBefore(stop,primary);}`:''}clear=marker.markControls(card);material.syncMaterialLayer(layer,input,[card.querySelector('[data-slot="conversation.input.attachments"]')?.firstElementChild]);require_composer_branch_position().syncBranchGeometry(seat,card);`);
    const r=await c.eval(`(()=>{const rect=n=>n?.getBoundingClientRect().toJSON();const hit=n=>{const b=rect(n);return !!b&&b.width>0&&b.height>0&&n.contains(document.elementFromPoint(b.left+b.width/2,b.top+b.height/2))};const row=card.querySelector('[data-dsh-fairy-composer-row]'),cmd=card.querySelector('[data-dsh-fairy-composer-command-control]'),model=card.querySelector('[data-dsh-fairy-composer-model-toolbar] button'),secondary=card.querySelector('[data-test-stop]');return {send:rect(primary),input:rect(input),command:rect(cmd),model:rect(model),secondary:rect(secondary),sendMarked:primary.hasAttribute('data-dsh-fairy-composer-send-control'),sendHit:hit(primary),commandHit:hit(cmd),modelHit:hit(model),stopHit:secondary?hit(secondary):null,editor:rect(editor),rowZ:Number(getComputedStyle(row).zIndex),inputZ:Number(getComputedStyle(input).zIndex),afterZ:Number(getComputedStyle(card,'::after').zIndex),height:seat.getBoundingClientRect().height,parentPreserved:primary.parentElement===primaryParent,nativeModelDuplicate:!!card.querySelector('[data-dsh-fairy-composer-native-model-control] [data-fairy-model-trigger]')}})()`);
    const context=JSON.stringify({width,scale,theme,attachments,label,r});
    assert(r.sendMarked&&r.sendHit,context);assert(inside(r.send,r.input),context);assert(r.commandHit,context);assert(r.modelHit,context);assert(!r.nativeModelDuplicate,context);assert(r.parentPreserved,context);
    assert(inside(r.command,r.input),context);assert(r.model.right<(r.secondary?.left??r.send.left)+1,context);
    if(attachments){assert(r.inputZ>r.afterZ,context);assert(r.rowZ>r.afterZ,context)}
    const before=await c.eval('nativeClicks');await c.click(r.send);assert.equal(await c.eval('nativeClicks'),before+1,context);
    if(dual){assert(r.stopHit,context);const count=await c.eval('window.stopClicks||0');await c.click(r.secondary);assert.equal(await c.eval('stopClicks'),count+1,context)}
    await c.click({left:r.editor.left+20,top:r.editor.top+4,width:12,height:16});assert(await c.eval('document.activeElement===editor'),context);
    await c.call('Input.insertText',{text:'继续输入'});assert(await c.eval("editor.innerText.includes('继续输入')"),context);
    if(width===1380&&scale===1&&attachments&&label==='排队发送'){
     const png=await c.call('Page.captureScreenshot',{format:'png'});const output=process.env.FAIRY_BROWSER_ARTIFACTS||dir;fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,`composer-145-${theme}.png`),Buffer.from(png.data,'base64'));
    }
    results.push({width,scale,theme,attachments,label,paintOrder:true,sendClick:true,editable:true,dual});
   }
   await c.eval(`clear();primary.setAttribute('aria-label','发送消息');trailing.querySelector('[data-test-stop]')?.remove();card.querySelector('[data-slot="conversation.input.attachments"]').replaceChildren();clear=marker.markControls(card);material.syncMaterialLayer(layer,input);`);
   assert.equal(await c.eval(`card.hasAttribute('data-dsh-fairy-composer-attachments-active')`),false);
   assert.equal(await c.eval('seat.getBoundingClientRect().height===beforeHeight'),true,'state switch does not grow dock');
  }
 }
 // Native 0.2.1 gutters must not claim the Fairy console; its zero-size range
 // thumb must still support a continuous track drag and commit only on release.
 for(const width of [1380,900])for(const attachments of [false,true]){
  await c.call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
  await c.eval(`setup({height:${attachments?240:132},hero:false,attachments:${attachments},text:'continuous drag'});window.scaleBinding?.dispose();window.widthBoundary?.clear();document.querySelectorAll('[data-dsh-fairy-mascot-scale-base]').forEach(n=>n.remove());window.scaleWrites=[];window.scaleValue=.55;window.scaleBinding=require_mascot_scale_control().createMascotScaleBase(card,{getSnapshot:()=>({settings:{mascotScale:scaleValue}}),subscribe:()=>()=>{},set:(field,value)=>{scaleWrites.push({field,value});scaleValue=value;return Promise.resolve()}});document.querySelector('[data-width-handle]')?.remove();window.nativeHandle=document.createElement('div');nativeHandle.dataset.widthHandle='right';nativeHandle.style.cssText='position:absolute;top:0;right:30px;bottom:0;width:16px;cursor:col-resize';document.body.style.cssText='position:relative;height:'+innerHeight+'px';document.body.append(nativeHandle);window.widthBoundary=require_native_width_boundary().createNativeWidthBoundary(()=>document.body,()=>seat);widthBoundary.sync();window.scaleInput=document.querySelector('[data-dsh-fairy-mascot-scale-input]');window.scaleDownNode=null;scaleInput.addEventListener('pointerdown',()=>scaleDownNode=scaleInput);`);
  const b=await c.eval('scaleInput.getBoundingClientRect().toJSON()'),y=b.top+b.height/2;
  assert(await c.eval(`scaleInput===document.elementFromPoint(${b.left+b.width/2},${y})`),'transparent native range remains hit-testable');
  assert(await c.eval('nativeHandle.getBoundingClientRect().bottom<=seat.getBoundingClientRect().top+1'),'width handle ends at the top of dock');
  await c.call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,x:b.left+b.width*.1,y});
  for(const progress of [.25,.5,.8]){
   await c.call('Input.dispatchMouseEvent',{type:'mouseMoved',button:'left',buttons:1,x:b.left+b.width*progress,y});
   const state=await c.eval('({value:Number(scaleInput.value),same:scaleDownNode===scaleInput,writes:scaleWrites.length})');
   assert(Math.abs(state.value-(.55+.45*progress))<.015,JSON.stringify({width,attachments,progress,state}));assert(state.same);assert.equal(state.writes,0);
  }
  // Captured movement outside the tiny painted track still updates/clamps.
  await c.call('Input.dispatchMouseEvent',{type:'mouseMoved',button:'left',buttons:1,x:b.right+30,y:y-30});
  assert.equal(await c.eval('Number(scaleInput.value)'),1);
  await c.call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,x:b.right+30,y:y-30});
  assert.equal(await c.eval('scaleWrites.length'),1);assert.equal(await c.eval('scaleValue'),1);
  await c.eval('widthBoundary.clear();nativeHandle.remove();scaleBinding.dispose()');
 }
 assert.deepEqual(c.errors,[]);
 if(process.env.FAIRY_BROWSER_ARTIFACTS)fs.writeFileSync(path.join(process.env.FAIRY_BROWSER_ARTIFACTS,'composer-145-regression.json'),JSON.stringify({cases:results.length,scope:'Isolated native DOM/CSS, actual plugin projection and styles; physical browser clicks and text input; no live model requests',results},null,2)+'\n');
 t.diagnostic(`${results.length} browser cases passed`);
});
