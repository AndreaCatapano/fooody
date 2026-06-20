/* ============================================================
   FOODY — Motion & Interaction engine
   cursor magnetico · bg reattivo · type cinetico ·
   maschera transizioni · scroll-telling · reveal
   ============================================================ */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp = (a, b, n) => a + (b - a) * n;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---------------------------------------------------------
     1. CUSTOM MAGNETIC CURSOR
  --------------------------------------------------------- */
  function initCursor() {
    if (!canHover) return;
    document.body.classList.add('has-cursor');
    const dot = el('div', 'cursor-dot');
    const ring = el('div', 'cursor-ring');
    const label = el('div', 'cursor-label');
    const preview = el('div', 'cursor-preview');
    const previewImg = document.createElement('div');
    previewImg.style.cssText = 'width:100%;height:100%';
    preview.appendChild(previewImg);
    document.body.append(dot, ring, label, preview);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let down = false;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      label.style.left = mx + 'px'; label.style.top = (my + 46) + 'px';
      preview.style.left = mx + 'px'; preview.style.top = my + 'px';
    });
    window.addEventListener('mousedown', () => { down = true; });
    window.addEventListener('mouseup', () => { down = false; });

    (function raf() {
      rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18);
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${down ? 0.8 : 1})`;
      requestAnimationFrame(raf);
    })();

    // interactive targets
    const hoverSel = 'a, button, [data-magnetic], .chip, input, textarea, [data-cursor]';
    document.addEventListener('mouseover', e => {
      const t = e.target.closest(hoverSel);
      if (!t) return;
      ring.classList.add('is-hover');
      const lbl = t.getAttribute('data-cursor');
      if (lbl) { label.textContent = lbl; label.classList.add('show'); ring.classList.add('is-label'); }
      const prev = t.getAttribute('data-preview');
      if (prev) {
        previewImg.style.cssText = `width:100%;height:100%;background:${prev};` +
          `background-size:cover;background-position:center;` +
          `background-image:repeating-linear-gradient(135deg,rgba(247,244,238,.10) 0 1px,transparent 1px 9px);` +
          `background-color:#211c17`;
        const cap = t.getAttribute('data-preview-label');
        if (cap) {
          previewImg.style.display = 'grid';
          previewImg.style.placeItems = 'center';
          previewImg.innerHTML = `<span style="font-family:var(--mono);font-size:.62rem;` +
            `text-transform:uppercase;letter-spacing:.1em;color:var(--ink-3);` +
            `background:#17130f;padding:5px 9px;border-radius:999px">${cap}</span>`;
        }
        preview.classList.add('show');
      }
    });
    document.addEventListener('mouseout', e => {
      const t = e.target.closest(hoverSel);
      if (!t) return;
      ring.classList.remove('is-hover', 'is-label');
      label.classList.remove('show');
      preview.classList.remove('show');
    });
  }

  /* ---------------------------------------------------------
     2. MAGNETIC ELEMENTS
  --------------------------------------------------------- */
  function initMagnetic() {
    if (!canHover || reduce) return;
    document.querySelectorAll('[data-magnetic]').forEach(elm => {
      const strength = parseFloat(elm.getAttribute('data-magnetic')) || 0.3;
      const inner = elm.querySelector('[data-magnetic-inner]') || elm;
      elm.addEventListener('mousemove', e => {
        const r = elm.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        elm.style.transform = `translate(${x}px,${y}px)`;
        inner.style.transform = `translate(${x * 0.4}px,${y * 0.4}px)`;
      });
      elm.addEventListener('mouseleave', () => {
        elm.style.transform = '';
        inner.style.transform = '';
        elm.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
        inner.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
        setTimeout(() => { elm.style.transition = ''; inner.style.transition = ''; }, 600);
      });
    });
  }

  /* ---------------------------------------------------------
     3. KINETIC TYPE — split lines / words
  --------------------------------------------------------- */
  function splitKinetic() {
    // line-based: data-kinetic, children are explicit .kline or we wrap text
    document.querySelectorAll('[data-kinetic="lines"]').forEach(node => {
      const lines = node.innerHTML.split(/<br[^>]*>/i);
      node.innerHTML = '';
      node.classList.add('kinetic');
      lines.forEach(html => {
        const line = el('span', 'kline');
        const inner = el('span', 'kline-inner');
        inner.innerHTML = html.trim();
        line.appendChild(inner);
        node.appendChild(line);
      });
    });
    // word-based
    document.querySelectorAll('[data-kinetic="words"]').forEach(node => {
      const words = node.textContent.trim().split(/\s+/);
      node.innerHTML = '';
      node.classList.add('kinetic');
      words.forEach((w, i) => {
        const wrap = el('span', 'kw');
        const inner = el('span', 'kw-inner');
        inner.textContent = w;
        inner.style.transitionDelay = (i * 0.04) + 's';
        wrap.appendChild(inner);
        node.appendChild(wrap);
        node.appendChild(document.createTextNode(' '));
      });
    });
  }

  /* ---------------------------------------------------------
     VIEWPORT ENGINE — rAF + scroll driven (IO-free, robust)
  --------------------------------------------------------- */
  const _revealers = [];   // {el, off}
  const _counters  = [];   // {el}
  let _bgSections = [];
  let _navEl = null;
  const _bgMap = {
    paper:     { bg: '#f7f4ee', fg: '#17130f', ink: false },
    'paper-2': { bg: '#efeae1', fg: '#17130f', ink: false },
    ink:       { bg: '#17130f', fg: '#f7f4ee', ink: true },
    tomato:    { bg: '#e8442a', fg: '#fff', ink: true },
  };
  const _scrollies = []; // {root, steps, medias, chapterEls, progressEl, current}

  function initReveal() {
    document.querySelectorAll('[data-reveal], .kinetic').forEach(el =>
      _revealers.push({ el, off: 0.9 }));
  }
  function initReactiveBg() {
    _bgSections = [...document.querySelectorAll('[data-bg]')];
    _navEl = document.querySelector('.nav');
  }

  function tickViewport() {
    const vh = window.innerHeight;
    // reveals
    for (let i = _revealers.length - 1; i >= 0; i--) {
      const r = _revealers[i].el.getBoundingClientRect();
      if (r.top < vh * _revealers[i].off && r.bottom > 0) {
        _revealers[i].el.classList.add('is-in');
        _revealers.splice(i, 1);
      }
    }
    // counters
    for (let i = _counters.length - 1; i >= 0; i--) {
      const r = _counters[i].el.getBoundingClientRect();
      if (r.top < vh * 0.88 && r.bottom > 0) {
        runCounter(_counters[i].el);
        _counters.splice(i, 1);
      }
    }
    // reactive bg — section whose band crosses viewport middle
    if (_bgSections.length) {
      let active = null;
      for (const s of _bgSections) {
        const r = s.getBoundingClientRect();
        if (r.top <= vh * 0.5 && r.bottom >= vh * 0.5) { active = s; break; }
      }
      if (!active) { // fallback: last section above middle
        for (const s of _bgSections) {
          const r = s.getBoundingClientRect();
          if (r.top <= vh * 0.5) active = s;
        }
      }
      if (active && active.getAttribute('data-bg') !== tickViewport._lastBgKey) {
        tickViewport._lastBgKey = active.getAttribute('data-bg');
        const t = _bgMap[active.getAttribute('data-bg')];
        if (t) {
          document.body.style.setProperty('--bg', t.bg);
          document.body.style.setProperty('--fg', t.fg);
          document.body.classList.toggle('on-ink-mode', t.ink);
          if (_navEl) _navEl.classList.toggle('on-ink', t.ink);
        }
      }
    }
    // scrolly
    for (const sc of _scrollies) updateScrolly(sc, vh);
  }

  /* ---------------------------------------------------------
     6. NAV scroll state
  --------------------------------------------------------- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // mobile toggle
    const toggle = nav.querySelector('.nav-toggle');
    const links = nav.querySelector('.nav-links');
    if (toggle && links) {
      const label = toggle.querySelector('.nav-toggle-label') || toggle;
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('menu-open');
        if (label.textContent !== undefined) label.textContent = open ? 'Chiudi' : 'Menu';
        // fold the primary CTA into the menu (clone once)
        if (open && !links.querySelector('.nav-mobile-cta')) {
          const cta = nav.querySelector('.nav-cta');
          if (cta) {
            const c = cta.cloneNode(true);
            c.classList.add('nav-mobile-cta');
            c.classList.remove('nav-cta');
            c.removeAttribute('data-magnetic');
            links.appendChild(c);
          }
        }
      });
      // close menu when a link is tapped
      links.addEventListener('click', e => {
        if (e.target.closest('a') && nav.classList.contains('menu-open')) {
          nav.classList.remove('menu-open');
          if (label.textContent !== undefined) label.textContent = 'Menu';
        }
      });
    }
  }

  /* ---------------------------------------------------------
     7. SCROLL PROGRESS
  --------------------------------------------------------- */
  function initProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = clamp(window.scrollY / (h || 1), 0, 1) * 100 + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     8. MARQUEE — duplicate track for seamless loop
  --------------------------------------------------------- */
  function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(track => {
      track.innerHTML += track.innerHTML;
    });
  }

  /* ---------------------------------------------------------
     9. COUNTERS — count up on enter ([data-count])
  --------------------------------------------------------- */
  function initCounters() {
    document.querySelectorAll('[data-count]').forEach(n => _counters.push({ el: n }));
  }
  function runCounter(node) {
    const to = parseFloat(node.getAttribute('data-count'));
    const dec = (node.getAttribute('data-count') + '').includes('.') ? 1 : 0;
    const pre = node.getAttribute('data-pre') || '';
    const suf = node.getAttribute('data-suf') || '';
    if (reduce) { node.textContent = pre + to.toFixed(dec) + suf; return; }
    const dur = 1400, start = performance.now();
    (function tick(now) {
      const p = clamp((now - start) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      node.textContent = pre + (to * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ---------------------------------------------------------
     10. PAGE TRANSITION MASK
  --------------------------------------------------------- */
  function initPageMask() {
    const mask = document.querySelector('.page-mask');
    if (!mask) return;
    const introOn = () => (window.FOOODY_TWEAKS || {}).intro !== false;
    if (!introOn()) { mask.style.display = 'none'; return; }

    const sp = mask.querySelector('.mask-word span');

    // Entrance — panels retract from top, word disappears with panel 3
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        mask.querySelectorAll('.panel').forEach((p, i) => {
          p.style.transition = 'transform .7s cubic-bezier(0.22,1,0.36,1)';
          p.style.transitionDelay = (i * .05) + 's';
          p.style.transformOrigin = 'top';
          p.style.transform = 'scaleY(0)';
        });
        setTimeout(() => { mask.style.display = 'none'; }, 950);
      });
    });

    // Fail-safe: never leave mask covering the page
    setTimeout(() => { mask.style.display = 'none'; }, 1800);

    if (reduce) return;

    // Exit — panels cover from bottom, word updates to destination, then navigate
    document.addEventListener('click', e => {
      const a = e.target.closest('a[data-transition]');
      if (!a || !introOn()) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || a.target === '_blank') return;
      e.preventDefault();

      const wt = a.getAttribute('data-transition-word');
      if (sp && wt) sp.textContent = wt;

      mask.style.display = '';
      mask.querySelectorAll('.panel').forEach((p, i) => {
        p.style.transition = 'transform .6s cubic-bezier(0.65,0,0.35,1)';
        p.style.transitionDelay = (i * .05) + 's';
        p.style.transformOrigin = 'bottom';
        p.style.transform = 'scaleY(1)';
      });

      setTimeout(() => { window.location.href = href; }, 720);
    });
  }

  /* ---------------------------------------------------------
     11. SCROLL-TELLING controller (Metodo) — rAF driven
  --------------------------------------------------------- */
  function initScrolly() {
    document.querySelectorAll('[data-scrolly]').forEach(root => {
      _scrollies.push({
        root,
        steps: [...root.querySelectorAll('.scrolly-step')],
        medias: [...root.querySelectorAll('.scene-media')],
        chapterEls: [...root.querySelectorAll('[data-chapter-step]')],
        progressEl: root.querySelector('[data-scrolly-progress]'),
        current: -1,
      });
    });
  }
  function updateScrolly(sc, vh) {
    let idx = -1;
    for (let i = 0; i < sc.steps.length; i++) {
      if (sc.steps[i].getBoundingClientRect().top < vh * 0.55) idx = i;
    }
    if (idx < 0) idx = 0;
    if (idx === sc.current) return;
    sc.current = idx;
    const step = sc.steps[idx];
    const key = step.getAttribute('data-scene');
    const bgkey = step.getAttribute('data-scene-bg');
    sc.medias.forEach(m => m.classList.toggle('active', m.getAttribute('data-scene') === key));
    sc.chapterEls.forEach((c, i) => c.classList.toggle('active', i === idx));
    if (sc.progressEl) sc.progressEl.style.transform = `scaleX(${(idx + 1) / sc.steps.length})`;
    if (bgkey) {
      const tones = { ink: '#17130f', paper: '#f7f4ee', 'paper-2': '#efeae1',
        tomato: '#e8442a', deep: '#0f0c0a' };
      sc.root.style.setProperty('--scene-bg', tones[bgkey] || bgkey);
    }
  }

  /* ---------------------------------------------------------
     12. TILT on [data-tilt]
  --------------------------------------------------------- */
  function initTilt() {
    if (!canHover || reduce) return;
    document.querySelectorAll('[data-tilt]').forEach(card => {
      const max = parseFloat(card.getAttribute('data-tilt')) || 6;
      card.style.transformStyle = 'preserve-3d';
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
        card.style.transform = '';
        setTimeout(() => card.style.transition = '', 600);
      });
    });
  }

  /* helpers */
  function el(tag, cls) { const n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* boot */
  function boot() {
    splitKinetic();
    initReveal();
    initReactiveBg();
    initNav();
    initProgress();
    initMarquee();
    initCounters();
    initScrolly();
    initMagnetic();
    initTilt();
    initCursor();
    initPageMask();
    // viewport engine: rAF loop + scroll/resize
    tickViewport();
    let scheduled = false;
    const onScroll = () => {
      if (scheduled) return; scheduled = true;
      requestAnimationFrame(() => { tickViewport(); scheduled = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // safety raf for first ~2s (covers mask retract + late layout/fonts)
    let t0 = performance.now();
    (function settle(now) {
      tickViewport();
      if (now - t0 < 2200) requestAnimationFrame(settle);
    })(t0);
    // absolute fail-safe: never leave content hidden
    setTimeout(() => {
      document.querySelectorAll('[data-reveal], .kinetic').forEach(el => el.classList.add('is-in'));
    }, 3000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
