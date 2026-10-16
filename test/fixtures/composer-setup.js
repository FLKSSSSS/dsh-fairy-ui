injectStyles();
const marker=require_composer_marker_projection(), material=require_composer_material_layer();
const seat=document.querySelector('[data-composer-seat]'),card=document.querySelector('[data-composer-card]'),input=document.querySelector('[data-input-scroll]'),bar=card.parentElement,footer=bar.querySelector('.RlGAzG_dock'),editor=document.querySelector('[data-composer-input]');
let clear=()=>{},layer;
const branch=document.createElement('span');branch.setAttribute('data-gitgraph-chip-anchor','true');branch.style.cssText='position:relative;display:inline-flex';
branch.innerHTML='<div style="position:relative"><button data-gitgraph-chip type="button" aria-label="选择 Git 分支" style="display:flex;align-items:center;gap:4px;border:1px solid #456;color:white;background:#102238;border-radius:7px"><svg width="14" height="14"><path d="M3 1v12M3 7L11 2" stroke="currentColor" fill="none"/></svg><span>feature/a-very-long-branch-name</span></button></div>';
document.querySelector('[data-dsh-fairy-composer-workspace]').append(branch);
const originalParent=branch.parentElement;let branchClicks=0;
branch.querySelector('button').onclick=()=>{branchClicks++;let p=branch.querySelector('[data-gitgraph-popover]');if(p){p.remove();return;}p=document.createElement('div');p.setAttribute('data-gitgraph-popover','true');p.style.cssText='position:absolute;top:100%;background:#102238;color:white;border:1px solid #567;border-radius:8px;padding:12px;box-sizing:border-box';p.innerHTML='<button data-test-branch-option type="button">main</button><div>选择分支 / 新建分支</div>';p.querySelector('button').onclick=()=>{window.branchSelected='main';p.remove()};branch.firstElementChild.append(p)};

window.setup=({height=132,context=true,hero=true,attachments=false,text='',stop=false}={})=>{
 clear();document.querySelectorAll('[data-dsh-fairy-composer-material]').forEach(n=>n.remove());
 for(const name of marker.MARKER_ATTRS)for(const n of document.querySelectorAll('['+name+']'))n.removeAttribute(name);
 seat.setAttribute('data-dsh-fairy-composer-dock','true');seat.style.cssText=`left:0px;width:${innerWidth}px;height:${height}px;--dsh-fairy-composer-height:${height}px`;
 bar.classList.toggle('RlGAzG_hero',hero);
 footer.innerHTML=context?'<span class="_2WTFBq_root"><span style="display:contents"><button type="button" class="_2WTFBq_trigger" aria-label="上下文使用率 21%">◉ 21%</button></span></span>':'';
 document.querySelector('[aria-label="发送消息"],[aria-label="停止生成"]').setAttribute('aria-label',stop?'停止生成':'发送消息');
 editor.textContent=text;document.querySelector('[aria-label="发送消息"],[aria-label="停止生成"]').disabled=!text && !stop;
 const a=document.querySelector('[data-slot="conversation.input.attachments"]');if(a)a.innerHTML=attachments?'<div data-attachment-id="fixture-only" style="height:36px">test.txt</div>':'';
 clear=marker.markControls(card);layer=material.createMaterialLayer(card);material.syncMaterialLayer(layer,input,[a?.firstElementChild]);
 const stack=document.querySelector('[data-dsh-fairy-composer-stack]');
 for(const d of ['left','top','width','height']){const name='--dsh-fairy-composer-hole-contact-'+d;stack.style.setProperty(name,card.style.getPropertyValue(name))}
 window.send=document.querySelector('[aria-label="发送消息"],[aria-label="停止生成"]');window.contextButton=footer.querySelector('button');
 window.clicked=0;send.onclick=()=>{window.clicked++};if(contextButton)contextButton.onclick=()=>{let d=document.getElementById('context-portal');if(d)d.remove();d=document.createElement('div');d.id='context-portal';d.textContent='上下文详情';d.style.cssText='position:fixed;left:30px;top:30px;z-index:999';document.body.append(d)};
 require_composer_branch_position().syncBranchGeometry(seat,card);
 return window.inspect();
};
window.inspect=()=>{
 const rect=n=>n?.getBoundingClientRect().toJSON();const s=rect(send);const hit=document.elementFromPoint(s.x+s.width/2,s.y+s.height/2);const c=rect(contextButton),ch=c&&document.elementFromPoint(c.x+c.width/2,c.y+c.height/2);
 const at={};for(const [k,sel]of Object.entries({voice:'[data-dsh-fairy-composer-voice-control]',scale:'[data-dsh-fairy-mascot-scale-base]',speed:'[data-dsh-fairy-mascot-animation-speed-base]',command:'[data-dsh-fairy-composer-command-control]',model:'[data-dsh-fairy-composer-model-toolbar]',workspace:'[data-dsh-fairy-composer-workspace-control]',mode:'[data-dsh-fairy-composer-mode-control]',access:'[data-dsh-fairy-composer-access-control]'})){const n=document.querySelector(sel);at[k]=n?{...rect(n),display:getComputedStyle(n).display}:null}
 return{width:innerWidth,height:innerHeight,seat:rect(seat),card:rect(card),input:rect(input),send:s,context:c,sendHit:send.contains(hit),contextHit:!!contextButton&&contextButton.contains(ch),hit:hit?.outerHTML.slice(0,150),sendPointer:getComputedStyle(send).pointerEvents,at};
};

const baseInspect=window.inspect;
window.inspect=()=>{const r=baseInspect(),rect=n=>n?.getBoundingClientRect().toJSON();const button=branch.querySelector('[data-gitgraph-chip]');const b=rect(button),h=document.elementFromPoint(b.x+b.width/2,b.y+b.height/2);return {...r,branch:b,branchHit:button.contains(h),branchParentPreserved:branch.parentElement===originalParent,branchMisclassified:!!button.closest('[data-dsh-fairy-composer-mode-control]'),branchClicks,menu:rect(branch.querySelector('[data-gitgraph-popover]')),toolbarParts:[...document.querySelectorAll('[data-dsh-fairy-composer-toolbar-part]')].map(n=>({part:n.getAttribute('data-dsh-fairy-composer-toolbar-part'),...rect(n)}))}}
