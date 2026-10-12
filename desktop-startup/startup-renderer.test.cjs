const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),{test}=require('node:test');
function harness(settings={}){
 const listeners={},calls={play:0,src:0,finish:[],state:[],dismiss:0},elements={};let ready;
 const video={currentTime:0,paused:true,loop:true,addEventListener:(n,f)=>listeners[n]=f,pause(){this.paused=true},play(){calls.play++;this.paused=false;return Promise.resolve()}};
 Object.defineProperty(video,'src',{set(v){calls.src++;calls.url=v}});
 elements.animation=video;elements.status={};elements.fallback={};elements.skip={addEventListener:(n,f)=>listeners.skip=f,click:()=>listeners.skip()};
 const window={addEventListener(){},fairyStartup:{get:()=>Promise.resolve({url:'file:///video.mp4',...settings}),onMainReady:f=>ready=f,finished:r=>{calls.finish.push(r);return Promise.resolve()},dismiss:()=>{calls.dismiss++;return Promise.resolve()},playbackState:s=>{calls.state.push(s);return Promise.resolve()}}};
 vm.runInNewContext(fs.readFileSync(__dirname+'/startup.js','utf8'),{window,document:{getElementById:n=>elements[n]}});
 return {video,calls,ready:r=>ready(r),tick:t=>{video.currentTime=t;listeners.timeupdate()},skip:()=>listeners.skip(),end:()=>listeners.ended(),fail:()=>listeners.error()};
}
const flush=()=>new Promise(r=>setImmediate(r));
test('wait at five seconds then resume without resetting the source or replaying',async()=>{const h=harness();await flush();h.tick(4.99);assert.equal(h.video.paused,false);h.tick(5.01);assert.equal(h.video.paused,true);h.tick(5.01);assert.deepEqual(h.calls.state,['playing','waiting']);h.ready(true);await flush();assert.equal(h.video.currentTime,5.01);assert.equal(h.video.paused,false);h.ready(true);h.tick(8);h.end();h.end();h.ready(true);assert.equal(h.calls.play,2);assert.equal(h.calls.src,1);assert.deepEqual(h.calls.finish,['ended']);assert.equal(h.video.loop,false)});
test('early readiness plays straight through',async()=>{const h=harness({mainReady:true});await flush();h.tick(5.05);assert.equal(h.video.paused,false);h.end();assert.equal(h.calls.play,1);assert.deepEqual(h.calls.finish,['ended'])});
test('readiness arriving before data reply is not lost',async()=>{const h=harness({mainReady:false});h.ready(true);await flush();h.tick(5);assert.equal(h.video.paused,false)});
test('skip during wait cannot be restarted by readiness',async()=>{const h=harness();await flush();h.tick(5);h.skip();h.ready(true);await flush();assert.equal(h.video.paused,true);assert.equal(h.calls.play,1);assert.equal(h.calls.dismiss,1);h.end();assert.deepEqual(h.calls.finish,[])});
test('error releases playback gate only once',async()=>{const h=harness();await flush();h.fail();h.fail();h.ready(true);assert.deepEqual(h.calls.finish,['failed']);assert.equal(h.video.paused,true)});
test('no artificial pause after readiness arrives before checkpoint',async()=>{const h=harness();await flush();h.ready(true);h.tick(5.02);assert.equal(h.video.paused,false);assert.equal(h.calls.play,1)});
test('skip before data reply never starts the video',async()=>{const h=harness();h.skip();await flush();assert.equal(h.calls.play,0);assert.equal(h.calls.src,0)});
