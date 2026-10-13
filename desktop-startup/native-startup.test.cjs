const fs=require('fs'),path=require('path'),vm=require('vm'),{test}=require('node:test'),assert=require('assert/strict');
function host(preferences){
 const handlers={},timers=new Set();let next=1;const events={};
 const web={mainFrame:{},setWindowOpenHandler(){},on(){},send(){},executeJavaScript:async()=>false,setBackgroundThrottling(){}};
 class Window{constructor(){this.webContents=web;this.dead=false;}isDestroyed(){return this.dead}once(){}on(){}loadFile(){return Promise.resolve()}destroy(){this.dead=true}show(){}getBounds(){return {}}setParentWindow(){}}
 const app={getPath:()=>__dirname,on:(n,f)=>events[n]=f,quit(){}};
 const context={module:{exports:{}},require:name=>name==='node:fs'&&preferences?{...fs,readFileSync:(file,...args)=>String(file).endsWith('fairy-ui-startup.json')?JSON.stringify(preferences):fs.readFileSync(file,...args),writeFileSync:(_file,data)=>preferences.saved=JSON.parse(data),renameSync(){}}:require(name),console:{log(){}},process:{env:{}},__dirname,setInterval:()=>({unref(){}}),clearInterval(){},setTimeout:()=>{const id=next++;timers.add(id);return id},clearTimeout:id=>timers.delete(id)};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'native-startup.cjs'),'utf8'),context);
 const n=context.module.exports.createNativeStartup({app,BrowserWindow:Window,ipcMain:{handle:(n,f)=>handlers[n]=f,removeHandler:n=>delete handlers[n]}});n.open();
 const sender={sender:web,senderFrame:web.mainFrame};return {n,handlers,timers,sender};
}
test('only playing is accepted; ending cancels the media watchdog',()=>{const h=host();assert.equal(h.timers.size,1);assert.throws(()=>h.handlers['fairy-ui-native:playback-state'](h.sender,'waiting'),/Rejected playback state/);h.handlers['fairy-ui-native:playback-state'](h.sender,'playing');assert.equal(h.timers.size,1);h.handlers['fairy-ui-native:finished'](h.sender,'ended');assert.equal(h.timers.size,0);assert.equal(h.n.gate.playbackDone,true);assert.equal(h.n.gate.entered,false);h.n.dispose()});
test('readiness snapshot and IPC sender/frame are validated',()=>{const h=host();assert.equal(h.handlers['fairy-ui-native:data'](h.sender).mainReady,false);h.n.gate.ready();assert.equal(h.handlers['fairy-ui-native:data'](h.sender).mainReady,true);assert.throws(()=>h.handlers['fairy-ui-native:playback-state']({...h.sender,senderFrame:{}},'waiting'));assert.throws(()=>h.handlers['fairy-ui-native:playback-state'](h.sender,'bogus'));h.n.dispose();assert.equal(Object.keys(h.handlers).length,0)});

test('disabled native animation can be re-enabled from the retained settings UI',async()=>{
 const preferences={enabled:false},h=host(preferences),callbacks={};
 const window={isDestroyed:()=>false,on:(n,f)=>callbacks[n]=f,webContents:{setBackgroundThrottling(){},executeJavaScript:async()=>({enabled:true,muted:true,speed:1})},show(){},focus(){}};
 h.n.attach(window);h.n.requestShow(window);callbacks.close();await new Promise(r=>setImmediate(r));assert.equal(preferences.saved.enabled,true);h.n.dispose();
});

test('saved aspect ratio and scale are returned through native IPC',()=>{const h=host({aspectRatio:'4:3',scale:82,fit:'contain'});const p=h.handlers['fairy-ui-native:data'](h.sender);assert.equal(p.aspectRatio,'4:3');assert.equal(p.scale,82);assert.equal(p.fit,'contain');h.n.dispose()});
test('settings persistence retains new display options',async()=>{const preferences={enabled:false},h=host(preferences),callbacks={};const window={isDestroyed:()=>false,on:(n,f)=>callbacks[n]=f,webContents:{setBackgroundThrottling(){},executeJavaScript:async()=>({enabled:true,aspectRatio:'16:10',scale:90,fit:'contain'})},show(){},focus(){}};h.n.attach(window);h.n.requestShow(window);callbacks.close();await new Promise(r=>setImmediate(r));assert.equal(preferences.saved.aspectRatio,'16:10');assert.equal(preferences.saved.scale,90);assert.equal(preferences.saved.fit,'contain');h.n.dispose()});

test('chosen archive style survives native settings snapshot',()=>{const h=host({variant:'archive'});assert.equal(h.handlers['fairy-ui-native:data'](h.sender).variant,'archive');h.n.dispose()});
