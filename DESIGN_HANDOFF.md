# Fooody — Design & Dev Handoff

Stato aggiornato al **16 giugno 2026**. Documento di riferimento per chiunque lavori sul progetto.

---

## Stack

| — | — |
|---|---|
| Framework | Next.js **16.2.9** (App Router) |
| Runtime React | React 19.2.4 |
| Language | TypeScript 5 |
| CSS | Tailwind 4 installato ma **non usato** — tutto custom in `globals.css` |
| Font | `next/font/google` → Archivo (variable weight, italic) + JetBrains Mono 400/500 |
| Bundler dev | Turbopack |
| Animazioni | `public/motion.js` — vanilla JS, non modificare |
| Effetti hero | `public/hero-effects.js` — WebGL2/WebGL1/Canvas2D, modificabile |
| Deploy target | `https://fooody.it` (env `NEXT_PUBLIC_SITE_URL`) |

### Avvio dev server
```bash
node node_modules/next/dist/bin/next dev --port 3001
```
`next` non è nel PATH globale — usare sempre `node node_modules/next/dist/bin/next`.

### Se il dev server si corrompe (errore 500 "global-error.js")
```bash
rm -rf .next && node node_modules/next/dist/bin/next dev --port 3001
```
Causa: Turbopack che si blocca durante hot-reload di CSS/layout.

---

## Struttura file

```
src/
  app/
    layout.tsx          ← RootLayout: font, metadata globale, Nav, Footer, TweaksPanel,
                          script beforeInteractive (tweaks init), motion.js, hero-effects.js
    globals.css         ← Design system completo (~940 righe, zero Tailwind)
    page.tsx            ← Home page
    metodo/page.tsx     ← Pagina /metodo (completata)
    robots.ts
    sitemap.ts
  components/
    layout/
      Nav.tsx           ← Server component — contiene NavLinks
      NavLinks.tsx      ← 'use client' — usePathname() per active state
      Footer.tsx        ← Server component
    TweaksPanel.tsx     ← 'use client' — pannello tweaks presentazione (fixed bottom-right)

public/
  motion.js             ← Engine animazioni vanilla JS (NON MODIFICARE)
  hero-effects.js       ← Renderer particelle WebGL2/Canvas2D (modificabile)
```

### Pagine ancora da costruire
`/social`, `/web`, `/branding`, `/studio`, `/lavori`, `/lavori/[slug]`, `/contatti`, `/privacy`

---

## Design System — `globals.css`

### Palette CSS vars
```css
--ink:        #17130f   /* sfondo scuro principale */
--ink-2:      #4a443c   /* testo secondario su carta */
--ink-3:      #8c857a   /* testo terziario/label */
--paper:      #f7f4ee   /* sfondo chiaro principale */
--paper-2:    #efeae1   /* sezioni alternate chiare */
--paper-3:    #e6e0d4
--line:       #d8d2c6   /* bordi su carta */
--line-ink:   rgba(247,244,238,0.16)  /* bordi su inchiostro */
--tomato:     #e8442a   /* accento principale */
--tomato-deep:#c4321b
--tomato-soft:#f6e3dc
--deep:       #0f0c0a
```

### Font vars (iniettate da next/font via className su `<html>`)
```css
--sans: var(--font-archivo), ...   /* body, titoli */
--exp:  var(--font-archivo), ...   /* expanded: font-stretch:125% su classi .mega, .h1, ecc. */
--mono: var(--font-jetbrains-mono), ...
```

### Scala tipografica (fluid clamp)
```css
--t-mega:  clamp(3.4rem, 1.2rem + 9vw, 9.5rem)
--t-hero:  clamp(2.6rem, 1.4rem + 5.2vw, 6rem)
--t-h1:    clamp(2.1rem, 1.4rem + 3vw, 3.8rem)
--t-h2:    clamp(1.6rem, 1.2rem + 1.8vw, 2.6rem)
--t-h3:    clamp(1.25rem, 1.05rem + 0.9vw, 1.6rem)
--t-lead:  clamp(1.05rem, 0.98rem + 0.5vw, 1.35rem)
--t-body:  1.0625rem
--t-sm:    0.9375rem
--t-label: 0.75rem
```

