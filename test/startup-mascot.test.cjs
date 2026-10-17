'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawn,spawnSync}=require('node:child_process'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),client=fs.readFileSync(path.join(root,'lib/client.js'),'utf8');
const generated=fs.readFileSync(path.join(root,'desktop-startup/startup-mascot.js'),'utf8');
test('startup reuses the actual chat mascot modules, with isolated identities only',()=>{
 for(const name of ['mascot-style','mascot-geometry','mascot-effects-svg','mascot-eye-svg','mascot-assets','mascot-motion-clock','mascot-event-scheduler','mascot-runtime']){
  const at=client.indexOf('//#region src/client/'+name+'.js'),source=client.slice(at,client.indexOf('//#endregion',at));
  assert(generated.includes(source.replaceAll('dsh-fairy-','dsh-fairy-startup-')),name+' must not drift from the chat implementation');
 }
 assert.equal(client.split('// BEGIN SHARED STARTUP MASCOT\n')[1].split('// END SHARED STARTUP MASCOT')[0],generated);
 assert(!generated.includes('id="dsh-fairy-image"'),'preview does not duplicate chat SVG ids');
 const html=fs.readFileSync(path.join(root,'desktop-startup/startup.html'),'utf8');
 assert(html.includes('id="dsh-fairy-startup-mascot-style"'),'external CSS avoids weakening native CSP');
 assert(html.indexOf('src="startup-mascot.js"')<html.indexOf('src="startup-skin.js"'));
});
test('slider preview is immediate and release never reloads the catalog',()=>{
 const source=fs.readFileSync(path.join(root,'src/model-control.tsx'),'utf8');
 const commit=source.split('const commit = useCallback(async (raw: number) => {')[1].split('const rawFromPointer')[0];
 assert(!commit.includes('directory.load('));assert(commit.includes('directory.select('));assert(commit.includes('sameRoute('));
 assert(source.includes("sliderRef.current?.style.setProperty('--fairy-mc-progress'"));
 const styles=fs.readFileSync(path.join(root,'src/model-control-styles.ts'),'utf8');
 assert(!/transition: (?:left|width) \d+ms/.test(styles));
});

test('startup generator tolerates CRLF checkout and stays idempotent with one parseable preview',t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'fairy-startup-build-'));
 t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 for(const name of ['lib','scripts','desktop-startup'])fs.mkdirSync(path.join(dir,name));
 for(const name of ['lib/client.js','scripts/build-startup-mascot.cjs','desktop-startup/startup-skin.js']){
  const source=fs.readFileSync(path.join(root,name),'utf8').replace(/\r\n/g,'\n').replace(/\n/g,'\r\n');
  fs.writeFileSync(path.join(dir,name),source);
 }
 const run=()=>spawnSync(process.execPath,[path.join(dir,'scripts/build-startup-mascot.cjs')],{encoding:'utf8'});
 let result=run();assert.equal(result.status,0,result.stderr);
 const file=path.join(dir,'lib/client.js'),once=fs.readFileSync(file,'utf8');
 new(require('node:vm').Script)(once);
 for(const marker of ['BEGIN SHARED STARTUP MASCOT','END SHARED STARTUP MASCOT','BEGIN SHARED STARTUP SKIN','END SHARED STARTUP SKIN'])assert.equal(once.split('// '+marker).length,2,marker);
 result=run();assert.equal(result.status,0,result.stderr);assert.equal(fs.readFileSync(file,'utf8'),once);
 fs.writeFileSync(file,once.replace('// END SHARED STARTUP SKIN','// missing marker'));
 result=run();assert.notEqual(result.status,0);assert.match(result.stderr,/Expected exactly one marker/);
});

