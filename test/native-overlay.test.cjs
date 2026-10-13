const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{EventEmitter}=require('node:events');
const desktop=fs.existsSync(path.join(__dirname,'../desktop-startup'))?path.join(__dirname,'../desktop-startup'):path.join(__dirname,'../../desktop-startup');
function host(ready=true){
 const windows=[],handlers={},rows=[],scheduled=[];
 class Window extends EventEmitter{
  constructor(){super();this.bounds={x:40,y:50,width:1320,height:900};this.visible=false;this.dead=false;this.webContents=new EventEmitter();Object.assign(this.webContents,{mainFrame:{},setWindowOpenHandler(){},send(){},executeJavaScript:async()=>false,setBackgroundThrottling(){}});windows.push(this)}
  isDestroyed(){return this.dead}isVisible(){return this.visible}show(){this.visible=true}showInactive(){this.visible=true}focus(){this.focused=true}setParentWindow(w){this.parent=w}getBounds(){return this.bounds}setBounds(b){this.bounds={...b};this.emit('resize')}loadFile(){return Promise.resolve()}destroy(){this.dead=true;this.visible=false;this.emit('closed')}
 }
 const context={module:{exports:{}},require:name=>name.startsWith('./')?require(path.join(desktop,name)):require(name),console:{log:(_tag,row)=>rows.push(JSON.parse(row))},process:{env:{}},__dirname:desktop,setInterval:fn=>{scheduled.push(fn);return {unref(){}}},clearInterval(){},setTimeout:()=>({unref(){}}),clearTimeout(){}};
 vm.runInNewContext(fs.readFileSync(path.join(context.__dirname,'native-startup.cjs'),'utf8'),context);
 const n=context.module.exports.createNativeStartup({app:{getPath:()=>__dirname,on(){},quit(){}},BrowserWindow:Window,ipcMain:{handle:(c,f)=>handlers[c]=f,removeHandler:c=>delete handlers[c]}});n.open();const overlay=windows[0];if(ready)overlay.emit('ready-to-show');return {n,Window,overlay,rows,handlers};
}
test('host is visible and owned overlay remains during playback and loading; reveal does not show/restart host',()=>{
 const h=host(),w=new h.Window();h.n.attach(w);h.n.requestShow(w);
 assert.equal(w.isVisible(),true);assert.equal(h.overlay.parent,w);assert.equal(h.n.gate.playbackDone,false);assert.equal(h.overlay.isDestroyed(),false);
 h.n.gate.finishPlayback();assert.equal(h.overlay.isDestroyed(),false);h.n.gate.ready();assert.equal(h.overlay.isDestroyed(),true);assert.equal(w.isVisible(),true);
 assert.equal(h.rows.filter(e=>e.event==='main-shown').length,1);assert.equal(h.rows.filter(e=>e.event==='overlay-removed').length,1);assert.equal(h.rows.find(e=>e.event==='main-shown').playbackDone,false);h.n.dispose();
});
test('welcome-to-main transition reparents the same video and revokes stale readiness',()=>{
 const h=host(),welcome=new h.Window();h.n.attach(welcome);h.n.requestShow(welcome);h.n.gate.ready();const main=new h.Window();h.n.attach(main);
 assert.equal(h.n.gate.mainReady,false);assert.equal(h.overlay.parent,main);welcome.destroy();assert.equal(h.overlay.isDestroyed(),false);
 h.n.gate.finishPlayback();assert.equal(h.overlay.isDestroyed(),false);h.n.requestShow(main);h.n.gate.ready();assert.equal(h.overlay.isDestroyed(),true);assert.equal(main.isVisible(),true);h.n.open();assert.equal(h.rows.filter(e=>e.event==='splash-created').length,1);h.n.dispose();
});
test('moving/resizing either host or overlay synchronizes bounds and listeners detach at reveal',()=>{
 const h=host(),w=new h.Window();h.n.attach(w);h.n.requestShow(w);w.setBounds({x:30,y:50,width:1100,height:700});assert.deepEqual(h.overlay.getBounds(),w.getBounds());h.overlay.setBounds({x:80,y:90,width:1200,height:800});assert.deepEqual(w.getBounds(),h.overlay.getBounds());h.n.gate.ready();h.n.gate.finishPlayback();assert.equal(w.listenerCount('resize'),0);assert.equal(h.overlay.listenerCount('move'),0);h.n.dispose();
});

test('overlay renderer failure before ready-to-show still reveals loaded host',()=>{
 const h=host(false),w=new h.Window();h.n.attach(w);h.n.requestShow(w);
 assert.equal(w.isVisible(),false);h.overlay.webContents.emit('render-process-gone');
 assert.equal(h.overlay.isDestroyed(),true);h.n.gate.ready();assert.equal(w.isVisible(),true);
 assert.equal(h.rows.find(e=>e.event==='main-shown').recovery,true);h.n.dispose();
});
