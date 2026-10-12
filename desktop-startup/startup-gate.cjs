// Independent two-condition gate, one instance per desktop process launch.
class StartupGate {
 constructor(onEnter){this.onEnter=onEnter;this.playbackDone=false;this.mainReady=false;this.entered=false;this.disposed=false;}
 finishPlayback(){this.playbackDone=true;this.check();}
 ready(){this.mainReady=true;this.check();}
 check(){if(!this.disposed&&!this.entered&&this.playbackDone&&this.mainReady){this.entered=true;this.onEnter();}}
 dispose(){this.disposed=true;}
}
module.exports={StartupGate};
