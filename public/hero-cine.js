/* ============================================================
   FOOODY — Hero engine · particelle
   Canvas FOOODY text → particelle che si disperdono allo scroll.
   BCR scroll (Lenis-safe) · per-particle speed variation · lerp smooth.
   ============================================================ */
(function () {
  'use strict';

  /* ---- utils ---- */
  const REDUCE    = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CAN_HOVER = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp  = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* ---- elements ---- */
  const hero = document.getElementById('hero');
  if (!hero) return;

  const stage     = hero.querySelector('.hero-stage');
  const canvas    = hero.querySelector('.hero-particles, #hero-particles');
  const paper     = hero.querySelector('.hero-paper, #hero-paper');
  const vid       = document.getElementById('hero-vid') || hero.querySelector('.hero-vid');
  const scrollCue = hero.querySelector('.hero-scroll');
  const eyebrow   = hero.querySelector('.hero-eyebrow');
  const cap       = hero.querySelector('.hero-cap');

  if (!stage || !canvas) return;

  /* ---- color map ---- */
  const COLOR_HEX = { ink: '#17130f', tomato: '#e8442a', paper: '#f7f4ee', cream: '#d2b48c' };
  /* ---- sensitivity map (scroll progress multiplier) ---- */
  const SENS_MAP  = { dolce: 0.6, normale: 1.0, forte: 1.55 };

  /* ---- tweaks state (mutable — updated by tweakchange) ---- */
  const tw   = window.FOOODY_TWEAKS || {};
  let DENSITY = clamp(tw.particleCount    || 80,          20,  120);
  let SIZE    = clamp(tw.particleSize     || 100,         40,  260);
  let DIR     = tw.particleDir    || 'sparpaglia';
  let PCOLOR  = COLOR_HEX[tw.particleColor] || '#17130f';
  let GLOW    = !!tw.glow;
  let SENS    = tw.scrollSensitivity || 'normale';

  /* ---- preview burst: show scatter direction without scrolling ---- */
  let previewE = 0, previewTimer = null;

  /* ---- mouse parallax ---- */
  let mx = 0, my = 0;
  if (!REDUCE && CAN_HOVER) {
    window.addEventListener('mousemove', e => {
      mx = (e.clientX / innerWidth  - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  /* ---- scroll progress (BCR, Lenis-safe) ---- */
  function scrollProg() {
    const range = hero.offsetHeight - innerHeight;
    return clamp(range > 0 ? -hero.getBoundingClientRect().top / range : 0, 0, 1);
  }

  /* ease-in-out quad */
  function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }

  /* ---- canvas state ---- */
  let ctx, parts = [], W = 0, H = 0, cx = 0, cy = 0;
  let built = false;
  let pmx = 0, pmy = 0;
  let eSmooth = 0; /* lerped effective scatter — for silky transitions */

  /* ---- build particles from FOOODY text bitmap ---- */
  function buildParticles() {
    const r = stage.getBoundingClientRect();
    W = Math.round(r.width);
    H = Math.round(r.height);
    if (W === 0 || H === 0) { requestAnimationFrame(buildParticles); return; }

    canvas.width  = W;
    canvas.height = H;
    cx = W / 2; cy = H / 2;
    ctx = canvas.getContext('2d');

    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const o = off.getContext('2d');

    const bodyFont = getComputedStyle(document.body).fontFamily
      || '"Helvetica Neue", Helvetica, Arial, sans-serif';

    o.fillStyle   = '#000';
    o.textAlign   = 'center';
    o.textBaseline = 'middle';
    o.font = `700 100px ${bodyFont}`;
    const measured = o.measureText('FOOODY').width || 100;
    const fs = Math.min(100 * (W * 0.88) / measured, H * 0.46);
    o.font = `700 ${fs}px ${bodyFont}`;
    o.fillText('FOOODY', W / 2, H * 0.46);

    const px   = o.getImageData(0, 0, W, H).data;
    const step = clamp(Math.round(14 - (DENSITY / 120) * 10), 3, 14);
    const sz   = step * 0.55 * (SIZE / 100);

    parts = [];
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (px[(y * W + x) * 4 + 3] > 128) {
          const ang = Math.random() * Math.PI * 2;
          let dx, dy;
          if (DIR === 'su') {
            dx = (x - cx) * 0.15 + (Math.random() - 0.5) * W * 0.10;
            dy = -(0.5 + Math.random() * 0.7) * H;
          } else if (DIR === 'giu') {
            dx = (x - cx) * 0.15 + (Math.random() - 0.5) * W * 0.10;
            dy =  (0.5 + Math.random() * 0.7) * H;
          } else if (DIR === 'sparpaglia') {
            const d = (0.4 + Math.random()) * W * 0.4;
            dx = Math.cos(ang) * d;
            dy = Math.sin(ang) * d * 0.65;
          } else { /* esplode */
            dx = (x - cx) * 0.85 + Math.cos(ang) * W * 0.12;
            dy = (y - cy) * 0.85 + Math.sin(ang) * H * 0.12;
          }
          /* sp: per-particle speed variation → organic stagger */
          parts.push({
            hx: x, hy: y, dx, dy,
            ph: Math.random() * Math.PI * 2,
            sz,
            sp: 0.65 + Math.random() * 0.7,
          });
        }
      }
    }
    built = true;
  }

  /* ---- draw frame ---- */
  function draw(now) {
    if (!ctx || !built) return;

    const p      = scrollProg();
    const sens   = SENS_MAP[SENS] || 1.0;
    const eBase  = ease(clamp(p * sens, 0, 1));
    const eDisp  = Math.max(eBase, previewE); /* preview overrides scroll */
    const t      = now * 0.001;
    const jitter = REDUCE ? 0 : 2.2;
    const AMT    = 14;

    /* smooth lerp — particles drift into position rather than snapping */
    eSmooth = REDUCE ? eDisp : lerp(eSmooth, eDisp, 0.09);

    pmx = lerp(pmx, -mx * AMT,        0.08);
    pmy = lerp(pmy, -my * AMT * 0.65, 0.08);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle   = PCOLOR;
    ctx.globalAlpha = clamp(1 - p * 1.5, 0, 1);

    if (GLOW && !REDUCE) {
      ctx.shadowBlur  = 7 * (SIZE / 100);
      ctx.shadowColor = PCOLOR;
    } else {
      ctx.shadowBlur = 0;
    }

    for (let i = 0; i < parts.length; i++) {
      const o  = parts[i];
      /* each particle uses its own speed to scatter — staggered effect */
      const pE = ease(clamp(eSmooth * o.sp, 0, 1));
      const x  = o.hx + pmx + o.dx * pE + (jitter ? Math.sin(t * 1.3 + o.ph) * jitter : 0);
      const y  = o.hy + pmy + o.dy * pE + (jitter ? Math.cos(t * 1.1 + o.ph) * jitter : 0);
      ctx.fillRect(x, y, o.sz, o.sz);
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur  = 0;

    if (paper) paper.style.opacity = clamp(1 - p * 1.25, 0, 1).toFixed(3);
    if (vid)   vid.style.transform = `scale(${(1.06 + eSmooth * 0.18).toFixed(3)})`;

    const uiFade = clamp(1 - p * 2.4, 0, 1).toFixed(3);
    [eyebrow, cap, scrollCue].forEach(el => el && (el.style.opacity = uiFade));
  }

  /* ---- rAF loop ---- */
  function loop(now) { draw(now); requestAnimationFrame(loop); }

  /* ---- resize ---- */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildParticles, 180);
  });

  /* ---- tweakchange ---- */
  window.addEventListener('tweakchange', e => {
    const d = e.detail || {};
    let rebuild = false, preview = false;
    if ('particleCount'     in d) { DENSITY = clamp(d.particleCount, 20, 120);     rebuild = true; }
    if ('particleSize'      in d) { SIZE    = clamp(d.particleSize,  40, 260);     rebuild = true; }
    if ('particleColor'     in d) { PCOLOR  = COLOR_HEX[d.particleColor] || PCOLOR; }
    if ('glow'              in d) { GLOW    = !!d.glow; }
    if ('scrollSensitivity' in d) { SENS    = d.scrollSensitivity; }
    if ('particleDir'       in d) { DIR     = d.particleDir; rebuild = true; preview = true; }
    if (rebuild) buildParticles();
    if (preview) {
      previewE = 0.48;
      clearTimeout(previewTimer);
      previewTimer = setTimeout(() => { previewE = 0; }, 1600);
    }
  });

  /* ---- boot ---- */
  buildParticles();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildParticles);
  requestAnimationFrame(loop);
})();
