(function () {
  'use strict';
  const root = document.querySelector('[data-service-cities]');
  if (!root) return;
  const city = root.querySelector('[data-city-name]');
  const toggle = root.querySelector('.home-serving-toggle');
  const icon = root.querySelector('[data-city-toggle-icon]');
  const accessible = root.querySelector('.home-serving-accessible');
  const initial = city.textContent.trim();
  const cities = [...new Set([initial, ...Array.from(
    document.querySelectorAll('.home-area-card-grid h3 a'), link => link.textContent.trim()
  )].filter(Boolean))];
  if (cities.length < 2) return;
  accessible.textContent = 'Serving ' + cities.join(', ') + '.';

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let letters = initial.length;
  let deleting = true;
  let paused = false;
  let visible = !('IntersectionObserver' in window);
  let timer;

  function stop() {
    window.clearTimeout(timer);
    root.classList.remove('is-animating');
  }

  function schedule(delay) {
    timer = window.setTimeout(tick, delay);
  }

  function tick() {
    if (paused || motion.matches || document.hidden || !visible) return stop();
    letters += deleting ? -1 : 1;
    city.textContent = cities[index].slice(0, letters);
    if (deleting && letters === 0) {
      index = (index + 1) % cities.length;
      deleting = false;
      schedule(300);
    } else if (!deleting && letters === cities[index].length) {
      deleting = true;
      schedule(2400);
    } else {
      schedule(deleting ? 45 : 95);
    }
  }

  // Resume from a complete city, never leave half a word on pause or tab return.
  function sync() {
    stop();
    if (motion.matches) index = 0;
    letters = cities[index].length;
    deleting = true;
    city.textContent = cities[index];
    toggle.hidden = motion.matches;
    const label = paused ? 'Resume city animation' : 'Pause city animation';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    icon.textContent = paused ? '\u25b6' : '\u275a\u275a';
    if (paused || motion.matches || document.hidden || !visible) return;
    root.classList.add('is-animating');
    schedule(2400);
  }

  toggle.addEventListener('click', function () { paused = !paused; sync(); });
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', sync);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      sync();
    });
    observer.observe(root);
  }
  sync();
}());
