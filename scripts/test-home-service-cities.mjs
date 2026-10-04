import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../js/home-service-cities.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
assert.match(html, /<h1>Appliance Repair in Indianapolis and Nearby Communities<\/h1>/);
assert.match(html, /data-city-name>Indianapolis<\/span>/);
const cities = ['Indianapolis', 'Carmel', 'Fishers', 'Westfield', 'Noblesville', 'McCordsville', 'Zionsville'];

function setup(reduced = false) {
  const callbacks = {};
  const timers = new Map();
  let id = 0;
  const city = { textContent: cities[0] };
  const toggle = { setAttribute(k, v) { this[k] = v; }, addEventListener(k, fn) { callbacks[k] = fn; } };
  const nodes = { '[data-city-name]': city, '.home-serving-toggle': toggle,
    '[data-city-toggle-icon]': {}, '.home-serving-accessible': {} };
  const root = { querySelector: s => nodes[s], classList: { add() {}, remove() {} } };
  const motion = { matches: reduced, addEventListener(k, fn) { callbacks.motion = fn; } };
  const document = { hidden: false, querySelector: () => root,
    querySelectorAll: () => cities.slice(1).map(textContent => ({ textContent })),
    addEventListener(k, fn) { callbacks[k] = fn; } };
  const window = { matchMedia: () => motion, setTimeout(fn) { timers.set(++id, fn); return id; },
    clearTimeout(key) { timers.delete(key); }, addEventListener(k, fn) { callbacks[k] = fn; } };
  vm.runInNewContext(source, { document, window });
  return { city, toggle, motion, document, callbacks, timers,
    step() { const [key, fn] = timers.entries().next().value; timers.delete(key); fn(); } };
}

const run = setup();
const seen = new Set([run.city.textContent]);
for (let i = 0; i < 300; i++) { run.step(); seen.add(run.city.textContent); }
for (const city of cities) assert.ok(seen.has(city), city);
run.callbacks.click();
assert.equal(run.timers.size, 0);
assert.ok(cities.includes(run.city.textContent));
assert.equal(run.toggle['aria-label'], 'Resume city animation');
run.callbacks.click();
assert.equal(run.timers.size, 1);
run.document.hidden = true;
run.callbacks.visibilitychange();
assert.equal(run.timers.size, 0);
run.document.hidden = false;
run.callbacks.visibilitychange();
assert.equal(run.timers.size, 1);
run.motion.matches = true;
run.callbacks.motion();
assert.equal(run.city.textContent, 'Indianapolis');
assert.equal(run.toggle.hidden, true);
assert.equal(run.timers.size, 0);
const reduced = setup(true);
assert.equal(reduced.city.textContent, 'Indianapolis');
assert.equal(reduced.timers.size, 0);
console.log('PASS: unchanged H1, static fallback, all cities, pause/resume, visibility, reduced motion');
