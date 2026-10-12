const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('fairyStartup', {
 get:()=>ipcRenderer.invoke('fairy-ui-native:data'),
 finished:reason=>ipcRenderer.invoke('fairy-ui-native:finished',reason),
 dismiss:()=>ipcRenderer.invoke('fairy-ui-native:dismiss'),
 playbackState:state=>ipcRenderer.invoke('fairy-ui-native:playback-state',state),
 onMainReady:callback=>{
  const listener=(_event,ready)=>callback(ready===true);
  ipcRenderer.on('fairy-ui-native:main-ready',listener);
  return ()=>ipcRenderer.removeListener('fairy-ui-native:main-ready',listener);
 }
});
