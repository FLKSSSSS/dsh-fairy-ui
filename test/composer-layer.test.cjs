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

test('send/stop native control restores pointer events without making transparent rows clickable', () => {
 assert.match(source, /dock="true"\] \[data-dsh-fairy-composer-send-control="true"\]\{pointer-events:auto!important\}/);
 assert.match(source, /data-dsh-fairy-composer-row="true"\][^\n]+pointer-events:none!important/);
});
test('composer marker projection imports official model selectors before re-binding thinking controls', () => {
 assert.match(source, /const \{ OFFICIAL_SELECTORS, OFFICIAL_ATTRIBUTES, inputScroll, sendButton/);
 assert.match(source, /OFFICIAL_SELECTORS\.model/);
 assert.match(source, /OFFICIAL_SELECTORS\.reasoning/);
});
test('composer marker projection follows re-mounted controls and does not mark an incomplete row', () => {
 assert.match(source, /inputScroll, sendButton, sendOnlyButton, contextControl/);
 assert.match(source, /function directChildUnder\(node, ancestor\)/);
 assert.match(source, /function canMarkControls\(card\)/);
 assert.match(source, /directChildUnder\(target, card\)/);
 assert.match(source, /const semanticTargets = \[/);
 assert.match(source, /if \(!projection\) return \(\) => \{\};/);
 assert.match(source, /const trailing = rowChildren\.find\(/);
 assert.match(source, /const tools = rowChildren\.find\(/);
 assert.match(source, /if \(canPlaceNativeControlMarkers\(card\)\)/);
});
test('native context footer occupies no layout row and stays interactive in input top-right', () => {
 assert.match(source, /contextControl\(barRoot\)/);
 assert.match(source, /native-footer="true"\]\{position:absolute!important;inset:0!important/);
 assert.match(source, /floating-context="true"\]\{[^}]+pointer-events:auto!important/);
 assert.match(source, /if \(!card.contains\(contextTarget\)\)/);
 assert.match(source, /data-dsh-fairy-composer-floating-context/);
 assert.match(source, /padding-right:84px!important/);
});
test('mascot center row follows input contact geometry including attachments', () => {
 assert.match(source, /mascot-scale-base="true"\]\{top:calc\(var\(--dsh-fairy-composer-hole-contact-top,10px\) \+ \(var\(--dsh-fairy-composer-hole-contact-height,112px\)/);
});
