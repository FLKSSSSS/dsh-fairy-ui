const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const load=()=>import('../lib/fairy-preset.js');
test('Fairy preset keeps source persona and packaged core, adapting only platform and module paths',async()=>{
 const {fairyPresetDefinition}=await load(),a=fairyPresetDefinition('win32'),b=fairyPresetDefinition('linux');
 assert.equal(a.id,'fairy');assert.equal(a.plugins.find(p=>p.id==='tool-bash').disabled,true);assert.equal(a.plugins.find(p=>p.id==='tool-pwsh').disabled,false);assert.equal(b.plugins.find(p=>p.id==='tool-bash').disabled,false);assert.equal(b.plugins.find(p=>p.id==='tool-pwsh').disabled,true);
 const persona=a.plugins.find(p=>p.id==='persona');assert.ok(persona.config.prefix.includes('Ⅲ型'));assert.ok(persona.config.prefix.includes('真实边界'));
 const core=a.plugins.find(p=>p.id==='fairy-core-runtime');assert(core.name.startsWith('file:'));assert.equal(core.config.runtimePath,undefined);assert(fs.existsSync(new URL(core.name)));
 for(const row of a.plugins)assert.ok(!/approval|sandbox-policy|llm-|credential/.test(row.name));
});
test('register adds optional Fairy without selecting it or changing existing presets/defaults',async()=>{
 const {registerFairyPreset}=await load(),state={default:'original',rows:['original'],removed:false};const dispose=await registerFairyPreset({register:async d=>{state.rows.push(d.id);return ()=>{state.removed=true}}});assert.equal(state.default,'original');assert.deepEqual(state.rows,['original','fairy']);dispose();assert.equal(state.removed,true);
});
test('existing Fairy is preserved; unexpected registration errors remain visible',async()=>{
 const {registerFairyPreset}=await load();let warnings=0;const d=await registerFairyPreset({register:async()=>{throw Error('Duplicate agent preset: fairy')}},()=>warnings++);d();assert.equal(warnings,1);await assert.rejects(registerFairyPreset({register:async()=>{throw Error('bad composition')}}),/bad composition/);
});
test('Fairy voice core and safety sections mount and dispose in the selected Agent only',async()=>{
 const {fairyPresetDefinition}=await load(),d=fairyPresetDefinition(),sections=[];const ctx={systemPrompt:{section:s=>{sections.push(s);return ()=>sections.splice(sections.indexOf(s),1)}}};const core=await import(d.plugins.find(p=>p.id==='fairy-core-runtime').name),safety=await import(d.plugins.find(p=>p.id==='fairy-safety-gate').name);const a=await core.apply(ctx),b=await safety.apply(ctx);assert.equal(sections.length,2);assert(sections.some(s=>s.text.includes('两套语域')));a();b();assert.equal(sections.length,0);
});
