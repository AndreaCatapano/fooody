/* ============================================================
   FOOODY — Hero engine · mode-particelle
   Particelle che compongono FOOODY e si disperdono con lo scroll.
   Scroll position via BCR (Lenis-safe).
   ============================================================ */
(function () {
  'use strict';

  /* ---- utils ---- */
  const REDUCE    = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CAN_HOVER = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp  = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* ---- find elements — graceful, no early exit on missing IDs ---- */
  const hero      = document.getElementById('hero');
  if (!hero) return;                          // not on home page, stop here

  const stage     = hero.querySelector('.hero-stage');
  const canvas    = hero.querySelector('.hero-particles, #hero-particles');
  const paper     = hero.querySelector('.hero-paper, #hero-paper');
  const vid       = document.getElementById('hero-vid') || hero.querySelector('.hero-vid');
  const scrollCue = hero.querySelector('.hero-scroll');
  const eyebrow   = hero.querySelector('.hero-eyebrow');
  const cap       = hero.querySelector('.hero-cap');

  if (!stage || !canvas) return;             // can't draw without these two

  /* ---- config from tweaks (mutable so tweakchange can update) ---- */
  const tw  = window.FOOODY_TWEAKS || {};
  let DENSITY = clamp(tw.particleCount || 80, 20, 120);
  let DIR     = tw.particleDir || 'sparpaglia';

  /* ---- mouse parallax ---- */
  let mx = 0, my = 0;
  if (!REDUCE && CAN_HOVER) {
    window.addEventListener('mousemove', e => {
      mx = (e.clientX / innerWidth  - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  /* ---- BCR-based scroll progress (Lenis-safe) ---- */
  function scrollProg() {
    const range = hero.offsetHeight - innerHeight;
    return clamp(range > 0 ? -hero.getBoundingClientRect().top / range : 0, 0, 1);
  }
  function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }

  /* ---- particle state ---- */
  let ctx, parts = [], W = 0, H = 0, cx = 0, cy = 0;
  let built = false;
  let pmx = 0, pmy = 0;

  /* ---- build particles from text bitmap ---- */
  function buildParticles() {
    const r = stage.getBoundingClientRect();
    W = Math.round(r.width);
    H = Math.round(r.height);

    if (W === 0 || H === 0) {
      /* stage not laid out yet — retry next frame */
      requestAnimationFrame(buildParticles);
      return;
    }

    canvas.width  = W;
    canvas.height = H;
    cx = W / 2;
    cy = H / 2;
    ctx = canvas.getContext('2d');

    /* offscreen canvas to sample text pixels */
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const o = off.getContext('2d');

    /* font: use the actual loaded body font (sans-serif stack).
       We read the computed font-family from a live element so the
       Next.js local font variable is resolved to its actual name. */
    const bodyFont = getComputedStyle(document.body).fontFamily
      || '"Helvetica Neue", Helvetica, Arial, sans-serif';

    o.fillStyle   = '#000';
    o.textAlign   = 'center';
    o.textBaseline = 'middle';

    /* measure at 100 px then scale to fill ~88 % of width */
    o.font = `700 100px ${bodyFont}`;
    const measured = o.measureText('FOOODY').width || 100;
    const fs = Math.min(100 * (W * 0.88) / measured, H * 0.46);
    o.font = `700 ${fs}px ${bodyFont}`;
    o.fillText('FOOODY', W / 2, H * 0.46);

    const px   = o.getImageData(0, 0, W, H).data;
    const step = clamp(Math.round(14 - (DENSITY / 120) * 10), 3, 14);

    parts = [];
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (px[(y * W + x) * 4 + 3] > 128) {
          const ang = Math.random() * Math.PI * 2;
          let dx, dy;
          if (DIR === 'su') {
            dx = (x - cx) * 0.15 + (Math.random() - 0.5) * W * 0.10;
            dy = -(0.5  + Math.random() * 0.7) * H;
          } else if (DIR === 'giu') {
            dx = (x - cx) * 0.15 + (Math.random() - 0.5) * W * 0.10;
            dy =  (0.5  + Math.random() * 0.7) * H;
          } else if (DIR === 'sparpaglia') {
            const d = (0.4 + Math.random()) * W * 0.4;
            dx = Math.cos(ang) * d;
            dy = Math.sin(ang) * d * 0.65;
          } else {
            /* esplode: radiale dal centro */
            dx = (x - cx) * 0.85 + Math.cos(ang) * W * 0.12;
            dy = (y - cy) * 0.85 + Math.sin(ang) * H * 0.12;
          }
          parts.push({ hx: x, hy: y, dx, dy, ph: Math.random() * Math.PI * 2, sz: step * 0.55 });
        }
      }
    }
    built = true;
  }

  /* ---- draw frame ---- */
  function draw(now) {
    if (!ctx || !built) return;

    const p  = scrollProg();
    const e  = ease(p);
    const t  = now * 0.001;
    const jitter = REDUCE ? 0 : 2.0;
    const AMT    = 14;                        /* parallax amplitude px */

    pmx = lerp(pmx, -mx * AMT,        0.08);
    pmy = lerp(pmy, -my * AMT * 0.65, 0.08);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle  = '#17130f';
    ctx.globalAlpha = clamp(1 - p * 1.5, 0, 1);

    for (let i = 0; i < parts.length; i++) {
      const o = parts[i];
      const x = o.hx + pmx + o.dx * e + (jitter ? Math.sin(t * 1.3 + o.ph) * jitter : 0);
      const y = o.hy + pmy + o.dy * e + (jitter ? Math.cos(t * 1.1 + o.ph) * jitter : 0);
      ctx.fillRect(x, y, o.sz, o.sz);
    }
    ctx.globalAlpha = 1;

    /* reveal video as particles scatter */
    if (paper) paper.style.opacity     = clamp(1 - p * 1.25, 0, 1).toFixed(3);
    if (vid)   vid.style.transform     = `scale(${(1.06 + e * 0.18).toFixed(3)})`;

    /* fade auxiliary UI elements */
    const uiFade = clamp(1 - p * 2.4, 0, 1).toFixed(3);
    [eyebrow, cap, scrollCue].forEach(el => el && (el.style.opacity = uiFade));
  }

  /* ---- rAF loop ---- */
  function loop(now) {
    draw(now);
    requestAnimationFrame(loop);
  }

  /* ---- resize — debounced rebuild ---- */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildParticles, 180);
  });

  /* ---- tweakchange: rebuild if particle params change ---- */
  window.addEventListener('tweakchange', e => {
    const d = e.detail || {};
    let rebuild = false;
    if ('particleCount' in d) { DENSITY = clamp(d.particleCount, 20, 120); rebuild = true; }
    if ('particleDir'   in d) { DIR     = d.particleDir;                   rebuild = true; }
    if (rebuild) buildParticles();
  });

  /* ---- boot: build now, then rebuild after fonts load ---- */
  buildParticles();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(buildParticles);
  }
  requestAnimationFrame(loop);
})();
