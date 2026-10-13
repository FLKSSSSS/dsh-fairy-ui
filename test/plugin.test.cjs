const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const http = require('node:http');
const { pathToFileURL } = require('node:url');
const { INSTALL_PROMPT, findActiveSessionId, fillInstallPrompt } = require('../lib/install-voice-prompt.cjs');
const root = path.resolve(__dirname, '..');
function context(draft = '') {
 const shell = { snapshot: { draft }, calls: [], setDraft(value) { this.calls.push(value); this.snapshot.draft = value; } };
 return { shell, sessions: { list: { getSnapshot: () => ({ byId: { a: { id: 'a', retainedBy: { mainView: 1 } } } }) } }, conversation: { input: { shell(id) { assert.equal(id, 'a'); return shell; } }, send() { throw Error('Must never send automatically'); } } };
}
test('finds retained main-view session, not unrelated session', () => {
 const sessions = { list: { getSnapshot: () => ({ byId: { other: { id: 'other', retainedBy: { subagent: 1 } }, main: { id: 'main', retainedBy: { mainView: 1 } } } }) } };
 assert.equal(findActiveSessionId(sessions), 'main');
});
test('supports older current selector fallback', () => assert.equal(findActiveSessionId({ list: { getSnapshot: () => ({ current: 'legacy' }) } }), 'legacy'));
test('fills empty draft through DSH input API without sending', () => { const ctx = context(); assert.equal(fillInstallPrompt(ctx).inserted, true); assert.equal(ctx.shell.snapshot.draft, INSTALL_PROMPT); });
test('preserves an existing text draft', () => { const ctx = context('保留草稿\n第二行'); assert.equal(fillInstallPrompt(ctx).preservedDraft, true); assert.equal(ctx.shell.snapshot.draft, '保留草稿\n第二行\n\n' + INSTALL_PROMPT); });
test('does not duplicate prompt on a repeat click', () => { const ctx = context(); fillInstallPrompt(ctx); assert.equal(fillInstallPrompt(ctx).inserted, false); assert.equal(ctx.shell.calls.length, 1); });
test('supports state snapshot face', () => { const ctx = context(); delete ctx.shell.snapshot; ctx.shell.state = { getSnapshot: () => ({ draft: '已有草稿' }) }; ctx.shell.setDraft = value => ctx.shell.calls.push(value); fillInstallPrompt(ctx); assert.equal(ctx.shell.calls[0], '已有草稿\n\n' + INSTALL_PROMPT); });
test('no session fails safely without switching or creating sessions', () => { const ctx = context(); ctx.sessions.list.getSnapshot = () => ({ byId: {} }); assert.throws(() => fillInstallPrompt(ctx), /选择一个工作区/); assert.equal(ctx.shell.calls.length, 0); });
test('unsupported input API fails with explicit copy fallback', () => { const ctx = context(); delete ctx.conversation.input; assert.throws(() => fillInstallPrompt(ctx), /复制安装提示词/); });
test('prompt protects native model, persona, credentials and approvals', () => { for (const word of ['app.asar','角色预设','会话历史','审批策略','不伪造地址','32000 Hz','127.0.0.1:9880','只管理自己记录']) assert.ok(INSTALL_PROMPT.includes(word), word); });
test('bundle is a single additive UI plugin with no base overrides', () => {
 const patch = fs.readFileSync(path.join(root, 'cordis.patch.yml'), 'utf8');
 assert.equal((patch.match(/- id:/g)||[]).length, 1); assert.match(patch, /name: dsh-fairy-ui/);
 for (const forbidden of ['fairy-identity','agent-preset','sandbox-policy','permission','system-prompt','approval','fairy-startup']) assert.ok(!patch.includes(forbidden), forbidden);
});
test('browser bundle parses and has only declared browser imports', () => {
 const source = fs.readFileSync(path.join(root, 'lib/client.js'), 'utf8'); new vm.Script(source);
 const imports = [...source.matchAll(/require\(['"]([^'"]+)/g)].map(m => m[1]);
 assert.deepEqual([...new Set(imports)].sort(), ['@deepseek-ai/dsh-client-ui-primitives', 'react', 'react/jsx-runtime']);
 assert.ok(!source.includes('ctx.configForms.get(IDENTITY_SETTINGS_NAMESPACE)'));
 assert.ok(!source.includes('Fairy 当前将我识别为'));
 assert.ok(source.includes("localStorage.getItem(SETTINGS_AUTO) === 'true'"));
});
test('all dependencies are bundled with package manifests and no links', () => {
 const manifest = require('../package.json');
 for (const [name,version] of Object.entries(manifest.dependencies)) { const dir=path.join(root,'node_modules',name); assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'package.json'),'utf8')).version, version); assert.ok(!fs.lstatSync(dir).isSymbolicLink()); assert.ok(manifest.bundledDependencies.includes(name)); }
});
test('reference audio seed does not overwrite user files', async () => {
 const temp = fs.mkdtempSync(path.join(os.tmpdir(),'fairy-ui-test-'));const before=process.env.DSH_HOME;process.env.DSH_HOME=temp;
 try { const {seedReferenceAudio}=await import(pathToFileURL(path.join(root,'lib/seed-reference.js')));seedReferenceAudio(); const target=path.join(temp,'fairy-voice-data/runtime/reference/fairy_ref.txt');assert.ok(fs.existsSync(target));fs.writeFileSync(target,'我的参考文本');seedReferenceAudio();assert.equal(fs.readFileSync(target,'utf8'),'我的参考文本'); }
 finally { if(before===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=before;fs.rmSync(temp,{recursive:true,force:true}); }
});
test('startup video supports HTTP ranges and rejects invalid requests', async () => {
 const {startupVideoHandler}=await import(pathToFileURL(path.join(root,'lib/startup-asset.js')));
 const server=http.createServer(startupVideoHandler);await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
 try {
  let r=await fetch(url,{method:'HEAD'});assert.equal(r.status,200);assert.equal(+r.headers.get('content-length'),fs.statSync(path.join(root,'media/startup-default.mp4')).size);
  r=await fetch(url,{headers:{Range:'bytes=0-99'}});assert.equal(r.status,206);assert.equal((await r.arrayBuffer()).byteLength,100);
  r=await fetch(url,{headers:{Range:'bytes=-10'}});assert.equal(r.status,206);assert.equal((await r.arrayBuffer()).byteLength,10);
  r=await fetch(url,{headers:{Range:'bytes=999999999-'}});assert.equal(r.status,416);
  r=await fetch(url,{headers:{Range:'bytes=0-1,3-4'}});assert.equal(r.status,416);
  r=await fetch(url,{method:'POST'});assert.equal(r.status,405);
 } finally {await new Promise(r=>server.close(r));}
});
test('startup transparent image endpoints are restricted local PNGs supporting HEAD/GET',async()=>{const {startupImageHandler}=await import(pathToFileURL(path.join(root,'lib/startup-asset.js')));assert.throws(()=>startupImageHandler('../package.json'));for(const name of ['hdd-mark.png','hdd-wordmark.png']){const server=http.createServer(startupImageHandler(name));await new Promise(r=>server.listen(0,'127.0.0.1',r));try{const url='http://127.0.0.1:'+server.address().port;let r=await fetch(url,{method:'HEAD'});assert.equal(r.status,200);assert.equal(r.headers.get('content-type'),'image/png');r=await fetch(url);assert(Buffer.from(await r.arrayBuffer()).equals(fs.readFileSync(path.join(root,'media',name))));r=await fetch(url,{method:'POST'});assert.equal(r.status,405)}finally{await new Promise(r=>server.close(r))}}});
