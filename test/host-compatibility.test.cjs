'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const adapter=require('../desktop-patch.cjs');

test('host allowlist pins both verified versions, not just a version string',()=>{
 assert.deepEqual(adapter.SUPPORTED_HOSTS.map(h=>h.version),['0.2.0-rc.2','0.2.1-rc.2']);
 for(const h of adapter.SUPPORTED_HOSTS){assert.match(h.archiveSha256,/^[a-f0-9]{64}$/);assert.match(h.mainSha256,/^[a-f0-9]{64}$/);assert(Object.isFrozen(h))}
 assert(Object.isFrozen(adapter.SUPPORTED_HOSTS));
 assert.throws(()=>adapter.identifyOriginal(Buffer.from('unknown build')),/Unsupported or modified host/);
 assert.throws(()=>adapter.patchMain(Buffer.from('unknown entry')),/refusing to patch/);
});

// Optional real-archive regression: semicolon-separated ORIGINAL app.asar paths.
// Copies only to an owned temporary host; never mutates these input archives.
const originals=(process.env.FAIRY_COMPAT_ASARS||'').split(';').filter(Boolean);
test('verified original archive fixtures are supplied',{skip:originals.length>0},t=>t.skip('Set FAIRY_COMPAT_ASARS for full dual-build install/restore regression'));
function fixture(t,archive){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'fairy-host-compat-'));
 t.after(()=>{assert.equal(path.dirname(path.resolve(root)).toLowerCase(),path.resolve(os.tmpdir()).toLowerCase());assert(path.basename(root).startsWith('fairy-host-compat-'));fs.rmSync(root,{recursive:true,force:true})});
 fs.mkdirSync(path.join(root,'resources'));
 fs.copyFileSync(archive,path.join(root,'resources/app.asar'));
 // Exercise fuse policy, without distributing any Electron executable in fixtures.
 fs.writeFileSync(path.join(root,'DeepSeek Harness.exe'),Buffer.concat([Buffer.from('dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX'),Buffer.from([1,5,48,48,48,48,48])]));
 return {root,resources:path.join(root,'resources'),asar:path.join(root,'resources/app.asar')};
}
for(const source of originals)test('real archive preserves and restores its own build: '+path.basename(path.dirname(path.dirname(source))),t=>{
 const f=fixture(t,source),original=fs.readFileSync(source),host=adapter.identifyOriginal(original);
 const result=adapter.install(f.root);
 assert.equal(result.hostVersion,host.version);assert.equal(result.originalSha256,host.archiveSha256);
 const before=adapter.parseAsar(original),after=adapter.parseAsar(fs.readFileSync(f.asar));
 assert(after.data.subarray(0,before.data.length).equals(before.data),'all original payload bytes retained');
 function withoutMain(tree){const v=JSON.parse(JSON.stringify(tree));delete v.files.lib.files['main.js'];return v}
 assert.deepEqual(withoutMain(after.tree),withoutMain(before.tree),'all non-main entries and integrity records retained');
 const main=adapter.readEntry(after,'lib/main.js').toString('utf8');
 assert.match(main,/initializeFairyStartup/);
 assert.equal(adapter.install(f.root).alreadyInstalled,true);
 const state=path.join(f.resources,'fairy-ui-startup-state.json'),s=JSON.parse(fs.readFileSync(state));
 // schema-1 states from earlier adapters must still be removable on their own host.
 delete s.hostVersion;s.version='1.4.5';fs.writeFileSync(state,JSON.stringify(s));
 assert.throws(()=>adapter.install(f.root),/Another adapter version/);
 fs.writeFileSync(path.join(f.resources,'fairy-ui-startup/user-owned.txt'),'preserve');
 assert.equal(adapter.restore(f.root).originalSha256,host.archiveSha256);
 assert(fs.readFileSync(f.asar).equals(original));
 assert.equal(fs.readFileSync(path.join(f.resources,'fairy-ui-startup/user-owned.txt'),'utf8'),'preserve');
 assert.equal(fs.existsSync(state),false);
});

if(originals.length>=2)test('stale old-build state never overwrites a newer original archive',t=>{
 const f=fixture(t,originals[0]);adapter.install(f.root);
 fs.copyFileSync(originals[1],f.asar);const before=adapter.sha(fs.readFileSync(f.asar));
 assert.throws(()=>adapter.restore(f.root),/Host changed since installation/);
 assert.throws(()=>adapter.install(f.root),/Host changed since installation/);
 assert.equal(adapter.sha(fs.readFileSync(f.asar)),before);
 const backup=path.join(f.resources,'app.asar.fairy-ui-original');fs.appendFileSync(backup,'corrupt');
 assert.throws(()=>adapter.validate(f.root),/Invalid startup backup/);
 assert.equal(adapter.sha(fs.readFileSync(f.asar)),before);
});

if(originals.length)test('unknown and integrity-enforcing hosts are rejected without writes',t=>{
 const f=fixture(t,originals[0]);
 const exe=path.join(f.root,'DeepSeek Harness.exe'),bytes=fs.readFileSync(exe);bytes[bytes.length-1]=49;fs.writeFileSync(exe,bytes);
 const originalHash=adapter.sha(fs.readFileSync(f.asar));
 assert.throws(()=>adapter.install(f.root),/Embedded ASAR validation is enabled/);
 assert.equal(adapter.sha(fs.readFileSync(f.asar)),originalHash);
 bytes[bytes.length-1]=48;fs.writeFileSync(exe,bytes);fs.appendFileSync(f.asar,'unknown build');
 const changedHash=adapter.sha(fs.readFileSync(f.asar));
 assert.throws(()=>adapter.install(f.root),/Unsupported or modified host/);
 assert.equal(adapter.sha(fs.readFileSync(f.asar)),changedHash);
 assert.deepEqual(fs.readdirSync(f.resources),['app.asar']);
});
