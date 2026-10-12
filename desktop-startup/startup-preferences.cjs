'use strict';
function normalizeStartupPreferences(v={}) {
 if(!v||typeof v!=='object')v={};
 return {enabled:v.enabled!==false,muted:v.muted!==false,speed:[0.5,1,1.5,2].includes(v.speed)?v.speed:1,
  aspectRatio:['auto','16:9','16:10','4:3','1:1'].includes(v.aspectRatio)?v.aspectRatio:'auto',
  scale:typeof v.scale==='number'&&Number.isFinite(v.scale)?Math.max(50,Math.min(150,Math.round(v.scale))):100,
  fit:v.fit==='contain'?'contain':'cover'};
}
module.exports={normalizeStartupPreferences};
