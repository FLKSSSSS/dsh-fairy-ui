function make(tag='div'){
 const node={tag,style:{},attrs:{},children:[],listeners:{},hidden:false,
 append(...nodes){for(const n of nodes){if(n.parent)n.parent.children=n.parent.children.filter(x=>x!==n);this.children.push(n);n.parent=this}},
 setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},
 addEventListener(k,f){this.listeners[k]=f},removeEventListener(k){delete this.listeners[k]},
 remove(){if(this.parent)this.parent.children=this.parent.children.filter(n=>n!==this)},focus(){this.focused=true},
 click(){this.onclick?.();this.listeners.click?.()},
 querySelectorAll(tag){return this.children.flatMap(n=>[...(n.tag===tag?[n]:[]),...n.querySelectorAll(tag)])}};
 return node;
}
function clock(){let time=0,next=1;const timers=new Map();return {setTimeout(fn,ms){const id=next++;timers.set(id,{fn,at:time+ms});return id},clearTimeout(id){timers.delete(id)},advance(ms){const end=time+ms;for(;;){const due=[...timers].filter(([,v])=>v.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!due)break;time=due[1].at;timers.delete(due[0]);due[1].fn()}time=end},get count(){return timers.size}}}
function find(root,name){return root.className===name?root:root.children.map(n=>find(n,name)).find(Boolean)}
module.exports={make,clock,find};
