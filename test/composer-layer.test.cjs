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

test('material SVG has explicit stretched dimensions instead of intrinsic replaced-element height', () => {
 assert.match(source, /width:calc\(100% \+ 24px\)!important;height:calc\(100% \+ 20px\)!important/);
 assert.match(source, /"viewBox", "0 0 " \+ layerRect.width \+ " " \+ layerRect.height/);
});
test('model toolbar and commands are inside the measured input hole without growing input', () => {
 assert.match(source, /grid-template-rows:minmax\(0,1fr\)!important/);
 assert.match(source, /hole-contact-width[^\n]+38px/);
 assert.match(source, /geometryStack.style.setProperty\(name, value\)/);
 assert.match(source, /clearHoleContactGeometry\(geometryStack\)/);
 assert.match(source, /tools="true"\]>\*:not\(\[data-dsh-fairy-composer-send-control="true"\]\):not\(\[data-dsh-fairy-composer-command-control="true"\]\)/);
});
