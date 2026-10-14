'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { removePlugin, planRemoval } = require('../remove-plugin.cjs');
const YAML = require('../yaml.cjs');
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fairy-remove-test-'));
  t.after(() => { assert.ok(root.startsWith(path.join(os.tmpdir(), 'fairy-remove-test-'))); fs.rmSync(root, { recursive: true, force: true }); });
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ name: 'desktop-profile', dependencies: { 'dsh-fairy-ui': 'file:Fairy.tgz', 'billion-context': '0.1.186', other: 'bad-version' }, devDependencies: { 'dsh-fairy-ui': '1.4.1', dev: '1' }, dsh: { profile: { bundles: ['other', 'dsh-fairy-ui', 'billion-context'] } }, userSetting: { voice: { model: 'keep', secret: 'dummy-fixture-only' } } }, null, 2));
  fs.writeFileSync(path.join(root, 'cordis.patch.yml'), '# preserve comment\n- id: other\n  name: other\n  config:\n    text: "dsh-fairy-ui in user text must stay"\n- id: fairy-visual\n  name: dsh-fairy-ui\n  config:\n    enabled: false\n- id: voice\n  name: dsh-voice\n  config:\n    speed: 1.25\n');
  fs.writeFileSync(path.join(root, 'cordis.yml'), '- insert:\n    - id: fairy-visual\n      name: dsh-fairy-ui\n    - id: native\n      name: native\n');
  fs.writeFileSync(path.join(root, 'pnpm-lock.yaml'), "lockfileVersion: '9.0'\nimporters:\n  .:\n    dependencies:\n      dsh-fairy-ui:\n        specifier: file:Fairy.tgz\n        version: file:Fairy.tgz\n      billion-context:\n        specifier: 0.1.186\n        version: 0.1.186\npackages:\n  billion-context@0.1.186:\n    resolution: {integrity: keep-exact}\n");
  fs.mkdirSync(path.join(root, 'node_modules/dsh-fairy-ui'), { recursive: true });
  fs.writeFileSync(path.join(root, 'node_modules/dsh-fairy-ui/package.json'), '{"name":"dsh-fairy-ui","version":"1.4.1"}');
  fs.mkdirSync(path.join(root, 'node_modules/other'));
  fs.writeFileSync(path.join(root, 'node_modules/other/keep.txt'), 'keep');
  fs.writeFileSync(path.join(root, 'sessions-sentinel.txt'), 'never touch sessions');
  return root;
}
const read = (root, name) => fs.readFileSync(path.join(root, name));
test('offline removal ignores unresolvable unrelated packages, removes only Fairy and backs up original files', t => {
  const root = fixture(t), originals = Object.fromEntries(['package.json', 'cordis.yml', 'cordis.patch.yml', 'pnpm-lock.yaml'].map(n => [n, read(root, n)]));
  const result = removePlugin(root);
  assert.equal(result.removed, true);
  for (const [n, bytes] of Object.entries(originals)) assert.deepEqual(fs.readFileSync(path.join(result.backup, n)), bytes);
  const manifest = JSON.parse(read(root, 'package.json'));
  assert.equal(manifest.dependencies['dsh-fairy-ui'], undefined);
  assert.equal(manifest.devDependencies['dsh-fairy-ui'], undefined);
  assert.equal(manifest.dependencies['billion-context'], '0.1.186');
  assert.equal(manifest.dependencies.other, 'bad-version');
  assert.deepEqual(manifest.dsh.profile.bundles, ['other', 'billion-context']);
  assert.deepEqual(manifest.userSetting, JSON.parse(originals['package.json']).userSetting);
  assert.deepEqual(YAML.parse(read(root, 'cordis.patch.yml').toString()), YAML.parse(originals['cordis.patch.yml'].toString()).filter(x => x.name !== 'dsh-fairy-ui'));
  assert.ok(read(root, 'cordis.patch.yml').toString().includes('# preserve comment'));
  const lock = YAML.parse(read(root, 'pnpm-lock.yaml').toString());
  assert.equal(lock.importers['.'].dependencies['dsh-fairy-ui'], undefined);
  assert.deepEqual(lock.packages, YAML.parse(originals['pnpm-lock.yaml'].toString()).packages);
  assert.equal(read(root, 'sessions-sentinel.txt').toString(), 'never touch sessions');
  assert.equal(read(root, 'node_modules/other/keep.txt').toString(), 'keep');
  assert.ok(fs.existsSync(path.join(result.backup, 'dsh-fairy-ui/package.json')));
  assert.equal(fs.existsSync(path.join(root, 'node_modules/dsh-fairy-ui')), false);
});
test('second removal is a no-op and creates no second backup', t => {
  const root = fixture(t); removePlugin(root);
  const before = read(root, 'package.json');
  assert.equal(removePlugin(root).alreadyRemoved, true);
  assert.deepEqual(read(root, 'package.json'), before);
  assert.equal(fs.readdirSync(path.join(root, '.fairy-uninstall-backups')).length, 1);
});
test('disabled bundle with remaining direct configuration is removed', t => {
  const root = fixture(t), manifest = JSON.parse(read(root, 'package.json'));
  manifest.dsh.profile.bundles = ['other'];
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(manifest));
  assert.equal(removePlugin(root).removed, true);
  assert.ok(!YAML.parse(read(root, 'cordis.patch.yml').toString()).some(x => x.name === 'dsh-fairy-ui'));
});
test('rollback restores bytes and module after simulated later write failure', t => {
  const root = fixture(t), files = ['package.json', 'cordis.yml', 'cordis.patch.yml', 'pnpm-lock.yaml'];
  const before = files.map(n => read(root, n));
  let calls = 0;
  assert.throws(() => removePlugin(root, { beforeWrite() { if (++calls === 3) throw Error('fixture write failure'); } }), /configuration restored/);
  files.forEach((n, i) => assert.deepEqual(read(root, n), before[i]));
  assert.ok(fs.existsSync(path.join(root, 'node_modules/dsh-fairy-ui/package.json')));
  assert.equal(fs.readdirSync(root).some(n => n.includes('.fairy-remove-')), false);
});
test('invalid YAML fails preflight before backups or changes', t => {
  const root = fixture(t), before = read(root, 'package.json');
  fs.writeFileSync(path.join(root, 'cordis.patch.yml'), '- name: dsh-fairy-ui\n  config: [broken\n');
  assert.throws(() => removePlugin(root), /Cannot safely parse/);
  assert.deepEqual(read(root, 'package.json'), before);
  assert.equal(fs.existsSync(path.join(root, '.fairy-uninstall-backups')), false);
});
test('duplicate YAML keys are not silently rewritten', t => {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, 'cordis.patch.yml'), '- name: dsh-fairy-ui\n  name: other\n');
  assert.throws(() => removePlugin(root), /Cannot safely parse/);
});
test('linked configuration file is rejected, external file untouched', t => {
  const root = fixture(t), target = path.join(root, 'outside.json'), before = read(root, 'package.json');
  fs.writeFileSync(target, before); fs.unlinkSync(path.join(root, 'package.json'));
  try { fs.symlinkSync(target, path.join(root, 'package.json'), 'file'); } catch (e) { if (e.code === 'EPERM') return t.skip('File symlinks require Windows permission'); throw e; }
  assert.throws(() => removePlugin(root), /non-regular/);
  assert.deepEqual(fs.readFileSync(target), before);
});
test('linked module directory is moved as a link, never traversed or deleted', t => {
  const root = fixture(t), module = path.join(root, 'node_modules/dsh-fairy-ui'), target = path.join(root, 'external-module');
  fs.renameSync(module, target); fs.symlinkSync(target, module, 'junction');
  removePlugin(root);
  assert.ok(fs.existsSync(path.join(target, 'package.json')));
  assert.equal(fs.existsSync(module), false);
});
test('linked node_modules parent is rejected', t => {
  const root = fixture(t), original = path.join(root, 'node_modules'), target = path.join(root, 'external-modules');
  fs.renameSync(original, target); fs.symlinkSync(target, original, 'junction');
  assert.throws(() => removePlugin(root), /linked directory/);
  assert.ok(fs.existsSync(path.join(target, 'dsh-fairy-ui/package.json')));
});
test('linked backup directory is rejected before external writes', t => {
  const root = fixture(t), target = path.join(root, 'external-backup');
  fs.mkdirSync(target); fs.symlinkSync(target, path.join(root, '.fairy-uninstall-backups'), 'junction');
  assert.throws(() => removePlugin(root), /linked directory/);
  assert.deepEqual(fs.readdirSync(target), []);
});
test('check plans removal without changing files', t => {
  const root = fixture(t), before = read(root, 'package.json');
  assert.equal(planRemoval(root).plans.length, 4);
  assert.deepEqual(read(root, 'package.json'), before);
  assert.equal(fs.existsSync(path.join(root, '.fairy-uninstall-backups')), false);
});
test('JSON BOM and CRLF survive removal', t => {
  const root = fixture(t), text = read(root, 'package.json').toString().replace(/\n/g, '\r\n');
  fs.writeFileSync(path.join(root, 'package.json'), '\uFEFF' + text);
  removePlugin(root); const output = read(root, 'package.json');
  assert.deepEqual(output.subarray(0, 3), Buffer.from([239, 187, 191]));
  assert.ok(output.toString().includes('\r\n'));
});
test('plugin-like names inside another plugin config are preserved', t => {
  const root = fixture(t);
  fs.appendFileSync(path.join(root, 'cordis.patch.yml'), '- id: custom\n  name: custom\n  config:\n    choices:\n      - name: dsh-fairy-ui\n        value: keep-user-data\n');
  removePlugin(root);
  const rows = YAML.parse(read(root, 'cordis.patch.yml').toString());
  assert.deepEqual(rows.find(x => x.name === 'custom').config.choices, [{ name: 'dsh-fairy-ui', value: 'keep-user-data' }]);
});