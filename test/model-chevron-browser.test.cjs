'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawn}=require('node:child_process'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..');
const deps=process.env.FAIRY_REACT_TEST_TOOLS||path.resolve(root,'../arrow-test-tools/node_modules');
const chrome=[process.env.FAIRY_BROWSER,'C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p=>p&&fs.existsSync(p));
const pause=ms=>new Promise(r=>setTimeout(r,ms));
class CDP{
 constructor(url){this.ws=new WebSocket(url);this.pending=new Map();this.id=0;this.errors=[];this.ready=new Promise((r,j)=>{this.ws.onopen=r;this.ws.onerror=j});this.ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=this.pending.get(m.id);this.pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')this.errors.push(m.params)}}
 async call(method,params={}){await this.ready;return new Promise((resolve,reject)=>{const id=++this.id;this.pending.set(id,{resolve,reject});this.ws.send(JSON.stringify({id,method,params}))})}
 async eval(expression){const r=await this.call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
 async click(selector){const p=await this.eval(`(()=>{const n=document.querySelector(${JSON.stringify(selector)}),b=n.getBoundingClientRect();return {x:b.x+b.width/2,y:b.y+b.height/2}})()`);for(const type of ['mousePressed','mouseReleased'])await this.call('Input.dispatchMouseEvent',{type,button:'left',clickCount:1,...p});await pause(20)}
}
test('real React model arrow follows every menu state without a halfway rotation',{
 skip:!chrome||!fs.existsSync(path.join(deps,'react-dom/client.js'))?'Set FAIRY_REACT_TEST_TOOLS to a React 19/react-dom/esbuild node_modules directory':false,timeout:30000,
},async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'fairy-arrow-browser-'));
 const source=fs.readFileSync(path.join(root,'lib/client.js'),'utf8');
 const region=source.slice(source.indexOf('// #region fairy-model-control'),source.indexOf('// #endregion fairy-model-control'));
 const begin=source.indexOf('\tfunction injectStyles()'),end=source.indexOf('\n\tvar init_style',begin);
 const entry=`import React from ${JSON.stringify(path.join(deps,'react/index.js'))};import {createRoot} from ${JSON.stringify(path.join(deps,'react-dom/client.js'))};
 const require=()=>React;${region}
 const STYLE_ID='dsh-fairy-visual-style';${source.slice(begin,end)};injectStyles();
 const state={status:'ready',current:{provider:'fixture',model:'flash',reasoningEffort:'max'},groups:[{id:'fixture',name:'Fixture',models:[{id:'flash',name:'DeepSeek-V4.1-Flash',reasoning:{defaultEffort:'max',efforts:[{id:'low',name:'Low'},{id:'max',name:'Max'}]}}]}]};
 const controller={store:{subscribe:()=>()=>{},getSnapshot:()=>state},load:async()=>state,select:async()=>({ok:true})};
 const ctx={get:()=>({directoryFor:()=>controller}),effect:fn=>fn(),sessions:{subagentAddress:()=>undefined},slots:{inject:(_name,fn)=>fn(),register:(_options,Component)=>{window.updateLocked=locked=>view.render(React.createElement(Component,{available:true,locked,controller}));window.updateLocked(false);return()=>{}}}};
 const view=createRoot(document.getElementById('control'));fairyModelControl.apply(ctx);`;
 const esbuild=require(path.join(deps,'esbuild'));
 fs.writeFileSync(path.join(dir,'entry.js'),esbuild.buildSync({stdin:{contents:entry,resolveDir:root,loader:'js'},bundle:true,write:false,platform:'browser',format:'iife',define:{'process.env.NODE_ENV':'"production"'}}).outputFiles[0].text);
 fs.writeFileSync(path.join(dir,'index.html'),`<!doctype html><html data-dsh-fairy-visual data-dsh-fairy-theme="dark"><head><meta charset="utf-8"><style>html,body{margin:0;font:14px Arial;background:#081322;color:#e8f2fa;--dsw-alias-label-primary:#e8f2fa}#dock{position:fixed;inset:0;--dsh-fairy-composer-height:100vh;--dsh-fairy-composer-hole-contact-top:calc(100vh - 140px);--dsh-fairy-composer-hole-contact-height:100px;--dsh-fairy-composer-hole-contact-left:20px;--dsh-fairy-composer-hole-contact-width:calc(100vw - 40px)}#control{position:absolute;right:40px;bottom:60px;height:28px}#outside{position:absolute;top:50%;right:30px;pointer-events:auto!important}</style></head><body><div id="dock" data-dsh-fairy-composer-dock="true"><div id="control" data-dsh-fairy-composer-model-toolbar="true"></div><button id="outside">outside</button></div><script src="entry.js"></script></body></html>`);
 const child=spawn(chrome,['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=0','--user-data-dir='+path.join(dir,'user'),'about:blank'],{windowsHide:true,stdio:'ignore'});let c;
 t.after(async()=>{if(c){await c.call('Browser.close').catch(()=>{});c.ws.close()}child.kill()});
 let port;for(let i=0;i<80;i++){try{port=Number(fs.readFileSync(path.join(dir,'user/DevToolsActivePort'),'utf8').split('\n')[0]);break}catch{await pause(60)}}assert(port);
 const tabs=await(await fetch(`http://127.0.0.1:${port}/json`)).json();c=new CDP(tabs.find(x=>x.type==='page').webSocketDebuggerUrl);
 await c.call('Page.enable');await c.call('Runtime.enable');await c.call('Page.navigate',{url:pathToFileURL(path.join(dir,'index.html')).href});
 for(let i=0;i<80&&!await c.eval('!!document.querySelector("[data-fairy-model-trigger]")');i++)await pause(30);
 const trigger='[data-fairy-model-trigger]';let checks=0;
 const check=async open=>{
  const s=await c.eval(`(()=>{const b=document.querySelector('${trigger}'),s=b.querySelector('svg'),r=s.getBoundingClientRect();return {open:b.getAttribute('aria-expanded'),menu:!!document.querySelector('.fairy-mc-model-menu'),path:s.querySelector('path').getAttribute('d'),transform:getComputedStyle(s).transform,rect:r.toJSON(),hit:b.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))}})()`);
  assert.equal(s.open,String(open));assert.equal(s.menu,open);assert.equal(s.path,open?'M4 10L8 6L12 10':'M4 6L8 10L12 6');assert.equal(s.transform,'none');assert(s.hit,'arrow remains visible and inside the clickable trigger');assert(s.rect.width>0&&Math.abs(s.rect.width-s.rect.height)<.1);checks++;
  if(process.env.FAIRY_BROWSER_ARTIFACTS&&checks<=2){
   const b=await c.eval(`document.querySelector('${trigger}').getBoundingClientRect().toJSON()`);
   const shot=await c.call('Page.captureScreenshot',{format:'png',clip:{x:Math.max(0,b.x-3),y:Math.max(0,b.y-3),width:b.width+6,height:b.height+6,scale:2}});
   fs.mkdirSync(process.env.FAIRY_BROWSER_ARTIFACTS,{recursive:true});fs.writeFileSync(path.join(process.env.FAIRY_BROWSER_ARTIFACTS,`model-arrow-${open?'open':'closed'}.png`),Buffer.from(shot.data,'base64'));
  }
 };
 for(const theme of ['dark','light'])for(const width of [600,1380])for(const scale of [1,1.25]){
  await c.call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:scale,mobile:false});await c.eval(`document.documentElement.setAttribute('data-dsh-fairy-theme','${theme}')`);
  await check(false);await c.click(trigger);await check(true);
  // The model list is a nested pane, not a second open/closed state.
  await c.click('.fairy-mc-model-row');await check(true);
  await c.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});await pause(20);await check(true);
  await c.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});await pause(20);await check(false);
  for(let i=0;i<4;i++){await c.click(trigger);await check(i%2===0)}
  await c.click(trigger);await c.click('#outside');await check(false);
 }
 await c.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await c.eval(`document.querySelector('${trigger}').focus()`);
 await c.call('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowDown',code:'ArrowDown'});await pause(30);await check(true);
 await c.eval('updateLocked(true)');await pause(30);await check(false);
 assert.deepEqual(c.errors,[]);t.diagnostic(checks+' actual React/CSS direction and menu-state checks passed');
 if(process.env.FAIRY_BROWSER_ARTIFACTS){fs.mkdirSync(process.env.FAIRY_BROWSER_ARTIFACTS,{recursive:true});fs.writeFileSync(path.join(process.env.FAIRY_BROWSER_ARTIFACTS,'model-arrow-146.json'),JSON.stringify({checks,actualReact:true,physicalClicks:true,noModelRequests:true,errors:c.errors},null,2))}
});
