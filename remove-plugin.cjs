'use strict';
// Targeted, offline removal. Never invokes pnpm, npm, package scripts or the network.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const YAML = require('./yaml.cjs');
const PLUGIN = 'dsh-fairy-ui';
const FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const clone = x => structuredClone(x);
function contained(root, file) {
  const relative = path.relative(root, file);
  if (!relative || relative.startsWith('..' + path.sep) || relative === '..' || path.isAbsolute(relative)) throw Error('Unsafe path: ' + file);
}
function exists(file) { try { fs.lstatSync(file); return true; } catch (e) { if (e.code === 'ENOENT') return false; throw e; } }
function noLinkedParents(root, file) {
  contained(root, file);
  let current = path.dirname(file);
  while (current !== root) {
    if (exists(current) && fs.lstatSync(current).isSymbolicLink()) throw Error('Refusing to edit through linked directory: ' + current);
    current = path.dirname(current);
  }
}
function readYaml(text, name) {
  const doc = YAML.parseDocument(text, { uniqueKeys: true });
  if (doc.errors.length) throw Error('Cannot safely parse ' + name + ': ' + doc.errors[0].message);
  return doc;
}
function removeRows(value) {
  if (Array.isArray(value)) return value.filter(row => !(row && typeof row === 'object' && row.name === PLUGIN)).map(removeRows);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === 'config' ? v : removeRows(v)]));
  return value;
}
function removeYamlRows(node) {
  if (YAML.isSeq(node)) {
    node.items = node.items.filter(item => !(YAML.isMap(item) && item.get('name') === PLUGIN));
    for (const item of node.items) removeYamlRows(item);
  } else if (YAML.isMap(node)) {
    for (const pair of node.items) if (pair.key?.value !== 'config') removeYamlRows(pair.value);
  }
}
function planRemoval(profileDir) {
  const root = fs.realpathSync(profileDir);
  const plans = [];
  function edit(name, transform) {
    const file = path.join(root, name);
    noLinkedParents(root, file);
    if (!exists(file)) return;
    if (fs.lstatSync(file).isSymbolicLink() || !fs.lstatSync(file).isFile()) throw Error('Refusing non-regular configuration file: ' + name);
    const before = fs.readFileSync(file);
    const bom = before.subarray(0, 3).equals(Buffer.from([239, 187, 191]));
    const text = before.toString('utf8').replace(/^\uFEFF/, '');
    const result = transform(text);
    if (result === null) return;
    const after = Buffer.from((bom ? '\uFEFF' : '') + result);
    if (!before.equals(after)) plans.push({ name, file, before, after });
  }
  if (!exists(path.join(root, 'package.json'))) throw Error('Profile package.json is missing.');
  edit('package.json', text => {
    const manifest = JSON.parse(text);
    const expected = clone(manifest);
    for (const field of FIELDS) if (expected[field]) delete expected[field][PLUGIN];
    if (Array.isArray(expected.dsh?.profile?.bundles)) expected.dsh.profile.bundles = expected.dsh.profile.bundles.filter(name => name !== PLUGIN);
    if (JSON.stringify(expected) === JSON.stringify(manifest)) return null;
    const eol = text.includes('\r\n') ? '\r\n' : '\n';
    const indent = text.match(/\n([ \t]+)"/)?.[1] || '  ';
    const result = JSON.stringify(expected, null, indent).replace(/\n/g, eol) + eol;
    assert.deepEqual(JSON.parse(result), expected);
    return result;
  });
  for (const name of ['cordis.yml', 'cordis.patch.yml']) edit(name, text => {
    const doc = readYaml(text, name), before = doc.toJS(), expected = removeRows(before);
    if (JSON.stringify(before) === JSON.stringify(expected)) return null;
    removeYamlRows(doc.contents);
    const result = String(doc).replace(/\n/g, text.includes('\r\n') ? '\r\n' : '\n');
    assert.deepEqual(readYaml(result, name).toJS(), expected);
    return result;
  });
  edit('pnpm-lock.yaml', text => {
    const doc = readYaml(text, 'pnpm-lock.yaml'), before = doc.toJS(), expected = clone(before);
    for (const field of FIELDS) if (expected?.importers?.['.']?.[field]) delete expected.importers['.'][field][PLUGIN];
    // Keep unreachable snapshots and shared dependency caches; do not re-resolve any other plugin.
    if (JSON.stringify(before) === JSON.stringify(expected)) return null;
    for (const field of FIELDS) if (doc.hasIn(['importers', '.', field, PLUGIN])) doc.deleteIn(['importers', '.', field, PLUGIN]);
    const result = String(doc).replace(/\n/g, text.includes('\r\n') ? '\r\n' : '\n');
    assert.deepEqual(readYaml(result, 'pnpm-lock.yaml').toJS(), expected);
    return result;
  });
  const modulePath = path.join(root, 'node_modules', PLUGIN);
  noLinkedParents(root, modulePath);
  return { root, plans, modulePath, modulePresent: exists(modulePath) };
}
function removePlugin(profileDir, options = {}) {
  const plan = planRemoval(profileDir);
  if (!plan.plans.length && !plan.modulePresent) return { removed: true, alreadyRemoved: true, changedFiles: [], backup: null };
  const backupRoot = path.join(plan.root, '.fairy-uninstall-backups');
  noLinkedParents(plan.root, path.join(backupRoot, 'placeholder'));
  fs.mkdirSync(backupRoot, { recursive: true });
  const backup = fs.mkdtempSync(path.join(backupRoot, new Date().toISOString().replace(/[:.]/g, '-') + '-'));
  for (const item of plan.plans) fs.writeFileSync(path.join(backup, item.name), item.before, { flag: 'wx', mode: 0o600 });
  fs.writeFileSync(path.join(backup, 'removal-record.json'), JSON.stringify({ plugin: PLUGIN, date: new Date().toISOString(), files: plan.plans.map(p => ({ name: p.name, sha256Before: hash(p.before), sha256After: hash(p.after) })), moduleQuarantined: plan.modulePresent }, null, 2), { flag: 'wx', mode: 0o600 });
  const staged = [], written = [];
  let movedModule = false;
  try {
    for (const item of plan.plans) {
      const temp = item.file + '.fairy-remove-' + crypto.randomBytes(6).toString('hex');
      fs.writeFileSync(temp, item.after, { flag: 'wx', mode: fs.statSync(item.file).mode });
      staged.push({ ...item, temp });
    }
    // Detect changes by another process before committing anything.
    for (const item of staged) if (!fs.readFileSync(item.file).equals(item.before)) throw Error('Configuration changed concurrently; removal stopped: ' + item.name);
    if (plan.modulePresent) { fs.renameSync(plan.modulePath, path.join(backup, PLUGIN)); movedModule = true; }
    for (const item of staged) {
      if (options.beforeWrite) options.beforeWrite(item.name);
      fs.renameSync(item.temp, item.file); written.push(item);
    }
    const verified = planRemoval(plan.root);
    if (verified.plans.length || verified.modulePresent) throw Error('Removal verification failed.');
    return { removed: true, alreadyRemoved: false, changedFiles: written.map(p => p.name), backup, moduleQuarantined: movedModule };
  } catch (error) {
    const rollbackErrors = [];
    for (const item of written.reverse()) try { fs.copyFileSync(path.join(backup, item.name), item.file); } catch (e) { rollbackErrors.push(e.message); }
    if (movedModule) try { fs.renameSync(path.join(backup, PLUGIN), plan.modulePath); } catch (e) { rollbackErrors.push(e.message); }
    if (rollbackErrors.length) throw Error(error.message + '; rollback incomplete; backup: ' + backup + '; ' + rollbackErrors.join('; '));
    throw Error(error.message + '; configuration restored; backup: ' + backup);
  } finally {
    for (const item of staged) if (exists(item.temp)) fs.unlinkSync(item.temp);
  }
}
if (require.main === module) {
  try {
    const [action, profileDir] = process.argv.slice(2);
    if (!profileDir || !['check', 'remove'].includes(action)) throw Error('Usage: remove-plugin.cjs check|remove <profile directory>');
    const result = action === 'remove' ? removePlugin(profileDir) : (() => { const p = planRemoval(profileDir); return { supported: true, plannedFiles: p.plans.map(x => x.name), modulePresent: p.modulePresent }; })();
    console.log(JSON.stringify(result, null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { planRemoval, removePlugin };