### Classi tipografiche principali
| Classe | Uso |
|--------|-----|
| `.mega` | Headline gigante (hero, CTA finale) |
| `.hero-type` | Titolo medio-grande |
| `.h1` `.h2` `.h3` | Heading gerarchici |
| `.lead` | Testo introduttivo — colore `--ink-2` |
| `.eyebrow` | Label uppercase mono con `//` rosso davanti |
| `.eyebrow.no-slash` | Eyebrow senza prefisso `//` |
| `.mono` | Testo monospace body |
| `.mono-xs` | Monospace piccolo uppercase |
| `.numeral` | Numero/KPI — font expanded bold |
| `.idx` | Indice numerico (01 / 04) |

### Sezioni / layout
```css
.wrap        /* max-width:1320px, padding gutter fluido */
.section     /* padding-block fluido grandi */
.section-tight /* padding-block fluido compatto */
.ink-region  /* sfondo ink + color paper + override .lead/.eyebrow */
```

### Bottoni
```css
.btn               /* base: ink bg, paper text, pill shape */
.btn.ghost         /* trasparente, bordo linea */
.btn.accent        /* tomato bg */
.btn.on-ink        /* paper bg, su sfondo scuro */
.btn.on-ink.ghost  /* trasparente su ink */
.btn.lg            /* padding più grande */
```
Hover effect: pseudo `::after` con `translateY(101% → 0)` in tomato.

### Placeholder media (striped)
```css
.ph           /* sfondo rigato diagonale grigio */
.ph.tall      /* aspect-ratio 3/4 */
.ph.square    /* 1/1 */
.ph.wide      /* 16/10 */
.ph.video     /* aggiunge play button centrato */
.ph.on-ink    /* versione scura per sezioni ink */
```
Tutti i placeholder hanno `data-placeholder="..."` per trovabilità con grep.

---

## Navigazione e transizioni pagina

### Nav (`Nav.tsx` + `NavLinks.tsx`)
- `Nav.tsx` → Server Component
- `NavLinks.tsx` → `'use client'`, usa `usePathname()` per classe `.active`
- Tutti i link di navigazione usano `<a>` plain (non `<Link>` di Next) con `data-transition=""` e `data-transition-word="Parola"` — questo è obbligatorio per far scattare la page-mask di motion.js

### Sistema transizioni (`motion.js`)
**Non modificare motion.js.** Gestisce:
- Page-mask a 5 pannelli tomato/ink con parola centrata animata
- Custom cursor (dot + ring + label + preview)
- Reveal scroll (`[data-reveal]`, `[data-kinetic]`)
- Magnetic hover (`[data-magnetic]`)
- Nav scrolled state, menu mobile, scroll progress bar
- Kinetic type (`data-kinetic="lines"` e `data-kinetic="words"`)
- Scroll-telling (`[data-scrolly]`) nella pagina Metodo

**Timing transizione completo:** 720ms exit → navigazione → 120ms delay → 800ms entry = ~1.7s totale.

### Attributi data usati da motion.js
```html
data-transition=""               <!-- attiva page-mask al click -->
data-transition-word="Parola"    <!-- parola mostrata nella mask -->
data-magnetic="0.3"              <!-- intensità effetto magnetic hover -->
data-reveal=""                   <!-- fade-in a scroll (opacity+translateY) -->
data-reveal="fade"               <!-- fade-in senza translateY -->
data-reveal-d="1..5"             <!-- delay 0.08s × n -->
data-kinetic="lines"             <!-- testo con line reveal -->
data-kinetic="words"             <!-- testo con word reveal -->
data-scrolly=""                  <!-- sezione scroll-telling -->
data-bg="ink|paper|paper-2"      <!-- usato da motion.js per il colore nav -->
data-cursor="play|apri|guarda|home"  <!-- label custom cursor -->
data-count="340" data-pre="+" data-suf="%"  <!-- counter animato -->
data-tilt="4"                    <!-- 3D tilt sull'elemento -->
data-scrolly-progress            <!-- barra di progresso nel chapter-rail -->
data-chapter-step                <!-- dot rail metodo -->
data-scene="1..5"                <!-- scene nel scroll-telling -->
data-scene-bg="deep|ink|tomato"  <!-- bg della scena -->
```

---

## Hero Particelle

