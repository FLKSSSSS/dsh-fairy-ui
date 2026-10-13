const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../lib/client.js'), 'utf8');
test('Fairy dock preserves native layer above sticky code headers', () => {
 const rule = source.match(/html\[data-dsh-fairy-visual\] \[data-dsh-fairy-composer-dock="true"\]\{([^}]+)\}/)[1];
 assert.match(rule, /z-index:7!important/);
 assert.match(rule, /position:fixed!important/);
 assert.match(rule, /pointer-events:none!important/);
});
test('modal backdrop still lowers Fairy composer without changing Markdown', () => {
 assert.match(source, /html\[data-dsh-fairy-visual\]\[data-dsh-fairy-modal-open\][^\n]+z-index:1!important/);
 assert(!source.includes('.bannerWrap{'));
 assert(!source.includes('pre{display:none'));
});
