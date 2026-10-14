const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '../js/script.js'), 'utf8');
const start = source.indexOf('let activeIndex = 0;', source.indexOf('// Native gallery lightbox START//'));
const end = source.indexOf('galleryLinks.forEach', start);
function style(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    values,
    getPropertyValue: name => values.get(name)?.[0] || '',
    getPropertyPriority: name => values.get(name)?.[1] || '',
    setProperty: (name, value, priority = '') => values.set(name, [value, priority]),
    removeProperty: name => values.delete(name)
  };
}
const root = { clientWidth: 1185, style: style({'overflow': ['clip', ''], 'scroll-behavior': ['smooth', 'important']}) };
const body = { style: style({'padding-right': ['8px', 'important'], position: ['relative', '']}) };
const originalRoot = [...root.style.values];
const originalBody = [...body.style.values];
let focusRestored = 0;
const opener = { isConnected: true, focus: options => { assert.equal(options.preventScroll, true); focusRestored++; } };
const classes = new Set();
const preview = {};
const listeners = new Map();
const window = {
  innerWidth: 1200, scrollX: 3, scrollY: 1250,
  getComputedStyle: () => ({paddingRight: '8px'}),
  scrollTo: options => { window.scrollX = options.left; window.scrollY = options.top; assert.equal(options.behavior, 'instant'); }
};
const context = vm.createContext({
  document: {documentElement: root, body, activeElement: opener,
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: name => listeners.delete(name)}, window, preview,
  closeButton: {focus: options => assert.equal(options.preventScroll, true)},
  lightbox: {classList: {add: c => classes.add(c), remove: c => classes.delete(c)}},
  lightboxPlaceholder: 'placeholder',
  galleryLinks: ['one', 'two'].map(name => ({dataset: {}, getAttribute: () => name, querySelector: () => ({alt: name})}))
});
vm.runInContext(source.slice(0, source.indexOf("document.addEventListener('DOMContentLoaded'")) + source.slice(start, end), context);
context.showImage(0);
assert.equal(body.style.getPropertyValue('position'), 'fixed');
assert.equal(body.style.getPropertyValue('top'), '-1250px');
assert.equal(body.style.getPropertyValue('padding-right'), '23px');
assert.equal(root.style.getPropertyValue('overflow'), 'hidden');
let prevented = 0;
listeners.get('wheel')({cancelable: true, preventDefault: () => prevented++});
listeners.get('touchmove')({cancelable: true, touches: [{}], preventDefault: () => prevented++});
listeners.get('touchmove')({cancelable: true, touches: [{}, {}], preventDefault: () => prevented++});
listeners.get('wheel')({cancelable: true, ctrlKey: true, preventDefault: () => prevented++});
assert.equal(prevented, 2, 'block page scrolling but preserve pinch zoom');
window.scrollY = 0;
context.showImage(1);
assert.equal(body.style.getPropertyValue('top'), '-1250px', 'next image must not overwrite original scroll position');
assert.equal(preview.src, 'two');
context.closeLightbox();
assert.equal(window.scrollY, 1250);
assert.equal(window.scrollX, 3);
assert.deepEqual([...root.style.values].sort(), originalRoot.sort());
assert.deepEqual([...body.style.values].sort(), originalBody.sort());
assert.equal(focusRestored, 1);
assert.equal(listeners.size, 0);
context.closeLightbox();
assert.equal(focusRestored, 1, 'closing twice must be harmless');
window.scrollY = 400;
context.showImage(0);
context.closeLightbox();
assert.equal(window.scrollY, 400);
assert.equal(classes.size, 0);
console.log('PASS: scroll lock, gallery navigation, exact inline-style restoration, focus, repeated open/close');