### Struttura HTML (in `page.tsx`)
```jsx
<header className="hero100 mode-particelle" id="hero" data-bg="paper">
  <div className="hero-stage">          {/* sticky, 100vh */}
    <div className="hero-vid ph on-ink" id="hero-vid" .../>   {/* video placeholder */}
    <svg className="hero-knockout" .../>                        {/* SVG mask FOOODY */}
    <h1 className="visually-hidden">...</h1>
    <div className="hero-paper" id="hero-paper" />             {/* overlay bianco */}
    <canvas className="hero-particles" id="hero-particles" />  {/* canvas WebGL */}
    <div className="hero-cap" .../>
    <div className="hero-eyebrow" .../>
    <a className="hero-scroll" href="#manifesto" .../>
  </div>
</header>
```

**Classi CSS chiave:**
- `.hero100` → `height: 100vh`
- `.hero100.mode-particelle` → `height: 240vh` (spazio per scroll scatter)
- `.hero-stage` → `position: sticky; top: 0; height: 100vh` (la parte visibile)
- `.hero-paper` + `.hero-particles` → nascosti di default, visibili con `.mode-particelle`
- `.hero100.mode-particelle .hero-knockout` → `opacity: 0 !important` (SVG mask nascosta)

### `hero-effects.js` — architettura
Renderer WebGL2 → fallback WebGL1 → fallback Canvas 2D.

**Flusso:**
1. `boot()` → `init()` → `initParticelle()`
2. `initParticelle()` → dimensiona canvas con DPR (max 2x), ottiene contesto WebGL
3. `runWebGL(gl, canvas, paper, dpr)` → compila shader, crea buffer, chiama `buildParticles()`, avvia RAF
4. `tick(now)` → ogni frame: avanza `.prog` di ogni particella, scrive Float32Array interleaved `[x, y, r, alpha]`, singola `drawArrays(gl.POINTS)`

**Buffer layout (STRIDE=16):**
```
offset 0  → x (float32)
offset 4  → y (float32)
offset 8  → r (float32, raggio)
offset 12 → alpha (float32)
```

**Vertex shader:** converte pixel CSS × DPR in clip space, imposta `gl_PointSize = r * 2`.
**Fragment shader:** cerchio morbido con `smoothstep(0.40, 0.50, length(gl_PointCoord - 0.5))`.

**Campionamento testo:**
`sampleText(w, h)` disegna "FOOODY" su canvas offscreen 800px Archivo, legge i pixel opachi, restituisce array di `[x, y]`. I punti campionati sono le posizioni target delle particelle.

### Tweaks sistema (TweaksPanel + `window.FOOODY_TWEAKS`)

Tutti i tweaks sono in `localStorage['fooody_tweaks']` e su `window.FOOODY_TWEAKS`. Il pannello dispatcha `tweakchange` ad ogni modifica; `hero-effects.js` ascolta e chiama `init()` → rebuild completo.

Il `beforeInteractive` script in `layout.tsx` inizializza `window.FOOODY_TWEAKS` prima che motion.js parta.

#### Tweaks disponibili e loro effetto

| Chiave | Tipo | Default | Dove agisce |
|--------|------|---------|-------------|
| `particleCount` | number 20–300 | `80` | `buildParticles`: `total = 3000 * mul` |
| `particleSize` | number 40–260 | `100` | `buildParticles`: `r = (1.2..3.4) * sizeMul` |
| `particleDir` | `sparpaglia\|su\|giu\|esplode` | `sparpaglia` | `buildParticles`: posizione di partenza `sx/sy` |
| `particleColor` | `ink\|tomato\|paper\|cream` | `ink` | tick: `gl.uniform3f(uCol, ...)` |
| `glow` | boolean | `false` | tick: `gl.blendFunc(SRC_ALPHA, ONE)` se true |
| `assemblySpeed` | `lenta\|normale\|veloce` | `normale` | tick: moltiplicatore `p.prog += speed * 60 * dt * spd` (0.35 / 1.0 / 2.6) |
| `scrollSensitivity` | `dolce\|normale\|forte` | `normale` | `buildParticles`: `scatMul` applicato a `vx/vy` (0.45 / 1.0 / 2.2) |
| `exitMode` | `radiale\|su\|gravità\|vortice\|nebbia` | `radiale` | `buildParticles`: calcola `vx/vy` per particella |
| `exitCurve` | `lineare\|esplosiva\|impulso` | `lineare` | tick: `st = scroll^3` / `1-(1-scroll)^3` / `scroll` |
| `exitFade` | `lento\|normale\|veloce` | `normale` | tick: `fadeMul` = 0.7 / 1.6 / 3.2 |
| `intro` | boolean | `true` | motion.js: se false salta l'animazione intro |
| `workHover` | `tilt\|lift\|off` | `tilt` | body class `wh-tilt` / `wh-lift` |

