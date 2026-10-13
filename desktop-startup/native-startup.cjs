"use strict";
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {StartupGate}=require('./startup-gate.cjs');
const GEOMETRY=require('./window-geometry.cjs');
const {normalizeStartupPreferences}=require('./startup-preferences.cjs');
const PREF_KEY='dsh.fairyUi.startup.v2';
function createNativeStartup({app,BrowserWindow,ipcMain}){
 let splash=null,target=null,disposed=false,started=false,enabled=true,overlayReady=false;
 let poll=null,watchdog=null,requested=null,preferences=normalizeStartupPreferences();
 let unbindOverlay=()=>{};
 const eventLog=[];
 const record=(event,extra={})=>{
  const row={event,elapsedMs:Date.now()-startedAt,...extra};eventLog.push(row);
  console.log('[fairy-ui-startup]',JSON.stringify(row));
  if(process.env.FAIRY_UI_STARTUP_TEST_REPORT){try{fs.writeFileSync(process.env.FAIRY_UI_STARTUP_TEST_REPORT,JSON.stringify(eventLog,null,2))}catch{}}
 };
 let startedAt=Date.now();
 const savePreferences=()=>{
  if(!target||target.isDestroyed())return;
  target.webContents.executeJavaScript(`(()=>{try{return JSON.parse(localStorage.getItem(${JSON.stringify(PREF_KEY)})||'null')}catch{return null}})()`).then(v=>{
   if(!v||typeof v!=='object')return;
   const next=normalizeStartupPreferences(v);
   const file=path.join(app.getPath('userData'),'fairy-ui-startup.json');const tmp=file+'.tmp';
   try{fs.writeFileSync(tmp,JSON.stringify(next,null,2));fs.renameSync(tmp,file)}catch{}
  }).catch(()=>{});
 };
 const closeSplash=()=>{unbindOverlay();unbindOverlay=()=>{};const w=splash;splash=null;if(w&&!w.isDestroyed()){w.setParentWindow(null);w.destroy()}};
 const enter=()=>{
  clearInterval(poll);poll=null;clearTimeout(watchdog);
  if(disposed||!requested?.window||requested.window.isDestroyed()){closeSplash();return;}
  const {window,activate}=requested;
  // Normal startup only removes the overlay; recover visibility if its renderer failed
  // before ready-to-show. Never leave a loaded host hidden behind a failed overlay.
  if(!window.isVisible()){
   window.showInactive();
   record('main-shown',{playbackDone:gate.playbackDone,mainReady:gate.mainReady,covered:false,recovery:true});
  }
  closeSplash();
  record('overlay-removed',{playbackDone:gate.playbackDone,mainReady:gate.mainReady});
  if(activate)window.focus();
  window.webContents.setBackgroundThrottling(true);
  savePreferences();
 };
 const gate=new StartupGate(enter);
 const armWatchdog=()=>{
  clearTimeout(watchdog);
  watchdog=setTimeout(()=>{if(!gate.playbackDone){record('video-watchdog-released');gate.finishPlayback()}},90000);
  watchdog.unref?.();
 };
 const notifyReady=()=>{if(splash&&!splash.isDestroyed())splash.webContents.send('fairy-ui-native:main-ready',gate.mainReady)};
 const senderAllowed=event=>splash&&!splash.isDestroyed()&&event.sender===splash.webContents&&event.senderFrame===splash.webContents.mainFrame;
 ipcMain.handle('fairy-ui-native:data',event=>{
  if(!senderAllowed(event))throw Error('Rejected startup animation request');
  return {...preferences,mainReady:gate.mainReady,url:pathToFileURL(path.join(__dirname,'media/startup-default.mp4')).href};
 });
 ipcMain.handle('fairy-ui-native:finished',(event,reason)=>{
  if(!senderAllowed(event))throw Error('Rejected playback completion');
  if(!['ended','failed'].includes(reason))throw Error('Invalid completion reason');
  clearTimeout(watchdog);record(reason==='ended'?'video-ended':'video-failed');gate.finishPlayback();
 });
 ipcMain.handle('fairy-ui-native:dismiss',event=>{
  if(!senderAllowed(event))throw Error('Rejected startup dismissal');
  clearTimeout(watchdog);record('user-skipped');gate.finishPlayback();
  // Skip the video, not DSH's readiness. Continue to display the loading screen.
  if(splash&&!splash.isDestroyed())splash.webContents.executeJavaScript("document.getElementById('animation').pause();document.getElementById('status').textContent='动画已跳过，正在等待 DSH 准备就绪…'").catch(()=>{});
 });
 ipcMain.handle('fairy-ui-native:playback-state',(event,state)=>{
  if(!senderAllowed(event)||state!=='playing')throw Error('Rejected playback state');
  if(gate.playbackDone)return;
  record('video-playing');
  armWatchdog();
 });
 function open(){
  if(started||disposed)return;started=true;startedAt=Date.now();
  try{const v=JSON.parse(fs.readFileSync(path.join(app.getPath('userData'),'fairy-ui-startup.json'),'utf8'));preferences=normalizeStartupPreferences(v)}catch{}
  enabled=preferences.enabled;
  if(!enabled){gate.finishPlayback();return;}
  const w=new BrowserWindow({...GEOMETRY,show:false,frame:false,transparent:true,roundedCorners:true,hasShadow:true,resizable:true,backgroundColor:'#05090d',title:'Fairy 正在启动',skipTaskbar:true,autoHideMenuBar:true,webPreferences:{preload:path.join(__dirname,'startup-preload.cjs'),contextIsolation:true,sandbox:true,nodeIntegration:false,webSecurity:true,backgroundThrottling:false,autoplayPolicy:'no-user-gesture-required'}});
  splash=w;record('splash-created');
  w.webContents.setWindowOpenHandler(()=>({action:'deny'}));w.webContents.on('will-navigate',e=>e.preventDefault());
  w.once('ready-to-show',()=>{if(!disposed&&!w.isDestroyed()){overlayReady=true;showUnderlay();w.show();record('splash-shown')}});
  w.on('close',e=>{if(!disposed&&splash===w&&!gate.entered){e.preventDefault();record('user-close');gate.finishPlayback();app.quit()}});
  w.webContents.on('render-process-gone',()=>{record('splash-renderer-failed');gate.finishPlayback();closeSplash()});
  w.loadFile(path.join(__dirname,'startup.html')).catch(()=>{record('splash-load-failed');gate.finishPlayback();closeSplash()});
  // A broken video cannot force an infinite wait. This is NOT a normal playback timeout.
  armWatchdog();
 }
 // Keep the same video renderer alive when binding/switching the host. No reload/play here.
 function showUnderlay(){
  if(!overlayReady||!target||target.isDestroyed()||target.isVisible())return;
  target.showInactive();
  record('main-shown',{playbackDone:gate.playbackDone,mainReady:gate.mainReady,covered:true});
 }
 function bindOverlay(window,activate=false){
  const overlay=splash;
  if(!overlay||overlay.isDestroyed()||window.isDestroyed())return;
  if(target!==window){
   unbindOverlay();unbindOverlay=()=>{};
   gate.mainReady=false;notifyReady();
   const bounds=overlay.getBounds();
   target=window;requested={window,activate:requested?.activate??true};
   overlay.setParentWindow(window);
   window.setBounds(bounds);
   const listeners=[];let syncing=false;
   const listen=(w,event,fn)=>{w.on(event,fn);listeners.push(()=>w.removeListener(event,fn))};
   const sync=(from,to)=>{
    if(syncing||from.isDestroyed()||to.isDestroyed())return;
    const a=from.getBounds(),b=to.getBounds();
    // Windows fractional DPI can round setBounds by 1–2 DIP. Do not feed that back.
    if(['x','y','width','height'].every(k=>Math.abs(a[k]-b[k])<=2))return;
    syncing=true;try{to.setBounds(a)}finally{syncing=false}
   };
   for(const event of ['move','resize']){
    listen(window,event,()=>sync(window,overlay));
    listen(overlay,event,()=>sync(overlay,window));
   }
   // Native child ownership handles minimize/restore and stays above only its own host.
   listen(window,'closed',()=>{if(target===window&&!gate.entered){record('overlay-host-closed');closeSplash();gate.finishPlayback()}});
   unbindOverlay=()=>{for(const remove of listeners)remove()};
   record('overlay-bound');
  }
  showUnderlay();
  if(overlay.isVisible())activate?overlay.show():overlay.showInactive();
 }
 function attach(window){
  if(window.isDestroyed())return;
  window.on('close',savePreferences);
  if(gate.entered||!enabled)return;window.webContents.setBackgroundThrottling(false);
  bindOverlay(window);
  window.webContents.on('did-finish-load',()=>{if(target===window)startReadinessPoll(window)});
 }
 let checking=false;
 function startReadinessPoll(window){
  clearInterval(poll);checking=false;
  const probe=async()=>{
   if(checking||disposed||window.isDestroyed()||target!==window||gate.entered)return;checking=true;
   try{
    const ready=await window.webContents.executeJavaScript(`(()=>{if(document.readyState!=='complete')return false;const nativeWelcome=!!document.querySelector('#root')&&location.protocol==='file:';if(nativeWelcome)return document.querySelector('#root').children.length>0;return document.documentElement.dataset.fairyUiReady==='1'||!!document.querySelector('[data-composer-input],button[aria-label=\"设置\"],button[aria-label=\"Settings\"]');})()`);
    if(target!==window||disposed||window.isDestroyed())return;
    if(ready){clearInterval(poll);poll=null;record('renderer-ready');gate.ready();notifyReady();}
   }catch{}finally{checking=false}
  };
  poll=setInterval(probe,200);poll.unref?.();probe();
 }
 function requestShow(window,activate=true){
  if(disposed||gate.entered||!enabled){target=window;window.webContents.setBackgroundThrottling(true);activate?window.show():window.showInactive();if(activate)window.focus();return;}
  bindOverlay(window,activate);
  requested={window,activate};target=window;
  record('main-show-requested');startReadinessPoll(window);
 }
 function dispose(){if(disposed)return;disposed=true;gate.dispose();if(target&&!target.isDestroyed())target.webContents.setBackgroundThrottling(true);clearInterval(poll);clearTimeout(watchdog);closeSplash();for(const c of ['fairy-ui-native:data','fairy-ui-native:finished','fairy-ui-native:dismiss','fairy-ui-native:playback-state'])ipcMain.removeHandler(c)}
 app.on('before-quit',dispose);
 return {open,attach,requestShow,dispose,gate};
}
module.exports={createNativeStartup};
