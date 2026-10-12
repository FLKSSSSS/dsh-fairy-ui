function normalizeStartupPreferences(v={}) {
 if(!v||typeof v!=='object')v={};
 return {enabled:v.enabled!==false,muted:v.muted!==false,speed:[0.5,1,1.5,2].includes(v.speed)?v.speed:1,
  aspectRatio:['auto','16:9','16:10','4:3','1:1'].includes(v.aspectRatio)?v.aspectRatio:'auto',
  scale:typeof v.scale==='number'&&Number.isFinite(v.scale)?Math.max(50,Math.min(150,Math.round(v.scale))):100,
  fit:v.fit==='contain'?'contain':'cover'};
}
function startupVideoStyle(prefs) {
 const ratio={'16:9':16/9,'16:10':16/10,'4:3':4/3,'1:1':1}[prefs.aspectRatio];
 const width=ratio?`min(100vw, ${100*ratio}vh)`:'100%';
 const height=ratio?`min(100vh, ${100/ratio}vw)`:'100%';
 return `position:absolute;left:50%;top:50%;width:${width};height:${height};object-fit:${prefs.fit};transform:translate(-50%,-50%) scale(${prefs.scale/100});transform-origin:center;`;
}
const video=document.getElementById('animation');
const fallback=document.getElementById('fallback');
const status=document.getElementById('status');
const skip=document.getElementById('skip');
let initialized=false,completed=false,failedOnce=false,mainReady=false,stopped=false;
function report(state){window.fairyStartup.playbackState(state).catch(()=>{});}
function failed(){if(failedOnce||stopped)return;failedOnce=true;stopped=true;video.pause();fallback.hidden=false;status.textContent='动画暂时无法播放，不影响 DSH 启动。';window.fairyStartup.finished('failed').catch(()=>{});}
function updateCompletedStatus(){
 status.textContent=mainReady?'动画已播放完，正在进入 DSH…':'动画已播放完，正在等待 DSH 加载完成…';
}
function setReady(ready){
 mainReady=ready===true;
 // Readiness changes only the status. Never pause, seek, load or replay the video.
 if(completed)updateCompletedStatus();
}
window.fairyStartup.onMainReady(setReady);
async function apply(settings){
 if(initialized||stopped)return;initialized=true;
 // An event may have arrived while the initial IPC request was in flight.
 mainReady=mainReady||settings.mainReady===true;
 const prefs=normalizeStartupPreferences(settings);
 video.style.cssText=startupVideoStyle(prefs);
 video.loop=false;video.muted=prefs.muted;video.defaultPlaybackRate=prefs.speed;video.playbackRate=prefs.speed;
 video.src=settings.url;fallback.hidden=true;status.textContent='正在启动 Fairy，请稍候…';
 try{await video.play();if(!stopped)report('playing')}catch{failed()}
}
video.addEventListener('ended',()=>{
 if(completed||stopped)return;completed=true;stopped=true;video.pause();
 // Keep the final decoded frame until the native gate also has a ready target.
 updateCompletedStatus();
 window.fairyStartup.finished('ended').catch(()=>{});
});
video.addEventListener('error',failed);
video.addEventListener('loadedmetadata',()=>{if(!video.error)fallback.hidden=true;});
skip.addEventListener('click',()=>{if(stopped)return;stopped=true;video.pause();status.textContent='动画已跳过，正在等待 DSH 准备就绪…';window.fairyStartup.dismiss().catch(()=>{});});
window.addEventListener('keydown',e=>{if(e.key==='Escape')skip.click()});
window.fairyStartup.get().then(apply).catch(failed);
