'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawn}=require('node:child_process'),{pathToFileURL}=require('node:url');
const chrome=[process.env.FAIRY_BROWSER,'C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p=>p&&fs.existsSync(p));
const pause=ms=>new Promise(r=>setTimeout(r,ms));
test('collapsed Windows titlebar controls and hero toggle remain aligned, separate and clickable',{skip:!chrome,timeout:30000},async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'fairy-header-browser-'));
 const source=fs.readFileSync(path.join(__dirname,'../lib/client.js'),'utf8');
 const begin=source.indexOf('//#region src/client/header-geometry.js'),end=source.indexOf('//#endregion',begin);
 const styleBegin=source.indexOf('\tfunction injectStyles()'),styleEnd=source.indexOf('\n\tvar init_style',styleBegin);
 fs.writeFileSync(path.join(dir,'fixture.js'),`const __commonJSMin=cb=>{let m;return()=>{if(!m){m={exports:{}};cb(m.exports,m)}return m.exports}};const STYLE_ID='dsh-fairy-visual-style';\n`+source.slice(begin,end)+source.slice(styleBegin,styleEnd)+`
 injectStyles();window.nativeClicks=0;window.toggleClicks=0;
 document.querySelector('#open').onclick=()=>nativeClicks++;
 document.querySelector('#right').onclick=()=>nativeClicks++;
 document.querySelector('.dsh-fairy-toggle').onclick=()=>toggleClicks++;
 window.position=()=>{const p=require_header_geometry().heroTogglePosition(document.querySelector('#stage'),document.querySelector('[data-phase]'),document.querySelector('.dsh-fairy-hero-toggle-host'));Object.assign(document.querySelector('.dsh-fairy-hero-toggle-host').style,{left:p.left+'px',top:p.top+'px'});return p};`);
 // Native 0.2.1 structure and layout, including the Windows fixed controls,
 // header outside data-phase and its right-corner slot (negative end margin).
 fs.writeFileSync(path.join(dir,'fixture.html'),`<!doctype html><html data-windows-titlebar data-dsh-fairy-visual data-dsh-fairy-theme="dark"><meta charset="utf-8"><style>
 :root{--dsh-windows-titlebar-height:40px;--dsw-alias-label-secondary:#abc;--dsw-alias-border-l2:#567}body{margin:0;background:#07101c;color:white}button{cursor:pointer}
 #open,#new{position:fixed;top:calc((var(--dsh-windows-titlebar-height) - 28px)/2);left:12px;width:28px;height:28px;z-index:30}#new{left:48px}
 #stage{position:absolute;left:0;right:0;top:40px;height:600px}header{display:grid;grid-template-columns:auto minmax(0,1fr);gap:0 12px;padding:10px 28px 0 20px;box-sizing:border-box;min-height:40px}
 [data-conversation-header-leading]{grid-area:1/1;display:flex}[data-row]{display:flex;grid-column:2;align-items:center;min-height:30px}
 [data-conversation-header-corner]{display:flex;flex:none;margin-left:auto;margin-right:-16px}#right{width:28px;height:28px}
 </style><div id="root"><div data-slot="root"><button id="open" aria-label="打开侧边栏" data-dsh-fairy-sidebar-open-control="true"><svg></svg></button><button id="new" aria-label="新建会话">+</button><main id="stage"><div data-slot="conversation.header" style="display:contents"><header><div data-conversation-header-leading></div><div data-slot="conversation.session.header" style="display:contents"><div data-row><div data-conversation-header-corner><div data-slot="conversation.session.header.corner" style="display:contents"><button id="right" aria-label="打开右侧边栏" data-sidebar-right-expand>▥</button></div></div></div></div></header></div><section data-phase="hero" style="height:600px"></section></main></div></div><div class="dsh-fairy-hero-toggle-host"><div class="dsh-fairy-toggle-group"><button class="dsh-fairy-toggle">H.D.D</button><button class="dsh-fairy-theme-toggle">◐</button></div></div><script src="fixture.js"></script>`);
 const child=spawn(chrome,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+path.join(dir,'user'),'about:blank'],{windowsHide:true,stdio:'ignore'});let ws;
 t.after(()=>{ws?.close();child.kill()});
 let port;for(let i=0;i<80;i++){try{port=Number(fs.readFileSync(path.join(dir,'user/DevToolsActivePort'),'utf8').split('\n')[0]);break}catch{await pause(100)}}assert(port);
 const tabs=await(await fetch(`http://127.0.0.1:${port}/json`)).json();ws=new WebSocket(tabs.find(x=>x.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});
 let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}};
 const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}))});
 const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true});assert(!r.exceptionDetails,JSON.stringify(r.exceptionDetails));return r.result.value};
 const click=async b=>{const x=b.left+b.width/2,y=b.top+b.height/2;await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,x,y});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,x,y})};
 await call('Page.navigate',{url:pathToFileURL(path.join(dir,'fixture.html')).href});for(let i=0;i<50&&await evaluate('typeof position')!=='function';i++)await pause(30);
 let cases=0;
 for(const theme of ['light','dark'])for(const width of [1380,900,600])for(const scale of [1,1.5])for(const left of [0,180])for(const right of [true,false]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:822,deviceScaleFactor:scale,mobile:false});
  const r=await evaluate(`(()=>{document.documentElement.setAttribute('data-dsh-fairy-theme','${theme}');document.querySelector('#stage').style.left='${left}px';document.querySelector('#right').style.display='${right?'block':'none'}';position();const b=n=>n.getBoundingClientRect().toJSON();return {open:b(document.querySelector('#open')),new:b(document.querySelector('#new')),toggle:b(document.querySelector('.dsh-fairy-hero-toggle-host')),right:b(document.querySelector('#right')),fixed:getComputedStyle(document.querySelector('#open')).position}})()`);
  const context=JSON.stringify({theme,width,scale,left,right,r});assert.equal(r.fixed,'fixed',context);assert(r.open.top>=0&&r.open.bottom<=40,context);assert(r.new.top>=0&&r.new.bottom<=40,context);
  if(right){assert(r.toggle.right+7<=r.right.left,context);assert(Math.abs((r.toggle.top+r.toggle.height/2)-(r.right.top+r.right.height/2))<=1,context)}
  assert(r.toggle.left>=left&&r.toggle.right<=width,context);
  const n=await evaluate('nativeClicks'),toggles=await evaluate('toggleClicks');await click(r.open);await click(r.toggle);assert.equal(await evaluate('nativeClicks'),n+1,context);assert.equal(await evaluate('toggleClicks'),toggles+1,context);
  if(right){await click(r.right);assert.equal(await evaluate('nativeClicks'),n+2,context)}cases++;
 }
 // The prior 0.2.0 header remains in data-phase with no persistent header slot.
 const legacy=await evaluate(`document.querySelector('[data-slot="conversation.header"]').remove();document.querySelector('#stage').style.left='0px';position()`);assert.deepEqual(legacy,{left:Math.round(600-28-await evaluate("document.querySelector('.dsh-fairy-hero-toggle-host').offsetWidth")),top:48});
 // Disabling the skin restores native paint/positioning without a DOM move.
 assert.equal(await evaluate(`document.documentElement.removeAttribute('data-dsh-fairy-visual');getComputedStyle(document.querySelector('#open')).position`),'fixed');
 await call('Browser.close');t.diagnostic(`${cases} native header geometry and physical click cases passed; legacy fallback passed`);
});
