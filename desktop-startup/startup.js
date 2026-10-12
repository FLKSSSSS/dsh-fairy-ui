const video=document.getElementById('animation');
const fallback=document.getElementById('fallback');
const status=document.getElementById('status');
const skip=document.getElementById('skip');
const WAIT_AT_SECONDS=5;
let initialized=false,completed=false,failedOnce=false,mainReady=false,waiting=false,checkpointPassed=false,stopped=false;
function report(state){window.fairyStartup.playbackState(state).catch(()=>{});}
function failed(){if(failedOnce||stopped)return;failedOnce=true;stopped=true;video.pause();fallback.hidden=false;status.textContent='动画暂时无法播放，不影响 DSH 启动。';window.fairyStartup.finished('failed').catch(()=>{});}
function checkCheckpoint(){
 if(!initialized||stopped||checkpointPassed||video.currentTime<WAIT_AT_SECONDS)return;
 checkpointPassed=true;
 if(!mainReady){waiting=true;video.pause();status.textContent='正在等待 DSH 加载完成…';report('waiting');}
}
function setReady(ready){
 mainReady=ready===true;
 if(!mainReady||!waiting||stopped)return;
 waiting=false;status.textContent='DSH 已就绪，继续播放启动动画…';
 // Resume the existing video: no src change, load(), seek or second playback cycle.
 video.play().then(()=>report('playing')).catch(failed);
}
window.fairyStartup.onMainReady(setReady);
async function apply(settings){
 if(initialized||stopped)return;initialized=true;
 // An event may have arrived while the initial IPC request was in flight.
 mainReady=mainReady||settings.mainReady===true;
 video.loop=false;video.muted=settings.muted!==false;video.defaultPlaybackRate=settings.speed||1;video.playbackRate=settings.speed||1;
 video.src=settings.url;fallback.hidden=true;status.textContent='正在启动 Fairy，约第 5 秒等待 DSH 就绪…';
 try{await video.play();if(!stopped&&!waiting)report('playing')}catch{failed()}
 if(typeof video.requestVideoFrameCallback==='function'){
  const frame=()=>{checkCheckpoint();if(!stopped&&!checkpointPassed)video.requestVideoFrameCallback(frame)};
  video.requestVideoFrameCallback(frame);
 }
}
video.addEventListener('timeupdate',checkCheckpoint);
video.addEventListener('ended',()=>{
 if(completed||stopped)return;completed=true;stopped=true;video.pause();
 // Preserve the final decoded frame in the unlikely event readiness is revoked.
 status.textContent='动画已播放完，正在进入 DSH…';
 window.fairyStartup.finished('ended').catch(()=>{});
});
video.addEventListener('error',failed);
video.addEventListener('loadedmetadata',()=>{if(!video.error)fallback.hidden=true;});
skip.addEventListener('click',()=>{if(stopped)return;stopped=true;waiting=false;video.pause();status.textContent='动画已跳过，正在等待 DSH 准备就绪…';window.fairyStartup.dismiss().catch(()=>{});});
window.addEventListener('keydown',e=>{if(e.key==='Escape')skip.click()});
window.fairyStartup.get().then(apply).catch(failed);
