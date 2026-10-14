const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(__dirname + '/../lib/client.js', 'utf8');
const start = source.indexOf('function injectStyles()');
const end = source.indexOf('var init_style', start);
function styles() {
 let node;
 const document = {getElementById: () => null, createElement: () => ({setAttribute() {}}), head: {appendChild(el) {node = el;}}};
 vm.runInNewContext(source.slice(start, end) + '\ninjectStyles();', {document, STYLE_ID: 'test'});
 return node.textContent;
}
test('deliverable contrast is scoped to native semantic card markers and visual mode', () => {
 const css = styles();
 const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(m => m[1].includes('[data-presented-file]'));
 assert.equal(rules.length, 9);
 for (const [,selector] of rules) assert.match(selector.trim(), /^html\[data-dsh-fairy-visual\] \[data-presented-file\]/);
 assert.doesNotMatch(rules.map(m => m[1]).join(''), /flL80G|WgQWqa/);
 assert.match(css, /--deliverable-fill:var\(--dsw-alias-bg-layer-1/);
 assert.match(css, /--deliverable-hover:var\(--dsw-alias-bg-layer-2/);
});
test('file descriptions preserve native error colors; action states and focus remain readable', () => {
 const css = styles();
 assert.match(css, /\[data-presented-description\]:not\(\[data-error=true\]\)\{color:var\(--dsw-alias-label-secondary/);
 assert.match(css, /\[data-open-target\] button:hover:not\(:disabled\)/);
 assert.match(css, /\[data-presented-file\] button:focus-visible\{outline:2px solid/);
 assert.match(css, /\[data-open-target\] button:disabled\{opacity:\.5\}/);
 const scoped = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(m => m[1].includes('[data-presented-file]')).map(m=>m[2]).join('');
 assert.doesNotMatch(scoped, /pointer-events|position|display|z-index|height|width|font-size|animation|content/);
});