**Come funziona lo scatter (exit):**

1. `buildParticles` assegna `vx/vy` a ogni particella in base a `exitMode`:
   - `radiale`: `vx = (tx-cx) * rand(0.8..2.0)`, `vy` uguale con bias verso l'alto
   - `su`: tutto verso l'alto (`vy = -200...-580`)
   - `gravità`: tutto verso il basso
   - `vortice`: vettore perpendicolare radiale (rotazione)
   - `nebbia`: random ampio in tutte le direzioni

2. Nel tick, `exitCurve` trasforma il valore raw dello scroll in `st`:
   ```js
   const st = curve === 'esplosiva' ? scroll³
             : curve === 'impulso'  ? 1 - (1-scroll)³
             : scroll
   ```

3. La posizione finale di ogni particella è `p.tx + p.vx * st` → più si scrolla, più si allontana

4. L'alpha usa `1 - scroll * fadeMul` → `fadeMul` basso = svanisce lentamente, alto = veloce

**Nota:** `exitMode` cambia i vettori `vx/vy` → richiede rebuild (ma avviene automaticamente su `tweakchange`). `exitCurve` e `exitFade` sono letti live ogni frame → aggiornamento immediato senza rebuild.

**Per vedere gli effetti di uscita:** fare scroll verso il basso nell'hero (non uscire con link nav). Cambiare `exitMode` da `radiale` a `su`, `vortice` o `nebbia` per differenza evidente.

### Ottimizzazioni performance hero
- **Stop RAF su navigazione**: listener capture-phase su `click` che intercetta `a[data-transition]` e chiama `cleanup()` prima che motion.js inizi la page-mask
- **Cache `heroH`**: `offsetHeight` dell'hero calcolato una volta sola, non ogni frame
- **Skip GPU a scroll completo**: quando `scroll >= 1` il RAF continua ma salta upload GPU e drawArrays
- **DPR capped a 2x**: `Math.min(window.devicePixelRatio, 2)`
- **`reactStrictMode: false`** in `next.config.ts`: elimina il double-render di React in dev

---

## Componenti

### Nav
- Fisso in alto, `z-index: 80`
- `.nav.scrolled` aggiunto da motion.js: `backdrop-filter: blur(14px)`, bordo inferiore
- `.nav.on-ink` quando la sezione sotto è dark (letto da `data-bg`)
- Mobile (`max-width: 860px`): `.nav-links` e `.nav-cta` nascosti, mostra `.nav-toggle` (button "Menu")
- Menu mobile: click su toggle → `.nav.menu-open` → nav-links in colonna a cascata

### Footer
- Sfondo ink, 3 colonne: brand + payoff / menu servizi / contatti
- `.foot-mega`: "Fooody." gigante in basso
- `.foot-bottom`: copyright + P.IVA (placeholder `0000000000`) + link privacy

### TweaksPanel (`'use client'`)
- Visibile sempre (è per la presentazione al cliente, non production)
- Fixed `bottom: 24px; right: 24px; z-index: 8000`
- Salva in `localStorage['fooody_tweaks']`, dispatcha `tweakchange`
- `applyTweaks()`: aggiorna `window.FOOODY_TWEAKS` + body class `wh-tilt/wh-lift`
- Footer panel: "Pannello di presentazione · non visibile in produzione" — da rimuovere prima del go-live

---

## Pagine completate

### Home (`/`) — `src/app/page.tsx`

| Sezione | ID | data-bg | Note |
|---------|-----|---------|------|
| Hero particelle | `#hero` | paper | `hero100 mode-particelle`, scroll 240vh |
| Manifesto + stats | `#manifesto` | ink | counter animati `data-count` |
| Servizi (4 porte) | `#servizi` | paper | link a `/metodo`, `/social`, `/web`, `/branding` |
| Clienti marquee | — | paper-2 | loghi placeholder |
| Lavori scelti | `#lavori` | paper | 3 case study placeholder, grigila 3 col |
| Studio teaser | `#studio` | paper-2 | foto team placeholder |
| CTA finale | `#contatti` | ink | link a `/contatti` e `mailto:ciao@fooody.it` |

### Metodo (`/metodo`) — `src/app/metodo/page.tsx`

