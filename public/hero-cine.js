/* ============================================================
   FOODY — Hero engine
   Modi (Tweak "Effetto"):
   · cinematic  → scrollando, le lettere FOOODY crescono/svaniscono
                  e il video si apre a tutto schermo
   · particelle → FOOODY fatto di particelle; nello scroll si
                  disperdono e la carta si apre sul video (come cinematic)
   · reel       → muro di reel 9:16 in scorrimento, poi scroll normale
   · cola       → wordmark "caramello" con gocce che colano (filtro gooey)
   Tutto pilotato in JS (rAF) per robustezza. Config via
   window.FOOODY_TWEAKS + evento 'tweakchange'.
   ============================================================ */
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp = (a, b, n) => a + (b - a) * n;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const KNOWN = ['particelle', 'reel', 'cola'];

  const hero = document.getElementById('hero');
  const stage = hero && hero.querySelector('.hero-stage');
  const vid = document.getElementById('hero-vid');
  const knockout = document.getElementById('hero-knockout');
  const textEl = document.getElementById('foody-text');
  const paper = document.getElementById('hero-paper');
  const canvas = document.getElementById('hero-particles');
  const reels = document.getElementById('hero-reels');
  const cola = document.getElementById('hero-cola');
  const eyebrow = hero && hero.querySelector('.hero-eyebrow');
  const cap = hero && hero.querySelector('.hero-cap');
  const capText = document.getElementById('hero-cap-text');
  const scrollCue = hero && hero.querySelector('.hero-scroll');
  if (!hero || !vid || !knockout || !textEl) return;

  const cfg = Object.assign({
    hero: 'particelle', parallax: 55, workHover: 'tilt',
    particleCount: 60, particleDir: 'esplode', reelSpeed: 100
  }, window.FOOODY_TWEAKS || {});
  if (!KNOWN.includes(cfg.hero)) cfg.hero = 'particelle';

  const CAP = {
    particelle: 'le particelle si aprono sul video · scrolla',
    reel: 'showreel · formati 9:16 · scrolla per entrare',
    cola: 'identità che si appiccica · come il caramello'
  };

  let mx = 0, my = 0;
  if (!reduce && canHover) {
    window.addEventListener('mousemove', e => {
      mx = ((e.clientX / window.innerWidth) - 0.5) * 2;
      my = ((e.clientY / window.innerHeight) - 0.5) * 2;
    }, { passive: true });
  }

  function scrollProgress() {
    const range = hero.offsetHeight - window.innerHeight;
    const top = hero.getBoundingClientRect().top;
    return clamp(range > 0 ? -top / range : 0, 0, 1);
  }
  function easeInOut(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }

  /* ============================================================
     CINEMATIC
     ============================================================ */
  const meas = document.createElement('canvas').getContext('2d');
  function sizeText() {
    const r = hero.getBoundingClientRect();
    const w = r.width, h = Math.min(r.height, window.innerHeight);
    meas.font = '800 100px "Archivo Expanded","Archivo",sans-serif';
    const w100 = meas.measureText('FOOODY').width || 100;
    let px = 100 * (w * 0.92) / w100;
    px = Math.min(px, h * 0.42);
    textEl.style.fontSize = px + 'px';
  }
  function cineScroll() {
    const p = scrollProgress(), e = easeInOut(p);
    knockout.style.transform = `scale(${(1 + e * 0.7).toFixed(3)})`;
    knockout.style.opacity = (1 - Math.min(1, p * 1.25)).toFixed(3);
    vid.style.transform = `scale(${(1.06 + e * 0.16).toFixed(3)})`;
    const fade = (1 - Math.min(1, p * 2.4)).toFixed(3);
    [eyebrow, cap, scrollCue].forEach(el => el && (el.style.opacity = fade));
  }

  /* ============================================================
     PARTICELLE — FOOODY di particelle, si disperde sul video
     ============================================================ */
  let pctx, parts = [], pW = 0, pH = 0, pcx = 0, pcy = 0, pBuilt = false, pmx = 0, pmy = 0;
  function buildParticles() {
    if (!canvas || !stage) return;
    const r = stage.getBoundingClientRect();
    pW = canvas.width = Math.round(r.width);
    pH = canvas.height = Math.round(r.height);
    pcx = pW / 2; pcy = pH / 2;
    pctx = canvas.getContext('2d');
    const oc = document.createElement('canvas'); oc.width = pW; oc.height = pH;
    const o = oc.getContext('2d');
    o.fillStyle = '#000'; o.textAlign = 'center'; o.textBaseline = 'middle';
    o.font = '800 100px "Archivo Expanded","Archivo",sans-serif';
    const w100 = o.measureText('FOOODY').width || 100;
    const fs = Math.min(100 * (pW * 0.9) / w100, pH * 0.5);
    o.font = `800 ${fs}px "Archivo Expanded","Archivo",sans-serif`;
    o.fillText('FOOODY', pW / 2, pH * 0.46);
    const data = o.getImageData(0, 0, pW, pH).data;
    const density = clamp(cfg.particleCount || 60, 20, 100);
    const step = clamp(Math.round(14 - (density / 100) * 10), 4, 14);
    const dir = cfg.particleDir || 'esplode';
    parts = [];
    for (let y = 0; y < pH; y += step) {
      for (let x = 0; x < pW; x += step) {
        if (data[(y * pW + x) * 4 + 3] > 128) {
          const ang = Math.random() * Math.PI * 2;
          let dx, dy;
          if (dir === 'su') {
            dx = (x - pcx) * 0.18 + (Math.random() - .5) * pW * 0.12;
            dy = -(0.55 + Math.random() * 0.7) * pH;
          } else if (dir === 'giu') {
            dx = (x - pcx) * 0.18 + (Math.random() - .5) * pW * 0.12;
            dy = (0.55 + Math.random() * 0.7) * pH;
          } else if (dir === 'sparpaglia') {
            const d = (0.45 + Math.random()) * pW * 0.42;
            dx = Math.cos(ang) * d; dy = Math.sin(ang) * d * 0.7;
          } else { // esplode (radiale dal centro)
            dx = (x - pcx) * 0.85 + Math.cos(ang) * pW * 0.14;
            dy = (y - pcy) * 0.85 + Math.sin(ang) * pH * 0.14;
          }
          parts.push({ hx: x, hy: y, dx, dy, ph: Math.random() * Math.PI * 2, sz: step * 0.6 });
        }
      }
    }
    pBuilt = true;
  }
  function drawParticles(now) {
    if (!pctx || !pBuilt) return;
    const p = scrollProgress(), e = easeInOut(p);
    const amt = (cfg.parallax / 100) * 26;
    pmx = lerp(pmx, -mx * amt, 0.08);
    pmy = lerp(pmy, -my * amt * 0.7, 0.08);
    pctx.clearRect(0, 0, pW, pH);
    pctx.fillStyle = '#17130f';
    pctx.globalAlpha = 1 - Math.min(1, p * 1.5);
    const t = now * 0.001, jit = reduce ? 0 : 2.2;
    for (let i = 0; i < parts.length; i++) {
      const o = parts[i];
      const x = o.hx + pmx + (jit ? Math.sin(t * 1.3 + o.ph) * jit : 0) + o.dx * e;
      const y = o.hy + pmy + (jit ? Math.cos(t * 1.1 + o.ph) * jit : 0) + o.dy * e;
      pctx.fillRect(x, y, o.sz, o.sz);
    }
    pctx.globalAlpha = 1;
    if (paper) paper.style.opacity = (1 - Math.min(1, p * 1.25)).toFixed(3);
    vid.style.transform = `scale(${(1.06 + e * 0.2).toFixed(3)})`;
    const fade = (1 - Math.min(1, p * 2.4)).toFixed(3);
    [eyebrow, cap, scrollCue].forEach(el => el && (el.style.opacity = fade));
  }

  /* ============================================================
     REEL — muro di reel 9:16 in scorrimento
     ============================================================ */
  let reelTracks = [], reelOff = 0;
  function buildReels() {
    if (!reels) return;
    reels.innerHTML = '';
    reelTracks = [];
    const tags = ['reel · ricetta', 'reel · backstage', 'spot · 15"', 'social · trend',
      'reel · plating', 'format · how-to', 'reel · review', 'spot · brand'];
    for (let row = 0; row < 2; row++) {
      const track = document.createElement('div');
      track.className = 'reel-row';
      for (let k = 0; k < 8; k++) {
        const card = document.createElement('div');
        card.className = 'reel-card';
        card.innerHTML = '<div class="reel-play">\u25B6</div>' +
          '<span class="reel-tag">' + tags[(row * 4 + k) % tags.length] + '</span>';
        track.appendChild(card);
      }
      track.innerHTML += track.innerHTML; // duplica per loop continuo
      reels.appendChild(track);
      reelTracks.push({ el: track, dir: row % 2 ? -1 : 1, w: 0 });
    }
    requestAnimationFrame(() => reelTracks.forEach(t => { t.w = t.el.scrollWidth / 2; }));
  }
  function updateReel() {
    reelOff += 0.5 * ((cfg.reelSpeed || 100) / 100);
    for (const t of reelTracks) {
      const w = t.w || (t.w = t.el.scrollWidth / 2) || 1;
      const base = reelOff % w;
      const x = t.dir > 0 ? -base : (base - w);
      t.el.style.transform = `translateX(${x.toFixed(1)}px)`;
    }
  }

  /* ============================================================
     COLA — gocce che colano dalla wordmark (filtro gooey)
     ============================================================ */
  const drips = cola ? [...cola.querySelectorAll('.drip')] : [];
  function updateCola(now) {
    if (!drips.length) return;
    const t = now * 0.001;
    for (const d of drips) {
      const dur = parseFloat(d.style.getPropertyValue('--dur')) || 5;
      const dl = parseFloat(d.style.getPropertyValue('--dl')) || 0;
      const dx = parseFloat(d.style.getPropertyValue('--dx')) || 600;
      const phase = (((t + dl) % dur) + dur) % dur / dur;
      const y = 250 + (430 - 250) * phase;
      const sc = 0.5 + phase * 0.8;
      const op = phase < 0.12 ? phase / 0.12 : (phase > 0.85 ? (1 - phase) / 0.15 : 1);
      d.setAttribute('transform', `translate(${dx},${y.toFixed(1)}) scale(${sc.toFixed(2)})`);
      d.style.opacity = clamp(op, 0, 1).toFixed(2);
    }
  }

  /* ============================================================
     HOVER PROGETTI (home) — Tweak workHover: tilt | lift | off
     ============================================================ */
  function applyWorkHover() {
    const m = cfg.workHover || 'tilt';
    document.body.classList.remove('wh-tilt', 'wh-lift', 'wh-zoom', 'wh-off');
    document.body.classList.add('wh-' + m);
  }
  function initWork() {
    if (!canHover || reduce) return;
    document.querySelectorAll('.work').forEach(card => {
      card.addEventListener('mousemove', e => {
        if ((cfg.workHover || 'tilt') !== 'tilt') return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${(px * 5).toFixed(2)}deg) rotateX(${(-py * 5).toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform .6s var(--ease)';
        card.style.transform = '';
        setTimeout(() => { card.style.transition = ''; }, 600);
      });
    });
  }

  /* ============================================================
     MODE
     ============================================================ */
  function applyMode() {
    const m = KNOWN.includes(cfg.hero) ? cfg.hero : 'cinematic';
    KNOWN.forEach(k => hero.classList.toggle('mode-' + k, k === m));

    // reset
    knockout.style.transform = ''; knockout.style.opacity = '';
    vid.style.transform = '';
    if (paper) paper.style.opacity = '';
    [eyebrow, cap, scrollCue].forEach(el => el && (el.style.opacity = ''));

    hero.setAttribute('data-bg', m === 'reel' ? 'ink' : 'paper');
    window.dispatchEvent(new Event('scroll')); // nudge reactive-bg
    if (capText) capText.textContent = CAP[m] || '';

    if (m === 'cinematic') { sizeText(); cineScroll(); }
    else if (m === 'particelle') { buildParticles(); }
    else if (m === 'reel') { buildReels(); }
    else if (m === 'cola') { drips.forEach(d => d.style.opacity = '0'); }
  }

  /* ---- main rAF loop (solo l'effetto attivo lavora) ---- */
  function loop(now) {
    const m = cfg.hero;
    if (m === 'particelle') drawParticles(now);
    else if (m === 'reel') updateReel();
    else if (m === 'cola') updateCola(now);
    requestAnimationFrame(loop);
  }

  /* ---- tweaks ---- */
  window.addEventListener('tweakchange', e => {
    const ed = e.detail || {};
    let modeChanged = false, rebuildParts = false;
    if ('hero' in ed && ed.hero !== cfg.hero) {
      cfg.hero = KNOWN.includes(ed.hero) ? ed.hero : 'particelle';
      modeChanged = true;
    }
    if ('parallax' in ed) cfg.parallax = ed.parallax;
    if ('reelSpeed' in ed) cfg.reelSpeed = ed.reelSpeed;
    if ('particleCount' in ed && ed.particleCount !== cfg.particleCount) { cfg.particleCount = ed.particleCount; rebuildParts = true; }
    if ('particleDir' in ed && ed.particleDir !== cfg.particleDir) { cfg.particleDir = ed.particleDir; rebuildParts = true; }
    if ('workHover' in ed) { cfg.workHover = ed.workHover; applyWorkHover(); }
    if (modeChanged) applyMode();
    else if (rebuildParts && cfg.hero === 'particelle') buildParticles();
  });

  /* ---- boot ---- */
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      if (cfg.hero === 'cinematic') { sizeText(); cineScroll(); }
      else if (cfg.hero === 'particelle') buildParticles();
      else if (cfg.hero === 'reel') buildReels();
    }, 160);
  });
  window.addEventListener('scroll', () => requestAnimationFrame(() => {
    if (cfg.hero === 'cinematic') cineScroll();
  }), { passive: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (cfg.hero === 'cinematic') sizeText();
      else if (cfg.hero === 'particelle') buildParticles();
    });
  }
  applyMode();
  applyWorkHover();
  initWork();
  requestAnimationFrame(loop);
})();
