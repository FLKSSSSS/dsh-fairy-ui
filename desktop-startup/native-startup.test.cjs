const fs=require('fs'),path=require('path'),vm=require('vm'),{test}=require('node:test'),assert=require('assert/strict');
function host(preferences){
 const handlers={},timers=new Set();let next=1;const events={};
 const web={mainFrame:{},setWindowOpenHandler(){},on(){},send(){},executeJavaScript:async()=>false,setBackgroundThrottling(){}};
 class Window{constructor(){this.webContents=web;this.dead=false;}isDestroyed(){return this.dead}once(){}on(){}loadFile(){return Promise.resolve()}destroy(){this.dead=true}show(){}getBounds(){return {}}}
 const app={getPath:()=>__dirname,on:(n,f)=>events[n]=f,quit(){}};
 const context={module:{exports:{}},require:name=>name==='node:fs'&&preferences?{...fs,readFileSync:(file,...args)=>String(file).endsWith('fairy-ui-startup.json')?JSON.stringify(preferences):fs.readFileSync(file,...args),writeFileSync:(_file,data)=>preferences.saved=JSON.parse(data),renameSync(){}}:require(name),console:{log(){}},process:{env:{}},__dirname,setInterval:()=>({unref(){}}),clearInterval(){},setTimeout:()=>{const id=next++;timers.add(id);return id},clearTimeout:id=>timers.delete(id)};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'native-startup.cjs'),'utf8'),context);
 const n=context.module.exports.createNativeStartup({app,BrowserWindow:Window,ipcMain:{handle:(n,f)=>handlers[n]=f,removeHandler:n=>delete handlers[n]}});n.open();
 const sender={sender:web,senderFrame:web.mainFrame};return {n,handlers,timers,sender};
}
test('healthy checkpoint wait cancels damaged-video timer, resume re-arms it',()=>{const h=host();assert.equal(h.timers.size,1);h.handlers['fairy-ui-native:playback-state'](h.sender,'waiting');assert.equal(h.timers.size,0);h.handlers['fairy-ui-native:playback-state'](h.sender,'playing');assert.equal(h.timers.size,1);h.handlers['fairy-ui-native:finished'](h.sender,'ended');assert.equal(h.timers.size,0);h.n.dispose()});
test('readiness snapshot and IPC sender/frame are validated',()=>{const h=host();assert.equal(h.handlers['fairy-ui-native:data'](h.sender).mainReady,false);h.n.gate.ready();assert.equal(h.handlers['fairy-ui-native:data'](h.sender).mainReady,true);assert.throws(()=>h.handlers['fairy-ui-native:playback-state']({...h.sender,senderFrame:{}},'waiting'));assert.throws(()=>h.handlers['fairy-ui-native:playback-state'](h.sender,'bogus'));h.n.dispose();assert.equal(Object.keys(h.handlers).length,0)});

test('disabled native animation can be re-enabled from the retained settings UI',async()=>{
 const preferences={enabled:false},h=host(preferences),callbacks={};
 const window={isDestroyed:()=>false,on:(n,f)=>callbacks[n]=f,webContents:{setBackgroundThrottling(){},executeJavaScript:async()=>({enabled:true,muted:true,speed:1})},show(){},focus(){}};
 h.n.attach(window);h.n.requestShow(window);callbacks.close();await new Promise(r=>setImmediate(r));assert.equal(preferences.saved.enabled,true);h.n.dispose();
});
