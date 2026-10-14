const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const files = cp.execFileSync('git', ['ls-files', '*.html'], {cwd: root, encoding: 'utf8'}).trim().split('\n');
const version = '20261014-all-gallery-scroll-lock';
let shared = 0, viewers = 0;
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(m => m[1]);
  const main = scripts.findIndex(src => /(?:^|\/)js\/script\.js(?:\?|$)/.test(src));
  if (main >= 0) {
    const source = scripts[main];
    assert(source.endsWith('?v=' + version), file + ': stale script version');
    const resolved = path.resolve(root, source.startsWith('/') ? source.slice(1).split('?')[0] : path.join(path.dirname(file), source.split('?')[0]));
    assert.equal(resolved, path.join(root, 'js/script.js'), file + ': old city script copy');
    shared++;
  }
  if (/gallery-item|case-cover|case-photo-grid|data-home-gallery|carmel-repairs-lightbox|magnific-image/.test(html)) {
    assert(main >= 0, file + ': missing shared gallery lock');
    viewers++;
  }
  const home = scripts.findIndex(src => /(?:^|\/)home-page\.js(?:\?|$)/.test(src));
  if (home >= 0) {
    assert(main >= 0 && main < home, file + ': gallery dependency order');
    assert(scripts[home].endsWith('?v=' + version), file + ': stale carousel gallery');
  }
}
const home = fs.readFileSync(path.join(root, 'js/home-page.js'), 'utf8');
const main = fs.readFileSync(path.join(root, 'js/script.js'), 'utf8');
assert(home.includes('pageScroll.lock()') && home.includes('pageScroll.unlock()'));
assert.equal((main.match(/window\.createGalleryScrollLock\(/g) || []).length, 3);
assert(main.includes('beforeOpen: () => popupScroll.lock(), afterClose: () => popupScroll.unlock()'));
console.log(JSON.stringify({htmlPages: files.length, sharedScriptPages: shared, photoViewerPages: viewers, errors: []}));
