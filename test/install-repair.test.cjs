'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), os = require('node:os'), crypto = require('node:crypto'), zlib = require('node:zlib');
const { installPlugin, planInstallation, readArchive } = require('../install-plugin.cjs');
const { removePlugin } = require('../remove-plugin.cjs');
const YAML = require('../yaml.cjs');
const archive = path.resolve(__dirname, '../dsh-fairy-ui-1.4.2.tgz');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fairy-install-test-'));
  t.after(() => { const absolute = fs.realpathSync(root), parent = fs.realpathSync(os.tmpdir()); assert.equal(path.dirname(absolute).toLowerCase(), parent.toLowerCase()); assert.ok(path.basename(absolute).startsWith('fairy-install-test-')); fs.rmSync(absolute, { recursive: true, force: true }); });
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ name: 'fixture', private: true, dependencies: { 'billion-context': '0.1.197', other: 'non-existent-version', 'dsh-fairy-ui': 'file:obsolete.tgz' }, dsh: { profile: { bundles: ['other', 'billion-context', 'dsh-fairy-ui'] } }, secret: 'dummy-only', voice: { model: 'keep' } }, null, 2));
  fs.writeFileSync(path.join(root, 'cordis.patch.yml'), '# keep this comment\n- id: other\n  name: other\n  config:\n    choices:\n      - name: dsh-fairy-ui\n        enabled: false\n- id: fairy-visual\n  name: dsh-fairy-ui\n  enabled: false\n  config:\n    theme: light\n');
  fs.writeFileSync(path.join(root, 'cordis.yml'), '- insert:\n    - id: native\n      name: native\n');
  fs.writeFileSync(path.join(root, 'pnpm-lock.yaml'), "lockfileVersion: '9.0'\nimporters:\n  .:\n    dependencies:\n      billion-context:\n        specifier: 0.1.197\n        version: 0.1.197\n      dsh-fairy-ui:\n        specifier: file:obsolete.tgz\n        version: file:obsolete.tgz\nsnapshots:\n  shared: {}\n");
  fs.writeFileSync(path.join(root, 'pnpm-workspace.yaml'), 'minimumReleaseAge: 60\n');
  fs.writeFileSync(path.join(root, 'voice-session-sentinel.txt'), 'keep');
  fs.mkdirSync(path.join(root, 'node_modules/dsh-fairy-ui'), { recursive: true });
  fs.writeFileSync(path.join(root, 'node_modules/dsh-fairy-ui/package.json'), '{"name":"dsh-fairy-ui","version":"1.4.1"}');
  return root;
}
function patcher(installed = false, fail = false) {
  let state = installed;
  return { validate: () => ({ stateData: state ? { version: '1.4.2' } : null }), install: () => { if (fail) throw Error('fake native failure'); state = true; }, restore: () => { state = false; }, get installed() { return state; } };
}
function options(p = patcher()) { return { host: 'fake-test-only', patcher: p }; }
function read(root, name) { return fs.readFileSync(path.join(root, name)); }
function files(root) { return Object.fromEntries(['package.json', 'cordis.yml', 'cordis.patch.yml', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'voice-session-sentinel.txt', 'node_modules/dsh-fairy-ui/package.json'].map(n => [n, read(root, n)])); }
function sameFiles(root, before) { for (const [name, bytes] of Object.entries(before)) assert.deepEqual(read(root, name), bytes); }
test('published tar includes all dependencies and exactly 444 safe files', () => { assert.equal(readArchive(archive).entries.length, 444); });
test('installs Fairy while preserving unavailable billion-context and other user configuration', t => {
  const root = fixture(t), original = JSON.parse(read(root, 'package.json')), native = patcher();
  const result = installPlugin(root, archive, options(native)), actual = JSON.parse(read(root, 'package.json'));
  assert.equal(result.installed, true); assert.equal(native.installed, true); assert.ok(result.backup);
  assert.equal(actual.dependencies['billion-context'], '0.1.197'); assert.equal(actual.dependencies.other, 'non-existent-version');
  assert.deepEqual(actual.voice, original.voice); assert.equal(actual.secret, original.secret);
  assert.deepEqual(actual.dsh.profile.bundles, original.dsh.profile.bundles);
  assert.ok(fs.existsSync(path.resolve(root, actual.dependencies['dsh-fairy-ui'].slice(5))));
  assert.equal(JSON.parse(read(root, 'node_modules/dsh-fairy-ui/package.json')).version, '1.4.2');
  assert.equal(JSON.parse(fs.readFileSync(path.join(result.backup, 'previous-package/package.json'))).version, '1.4.1');
  assert.equal(read(root, 'voice-session-sentinel.txt').toString(), 'keep');
  assert.equal(read(root, 'pnpm-workspace.yaml').toString(), 'minimumReleaseAge: 60\n');
});
test('disabled Fairy override is enabled without rewriting its settings or nested user data', t => {
  const root = fixture(t); installPlugin(root, archive, options());
  const text = read(root, 'cordis.patch.yml').toString(), rows = YAML.parse(text);
  assert.equal(rows[1].enabled, true); assert.deepEqual(rows[1].config, { theme: 'light' });
  assert.equal(rows[0].config.choices[0].enabled, false); assert.ok(text.startsWith('# keep this comment'));
});
test('lockfile drops only stale Fairy importer and preserves all other dependency snapshots', t => {
  const root = fixture(t), expected = YAML.parse(read(root, 'pnpm-lock.yaml').toString());
  delete expected.importers['.'].dependencies['dsh-fairy-ui'];
  installPlugin(root, archive, options()); assert.deepEqual(YAML.parse(read(root, 'pnpm-lock.yaml').toString()), expected);
});
test('fresh profile without lockfile or node_modules is supported', t => {
  const root = fixture(t); fs.unlinkSync(path.join(root, 'pnpm-lock.yaml'));
  fs.renameSync(path.join(root, 'node_modules'), path.join(root, 'old-fixture-modules'));
  const manifest = JSON.parse(read(root, 'package.json')); delete manifest.dependencies['dsh-fairy-ui']; manifest.dsh.profile.bundles = ['other'];
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(manifest));
  installPlugin(root, archive, options()); assert.equal(fs.existsSync(path.join(root, 'pnpm-lock.yaml')), false); assert.equal(planInstallation(root).plans.length, 0);
});
test('repeating installation does not create another backup or change config', t => {
  const root = fixture(t), p = patcher(); installPlugin(root, archive, options(p)); const before = files(root), dirs = fs.readdirSync(path.join(root, '.fairy-install-backups'));
  const again = installPlugin(root, archive, options(p)); assert.equal(again.alreadyInstalled, true); sameFiles(root, before);
  assert.deepEqual(fs.readdirSync(path.join(root, '.fairy-install-backups')), dirs);
});
test('write failure rolls back old plugin, config, local archive and newly patched host', t => {
  const root = fixture(t), before = files(root), p = patcher();
  assert.throws(() => installPlugin(root, archive, { ...options(p), beforeWrite: name => { if (name === 'cordis.patch.yml') throw Error('injected failure'); } }), /rolled back/);
  sameFiles(root, before); assert.equal(p.installed, false); assert.equal(fs.readdirSync(path.join(root, '.fairy-local-packages')).length, 0);
});
test('rollback retains a native startup that was already installed', t => {
  const root = fixture(t), before = files(root), p = patcher(true);
  assert.throws(() => installPlugin(root, archive, { ...options(p), beforeWrite: () => { throw Error('injected failure'); } }), /rolled back/);
  sameFiles(root, before); assert.equal(p.installed, true);
});
test('native patch failure leaves profile and plugin unchanged', t => {
  const root = fixture(t), before = files(root), p = patcher(false, true);
  assert.throws(() => installPlugin(root, archive, options(p)), /fake native failure/); sameFiles(root, before); assert.equal(p.installed, false);
});
test('bad archive checksum stops before backups and edits', t => {
  const root = fixture(t), before = files(root), bad = path.join(root, 'bad.tgz'); fs.writeFileSync(bad, 'bad');
  assert.throws(() => installPlugin(root, bad, options()), /checksum mismatch/); sameFiles(root, before); assert.equal(fs.existsSync(path.join(root, '.fairy-install-backups')), false);
});
test('invalid YAML duplicate keys stops before any edits', t => {
  const root = fixture(t); fs.writeFileSync(path.join(root, 'cordis.patch.yml'), 'a: 1\na: 2\n'); const before = files(root);
  assert.throws(() => installPlugin(root, archive, options()), /Cannot safely parse/); sameFiles(root, before);
});
test('concurrent configuration changes stop before changing native startup', t => {
  const root = fixture(t), p = patcher();
  assert.throws(() => installPlugin(root, archive, { ...options(p), beforeCommit: () => fs.appendFileSync(path.join(root, 'cordis.patch.yml'), '# other writer\n') }), /changed concurrently/);
  assert.equal(p.installed, false); assert.ok(read(root, 'cordis.patch.yml').toString().endsWith('# other writer\n'));
  assert.equal(JSON.parse(read(root, 'node_modules/dsh-fairy-ui/package.json')).version, '1.4.1');
});
test('junction node_modules and backup parents are refused', t => {
  for (const name of ['node_modules', '.fairy-install-backups', '.fairy-local-packages']) {
    const root = fixture(t), target = path.join(root, 'external'); fs.mkdirSync(target);
    if (fs.existsSync(path.join(root, name))) fs.renameSync(path.join(root, name), path.join(root, 'saved-modules'));
    fs.symlinkSync(target, path.join(root, name), 'junction'); assert.throws(() => planInstallation(root), /linked/); assert.deepEqual(fs.readdirSync(target), []);
  }
});
test('existing module junction is quarantined without editing its external target', t => {
  const root = fixture(t), target = path.join(root, 'external-module'), module = path.join(root, 'node_modules/dsh-fairy-ui');
  fs.renameSync(module, target); fs.symlinkSync(target, module, 'junction'); installPlugin(root, archive, options());
  assert.equal(JSON.parse(fs.readFileSync(path.join(target, 'package.json'))).version, '1.4.1');
  assert.equal(JSON.parse(read(root, 'node_modules/dsh-fairy-ui/package.json')).version, '1.4.2');
});
test('JSON BOM and CRLF preserved', t => {
  const root = fixture(t); fs.writeFileSync(path.join(root, 'package.json'), '\uFEFF' + read(root, 'package.json').toString().replace(/\n/g, '\r\n'));
  installPlugin(root, archive, options()); const bytes = read(root, 'package.json'); assert.deepEqual(bytes.subarray(0, 3), Buffer.from([239, 187, 191])); assert.ok(bytes.toString().includes('\r\n'));
});
test('offline uninstall works after repaired install without touching other plugins', t => {
  const root = fixture(t); installPlugin(root, archive, options()); const result = removePlugin(root);
  assert.equal(result.removed, true); const manifest = JSON.parse(read(root, 'package.json'));
  assert.equal(manifest.dependencies['billion-context'], '0.1.197'); assert.equal(manifest.dependencies['dsh-fairy-ui'], undefined); assert.equal(fs.existsSync(path.join(root, 'node_modules/dsh-fairy-ui')), false);
});
function tarEntry(name, contents, type = '0') {
  const header = Buffer.alloc(512); header.write(name, 0); header.write('0000644\0', 100); header.write('0000000\0', 108); header.write('0000000\0', 116);
  header.write(contents.length.toString(8).padStart(11, '0') + '\0', 124); header.fill(32, 148, 156); header.write(type, 156);
  const sum = header.reduce((a, b) => a + b, 0); header.write(sum.toString(8).padStart(6, '0') + '\0 ', 148);
  return Buffer.concat([header, contents, Buffer.alloc((512 - contents.length % 512) % 512)]);
}
test('tar paths, links, duplicates and malformed package identity rejected', t => {
  const root = fixture(t), manifest = Buffer.from('{"name":"dsh-fairy-ui","version":"1.4.2"}');
  for (const [name, type, error] of [['package/../../escape', '0', /Unsafe/], ['package/CON.txt', '0', /Unsafe/], ['package/x:y', '0', /Unsafe/], ['package/link', '2', /Unsupported/]]) {
    const bytes = zlib.gzipSync(Buffer.concat([tarEntry(name, Buffer.from('x'), type), Buffer.alloc(1024)])), file = path.join(root, 'test.tgz'); fs.writeFileSync(file, bytes);
    assert.throws(() => readArchive(file, hash(bytes)), error);
  }
  const bytes = zlib.gzipSync(Buffer.concat([tarEntry('package/package.json', manifest), tarEntry('package/PACKAGE.json', manifest), Buffer.alloc(1024)])), file = path.join(root, 'test.tgz'); fs.writeFileSync(file, bytes);
  assert.throws(() => readArchive(file, hash(bytes)), /Duplicate/);
});

test('PowerShell entry explicitly loads the system Utility module under Desktop edition', () => {
 const script = fs.readFileSync(path.join(__dirname, '../install-plugin.ps1'), 'utf8');
 assert.ok(script.startsWith('\uFEFF'));
 assert.match(script, /PSEdition -eq 'Desktop'/);
 assert.match(script, /Import-Module \(Join-Path \$PSHOME 'Modules\\Microsoft.PowerShell.Utility\\Microsoft.PowerShell.Utility.psd1'\)/);
 assert.ok(script.indexOf('Import-Module') < script.indexOf('$checksums ='));
});
