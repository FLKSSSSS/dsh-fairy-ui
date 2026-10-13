/* Fairy archive skin: local, video-clock driven, no second playback or synthetic loading.
 * Visual reference: dsh-startup-screen 1.1.0, Copyright (c) 2026 沈宏宏 (MIT).
 * See THIRD-PARTY-NOTICES.txt. */
function mountStartupSkin(root, video, preferences, options={}) {
 if(preferences.variant!=='archive')return {update(){},dispose(){}};
 const css=`
 [data-fairy-startup-style="archive"]{--paper:#e5e3df;--ink:#111313;--muted:#777872;--hair:rgba(17,19,19,.22);--accent:#f47721;background:var(--paper)!important;color:var(--ink)!important;font-family:Bahnschrift,"Arial Narrow","Microsoft YaHei",sans-serif;isolation:isolate}
 [data-fairy-startup-style="archive"] *{box-sizing:border-box}
 [data-fairy-startup-style="archive"] .fairy-archive-head{position:absolute;inset:28px 32px auto;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--ink);padding-bottom:14px;gap:16px}
 [data-fairy-startup-style="archive"] .fairy-archive-brand{font-size:18px;font-weight:700;letter-spacing:.16em;display:flex;align-items:center;gap:12px}
 [data-fairy-startup-style="archive"] .fairy-archive-brand:before{content:"";width:11px;height:11px;background:var(--accent);box-shadow:18px 0 0 rgba(17,19,19,.12);margin-right:18px}
 [data-fairy-startup-style="archive"] .fairy-archive-meta{font:10px/1.5 Consolas,"Cascadia Mono",monospace;letter-spacing:.08em;text-align:right;white-space:pre-line;color:var(--muted)}
 [data-fairy-startup-style="archive"] .fairy-archive-side{position:absolute;top:116px;bottom:120px;left:32px;width:246px;display:flex;flex-direction:column;justify-content:space-between}
 [data-fairy-startup-style="archive"] .fairy-archive-kicker{font:11px/1.6 Consolas,monospace;letter-spacing:.1em;border-left:3px solid var(--accent);padding-left:10px;white-space:pre-line}
 [data-fairy-startup-style="archive"] .fairy-archive-title{font-size:clamp(36px,5.9vw,84px);line-height:.95;letter-spacing:-.055em;font-weight:700;margin:25px 0 10px}
 [data-fairy-startup-style="archive"] .fairy-archive-subtitle{font:10px/1.9 Consolas,monospace;letter-spacing:.13em;white-space:pre-line;color:var(--muted)}
 [data-fairy-startup-style="archive"] .fairy-archive-phase{font-size:clamp(23px,3vw,38px);line-height:1.07;letter-spacing:-.02em;font-weight:600;white-space:pre-line;margin:32px 0 10px}
 [data-fairy-startup-style="archive"] .fairy-archive-caption{font:12px/1.7 "Microsoft YaHei",sans-serif;color:#555951;min-height:40px}
 [data-fairy-startup-style="archive"] .fairy-archive-record{border-top:1px solid var(--hair);padding-top:15px;font:10px/2.2 Consolas,monospace;letter-spacing:.03em;color:var(--muted)}
 [data-fairy-startup-style="archive"] .fairy-archive-record b{color:var(--ink);font-weight:400}
 [data-fairy-startup-style="archive"] .fairy-archive-stage{position:absolute;inset:110px 32px 126px 320px;container-type:size;background:#05090d;overflow:hidden;border:1px solid var(--ink);box-shadow:0 0 0 6px var(--paper),0 0 0 7px var(--hair)}
 [data-fairy-startup-style="archive"] .fairy-archive-stage:before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:repeating-linear-gradient(transparent 0 3px,rgba(0,0,0,.065) 3px 4px);opacity:.45}
 [data-fairy-startup-style="archive"] .fairy-archive-frame-label{position:absolute;top:83px;left:320px;right:32px;display:flex;justify-content:space-between;font:10px/1 Consolas,monospace;letter-spacing:.08em;color:var(--muted)}
 [data-fairy-startup-style="archive"] .fairy-archive-frame-label span:last-child{color:var(--ink)}
 [data-fairy-startup-style="archive"] .fairy-archive-reticle{position:absolute;left:50%;top:50%;width:clamp(110px,25cqw,260px);aspect-ratio:1;border:1px solid rgba(227,238,235,.55);border-radius:50%;z-index:2;pointer-events:none;transform:translate(-50%,-50%);opacity:.4}
 [data-fairy-startup-style="archive"] .fairy-archive-reticle:before{content:"";position:absolute;inset:12%;border:1px dashed rgba(244,119,33,.9);border-radius:50%}
 [data-fairy-startup-style="archive"] .fairy-archive-reticle:after{content:"+";position:absolute;inset:0;display:grid;place-content:center;font:24px Consolas,monospace;color:#e5e3df}
 [data-fairy-startup-style="archive"] .fairy-archive-scan{position:absolute;left:0;right:0;top:0;height:1px;background:rgba(244,119,33,.7);box-shadow:0 0 10px #f4772140;z-index:2;pointer-events:none}
 [data-fairy-startup-style="archive"] .fairy-archive-sequence{position:absolute;left:320px;right:32px;bottom:93px;display:flex;align-items:center;gap:18px;font:10px/1 Consolas,monospace;color:var(--muted);letter-spacing:.08em}
 [data-fairy-startup-style="archive"] .fairy-archive-track{flex:1;height:3px;background:rgba(17,19,19,.12);overflow:hidden}
 [data-fairy-startup-style="archive"] .fairy-archive-fill{width:100%;height:100%;background:var(--accent);transform-origin:left;transform:scaleX(0)}
 [data-fairy-startup-style="archive"] footer{position:absolute!important;inset:auto 32px 22px!important;min-height:46px;padding:14px 0 0!important;border-top:1px solid var(--ink);background:none!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:16px;-webkit-app-region:drag}
 [data-fairy-startup-style="archive"] footer strong{color:var(--ink)!important;font:11px/1.2 Consolas,monospace!important;letter-spacing:.1em!important}
 [data-fairy-startup-style="archive"] footer p{font:12px/1.5 "Microsoft YaHei",sans-serif!important;color:#555951!important;margin:5px 0 0!important}
 [data-fairy-startup-style="archive"] footer button{position:static!important;color:var(--ink)!important;background:transparent!important;border:1px solid var(--ink)!important;border-radius:0!important;padding:9px 16px!important;font:11px/1.2 "Microsoft YaHei",sans-serif;white-space:nowrap;cursor:pointer;-webkit-app-region:no-drag}
 [data-fairy-startup-style="archive"] footer button:hover{background:var(--ink)!important;color:var(--paper)!important}
 [data-fairy-startup-style="archive"] footer button:focus-visible{outline:2px solid var(--accent)!important;outline-offset:4px}
 @media(max-width:960px){[data-fairy-startup-style="archive"] .fairy-archive-side{width:184px}[data-fairy-startup-style="archive"] .fairy-archive-stage{left:246px}[data-fairy-startup-style="archive"] .fairy-archive-frame-label,[data-fairy-startup-style="archive"] .fairy-archive-sequence{left:246px}[data-fairy-startup-style="archive"] .fairy-archive-phase{font-size:27px}}
 @media(max-width:680px){[data-fairy-startup-style="archive"] .fairy-archive-head{inset:18px 20px auto}[data-fairy-startup-style="archive"] .fairy-archive-meta{font-size:8px}[data-fairy-startup-style="archive"] .fairy-archive-brand{font-size:13px}[data-fairy-startup-style="archive"] .fairy-archive-side{top:80px;left:20px;right:20px;width:auto;bottom:auto;height:68px;flex-direction:row;align-items:center;gap:18px}[data-fairy-startup-style="archive"] .fairy-archive-kicker,[data-fairy-startup-style="archive"] .fairy-archive-subtitle,[data-fairy-startup-style="archive"] .fairy-archive-record,[data-fairy-startup-style="archive"] .fairy-archive-caption{display:none}[data-fairy-startup-style="archive"] .fairy-archive-title{font-size:44px;margin:0}[data-fairy-startup-style="archive"] .fairy-archive-phase{font-size:20px;margin:0;white-space:normal;max-width:150px;text-align:right}[data-fairy-startup-style="archive"] .fairy-archive-stage{inset:174px 20px 126px}[data-fairy-startup-style="archive"] .fairy-archive-frame-label{top:151px;left:20px;right:20px}[data-fairy-startup-style="archive"] .fairy-archive-sequence{left:20px;right:20px}[data-fairy-startup-style="archive"] footer{left:20px!important;right:20px!important}[data-fairy-startup-style="archive"] footer strong{font-size:9px!important}}
 @media(max-height:540px) and (min-width:681px){[data-fairy-startup-style="archive"] .fairy-archive-side{top:88px;bottom:110px}[data-fairy-startup-style="archive"] .fairy-archive-title{font-size:48px;margin:14px 0 5px}[data-fairy-startup-style="archive"] .fairy-archive-phase{font-size:24px;margin:16px 0 6px}[data-fairy-startup-style="archive"] .fairy-archive-record{display:none}[data-fairy-startup-style="archive"] .fairy-archive-stage{top:94px}[data-fairy-startup-style="archive"] .fairy-archive-frame-label{top:74px}}
 `;
 const nodes=[];
 function element(tag, className, text, parent=root){const n=document.createElement(tag);n.className=className;if(text!==undefined)n.textContent=text;parent.append(n);return n;}
 if(!options.stylesLoaded){const style=element('style','',css);nodes.push(style);}
 root.setAttribute('data-fairy-startup-style','archive');
 const head=element('div','fairy-archive-head');nodes.push(head);head.setAttribute('aria-hidden','true');
 element('div','fairy-archive-brand','FAIRY / HDD',head);element('div','fairy-archive-meta','DEEPSEEK HARNESS\nLOCAL STARTUP INTERFACE / 02',head);
 const side=element('aside','fairy-archive-side');nodes.push(side);side.setAttribute('aria-hidden','true');
 const identity=element('div','',undefined,side);element('div','fairy-archive-kicker','ARTIFICIAL INTELLIGENCE\nPERSONAL ASSISTANT',identity);element('div','fairy-archive-title','FAIRY',identity);element('div','fairy-archive-subtitle','SYNTHESIZE INFORMATION\nHOLLOW DEEP DIVE SYSTEM',identity);
 const phaseGroup=element('div','',undefined,side);const phase=element('div','fairy-archive-phase','INITIALIZING',phaseGroup);const caption=element('div','fairy-archive-caption','正在载入启动影像',phaseGroup);
 const record=element('div','fairy-archive-record',undefined,side);element('div','','01 / VISUAL INTERFACE',record);element('div','','02 / ORIGINAL VOICE SETTINGS',record);const readiness=element('b','','DSH / LOADING',record);
 const label=element('div','fairy-archive-frame-label');nodes.push(label);label.setAttribute('aria-hidden','true');element('span','','FAIRY · VISUAL SEQUENCE',label);const frame=element('span','','FRAME / 0000',label);
 const stage=element('div','fairy-archive-stage');nodes.push(stage);stage.setAttribute('data-fairy-video-stage','true');stage.append(video);const reticle=element('div','fairy-archive-reticle',undefined,stage);reticle.setAttribute('aria-hidden','true');const scan=element('div','fairy-archive-scan',undefined,stage);scan.setAttribute('aria-hidden','true');
 const sequence=element('div','fairy-archive-sequence');nodes.push(sequence);sequence.setAttribute('aria-hidden','true');element('span','','VIDEO SEQUENCE',sequence);const track=element('div','fairy-archive-track',undefined,sequence);const fill=element('div','fairy-archive-fill',undefined,track);const counter=element('span','','000 / 100',sequence);
 let disposed=false;
 function update(time=0,duration=0,ready=false,state='playing'){
  if(disposed)return;
  const p=Number.isFinite(time)&&Number.isFinite(duration)&&duration>0?Math.min(1,Math.max(0,time/duration)):0;
  fill.style.transform=`scaleX(${p})`;counter.textContent=`${String(Math.round(p*100)).padStart(3,'0')} / 100`;frame.textContent=`FRAME / ${String(Math.floor((Number.isFinite(time)?time:0)*30)).padStart(4,'0')}`;
  readiness.textContent=ready?'DSH / READY':'DSH / LOADING';
  const terminal=state==='ended'||state==='skipped'||state==='failed';
  const steps=p<.18?['INITIALIZING','启动序列初始化']:p<.48?['SIGNAL\nSYNC','影像信号同步中']:p<.78?['NEURAL\nINTERFACE','Fairy 视觉接口']:['WELCOME\nBACK','启动影像即将完成'];
  phase.textContent=state==='failed'?'VIDEO\nUNAVAILABLE':state==='skipped'?'SEQUENCE\nSKIPPED':state==='ended'?'WELCOME\nBACK':steps[0];
  caption.textContent=terminal?(ready?'DSH 已就绪':state==='failed'?'影像不可用，DSH 继续加载':'等待 DSH 加载完成'):steps[1];
  reticle.style.opacity=terminal||p>.64?'0':String(.2+Math.sin(p*Math.PI)*.25);reticle.style.transform=`translate(-50%,-50%) rotate(${p*360}deg)`;
  scan.style.top=`${p*100}%`;scan.style.opacity=terminal||p>.78?'0':'0.65';root.setAttribute('data-fairy-sequence-state',state);
 }
 update();
 return {update,dispose(){if(disposed)return;disposed=true;root.append(video);for(const n of nodes)n.remove();root.removeAttribute('data-fairy-startup-style');root.removeAttribute('data-fairy-sequence-state');}};
}
