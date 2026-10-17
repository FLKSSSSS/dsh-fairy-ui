'use strict';
// Offline deployment of the checksummed, self-contained Fairy release archive.
// No package manager, package lifecycle scripts, dependency resolution or network.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const assert = require('node:assert/strict');
const YAML = require('./yaml.cjs');
const PLUGIN = 'dsh-fairy-ui', VERSION = '1.4.6';
const ARCHIVE_SHA = '33302ad0503ac19ff4b0846b6bafa799afd56a9ef64a6c719d5ab98478b8440a';
const FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const exists = file => { try { fs.lstatSync(file); return true; } catch (e) { if (e.code === 'ENOENT') return false; throw e; } };
function inside(root, file) {
  const relative = path.relative(root, file);
  if (!relative || relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) throw Error('Unsafe path: ' + file);
}
function safeParents(root, file) {
  inside(root, file);
  for (let dir = path.dirname(file); dir !== root; dir = path.dirname(dir)) {
    if (exists(dir) && (fs.lstatSync(dir).isSymbolicLink() || !fs.statSync(dir).isDirectory())) throw Error('Refusing linked or non-directory parent: ' + dir);
  }
}
function regular(root, file) {
  safeParents(root, file);
  if (exists(file) && (fs.lstatSync(file).isSymbolicLink() || !fs.lstatSync(file).isFile())) throw Error('Refusing non-regular configuration file: ' + file);
}
function yaml(text, name) {
  const doc = YAML.parseDocument(text, { uniqueKeys: true });
  if (doc.errors.length) throw Error('Cannot safely parse ' + name + ': ' + doc.errors[0].message);
  return doc;
}
function enableRows(value) {
  if (Array.isArray(value)) return value.map(row => row && typeof row === 'object' && row.name === PLUGIN ? { ...row, enabled: true } : enableRows(row));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === 'config' ? v : enableRows(v)]));
  return value;
}
function enableYamlRows(node) {
  if (YAML.isSeq(node)) for (const item of node.items) {
    if (YAML.isMap(item) && item.get('name') === PLUGIN) item.set('enabled', true);
    else enableYamlRows(item);
  }
  else if (YAML.isMap(node)) for (const pair of node.items) if (pair.key?.value !== 'config') enableYamlRows(pair.value);
}
function archiveName(digest) { return `${PLUGIN}-${VERSION}-${digest}.tgz`; }
function planInstallation(profileDir, digest = ARCHIVE_SHA) {
  const root = fs.realpathSync(profileDir), plans = [], observed = [];
  function edit(name, transform) {
    const file = path.join(root, name); regular(root, file);
    const before = exists(file) ? fs.readFileSync(file) : null;
    observed.push({ file, before, name });
    const text = before?.toString('utf8').replace(/^\uFEFF/, '') ?? null;
    const output = transform(text);
    if (output === null) return;
    const after = Buffer.from((before?.subarray(0, 3).equals(Buffer.from([239, 187, 191])) ? '\uFEFF' : '') + output);
    if (!before || !before.equals(after)) plans.push({ name, file, before, after });
  }
  edit('package.json', text => {
    if (text === null) throw Error('Profile package.json is missing.');
    const manifest = JSON.parse(text), expected = structuredClone(manifest);
    if (manifest.dsh?.profile?.bundles?.includes('dsh-fairy-visual')) throw Error('Old dsh-fairy-visual is enabled; disable it before installing Fairy UI.');
    for (const field of FIELDS) if (expected[field]) delete expected[field][PLUGIN];
    expected.dependencies ??= {};
    expected.dependencies[PLUGIN] = 'file:./.fairy-local-packages/' + archiveName(digest);
    expected.dsh ??= {}; expected.dsh.profile ??= {}; expected.dsh.profile.bundles ??= [];
    if (!Array.isArray(expected.dsh.profile.bundles)) throw Error('Invalid bundle list.');
    expected.dsh.profile.bundles = expected.dsh.profile.bundles.filter(n => n !== PLUGIN);
    expected.dsh.profile.bundles.push(PLUGIN);
    if (JSON.stringify(expected) === JSON.stringify(manifest)) return null;
    const eol = text.includes('\r\n') ? '\r\n' : '\n', indent = text.match(/\n([ \t]+)"/)?.[1] || '  ';
    const result = JSON.stringify(expected, null, indent).replace(/\n/g, eol) + eol;
    assert.deepEqual(JSON.parse(result), expected); return result;
  });
  for (const name of ['cordis.yml', 'cordis.patch.yml']) edit(name, text => {
    if (text === null) return null;
    const doc = yaml(text, name), before = doc.toJS(), expected = enableRows(before);
    if (JSON.stringify(before) === JSON.stringify(expected)) return null;
    enableYamlRows(doc.contents);
    const result = String(doc).replace(/\n/g, text.includes('\r\n') ? '\r\n' : '\n');
    assert.deepEqual(yaml(result, name).toJS(), expected); return result;
  });
  // pnpm is not used. Drop only stale Fairy importer records; do not fabricate a
  // pnpm snapshot, alter another dependency, or claim the lockfile is regenerated.
  edit('pnpm-lock.yaml', text => {
    if (text === null) return null;
    const doc = yaml(text, 'pnpm-lock.yaml'), before = doc.toJS(), expected = structuredClone(before);
    for (const field of FIELDS) if (expected?.importers?.['.']?.[field]) delete expected.importers['.'][field][PLUGIN];
    if (JSON.stringify(expected) === JSON.stringify(before)) return null;
    for (const field of FIELDS) if (doc.hasIn(['importers', '.', field, PLUGIN])) doc.deleteIn(['importers', '.', field, PLUGIN]);
    const result = String(doc).replace(/\n/g, text.includes('\r\n') ? '\r\n' : '\n');
    assert.deepEqual(yaml(result, 'pnpm-lock.yaml').toJS(), expected); return result;
  });
  const modulePath = path.join(root, 'node_modules', PLUGIN), localArchive = path.join(root, '.fairy-local-packages', archiveName(digest));
  safeParents(root, modulePath); regular(root, localArchive);
  if (exists(localArchive) && sha(fs.readFileSync(localArchive)) !== digest) throw Error('Stored Fairy package checksum mismatch.');
  safeParents(root, path.join(root, '.fairy-install-backups', 'placeholder'));
  return { root, plans, observed, modulePath, localArchive };
}
// The published npm tar contains only normal USTAR files. Reject every extension,
// link, duplicate, Windows special name and traversal before extracting any file.
function readArchive(archive, expectedHash = ARCHIVE_SHA) {
  const compressed = fs.readFileSync(archive);
  if (sha(compressed) !== expectedHash) throw Error('Plugin archive checksum mismatch.');
  const tar = zlib.gunzipSync(compressed, { maxOutputLength: 64 * 1024 * 1024 }), entries = [], seen = new Set();
  let offset = 0, ended = false;
  const text = bytes => bytes.toString('utf8').split('\0')[0];
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512); offset += 512;
    if (header.every(b => b === 0)) { if (!tar.subarray(offset).every(b => b === 0)) throw Error('Invalid tar trailer.'); ended = true; break; }
    let checksum = 0;
    for (let i = 0; i < 512; i++) checksum += i >= 148 && i < 156 ? 32 : header[i];
    if (parseInt(text(header.subarray(148, 156)).trim(), 8) !== checksum) throw Error('Invalid tar header checksum.');
    const sizeText = text(header.subarray(124, 136)).trim();
    if (!/^[0-7]+$/.test(sizeText)) throw Error('Invalid tar size.');
    const size = parseInt(sizeText, 8), prefix = text(header.subarray(345, 500));
    const name = (prefix ? prefix + '/' : '') + text(header.subarray(0, 100));
    if (header[156] !== 48 && header[156] !== 0) throw Error('Unsupported tar entry (links/extensions are refused): ' + name);
    if (!name.startsWith('package/')) throw Error('Invalid package path: ' + name);
    const relative = name.slice(8), parts = relative.split('/');
    if (parts.some(p => !p || p === '.' || p === '..' || /[<>:"\\|?*\x00-\x1f]/.test(p) || /[ .]$/.test(p) || /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)/i.test(p))) throw Error('Unsafe tar path: ' + name);
    const key = relative.toLowerCase();
    if (seen.has(key)) throw Error('Duplicate package path: ' + name); seen.add(key);
    if (offset + size > tar.length) throw Error('Truncated tar entry: ' + name);
    entries.push({ name: relative, bytes: tar.subarray(offset, offset + size) });
    offset += Math.ceil(size / 512) * 512;
  }
  if (!ended || !entries.length) throw Error('Incomplete package archive.');
  const manifest = JSON.parse(entries.find(e => e.name === 'package.json')?.bytes.toString('utf8') ?? 'null');
  if (manifest?.name !== PLUGIN || manifest.version !== VERSION) throw Error('Unexpected plugin name or version.');
  for (const name of ['lib/index.js', 'lib/client.js', 'cordis.patch.yml', ...((manifest.bundledDependencies || []).map(n => 'node_modules/' + n + '/package.json'))]) {
    if (!entries.some(e => e.name === name)) throw Error('Incomplete bundled package: ' + name);
  }
  return { compressed, entries, digest: expectedHash };
}
function moduleMatches(modulePath, entries) {
  try {
    if (!exists(modulePath) || fs.lstatSync(modulePath).isSymbolicLink()) return false;
    for (const item of entries) {
      const file = path.join(modulePath, item.name); regular(modulePath, file);
      if (!exists(file) || !fs.readFileSync(file).equals(item.bytes)) return false;
    }
    let count = 0;
    function walk(dir) { for (const item of fs.readdirSync(dir, { withFileTypes: true })) { if (item.isDirectory()) walk(path.join(dir, item.name)); else if (item.isFile()) count++; else throw Error('Linked installed package.'); } }
    walk(modulePath); return count === entries.length;
  } catch { return false; }
}
function installPlugin(profileDir, archive, options = {}) {
  const payload = readArchive(archive, options.expectedHash || ARCHIVE_SHA), plan = planInstallation(profileDir, payload.digest);
  const patcher = options.patcher, host = options.host;
  if (!patcher || !host) throw Error('Validated native startup patcher and host are required.');
  const priorHost = patcher.validate(host), hostWasInstalled = !!priorHost.stateData;
  const sameModule = moduleMatches(plan.modulePath, payload.entries), archivePresent = exists(plan.localArchive);
  if (!plan.plans.length && sameModule && archivePresent) {
    patcher.install(host); return { installed: true, alreadyInstalled: true, version: VERSION, changedFiles: [], backup: null };
  }
  const backupRoot = path.join(plan.root, '.fairy-install-backups');
  fs.mkdirSync(backupRoot, { recursive: true });
  const backup = fs.mkdtempSync(path.join(backupRoot, new Date().toISOString().replace(/[:.]/g, '-') + '-'));
  const stage = path.join(backup, 'staged-package'); fs.mkdirSync(stage);
  const staged = [], written = [];
  let oldModuleMoved = false, newModuleMoved = false, archiveCreated = false, patchAttempted = false;
  try {
    for (const item of payload.entries) {
      const file = path.join(stage, item.name); inside(stage, file);
      fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, item.bytes, { flag: 'wx' });
    }
    const manifest = JSON.parse(fs.readFileSync(path.join(stage, 'package.json'), 'utf8'));
    for (const name of manifest.bundledDependencies || []) {
      const bundled = JSON.parse(fs.readFileSync(path.join(stage, 'node_modules', name, 'package.json'), 'utf8'));
      if (bundled.name !== name || bundled.version !== manifest.dependencies[name]) throw Error('Bundled dependency mismatch: ' + name);
    }
    for (const item of plan.plans) {
      if (item.before) fs.writeFileSync(path.join(backup, item.name), item.before, { flag: 'wx', mode: 0o600 });
      const temp = item.file + '.fairy-install-' + crypto.randomBytes(6).toString('hex');
      fs.writeFileSync(temp, item.after, { flag: 'wx', mode: 0o600 }); staged.push({ ...item, temp });
    }
    fs.writeFileSync(path.join(backup, 'installation-record.json'), JSON.stringify({ plugin: PLUGIN, version: VERSION, date: new Date().toISOString(), files: plan.plans.map(i => ({ name: i.name, sha256Before: i.before ? sha(i.before) : null, sha256After: sha(i.after) })) }, null, 2), { flag: 'wx', mode: 0o600 });
    if (options.beforeCommit) options.beforeCommit();
    for (const item of plan.observed) {
      if (item.before ? !exists(item.file) || !fs.readFileSync(item.file).equals(item.before) : exists(item.file)) throw Error('Configuration changed concurrently: ' + item.name);
    }
    patchAttempted = true; patcher.install(host);
    if (!archivePresent) {
      fs.mkdirSync(path.dirname(plan.localArchive), { recursive: true });
      fs.writeFileSync(plan.localArchive, payload.compressed, { flag: 'wx' }); archiveCreated = true;
    }
    fs.mkdirSync(path.dirname(plan.modulePath), { recursive: true });
    if (exists(plan.modulePath)) { fs.renameSync(plan.modulePath, path.join(backup, 'previous-package')); oldModuleMoved = true; }
    fs.renameSync(stage, plan.modulePath); newModuleMoved = true;
    for (const item of staged) {
      if (options.beforeWrite) options.beforeWrite(item.name);
      fs.renameSync(item.temp, item.file); written.push(item);
    }
    const verification = planInstallation(plan.root, payload.digest);
    if (verification.plans.length || !moduleMatches(plan.modulePath, payload.entries)) throw Error('Installation verification failed.');
    return { installed: true, alreadyInstalled: false, version: VERSION, changedFiles: written.map(i => i.name), backup, offline: true };
  } catch (error) {
    const errors = [];
    for (const item of written.reverse()) try {
      if (item.before) fs.copyFileSync(path.join(backup, item.name), item.file); else fs.unlinkSync(item.file);
    } catch (e) { errors.push(e.message); }
    if (newModuleMoved) try { fs.renameSync(plan.modulePath, path.join(backup, 'failed-package')); } catch (e) { errors.push(e.message); }
    if (oldModuleMoved) try { fs.renameSync(path.join(backup, 'previous-package'), plan.modulePath); } catch (e) { errors.push(e.message); }
    if (archiveCreated) try { fs.unlinkSync(plan.localArchive); } catch (e) { errors.push(e.message); }
    if (patchAttempted && !hostWasInstalled) try { patcher.restore(host); } catch (e) { errors.push(e.message); }
    throw Error(error.message + (errors.length ? '; rollback incomplete: ' + errors.join('; ') : '; profile and native startup rolled back') + '; backup: ' + backup);
  } finally {
    for (const item of staged) if (exists(item.temp)) fs.unlinkSync(item.temp);
    // Keep any extracted staging files in this owned backup for diagnosis; no recursive deletion.
  }
}
if (require.main === module) {
  try {
    const [action, profile, archive, host] = process.argv.slice(2);
    if (!profile || !archive || !['check', 'install'].includes(action)) throw Error('Usage: install-plugin.cjs check|install <profile> <archive> [host]');
    const result = action === 'check' ? (() => { const payload = readArchive(archive), p = planInstallation(profile); return { supported: true, version: VERSION, archiveFiles: payload.entries.length, plannedFiles: p.plans.map(i => i.name) }; })() : installPlugin(profile, archive, { host, patcher: require('./desktop-patch.cjs') });
    console.log(JSON.stringify(result, null, 2));
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
module.exports = { readArchive, planInstallation, installPlugin, moduleMatches, ARCHIVE_SHA };
