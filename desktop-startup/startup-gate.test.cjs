const test=require('node:test');const assert=require('node:assert/strict');const {StartupGate}=require('../desktop-startup/startup-gate.cjs');
test('startup gate waits for playback and renderer in either order',()=>{for(const order of [["play","ready"],["ready","play"]]){let n=0;const g=new StartupGate(()=>n++);for(const x of order)x==='play'?g.finishPlayback():g.ready();assert.equal(n,1);g.finishPlayback();g.ready();assert.equal(n,1)}});
test('startup gate disposes without entering',()=>{let n=0;const g=new StartupGate(()=>n++);g.dispose();g.finishPlayback();g.ready();assert.equal(n,0)});
