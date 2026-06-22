/* ============================================================
   FOOODY — Motion engine v2
   BCR-only (Lenis-safe) · single rAF loop · reduced-motion aware
   ============================================================ */
(function () {
  'use strict';

  /* ---- utils ---- */
  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CAN_HOVER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const $ = (s, ctx) => (ctx || document).querySelector(s);
  const $$ = (s, ctx) => [...(ctx || document).querySelectorAll(s)];
  const mk = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };

  /* ---- bg tone map ---- */
  const BG = {
    paper:     { bg: '#f7f4ee', fg: '#17130f', ink: false },
    'paper-2': { bg: '#efeae1', fg: '#17130f', ink: false },
    ink:       { bg: '#17130f', fg: '#f7f4ee', ink: true  },
    tomato:    { bg: '#e8442a', fg: '#ffffff', ink: true  },
  };
  const SCENE_BG = { ink: '#17130f', paper: '#f7f4ee', 'paper-2': '#efeae1', tomato: '#e8442a', deep: '#0f0c0a' };

  /* ---- state ---- */
  let reveals   = [];  // { el, threshold }
  let counters  = [];  // { el }
  let bgSects   = [];
  let scrollies = [];  // { root, steps, medias, dots, bar, current }
  let progressBar = null;
  let navEl = null;
  let lastBgKey = null;

  /* ============================================================
     KINETIC TYPE — split at boot
  ============================================================ */
  function initKinetic(root) {
    $$('[data-kinetic="lines"]:not(.kinetic)', root).forEach(el => {
      const frags = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = '';
      el.classList.add('kinetic');
      frags.forEach(html => {
        const line = mk('span', 'kline');
        const inner = mk('span', 'kline-inner');
        inner.innerHTML = html.trim();
        line.appendChild(inner);
        el.appendChild(line);
      });
    });
    $$('[data-kinetic="words"]:not(.kinetic)', root).forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = '';
      el.classList.add('kinetic');
      words.forEach((w, i) => {
        const wrap = mk('span', 'kw');
        const inner = mk('span', 'kw-inner');
        inner.textContent = w;
        inner.style.transitionDelay = (i * 0.04) + 's';
        wrap.appendChild(inner);
        el.appendChild(wrap);
        el.appendChild(document.createTextNode(' '));
      });
    });
  }

  /* ============================================================
     COUNTER — count up on enter
  ============================================================ */
  function countUp(el) {
    const to  = parseFloat(el.getAttribute('data-count'));
    const dec = (el.getAttribute('data-count') || '').includes('.') ? 1 : 0;
    const pre = el.getAttribute('data-pre') || '';
    const suf = el.getAttribute('data-suf') || '';
    if (REDUCE) { el.textContent = pre + to.toFixed(dec) + suf; return; }
    const dur = 1400, t0 = performance.now();
    (function frame(now) {
      const p = clamp((now - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (to * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(frame);
    })(t0);
  }

  /* ============================================================
     SCROLL-TELLING
  ============================================================ */
  function tickScrolly(sc, vh) {
    const rootR = sc.root.getBoundingClientRect();
    // Only process when section overlaps the viewport (+ 100vh buffer)
    if (rootR.bottom < -vh || rootR.top > vh * 2) return;

    let idx = 0;
    for (let i = 0; i < sc.steps.length; i++) {
      if (sc.steps[i].getBoundingClientRect().top < vh * 0.55) idx = i;
    }

    if (idx === sc.current) return;
    sc.current = idx;

    const key   = sc.steps[idx].getAttribute('data-scene');
    const bgKey = sc.steps[idx].getAttribute('data-scene-bg');

    sc.medias.forEach(m => m.classList.toggle('active', m.getAttribute('data-scene') === key));
    sc.dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    if (sc.bar) sc.bar.style.transform = `scaleX(${(idx + 1) / sc.steps.length})`;
    if (bgKey && SCENE_BG[bgKey]) sc.root.style.setProperty('--scene-bg', SCENE_BG[bgKey]);
  }

  /* ============================================================
     MAIN VIEWPORT TICK — runs every rAF frame
  ============================================================ */
  function tick() {
    const vh = window.innerHeight;
    const scrollY = -document.documentElement.getBoundingClientRect().top;

    /* progress bar */
    if (progressBar) {
      const max = document.documentElement.scrollHeight - vh;
      progressBar.style.width = (max > 0 ? clamp(scrollY / max, 0, 1) * 100 : 0) + '%';
    }

    /* nav scrolled class */
    if (navEl) navEl.classList.toggle('scrolled', scrollY > 24);

    /* reveals — fired once then removed */
    for (let i = reveals.length - 1; i >= 0; i--) {
      const r = reveals[i].el.getBoundingClientRect();
      if (r.top < vh * reveals[i].threshold && r.bottom > 0) {
        reveals[i].el.classList.add('is-in');
        reveals.splice(i, 1);
      }
    }

    /* counters — fired once then removed */
    for (let i = counters.length - 1; i >= 0; i--) {
      const r = counters[i].el.getBoundingClientRect();
      if (r.top < vh * 0.88 && r.bottom > 0) {
        countUp(counters[i].el);
        counters.splice(i, 1);
      }
    }

    /* reactive background */
    if (bgSects.length) {
      let active = null;
      for (const s of bgSects) {
        const r = s.getBoundingClientRect();
        if (r.top <= vh * 0.5) active = s;
        else break;
      }
      if (active) {
        const key = active.getAttribute('data-bg');
        if (key !== lastBgKey) {
          lastBgKey = key;
          const t = BG[key];
          if (t) {
            document.body.style.setProperty('--bg', t.bg);
            document.body.style.setProperty('--fg', t.fg);
            document.body.classList.toggle('on-ink-mode', t.ink);
            if (navEl) navEl.classList.toggle('on-ink', t.ink);
            document.body.style.setProperty('--cursor-c', t.ink ? '#f7f4ee' : '#17130f');
          }
        }
      }
    }

    /* scroll-telling */
    for (const sc of scrollies) tickScrolly(sc, vh);
  }

  /* ============================================================
     INIT HELPERS  (root param lets reinit scope to #main-content)
  ============================================================ */
  function initReveal(root) {
    $$('[data-reveal], .kinetic', root).forEach(el => reveals.push({ el, threshold: 0.9 }));
  }

  function initCounters(root) {
    $$('[data-count]', root).forEach(el => counters.push({ el }));
  }

  function initBg() {
    bgSects     = $$('[data-bg]');
    navEl       = navEl       || $('.nav');
    progressBar = progressBar || $('.scroll-progress');
  }

  function initScrolly(root) {
    $$('[data-scrolly]', root).forEach(sect => {
      scrollies.push({
        root:    sect,
        steps:   $$('.scrolly-step', sect),
        medias:  $$('.scene-media',  sect),
        dots:    $$('[data-chapter-step]', sect),
        bar:     $('[data-scrolly-progress]', sect),
        current: -1,
      });
    });
  }

  /* ============================================================
     NAV mobile toggle
  ============================================================ */
  function initNav() {
    const nav = $('.nav');
    if (!nav) return;
    const toggle = $('.nav-toggle', nav);
    const links  = $('.nav-links', nav);
    if (!toggle || !links) return;
    const label = $('.nav-toggle-label', toggle) || toggle;
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('menu-open');
      label.textContent = open ? 'Chiudi' : 'Menu';
      if (open && !$('.nav-mobile-cta', links)) {
        const cta = $('.nav-cta', nav);
        if (cta) {
          const c = cta.cloneNode(true);
          c.classList.replace('nav-cta', 'nav-mobile-cta');
          c.removeAttribute('data-magnetic');
          links.appendChild(c);
        }
      }
    });
    links.addEventListener('click', e => {
      if (e.target.closest('a') && nav.classList.contains('menu-open')) {
        nav.classList.remove('menu-open');
        label.textContent = 'Menu';
      }
    });
  }

  /* ============================================================
     MARQUEE
  ============================================================ */
  function initMarquee() {
    $$('.marquee-track').forEach(t => { t.innerHTML += t.innerHTML; });
  }

  /* ============================================================
     MAGNETIC CURSOR
  ============================================================ */
  function initCursor() {
    if (!CAN_HOVER) return;
    document.body.classList.add('has-cursor');
    const dot     = mk('div', 'cursor-dot');
    const ring    = mk('div', 'cursor-ring');
    const label   = mk('div', 'cursor-label');
    const preview = mk('div', 'cursor-preview');
    const pImg    = mk('div');
    pImg.style.cssText = 'width:100%;height:100%';
    preview.appendChild(pImg);
    document.body.append(dot, ring, label, preview);

    // Set initial cursor color from the first visible bg section
    const firstBg = bgSects.find(s => s.getBoundingClientRect().top <= innerHeight * 0.5) || bgSects[0];
    const initKey = firstBg?.getAttribute('data-bg') || 'paper';
    const initT = BG[initKey];
    if (initT) document.body.style.setProperty('--cursor-c', initT.ink ? '#f7f4ee' : '#17130f');

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, down = false;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      // dot and label: GPU transform, no layout cost
      dot.style.transform   = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      label.style.transform = `translate(${mx}px,${my + 46}px) translate(-50%,-50%)`;
      // preview: position via transform; scale is handled by CSS `scale` property separately
      preview.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    window.addEventListener('mousedown', () => { down = true; });
    window.addEventListener('mouseup',   () => { down = false; });

    (function rafRing() {
      rx = lerp(rx, mx, 0.14); ry = lerp(ry, my, 0.14);
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${down ? 0.75 : 1})`;
      requestAnimationFrame(rafRing);
    })();

    const SEL = 'a,button,[data-magnetic],.chip,input,textarea,select,[data-cursor]';
    document.addEventListener('mouseover', e => {
      const t = e.target.closest(SEL);
      if (!t) return;
      ring.classList.add('is-hover');
      const lbl = t.getAttribute('data-cursor');
      if (lbl) { label.textContent = lbl; label.classList.add('show'); ring.classList.add('is-label'); }
      const prev = t.getAttribute('data-preview');
      if (prev) {
        pImg.style.cssText = `width:100%;height:100%;background:${prev};background-size:cover;background-position:center;background-image:repeating-linear-gradient(135deg,rgba(247,244,238,.10) 0 1px,transparent 1px 9px);background-color:#211c17`;
        const cap = t.getAttribute('data-preview-label');
        if (cap) {
          pImg.style.display = 'grid'; pImg.style.placeItems = 'center';
          pImg.innerHTML = `<span style="font-family:var(--mono);font-size:.62rem;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-3);background:#17130f;padding:5px 9px;border-radius:999px">${cap}</span>`;
        }
        preview.classList.add('show');
      }
    });
    // Use relatedTarget to avoid flickering when mouse moves between children of the same SEL element
    document.addEventListener('mouseout', e => {
      const from = e.target.closest(SEL);
      if (!from) return;
      const to = e.relatedTarget?.closest(SEL);
      if (to === from) return; // still inside the same interactive element
      ring.classList.remove('is-hover', 'is-label');
      label.classList.remove('show');
      preview.classList.remove('show');
    });
  }

  /* ============================================================
     MAGNETIC ELEMENTS
  ============================================================ */
  function initMagnetic(root) {
    if (!CAN_HOVER || REDUCE) return;
    $$('[data-magnetic]', root).forEach(el => {
      const str   = parseFloat(el.getAttribute('data-magnetic')) || 0.3;
      const inner = $('[data-magnetic-inner]', el) || el;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) * str;
        const y = (e.clientY - r.top  - r.height / 2) * str;
        el.style.transform    = `translate(${x}px,${y}px)`;
        inner.style.transform = `translate(${x * 0.4}px,${y * 0.4}px)`;
      });
      el.addEventListener('mouseleave', () => {
        const t = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
        el.style.transition = inner.style.transition = t;
        el.style.transform  = inner.style.transform  = '';
        setTimeout(() => { el.style.transition = inner.style.transition = ''; }, 600);
      });
    });
  }

  /* ============================================================
     TILT cards
  ============================================================ */
  function initTilt(root) {
    if (!CAN_HOVER || REDUCE) return;
    $$('[data-tilt]', root).forEach(card => {
      const max = parseFloat(card.getAttribute('data-tilt')) || 6;
      card.style.transformStyle = 'preserve-3d';
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width  - 0.5;
        const py = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
        card.style.transform  = '';
        setTimeout(() => { card.style.transition = ''; }, 600);
      });
    });
  }

  /* ============================================================
     WORK hover (home)
  ============================================================ */
  function initWork(root) {
    const mode = () => (window.FOOODY_TWEAKS || {}).workHover || 'tilt';
    if (!root) document.body.classList.add('wh-' + mode()); // only set body class on first boot
    if (!CAN_HOVER || REDUCE) return;
    $$('.work', root).forEach(card => {
      card.addEventListener('mousemove', e => {
        if (mode() !== 'tilt') return;
        const r  = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width  - 0.5;
        const py = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${(px * 5).toFixed(2)}deg) rotateX(${(-py * 5).toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform .6s var(--ease)';
        card.style.transform  = '';
        setTimeout(() => { card.style.transition = ''; }, 600);
      });
    });
  }

  /* ============================================================
     BOOT
  ============================================================ */
  function boot() {
    initKinetic(document);
    initReveal(document);
    initCounters(document);
    initBg();
    initScrolly(document);
    initNav();
    initMarquee();
    initCursor();
    initMagnetic();
    initTilt();
    initWork();
    /* single viewport rAF loop */
    (function loop() { tick(); requestAnimationFrame(loop); })();
    window.addEventListener('resize', tick, { passive: true });

    /* absolute fallback: never leave content hidden */
    setTimeout(() => {
      $$('[data-reveal], .kinetic').forEach(el => el.classList.add('is-in'));
    }, 3000);
  }

  /* re-init after client-side navigation — called by PageTransition */
  window.motionReinit = function () {
    const main = document.getElementById('main-content') || document.body;
    reveals   = [];
    counters  = [];
    scrollies = [];
    lastBgKey = null;
    bgSects   = $$('[data-bg]');
    initKinetic(main);
    initReveal(main);
    initCounters(main);
    initScrolly(main);
    initMagnetic(main);
    initTilt(main);
    initWork(main);
    if (window.heroReinit) window.heroReinit();
    setTimeout(() => $$('[data-reveal], .kinetic', main).forEach(el => el.classList.add('is-in')), 3000);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
