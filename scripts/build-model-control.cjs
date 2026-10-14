// Rebuild only the isolated model selector region. Startup/voice bundles stay untouched.
const fs = require('node:fs');
const path = require('node:path');
const esbuild = require(process.env.FAIRY_ESBUILD_PATH || 'esbuild');
const root = path.resolve(__dirname, '..');
const result = esbuild.buildSync({
  absWorkingDir: root,
  entryPoints: [path.join(root, 'src/model-control.tsx')], bundle: true, write: false,
  format: 'cjs', platform: 'browser', target: 'chrome130', external: ['react'],
  jsx: 'transform', legalComments: 'inline', charset: 'utf8',
});
const file = path.join(root, 'lib/client.js');
const start = '// #region fairy-model-control';
const end = '// #endregion fairy-model-control';
const source = fs.readFileSync(file, 'utf8');
if (source.indexOf(start) < 0 || source.indexOf(end) < 0) throw new Error('Model selector build region missing');
const code = `${start}\n// Generated from src/model-control.tsx; MIT attribution in THIRD-PARTY-NOTICES.txt.\nconst fairyModelControl = (() => { const module = { exports: {} };\n${result.outputFiles[0].text}\nreturn module.exports; })();\n${end}`;
fs.writeFileSync(file, source.slice(0, source.indexOf(start)) + code + source.slice(source.indexOf(end) + end.length));
console.log('Built Fairy model control (startup and voice bundles unchanged).');