const chrome=[process.env.FAIRY_BROWSER,'C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p=>p&&fs.existsSync(p));
const pause=ms=>new Promise(r=>setTimeout(r,ms));
class CDP{
 constructor(url){this.ws=new WebSocket(url);this.pending=new Map();this.id=0;this.errors=[];this.ready=new Promise((r,j)=>{this.ws.onopen=r;this.ws.onerror=j});this.ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=this.pending.get(m.id);this.pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')this.errors.push(m.params)}}
 async call(method,params={}){await this.ready;return new Promise((resolve,reject)=>{const id=++this.id;this.pending.set(id,{resolve,reject});this.ws.send(JSON.stringify({id,method,params}))})}
 async eval(expression){const r=await this.call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
 async click(selector){const p=await this.eval(`(()=>{const b=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:b.x+b.width/2,y:b.y+b.height/2}})()`);for(const type of ['mousePressed','mouseReleased'])await this.call('Input.dispatchMouseEvent',{type,button:'left',clickCount:1,...p})}
}
test('native CSP page runs the shared live eye, interaction and terminal freeze without a video',{skip:!chrome,timeout:25000},async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'fairy-startup-mascot-'));
 const p=spawn(chrome,['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=0','--user-data-dir='+dir,'about:blank'],{windowsHide:true,stdio:'ignore'});let c;
 t.after(async()=>{if(c){await c.call('Browser.close').catch(()=>{});c.ws.close()}p.kill()});
 let port;for(let i=0;i<80;i++){try{port=Number(fs.readFileSync(path.join(dir,'DevToolsActivePort'),'utf8').split('\n')[0]);break}catch{await pause(60)}}assert(port);
 const tabs=await(await fetch(`http://127.0.0.1:${port}/json`)).json();c=new CDP(tabs.find(x=>x.type==='page').webSocketDebuggerUrl);
 await c.call('Page.enable');await c.call('Runtime.enable');
 await c.call('Page.addScriptToEvaluateOnNewDocument',{source:`window.fairyStartup={onMainReady:fn=>{window.testReady=fn},get:async()=>({variant:'archive',speed:2,mainReady:false}),playbackState:async()=>{},finished:async()=>{window.testFinishes=(window.testFinishes||0)+1},dismiss:async()=>{}};`});
 await c.call('Emulation.setDeviceMetricsOverride',{width:1380,height:900,deviceScaleFactor:1,mobile:false});
 await c.call('Page.navigate',{url:pathToFileURL(path.join(root,'desktop-startup/startup.html')).href});
 const state=()=>c.eval("document.querySelector('#startup-screen').getAttribute('data-fairy-sequence-state')");
 for(let i=0;i<60&&await state()!=='permission';i++)await pause(50);
 assert.equal(await state(),'permission');assert.equal(await c.eval('document.querySelectorAll("video").length'),0);
 await c.click('.fairy-archive-action');await pause(700);assert.equal(await state(),'identity');
 assert(await c.eval('!!document.querySelector("[data-dsh-fairy-startup-mascot-root] .dsh-fairy-startup-main")'));
 assert.equal(await c.eval('document.querySelectorAll("#dsh-fairy-startup-root").length'),1);
 const before=await c.eval('document.querySelector(".dsh-fairy-startup-corners").getAttribute("style")');await pause(120);
 assert(await c.eval('document.querySelector("[data-dsh-fairy-startup-mascot-root]").getAttribute("data-visual-suspended")===null'));
 if(process.env.FAIRY_BROWSER_ARTIFACTS){const image=await c.call('Page.captureScreenshot',{format:'png'});fs.mkdirSync(process.env.FAIRY_BROWSER_ARTIFACTS,{recursive:true});fs.writeFileSync(path.join(process.env.FAIRY_BROWSER_ARTIFACTS,'startup-shared-eye-146.png'),Buffer.from(image.data,'base64'))}
 await c.click('.fairy-archive-action');
 for(let i=0;i<160&&await state()!=='ended';i++)await pause(40);
 assert.equal(await state(),'ended');assert.equal(await c.eval('testFinishes'),1);
 assert(await c.eval('document.querySelector("[data-dsh-fairy-startup-mascot-root]").hasAttribute("data-visual-suspended")'));
 const frame=await c.eval('document.querySelector(".dsh-fairy-startup-main").outerHTML');await pause(400);
 assert.equal(await c.eval('document.querySelector(".dsh-fairy-startup-main").outerHTML'),frame);
 await c.eval('testReady(true)');await pause(50);assert.equal(await c.eval('testFinishes'),1);
 assert.deepEqual(c.errors,[]);
});
