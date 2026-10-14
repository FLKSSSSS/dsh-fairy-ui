const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(__dirname + '/../lib/client.js', 'utf8');
const begin = source.indexOf('//#region src/client/composer-branch-position.js');
const end = source.indexOf('//#endregion', begin);
const context = { __commonJSMin: fn => { let m; return () => { if (!m) { m = {exports: {}}; fn(m.exports, m); } return m.exports; }; } };
vm.runInNewContext(source.slice(begin, end) + '\napi = require_composer_branch_position();', context);
const api = context.api;
function fixture(scale = 1, holeWidth = 800) {
  const values = new Map(), attrs = new Map();
  const anchor = { style: {setProperty: (n, v) => values.set(n, v), getPropertyValue: n => values.get(n), removeProperty: n => values.delete(n)}, hasAttribute: n => attrs.has(n), setAttribute: (n, v) => attrs.set(n, v), removeAttribute: n => attrs.delete(n) };
  anchor.offsetParent = {offsetWidth: 200, offsetHeight: 132, clientLeft: 2, clientTop: 3, scrollLeft: 4, scrollTop: 5, getBoundingClientRect: () => ({left: 20 * scale, top: 600 * scale, width: 200 * scale, height: 132 * scale})};
  const scope = {querySelectorAll: () => [anchor]};
  const command = {getBoundingClientRect: () => ({right: 300 * scale, top: 700 * scale})};
  const input = {getBoundingClientRect: () => ({width: holeWidth * scale})};
  const card = {querySelector: s => s.includes('command-control') ? command : input};
  return {scope, card, anchor, values, attrs};
}
for (const scale of [1, 1.25, 1.5, 2]) test(`branch geometry uses CSS lengths at zoom ${scale} and preserves parent borders/scroll`, () => {
 const f = fixture(scale); api.syncBranchGeometry(f.scope, f.card);
 assert.equal(f.values.get('--dsh-fairy-branch-left'), '290px');
 assert.equal(f.values.get('--dsh-fairy-branch-top'), '102px');
 assert.equal(f.values.get('--dsh-fairy-branch-width'), '144px');
 assert.equal(f.attrs.get('data-dsh-fairy-branch-positioned'), 'true');
});
test('branch width shrinks on narrow input; cleanup is reversible and missing controls clear geometry', () => {
 const f = fixture(1, 240); api.syncBranchGeometry(f.scope, f.card);
 assert.equal(f.values.get('--dsh-fairy-branch-width'), '60px');
 api.clearBranchGeometry(f.scope); assert.equal(f.values.size, 0); assert.equal(f.attrs.size, 0);
 api.syncBranchGeometry(f.scope, f.card); api.syncBranchGeometry(f.scope, null);
 assert.equal(f.values.size, 0); assert.equal(f.attrs.size, 0);
});
test('branch layout preserves semantic native controls and never infers branches from display labels', () => {
 assert.match(source, /querySelectorAll\('\[data-gitgraph-chip-anchor\]'\)/);
 assert.match(source, /button !== workspaceButton && !button.closest\("\[data-gitgraph-chip-anchor\]"\)/);
 assert.match(source, /template.querySelectorAll\("\[data-gitgraph-chip-anchor\]"\).forEach\(\(node\) => node.remove\(\)\)/);
 assert.match(source, /syncBranchGeometry\(seat, card\)/);
 assert.match(source, /data-gitgraph-popover\]\{top:auto!important;bottom:calc\(100% \+ 8px\)/);
 const region = source.slice(begin, end);
 assert.doesNotMatch(region, /appendChild|insertBefore|innerHTML|onclick|addEventListener/);
});

test('narrow workspace keeps only the original branch ancestor visible and measurable', () => {
 assert.match(source, /@media\(max-width:620px\)\{[^\n]+branch-control="true"[^\n]+display:block!important;width:100%!important;overflow:visible!important/);
 assert.match(source, />\*:not\(\[data-dsh-fairy-composer-branch-control="true"\]\):not\(:has\(\[data-dsh-fairy-composer-branch-control="true"\]\)\)\{display:none!important/);
});
