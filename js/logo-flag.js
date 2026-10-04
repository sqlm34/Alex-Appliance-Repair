(() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  if (connection && connection.saveData) return;

  function init() {
    const images = document.querySelectorAll('.header-logo img, .header-mobile-logo img');
    if (!images.length || !window.IntersectionObserver) return;
    const style = document.createElement('style');
    style.textContent = '.flag-logo-wrap{position:relative;display:inline-block;line-height:0;flex:none}.flag-logo-wrap canvas{position:absolute;left:-8%;top:0;width:116%;height:100%;pointer-events:none;max-width:none}.flag-logo-wrap.is-waving>img{opacity:0}';
    document.head.append(style);
    images.forEach(mount);
  }

  function mount(img) {
    if (img.closest('.flag-logo-wrap')) return;
    const wrap = document.createElement('span');
    wrap.className = 'flag-logo-wrap';
    img.before(wrap);
    wrap.append(img);
    const canvas = document.createElement('canvas');
    canvas.width = 278; canvas.height = 450;
    canvas.setAttribute('aria-hidden', 'true');
    wrap.append(canvas);
    const ctx = canvas.getContext('2d');
    const fabric = document.createElement('canvas');
    fabric.width = 240; fabric.height = 450;
    const fc = fabric.getContext('2d');
    if (!ctx || !fc) { wrap.replaceWith(img); return; }
    let visible = false, frame = 0, last = 0, time = 0;
    function stop() { cancelAnimationFrame(frame); last = 0; }
    function draw(now) {
      frame = requestAnimationFrame(draw);
      if (now - last < 1000 / 24) return;
      if (last) time += Math.min(now - last, 80) / 1000;
      last = now;
      const w = 240, h = 450;
      fc.clearRect(0, 0, w, h); fc.drawImage(img, 0, 0, w, h);
      // Apply fold lighting only to opaque fabric, preserving the original outline.
      fc.globalCompositeOperation = 'source-atop';
      for (let row = 0; row < h; row += 6) {
        const v = row / h, amount = Math.sin(Math.min(1, v * 2) * Math.PI / 2);
        const light = fc.createLinearGradient(0, 0, w, 0);
        for (let step = 0; step <= 16; step++) {
          const phase = step / 16 * 11 - v * 4.5 - time * 1.65;
          const slope = Math.cos(phase) + .28 * Math.cos(phase * 1.7 + v * 2);
          const alpha = Math.min(.32, Math.abs(slope) * .23) * amount;
          light.addColorStop(step / 16, (slope > 0 ? 'rgba(210,230,255,' : 'rgba(0,8,24,') + alpha + ')');
        }
        fc.fillStyle = light; fc.fillRect(0, row, w, 6);
      }
      fc.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let row = 0; row < h; row += 2) {
        const v = row / h, weight = v * v;
        const offset = weight * (12 * Math.sin(time * 1.65 - v * 5.2) + 3.3 * Math.sin(time * 2.1 - v * 8));
        const width = w * (1 - .025 * weight * (1 + Math.sin(time * 1.65 - v * 5.2 + .7)));
        ctx.drawImage(fabric, 0, row, w, 2, 19 + offset + (w - width) / 2, row, width, 2.2);
      }
      wrap.classList.add('is-waving');
    }
    function sync() {
      stop();
      const ready = img.complete && img.naturalWidth > 0;
      if (motion.matches) { wrap.classList.remove('is-waving'); ctx.clearRect(0, 0, 278, 450); }
      if (ready && visible && !motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
    }
    img.addEventListener('load', sync);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pagehide', stop);
    window.addEventListener('pageshow', sync);
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(img);
    sync();
  }

  function schedule() {
    if ('requestIdleCallback' in window) requestIdleCallback(init, { timeout: 2500 });
    else setTimeout(init, 600);
  }
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
})();
