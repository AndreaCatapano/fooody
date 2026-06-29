/* ============================================================
   FOOODY — Hero engine · particelle
   Entrata: assembly da scatter → fooody al caricamento.
   Scroll: dispersione verso l'alto · forma O · ink.
   BCR (Lenis-safe) · per-particle speed · lerp smooth.
   ============================================================ */
(function () {
  'use strict';

  const REDUCE    = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CAN_HOVER = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp   = (a, b, t) => a + (b - a) * t;
  const clamp  = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const easeIO = p => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const easeIn = p => p * p * p;
  const PI2    = Math.PI * 2;

  /* ---- impostazioni finali ---- */
  const DENSITY = 80;
  const SIZE    = 170;
  const PCOLOR  = '#17130f';  /* ink */
  const SENS    = 1.55;       /* forte */

  /* ---- element refs (re-bind on SPA nav via heroReinit) ---- */
  let hero, stage, canvas, paper, vid, scrollCue, eyebrow, cap;

  function bindElements() {
    hero      = document.getElementById('hero');
    if (!hero) return false;
    stage     = hero.querySelector('.hero-stage');
    canvas    = hero.querySelector('.hero-particles, #hero-particles');
    paper     = hero.querySelector('.hero-paper, #hero-paper');
    vid       = document.getElementById('hero-vid') || hero.querySelector('.hero-vid');
    scrollCue = hero.querySelector('.hero-scroll');
    eyebrow   = hero.querySelector('.hero-eyebrow');
    cap       = hero.querySelector('.hero-cap');
    return !!(stage && canvas);
  }

  /* ---- animation state ---- */
  let mx = 0, my = 0;
  let ctx, parts = [], W = 0, H = 0, cx = 0, cy = 0;
  let built = false;
  let pmx = 0, pmy = 0;
  let eSmooth = 0;
  const ASSEMBLE_DUR = 1800;
  let assembleStart  = 0;

  /* ---- rAF loop control ---- */
  let looping   = false;
  let rafActive = false;
  const FPS_MS  = 1000 / 45;
  let lastFrame = 0;

  /* ---- mouse parallax ---- */
  if (!REDUCE && CAN_HOVER) {
    window.addEventListener('mousemove', e => {
      mx = (e.clientX / innerWidth  - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  /* ---- BCR scroll progress (Lenis-safe) ---- */
  function scrollProg() {
    if (!hero) return 0;
    const range = hero.offsetHeight - innerHeight;
    return clamp(range > 0 ? -hero.getBoundingClientRect().top / range : 0, 0, 1);
  }

  /* ---- build particles from fooody text bitmap ---- */
  function buildParticles() {
    if (!stage || !canvas) return;
    const r = stage.getBoundingClientRect();
    W = Math.round(r.width);
    H = Math.round(r.height);
    if (W === 0 || H === 0) { requestAnimationFrame(buildParticles); return; }

    canvas.width  = W;
    canvas.height = H;
    cx = W / 2; cy = H / 2;
    ctx = canvas.getContext('2d');

    const SW  = Math.min(W, 960);
    const SH  = Math.min(H, 600);
    const scX = W / SW;
    const scY = H / SH;

    const off = document.createElement('canvas');
    off.width = SW; off.height = SH;
    const o = off.getContext('2d');

    const bodyFont = getComputedStyle(document.body).fontFamily
      || '"Helvetica Neue", Helvetica, Arial, sans-serif';
    o.fillStyle    = '#000';
    o.textAlign    = 'center';
    o.textBaseline = 'middle';
    o.font = `700 100px ${bodyFont}`;
    const measured = o.measureText('fooody').width || 100;
    const fs = Math.min(100 * (SW * 0.88) / measured, SH * 0.46);
    o.font = `700 ${fs}px ${bodyFont}`;
    o.fillText('fooody', SW / 2, SH * 0.46);

    const px   = o.getImageData(0, 0, SW, SH).data;
    const step = clamp(Math.round(14 - (DENSITY / 120) * 10), 3, 14);
    const sz   = step * scX * 0.55 * (SIZE / 100);

    parts = [];
    for (let y = 0; y < SH; y += step) {
      for (let x = 0; x < SW; x += step) {
        if (px[(y * SW + x) * 4 + 3] > 128) {
          const sx  = x * scX;
          const sy  = y * scY;
          /* direzione: su */
          const dx  = (sx - cx) * 0.15 + (Math.random() - 0.5) * W * 0.10;
          const dy  = -(0.5 + Math.random() * 0.7) * H;
          parts.push({
            hx: sx, hy: sy, dx, dy, sz,
            ph: Math.random() * PI2,
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
    const eBase  = easeIO(clamp(p * SENS, 0, 1));
    eSmooth = REDUCE ? eBase : lerp(eSmooth, eBase, 0.09);

    const elapsed   = REDUCE ? ASSEMBLE_DUR : (now - assembleStart);
    const assembleE = easeIn(clamp(1 - elapsed / ASSEMBLE_DUR, 0, 1));

    const effectiveE = Math.max(eSmooth, assembleE);

    const alpha = clamp(1 - p * 1.5, 0, 1);
    if (alpha <= 0 && assembleE <= 0) {
      if (paper) paper.style.opacity = '0';
      if (vid)   vid.style.transform = 'scale(1.24)';
      return;
    }

    const t      = now * 0.001;
    const jitter = REDUCE ? 0 : 2.2;
    const AMT    = 14;

    pmx = lerp(pmx, -mx * AMT,        0.08);
    pmy = lerp(pmy, -my * AMT * 0.65, 0.08);

    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = alpha;
    ctx.fillStyle   = PCOLOR;
    ctx.shadowBlur  = 0;

    /* forma O: ogni anello ha il suo path → evenodd senza interferenze */
    for (let i = 0; i < parts.length; i++) {
      const o  = parts[i];
      const pE = easeIO(clamp(effectiveE * o.sp, 0, 1));
      const x  = o.hx + pmx + o.dx * pE + (jitter ? Math.sin(t * 1.3 + o.ph) * jitter : 0);
      const y  = o.hy + pmy + o.dy * pE + (jitter ? Math.cos(t * 1.1 + o.ph) * jitter : 0);
      const sz = o.sz;
      const h  = sz * 0.5;
      ctx.beginPath();
      ctx.arc(x + h, y + h, h,        0, PI2, false);
      ctx.arc(x + h, y + h, h * 0.52, 0, PI2, true);
      ctx.fill('evenodd');
    }

    ctx.globalAlpha = 1;

    if (paper) paper.style.opacity = clamp(1 - p * 1.25, 0, 1).toFixed(3);
    if (vid)   vid.style.transform = `scale(${(1.06 + eSmooth * 0.18).toFixed(3)})`;

    const uiFade = clamp(1 - p * 2.4, 0, 1).toFixed(3);
    [eyebrow, cap, scrollCue].forEach(el => el && (el.style.opacity = uiFade));
  }

  /* ---- rAF loop — pauses when hero is off-screen ---- */
  function loop(now) {
    if (!looping) { rafActive = false; return; }
    if (now - lastFrame >= FPS_MS) {
      lastFrame = now;
      draw(now);
    }
    requestAnimationFrame(loop);
  }

  function startLoop() {
    if (rafActive) return;
    rafActive = true;
    requestAnimationFrame(loop);
  }

  /* ---- IntersectionObserver: pause loop when hero is off-screen ---- */
  function attachObserver() {
    if (!hero) return;
    const io = new IntersectionObserver(entries => {
      looping = entries[0].isIntersecting;
      if (looping) startLoop();
    }, { threshold: 0 });
    io.observe(hero);
  }

  /* ---- resize ---- */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildParticles, 180);
  });

  /* ---- heroReinit: re-bind DOM + restart assembly (called by motionReinit on nav) ---- */
  window.heroReinit = function () {
    if (!bindElements()) return;
    assembleStart = performance.now();
    eSmooth = 0;
    looping = true;
    buildParticles();
    startLoop();
    attachObserver();
  };

  /* ---- boot ---- */
  if (!bindElements()) return;
  assembleStart = performance.now();
  looping = true;
  buildParticles();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildParticles);
  startLoop();
  attachObserver();
})();
