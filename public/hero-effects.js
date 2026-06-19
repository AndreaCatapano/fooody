/* ============================================================
   FOOODY — Hero Particelle
   WebGL2 / WebGL1 renderer · Canvas 2D fallback
   ============================================================ */
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let animId     = null;
  let cleanupFns = [];

  const PALETTE = {
    ink:    [23  / 255, 19  / 255, 15  / 255],
    tomato: [232 / 255, 68  / 255, 42  / 255],
    paper:  [247 / 255, 244 / 255, 238 / 255],
    cream:  [210 / 255, 180 / 255, 140 / 255],
  };

  /* ---- cleanup precedente sessione ---- */
  function cleanup() {
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    cleanupFns.forEach(fn => fn());
    cleanupFns = [];
    const paper = document.getElementById('hero-paper');
    if (paper) paper.style.opacity = '1';
  }

  function init() {
    cleanup();
    if (reduce) return;
    initParticelle();
  }

  /* ---- campiona pixel del testo FOOODY su canvas offscreen ---- */
  function sampleText(w, h) {
    const off = document.createElement('canvas');
    off.width = w; off.height = h;
    const oc = off.getContext('2d');
    const fs = Math.min(w * 0.22, h * 0.44);
    oc.font         = `800 ${fs}px Archivo, Helvetica, Arial, sans-serif`;
    oc.textAlign    = 'center';
    oc.textBaseline = 'middle';
    oc.fillStyle    = '#000';
    oc.fillText('FOOODY', w / 2, h * 0.44);
    const px   = oc.getImageData(0, 0, w, h).data;
    const pts  = [];
    const step = Math.max(3, Math.floor(w / 200));
    for (let y = 0; y < h; y += step)
      for (let x = 0; x < w; x += step)
        if (px[(y * w + x) * 4 + 3] > 100) pts.push([x, y]);
    return pts;
  }

  /* ---- costruisce array di particelle da tweaks correnti ---- */
  function buildParticles(w, h) {
    const t    = window.FOOODY_TWEAKS || {};
    const pts  = sampleText(w, h);
    if (!pts.length) return [];

    const dir     = t.particleDir          || 'sparpaglia';
    const mul     = (t.particleCount       || 80)  / 80;
    const sizeMul = (t.particleSize        || 100) / 100;
    const scatMul = { dolce: 0.45, normale: 1.0, forte: 2.2 }[t.scrollSensitivity || 'normale'] || 1.0;

    const total    = Math.min(pts.length, Math.floor(3000 * mul));
    const cx       = w / 2;
    const cy       = h * 0.44;
    const exitMode = t.exitMode || 'radiale';
    const ps       = [];

    for (let i = 0; i < total; i++) {
      const [tx, ty] = pts[Math.floor(Math.random() * pts.length)];
      let sx, sy;

      if (dir === 'su') {
        sx = tx + (Math.random() - 0.5) * 60;
        sy = h + 60;
      } else if (dir === 'giu') {
        sx = tx + (Math.random() - 0.5) * 60;
        sy = -60;
      } else if (dir === 'esplode') {
        const a = Math.random() * Math.PI * 2;
        const d = 200 + Math.random() * Math.max(w, h) * 0.55;
        sx = cx + Math.cos(a) * d;
        sy = cy + Math.sin(a) * d;
      } else {
        sx = Math.random() * w;
        sy = Math.random() * h;
      }

      let vx, vy;

      if (exitMode === 'su') {
        vx = (Math.random() - 0.5) * 130 * scatMul;
        vy = -(200 + Math.random() * 380) * scatMul;
      } else if (exitMode === 'gravità') {
        vx = (Math.random() - 0.5) * 110 * scatMul;
        vy = (180 + Math.random() * 400) * scatMul;
      } else if (exitMode === 'vortice') {
        /* vettore perpendicolare radiale → rotazione */
        const dx = tx - cx, dy = ty - cy;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        vx = (-dy / len * 240 + dx / len * 60 + (Math.random() - 0.5) * 60) * scatMul;
        vy = ( dx / len * 240 + dy / len * 60 + (Math.random() - 0.5) * 60) * scatMul;
      } else if (exitMode === 'nebbia') {
        /* deriva lenta e caotica */
        vx = (Math.random() - 0.5) * 280 * scatMul;
        vy = (Math.random() - 0.5) * 140 * scatMul - 20;
      } else {
        /* radiale — default */
        vx = (tx - cx) * (0.8 + Math.random() * 1.2) * scatMul;
        vy = (ty - cy) * (0.8 + Math.random() * 1.2) * scatMul - 60 * scatMul;
      }

      ps.push({
        sx, sy, tx, ty,
        r:     (1.2 + Math.random() * 2.2) * sizeMul,
        delay: Math.random() * 0.45,
        speed: 0.004 + Math.random() * 0.01,
        prog:  0,
        vx, vy,
      });
    }
    return ps;
  }

  /* ============================================================
     ENTRY POINT
  ============================================================== */
  function initParticelle() {
    const canvas = document.getElementById('hero-particles');
    const paper  = document.getElementById('hero-paper');
    if (!canvas) return;

    const dpr     = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;

    /* Tenta WebGL2 → WebGL1 → Canvas 2D */
    const gl =
      canvas.getContext('webgl2')            ||
      canvas.getContext('webgl')             ||
      canvas.getContext('experimental-webgl');

    if (gl) {
      runWebGL(gl, canvas, paper, dpr);
    } else {
      const ctx = canvas.getContext('2d');
      if (ctx) runCanvas2D(ctx, canvas, paper, dpr);
    }
  }

  /* ============================================================
     WEBGL RENDERER
  ============================================================== */
  function runWebGL(gl, canvas, paper, dpr) {

    /* ---- Vertex shader ---- */
    const VS = `
      attribute vec2 a_pos;
      attribute float a_r;
      attribute float a_a;
      uniform vec2 u_res;
      varying float v_a;
      void main() {
        vec2 clip  = (a_pos / u_res) * 2.0 - 1.0;
        clip.y     = -clip.y;
        gl_Position  = vec4(clip, 0.0, 1.0);
        gl_PointSize = a_r * 2.0;
        v_a = a_a;
      }`;

    /* ---- Fragment shader: cerchio con bordo morbido ---- */
    const FS = `
      precision mediump float;
      uniform vec3 u_col;
      varying float v_a;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = (1.0 - smoothstep(0.40, 0.50, d)) * v_a;
        if (a < 0.004) discard;
        gl_FragColor = vec4(u_col, a);
      }`;

    function mkShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }

    const vs = mkShader(gl.VERTEX_SHADER,   VS);
    const fs = mkShader(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return; /* fallback non possibile a questo punto */

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const aPos = gl.getAttribLocation(prog,  'a_pos');
    const aR   = gl.getAttribLocation(prog,  'a_r');
    const aA   = gl.getAttribLocation(prog,  'a_a');
    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uCol = gl.getUniformLocation(prog, 'u_col');

    /* Buffer interleaved: [x, y, r, alpha]  ×  N particelle */
    const buf    = gl.createBuffer();
    const STRIDE = 16; /* 4 float32 = 16 byte */

    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(aPos);
    gl.enableVertexAttribArray(aR);
    gl.enableVertexAttribArray(aA);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, STRIDE, 0);
    gl.vertexAttribPointer(aR,   1, gl.FLOAT, false, STRIDE, 8);
    gl.vertexAttribPointer(aA,   1, gl.FLOAT, false, STRIDE, 12);

    let particles = buildParticles(canvas.width / dpr, canvas.height / dpr);
    let buf32     = new Float32Array(particles.length * 4);

    /* heroH cached to avoid offsetHeight read every frame */
    let heroH = (function () {
      const h = document.getElementById('hero');
      return h ? h.offsetHeight : window.innerHeight;
    }());

    function rebuild() {
      const d     = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * d;
      canvas.height = window.innerHeight * d;
      particles = buildParticles(canvas.width / d, canvas.height / d);
      buf32     = new Float32Array(particles.length * 4);
      const h   = document.getElementById('hero');
      heroH     = h ? h.offsetHeight : window.innerHeight;
    }

    window.addEventListener('resize', rebuild, { passive: true });
    cleanupFns.push(() => window.removeEventListener('resize', rebuild));
    cleanupFns.push(() => { gl.deleteBuffer(buf); gl.deleteProgram(prog); });

    let last = null;

    function tick(now) {
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const scroll = Math.min(window.scrollY / (heroH * 0.55), 1);

      /* Particles invisible: skip GPU work, keep RAF alive to detect scroll-back */
      if (scroll >= 1) { animId = requestAnimationFrame(tick); return; }

      const t    = window.FOOODY_TWEAKS || {};

      const spd  = { lenta: 0.35, normale: 1.0, veloce: 2.6 }[t.assemblySpeed || 'normale'] || 1.0;
      const glow = !!t.glow;
      const col  = PALETTE[t.particleColor || 'ink'] || PALETTE.ink;
      const d    = Math.min(window.devicePixelRatio || 1, 2);

      /* curva dello scatter: trasforma il progresso lineare dello scroll */
      const curve = t.exitCurve || 'lineare';
      const st = curve === 'esplosiva'
        ? scroll * scroll * scroll               /* lento → botta finale  */
        : curve === 'impulso'
          ? 1 - Math.pow(1 - scroll, 3)         /* botta subito → rallenta */
          : scroll;                              /* lineare (default)      */

      /* velocità di dissolvenza */
      const fadeMul = { lento: 0.7, normale: 1.6, veloce: 3.2 }[t.exitFade || 'normale'] || 1.6;

      gl.blendFunc(gl.SRC_ALPHA, glow ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);

      /* aggiorna posizioni su CPU → scrivi nel Float32Array */
      let j = 0;
      for (const p of particles) {
        if (p.prog < 1) p.prog = Math.min(1, p.prog + p.speed * 60 * dt * spd);
        const eff  = Math.max(0, (p.prog - p.delay) / Math.max(0.01, 1 - p.delay));
        const ease = easeOutExpo(eff);
        buf32[j++] = (p.sx + (p.tx - p.sx) * ease + p.vx * st) * d;
        buf32[j++] = (p.sy + (p.ty - p.sy) * ease + p.vy * st) * d;
        buf32[j++] = p.r * d;
        buf32[j++] = Math.min(1, ease) * Math.max(0, 1 - scroll * fadeMul);
      }

      if (paper) paper.style.opacity = String(Math.max(0, 1 - scroll * 2.2));

      /* draw — singola chiamata GPU */
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform3f(uCol, col[0], col[1], col[2]);

      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, buf32, gl.DYNAMIC_DRAW);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, STRIDE, 0);
      gl.vertexAttribPointer(aR,   1, gl.FLOAT, false, STRIDE, 8);
      gl.vertexAttribPointer(aA,   1, gl.FLOAT, false, STRIDE, 12);
      gl.drawArrays(gl.POINTS, 0, particles.length);

      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
  }

  /* ============================================================
     CANVAS 2D FALLBACK
  ============================================================== */
  function runCanvas2D(ctx, canvas, paper, dpr) {
    let particles = buildParticles(canvas.width / dpr, canvas.height / dpr);

    let heroH = (function () {
      const h = document.getElementById('hero');
      return h ? h.offsetHeight : window.innerHeight;
    }());

    function rebuild() {
      const d     = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * d;
      canvas.height = window.innerHeight * d;
      particles = buildParticles(canvas.width / d, canvas.height / d);
      const h   = document.getElementById('hero');
      heroH     = h ? h.offsetHeight : window.innerHeight;
    }

    window.addEventListener('resize', rebuild, { passive: true });
    cleanupFns.push(() => window.removeEventListener('resize', rebuild));

    let last = null;

    function tick(now) {
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const scroll = Math.min(window.scrollY / (heroH * 0.55), 1);
      if (scroll >= 1) { animId = requestAnimationFrame(tick); return; }

      const t      = window.FOOODY_TWEAKS || {};

      const spd = { lenta: 0.35, normale: 1.0, veloce: 2.6 }[t.assemblySpeed || 'normale'] || 1.0;
      const col = PALETTE[t.particleColor || 'ink'] || PALETTE.ink;
      const rgb = col.map(v => Math.round(v * 255)).join(',');
      const d   = Math.min(window.devicePixelRatio || 1, 2);

      const curve = t.exitCurve || 'lineare';
      const st = curve === 'esplosiva'
        ? scroll * scroll * scroll
        : curve === 'impulso'
          ? 1 - Math.pow(1 - scroll, 3)
          : scroll;

      const fadeMul = { lento: 0.7, normale: 1.6, veloce: 3.2 }[t.exitFade || 'normale'] || 1.6;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (paper) paper.style.opacity = String(Math.max(0, 1 - scroll * 2.2));

      for (const p of particles) {
        if (p.prog < 1) p.prog = Math.min(1, p.prog + p.speed * 60 * dt * spd);
        const eff  = Math.max(0, (p.prog - p.delay) / Math.max(0.01, 1 - p.delay));
        const ease = easeOutExpo(eff);
        const rx   = (p.sx + (p.tx - p.sx) * ease + p.vx * st) * d;
        const ry   = (p.sy + (p.ty - p.sy) * ease + p.vy * st) * d;
        const a    = Math.min(1, ease) * Math.max(0, 1 - scroll * fadeMul);

        if (a <= 0.01) continue;
        ctx.fillStyle = `rgba(${rgb},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(rx, ry, p.r * d, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
  }

  /* ---- easing ---- */
  function easeOutExpo(t) {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  /* ---- boot ---- */
  function boot() {
    init();
    window.addEventListener('tweakchange', init);

    /* Free GPU for CSS panel transitions the instant the user navigates.
       Capture phase ensures this fires before motion.js intercepts the click. */
    document.addEventListener('click', function (e) {
      if (e.target.closest('a[data-transition]')) cleanup();
    }, true);

    /* Hard stop on page unload */
    window.addEventListener('pagehide', cleanup);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