| Sezione | ID | data-bg | Note |
|---------|-----|---------|------|
| Hero | — | ink | H1 con `.mega`, CTA verso `#pilastri` |
| Intro problema | — | ink | testo lungo, `paddingTop: 0` |
| 5 pilastri scroll-telling | `#pilastri` | `[data-scrolly]` | media sticky sx + step dx, chapter-rail sticky bottom |
| Risultati | `#risultati` | paper | 4 KPI con `data-count` |
| Caso integrato | `#caso` | paper-2 | case study placeholder |
| CTA | `#contatti` | ink | link a `/contatti` e home |

**Scroll-telling Metodo:**
- `[data-scrolly]` + `--scene-bg: #17130f` → background scuro
- `.scrolly-media-col` sticky `top:0` `height:100vh`
- `.scene-media` con `data-scene="1..5"` → motion.js attiva `.active` in base allo step visibile
- `.chapter-rail` sticky `bottom:0` con progress bar e dot degli step

---

## Pattern ricorrenti

### Link navigazione (sempre così)
```jsx
<a href="/pagina" data-transition="" data-transition-word="Parola">
```
Non usare mai `<Link>` di Next per link che devono fare page transition.

### Sezione ink
```jsx
<section className="section ink-region" data-bg="ink">
  <div className="wrap">...</div>
</section>
```

### Hero section alternativa (pagine interne)
```jsx
<header className="section ink-region" data-bg="ink" style={{ paddingTop: 'clamp(130px,18vh,220px)', ... }}>
```

### Placeholder media
```jsx
<div className="ph tall" data-placeholder="descrizione per grep">
  <span className="ph-label">label visibile</span>
</div>
```
Grep `data-placeholder` per trovare tutti i placeholder da sostituire con asset reali.

### Counter animato
```jsx
<span className="numeral stat-num" data-count="340" data-pre="+" data-suf="%">0</span>
```
motion.js anima il valore da 0 a `data-count` quando l'elemento entra nel viewport.

---

## TODO e placeholder da completare

Tutti marcati con `data-placeholder="..."` e commenti `{/* TODO: */}` nei file TSX.

| Cosa | Dove | Note |
|------|------|------|
| Loghi clienti SVG (monocromo) | `page.tsx` sezione marquee | Sostituire testo con `<img>` SVG |
| 3 case study cover 4:5 | `page.tsx` work-grid | Immagini reali + href a slug reale |
| Foto team 4:5 | `page.tsx` studio-grid | Formato ritratto |
| Video presentazione 40" | `page.tsx` `#hero-vid` | `<video>` con `autoPlay muted loop playsInline` |
| KPI reali (clienti, engagement, anni) | `page.tsx` stats | Approvazione cliente |
| 5 immagini pilastri Metodo | `metodo/page.tsx` scene-media | Formato 4:5 o 16:11 mobile |
| Case study copertina Metodo | `metodo/page.tsx` caso | Può essere reel |
| KPI Metodo reali | `metodo/page.tsx` results-grid | Approvazione cliente |
| P.IVA reale | `Footer.tsx` | `P.IVA 0000000000` |
| Social link reali | `Footer.tsx` | Instagram, LinkedIn, Newsletter |
| og-image.png | `public/` | 1200×630 per Open Graph |
| favicon.ico | `src/app/` | Esiste ma verificare design finale |

---

## Metadata e SEO

Configurati in `layout.tsx` per globale, in ogni `page.tsx` per specifico:

```ts
export const metadata: Metadata = {
  title: 'Titolo — Metodo',    // template: '%s · Fooody'
  description: '...',
  alternates: { canonical: '/slug' },
  openGraph: { title, description, url },
}
```

`metadataBase` in layout = `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fooody.it'`.

---

## `next.config.ts`

```ts
const nextConfig = {
  reactStrictMode: false,   // halves React render overhead in dev
  turbopack: {
    root: path.resolve(__dirname),
  },
}
```
`reactStrictMode: false` è intenzionale: con `true` il dev server faceva double-render e rallentava le transizioni. Non rimettere a `true`.

---

## Accessibilità

- Skip link "Vai al contenuto principale" → `#main-content` (hidden, visibile a focus)
- Hero h1 con `.visually-hidden`
- Tutti i placeholder hanno `aria-hidden="true"` o `aria-label` dove serve
- `@media (prefers-reduced-motion: reduce)` → annulla tutte le transition/animation, `.kline-inner` e `[data-reveal]` mostrati senza animazione
- Custom cursor nascosto su touch device e `max-width: 760px`
