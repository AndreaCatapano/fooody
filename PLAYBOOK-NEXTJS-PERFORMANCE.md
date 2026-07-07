# Playbook — Performance, Struttura Componenti & Qualità Frontend (React / Next.js)

> Documento operativo ricavato da esperienza reale su progetti Next.js con App Router.
> Agnostico rispetto al progetto — applicabile a qualsiasi codebase React/Next.js.
> Da usare come riferimento e base di automazione con Claude Code.

---

## Indice

1. [Come usare questo documento con Claude Code](#1-come-usare-questo-documento-con-claude-code)
2. [Setup e prerequisiti di progetto](#2-setup-e-prerequisiti-di-progetto)
3. [Audit automatico del sito](#3-audit-automatico-del-sito)
4. [Analisi Color Contrast (Accessibilità)](#4-analisi-color-contrast-accessibilità)
5. [Ottimizzazione LCP e Core Web Vitals](#5-ottimizzazione-lcp-e-core-web-vitals)
6. [Processo: Estrazione Componenti Page-Specific](#6-processo-estrazione-componenti-page-specific)
7. [Processo: Block Extraction (Riutilizzo Cross-Page)](#7-processo-block-extraction-riutilizzo-cross-page)
8. [Regole CSS e Compositing GPU](#8-regole-css-e-compositing-gpu)
9. [SEO — Struttura e Metadati](#9-seo--struttura-e-metadati)
10. [Checklist go-live](#10-checklist-go-live)

---

## 1. Come usare questo documento con Claude Code

Incolla il seguente prompt all'inizio di una nuova sessione per attivare il playbook:

```
Leggi il file PLAYBOOK-NEXTJS-PERFORMANCE.md nella root del progetto e usalo
come riferimento per tutto il lavoro di questa sessione. Prima di toccare il codice
dimmi cosa hai trovato e cosa intendi fare.
```

Per attivare un processo specifico:

```
Voglio eseguire il processo di [estrazione componenti / block extraction / audit performance].
Leggi il playbook e seguilo passo per passo.
```

---

## 2. Setup e prerequisiti di progetto

Queste verifiche vanno fatte **all'inizio di ogni sessione di lavoro**, prima di toccare il codice.

### 2.1 — Binario Next.js

Il file `node_modules/.bin/next` può essere corrotto (symlink mancante o non valido). Verificare sempre:

```bash
ls -la node_modules/.bin/next
```

Se non è un symlink valido o dà errori in esecuzione, usare il percorso diretto al binario:

```bash
node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next dev
```

Aggiornare gli `scripts` in `package.json` di conseguenza per evitare che il problema si ripresenti:

```json
{
  "scripts": {
    "dev": "node node_modules/next/dist/bin/next dev",
    "build": "node node_modules/next/dist/bin/next build"
  }
}
```

### 2.2 — Sistema CSS

Prima di aggiungere classi o stili, capire quale sistema CSS usa il progetto. Mescolare approcci diversi rompe la coerenza e introduce classi senza effetto.

| Approccio | Come riconoscerlo | Regola operativa |
|-----------|------------------|-----------------|
| Tailwind utility | `className="flex items-center gap-4"` | Non aggiungere CSS custom, usare le utility |
| Design system custom | `className="sec-head hero-lead"` | Non aggiungere Tailwind, leggere `globals.css` prima di qualsiasi intervento |
| CSS Modules | `import styles from './....module.css'` | Ogni file ha il proprio scope, nessuna classe globale |
| Misto (Tailwind + override) | Entrambi presenti | Leggere il CLAUDE.md o README del progetto |

**Errore frequente:** aggiungere classi Tailwind in un progetto custom-CSS, o creare CSS custom in un progetto Tailwind puro. Se non è chiaro, chiedere prima di procedere.

### 2.3 — Font

Verificare come sono caricati i font prima di toccare qualsiasi elemento tipografico:

```bash
grep -r "next/font" src --include="*.tsx" --include="*.ts" -l
```

Se il progetto usa `next/font/local` (font OTF/WOFF2 in `src/app/fonts/`) o `next/font/google`, le variabili CSS sono già disponibili nel DOM. **Non importare font con `@import url()`** — blocca il rendering e bypassa l'ottimizzazione di Next.js.

Verificare le variabili font definite:

```bash
grep -n "var(--font" src/app/globals.css | head -20
```

Verificare dove le variabili vengono applicate (di solito nel `className` di `<html>`):

```bash
grep -n "font-" src/app/layout.tsx
```

### 2.4 — Librerie JS per animazioni

Verificare se il progetto usa librerie vanilla JS per animazioni (scroll reveal, cursor, marquee, page transitions, ecc.):

```bash
ls public/*.js 2>/dev/null
grep -rn "strategy=" src --include="*.tsx" | grep "Script"
```

Se esistono script caricati con `<Script strategy="afterInteractive">` o `<Script strategy="beforeInteractive">`, **non modificarli senza capire cosa gestiscono**. Spesso controllano il rendering di interi componenti (reveal on scroll, custom cursor, transizioni di pagina). Leggere lo script e capirne lo scope prima di qualsiasi intervento sul markup che toccano.

---

## 3. Audit automatico del sito

### Pattern: script audit con Playwright

Creare `audit/site-audit.ts` — Playwright Chromium, gira sul sito live (o su localhost in dev).

**Cosa misurare per ogni route × viewport (desktop 1440px + mobile 390px):**
- HTTP status
- Load time
- LCP, CLS (Core Web Vitals via `PerformanceObserver`)
- Console errors / warnings
- Network failures e 404
- Scroll orizzontale
- SEO meta (title, description, canonical, og:title, og:image)
- H1 count e testo
- Immagini senza `alt`
- Axe-core accessibility violations
- Screenshot full-page

**Come lanciarlo:**
```bash
npx tsx audit/site-audit.ts
```

Output consigliato in `audit/audit-results/report.md` e `report.json`.

**Nota critica — misurazione LCP:**
Il `PerformanceObserver` nello script mantiene l'osservazione aperta per 4 secondi e prende l'ultimo evento LCP. Questo gonfia il valore rispetto alla realtà: Chrome in produzione blocca l'LCP alla prima interazione utente (scroll, click). Per valori affidabili usare **Lighthouse** o **Chrome DevTools → Performance** che simulano l'interazione.

**Frequenza consigliata:** dopo ogni deploy significativo. Comparare con il run precedente per rilevare regressioni.

---

## 4. Analisi Color Contrast (Accessibilità)

### Pattern: script diagnosi contrasto

Creare `audit/diagnose-contrast.ts` — estrae coppie fg/bg problematiche deduplicate cross-page tramite Playwright e `getComputedStyle`.

```bash
npx tsx audit/diagnose-contrast.ts
```

**Output:** Per ogni coppia unica: colore foreground, colore background, ratio attuale, ratio richiesto (4.5:1 testo normale, 3:1 testo grande), elemento HTML, selector CSS, numero di nodi.

### Interpretazione risultati

| Ratio | Testo normale | Testo grande (≥18pt o ≥14pt bold) |
|-------|---------------|-----------------------------------|
| ≥ 4.5:1 | WCAG AA ✅ | WCAG AA ✅ |
| 3.0–4.4:1 | Fail ❌ | WCAG AA ✅ |
| < 3.0:1 | Fail ❌ | Fail ❌ |

### Fix tipici

```
Testo secondario su sfondo dark → abbassare l'opacità del testo finché ratio ≥ 4.5:1
Brand accent (rosso, viola, oro) su sfondo → scurire il colore di ~15% o limitare a testo large
Placeholder visivi → esentabili se contrassegnati (es. data-placeholder) e non sono testo utente reale
```

### Falsi positivi da escludere

- Elementi con attributi `data-placeholder` o simili — contenuto temporaneo, non testo utente reale
- Elementi in stati JS non ancora transizionati (es. sezioni scrolly con background cambiato da JS) — verificare ispezionando lo stato dopo che JS ha completato l'esecuzione

---

## 5. Ottimizzazione LCP e Core Web Vitals

### Cosa misura Google (CrUX vs Lab)

- **CrUX** (Chrome User Experience Report): dati reali da utenti Chrome, 28 giorni rolling. Quello che influenza il ranking SEO.
- **Lab** (Lighthouse, PageSpeed): simulazione, utile per debug ma non identica al CrUX.
- Se il sito ha poco traffico, Google usa Lighthouse. Se ha traffico sufficiente, usa CrUX.

### Soglie LCP

| Rating | Soglia |
|--------|--------|
| Good | < 2500ms |
| Needs improvement | 2500–4000ms |
| Poor | > 4000ms |

### Cause comuni di LCP lento

**1. Canvas o elemento animato come LCP candidate**

Un canvas full-viewport o un elemento pesante controllato da JS `afterInteractive` diventa l'LCP candidate. LCP = tempo di caricamento JS + durata dell'animazione iniziale. Non risolvibile con trick CSS senza riprogettare l'hero.

Soluzioni:
- Precaricare lo script con `<link rel="preload">`
- Ridurre la durata dell'animazione iniziale
- Mostrare un'immagine o SVG statica prima che il canvas sia pronto

**2. Font swap che re-renderizza elementi grandi**

`font-display: swap` fa sì che elementi SVG o di testo grandi vengano ridisegnati quando il font arriva → LCP si aggiorna al momento del ridisegno.

- Fix: aggiungere `font-family` esplicito sugli elementi SVG (`style={{ fontFamily: 'var(--font-name), fallback' }}`)
- Fix: preload dei font critici con `fetchPriority="high"`

**3. Script beforeInteractive che bloccano il primo frame**

Script con `strategy="beforeInteractive"` bloccano il thread prima del primo paint. Verificare se lo script è davvero necessario prima del paint (es. lettura `localStorage` per impostazioni UI → può diventare `afterInteractive` se il componente usa `|| {}` come fallback).

Regola: `beforeInteractive` solo per script che impostano CSS o attributi usati prima del primo pixel visibile (es. classe tema su `<html>`).

**4. Immagini hero senza priority**

```tsx
// ❌
<Image src="/hero.jpg" alt="..." />

// ✅
<Image src="/hero.jpg" alt="..." priority fetchPriority="high" />
```

**5. will-change su elementi idle**

`will-change: transform` su elementi che non animano continuamente crea compositing layer GPU fissi in VRAM → riduce le risorse disponibili durante lo scroll → degrado percepito.

Caso reale: 5 pannelli di una page-mask pre-promossi con `will-change: transform` per ottimizzare le transizioni di pagina causavano 5 layer GPU residenti durante tutto lo scroll del sito. Rimozione → scroll fluido. Il ritardo alla promozione al momento dell'animazione è impercettibile.

- Usare `will-change` SOLO su elementi che animano **ogni frame** (canvas hero, marquee, custom cursor)
- Per elementi che animano raramente (page mask, modal, overlay): lasciare che il browser promuova al layer quando l'animazione parte

### CLS — Layout Shift

CLS = 0 è l'obiettivo. Cause comuni:
- Font che cambiano le dimensioni del testo → usare `font-display: optional` o `swap` con `size-adjust`
- Immagini senza `width`/`height` espliciti
- Contenuto iniettato da JS sopra contenuto già renderizzato

---

## 6. Processo: Estrazione Componenti Page-Specific

> Obiettivo: `page.tsx` deve essere un orchestratore puro — solo import e JSX di componenti, zero markup inline.

### Step 1 — Individua file orfani

```bash
grep -r "NomeClient" src --include="*.tsx" --include="*.ts"
```

Se il file appare solo in se stesso, è orfano (non importato da nessuno).

### Step 2 — Confronta orfano vs componenti separati

Aprire il `*Client.tsx` orfano e i file in `src/components/<pagina>/`. Trovare le differenze:
- Contenuto JSX più ricco nel Client orfano?
- SVG, classi, sezioni assenti nel componente separato?

Portare tutto il surplus nel componente separato. Non cancellare ancora.

### Step 3 — Verifica classi CSS

```bash
grep -n "nome-classe" src/app/globals.css
```

Se una classe non ha CSS → cercare l'equivalente nell'orfano. I refactor rinominano spesso le classi senza aggiornare il CSS. Usare la classe con il CSS già esistente.

### Step 4 — Mappa il markup inline in page.tsx

Ogni `<section>` inline con più di una riga → candidato da estrarre in `src/components/<pagina>/NomeSezione.tsx`.

### Step 5 — Crea i componenti mancanti

Regole:
- Sezione con interattività (useState, eventi) → aggiungere `'use client'`
- Sezione puramente statica → server component, nessun `'use client'`
- Widget che descrive dati correlati (es. stats + device preview) → tutto in un unico componente, non split in sibling su page.tsx

### Step 6 — Struttura finale di page.tsx

```tsx
// ✅ Corretto
import PageHero from '@/components/blocks/PageHero'
import ServiziSection from '@/components/pagina/ServiziSection'
import CtaSection from '@/components/blocks/CtaSection'

export const metadata = buildMetadata('pagina')

export default function Pagina() {
  return (
    <>
      <PageHero ... />
      <ServiziSection />
      <CtaSection ... />
    </>
  )
}
```

### Step 7 — Cancella l'orfano

Solo dopo che `page.tsx` usa esclusivamente i componenti estratti:

```bash
rm src/app/<pagina>/*Client.tsx
```

### Step 8 — Build e verifica

```bash
# Con Next.js standard
npx next build

# Se il bin è corrotto (vedi §2.1)
node node_modules/next/dist/bin/next build
```

Risolvere tutti gli errori TypeScript prima di fare commit. Non procedere con build rotta.

### Errori frequenti

| Problema | Causa | Fix |
|----------|-------|-----|
| Stats o elementi in colonna invece che in riga | Classi CSS rinominate nel refactor senza aggiornare il CSS | Usare le classi originali con CSS già definito in globals.css |
| Altezza che salta al cambio viewport | `min-height` + mancanza di `overflow:hidden` | `height` fissa + `overflow:hidden` sul contenitore |
| Componente non appare | page.tsx importa il file sbagliato — l'orfano `*Client.tsx` è ancora il file "vero" | Verificare gli import di page.tsx esplicitamente, non assumere che stia usando il file atteso |

---

## 7. Processo: Block Extraction (Riutilizzo Cross-Page)

> Eseguire DOPO che tutte le pagine sono orchestratori puri (processo §6 completato).
> Obiettivo: trovare pattern ripetuti ≥2 pagine e astrarre in `src/components/blocks/`.

### Regola d'oro

**Nessun cambiamento visivo.** Il markup renderizzato deve essere identico al precedente. Le classi CSS si passano come props, non si generalizzano.

### Step 1 — Inventario

```bash
find src/components -name "*.tsx" | grep -v "/blocks/" | sort
```

### Step 2 — Pattern hunting

Adattare i grep al design system del progetto (le classi cambiano, la logica no):

```bash
# Section header (eyebrow + h2 + lead)
grep -r "sec-head" src/components --include="*.tsx" -l

# Statistiche animate
grep -r "data-count" src/components --include="*.tsx" -l

# Step numerati o liste rivelate
grep -r "data-reveal-d" src/components --include="*.tsx" -l

# Hero di pagina
grep -r "PageHero\|page-hero" src/components --include="*.tsx" -l
```

Vale la pena estrarre se il pattern appare in **≥ 2 pagine**.

### Step 3 — Analisi comparativa

Per ogni pattern trovato in ≥2 file, leggere entrambi e confrontare:
1. Struttura HTML — identica? Stessi tag nidificati?
2. Classi CSS — diverse per pagina? → diventano props
3. Colori inline — fissi o dipendono dalla pagina? → fissi = hardcode nel block, variabili = props
4. Contenuto — ReactNode per testi con markup (`<br/>`, `<em>`), string per testi puri
5. Schema `data-reveal` — identico?

Se la struttura HTML differisce significativamente → **non astrarre**. Troppo rischio di rompere la grafica.

### Step 4 — Interfaccia props

```ts
interface SectionHeaderProps {
  eyebrow: ReactNode
  eyebrowClass?: string          // default: 'eyebrow'
  heading: ReactNode
  lead: ReactNode
  leadMaxWidth?: string          // default: '32ch'
}
```

Regole:
- Tutto ciò che cambia tra pagine → prop
- Tutto ciò che è identico → hardcoded nel componente
- Nomi prop generici (non specifici di una singola pagina)
- Optional props con default ragionevole

### Step 5 — Scrittura del block

Path: `src/components/blocks/NomeBlock.tsx`

Checklist:
- [ ] Nessun import da pagine specifiche
- [ ] Nessuna stringa hardcoded che varierà tra pagine
- [ ] TypeScript puro, nessun `any`
- [ ] `'use client'` solo se usa hook React (di solito non necessario)
- [ ] Stesso schema `data-reveal` / `data-reveal-d` dell'originale

### Step 6 — Aggiornamento siti d'uso

```tsx
// Prima
<div className="sec-head">
  <div><span className="eyebrow">{eyebrow}</span></div>
  <h2>{heading}</h2>
  <p>{lead}</p>
</div>

// Dopo
import SectionHeader from '@/components/blocks/SectionHeader'
<SectionHeader eyebrow={eyebrow} heading={heading} lead={lead} />
```

### Step 7 — Build

```bash
node node_modules/next/dist/bin/next build
# oppure
npx next build
```

Tutti gli URL devono compilare senza errori TypeScript. Se c'è un errore, verificare props mancanti o di tipo errato e i `filter(Boolean).join(' ')` per le classi opzionali.

### Step 8 — Orphan check

Se un componente page-specific ora è diventato un wrapper quasi vuoto (pochi tag, nessuna logica), valuta se eliminarlo e chiamare il block direttamente dall'orchestratore della pagina.

```bash
grep -r "NomeComponente" src --include="*.tsx"
# se compare solo nel proprio file → è orfano → eliminare
```

### Block components comuni (template)

Questi block ricorrono quasi sempre in siti Next.js multi-pagina con design system. Crearli la prima volta che il pattern compare in ≥2 pagine:

| Block | Scopo | Props chiave |
|-------|-------|-------------|
| `PageHero` | Hero pagina servizio/contenuto | `eyebrow`, `heading`, `lead`, `accentColor` |
| `CtaSection` | CTA bottom-of-page | `heading`, `lead`, `ctaPrimary`, `ctaSecondary` |
| `SectionHeader` | eyebrow + h2 + lead | `eyebrow`, `heading`, `lead`, `eyebrowClass` |
| `StatsGrid` | Griglia statistiche animate | `stats[]` con `count`, `pre`, `suf`, `label` |
| `StepsTimeline` | Step numerati su sfondo scuro | `steps[]` con `num`, `title`, `body` |
| `ProofStats` | Sezione con statistiche prominenti | `heading`, `stats[]` |
| `CaseStudyBlock` | Sezione case study immagine + testo | `image`, `heading`, `body`, `tags[]` |

---

## 8. Regole CSS e Compositing GPU

### will-change — regola critica

```css
/* ✅ OK — animazione costante, ogni frame */
.marquee-track { will-change: transform; }
.cursor-dot    { will-change: transform; }

/* ❌ MAI — elementi idle o che animano raramente */
.page-mask .panel { will-change: transform; } /* N GPU layer fissi in VRAM */
.modal-overlay    { will-change: transform; } /* layer sempre residente */
```

**Perché è pericoloso:** in un caso reale, 5 pannelli di una page-mask pre-promossi con `will-change: transform` per ottimizzare le transizioni di pagina causavano 5 compositing layer GPU residenti in VRAM durante tutto lo scroll del sito — con degrado percettibile dello scroll. Rimozione → scroll fluido immediato. Il delay del browser nel promuovere il layer al momento dell'animazione è impercettibile.

Regola: `will-change` solo su elementi che animano **ogni frame**. Per transizioni rare (page mask, modal, drawer), lasciare che il browser promuova al layer quando l'animazione parte.

### z-index e stacking context

Ogni elemento con `position` + `z-index` esplicito (anche `z-index: 0`) crea un nuovo stacking context → potenziale nuovo GPU layer.

Implicazioni per LCP: Chrome esclude dall'LCP gli elementi che ritiene "occluded" dallo stesso stacking context. Un elemento con `z-index: 0` esplicito crea il proprio stacking context e Chrome potrebbe non rilevare l'occlusione da parte di elementi in stacking context separati → l'elemento sbagliato viene rilevato come LCP candidate.

### Script strategy in Next.js

| Strategy | Quando si esegue | Usare per |
|----------|-----------------|-----------|
| `beforeInteractive` | Prima del paint, blocca thread | Solo se il valore serve prima del primo pixel (es. classe tema su `<html>`) |
| `afterInteractive` | Dopo idratazione React | Analytics, animazioni hero, motion libraries, tweaks |
| `lazyOnload` | Durante idle del browser | Script non critici, tracking secondario |

```tsx
// ❌ Blocca il primo frame per leggere localStorage
<Script id="tweaks" strategy="beforeInteractive">{ ... localStorage ... }</Script>

// ✅ Se il componente usa fallback (|| {}), può aspettare l'idratazione
<Script id="tweaks" strategy="afterInteractive">{ ... localStorage ... }</Script>
```

---

## 9. SEO — Struttura e Metadati

### Skill package Claude Code per SEO

In questo setup Claude Code è disponibile un pacchetto completo di skill SEO invocabili con `/` direttamente in chat. Non richiedono configurazione aggiuntiva.

**Audit e analisi generale**

| Skill | Quando usarla |
|-------|--------------|
| `/seo` | Punto d'ingresso principale — analisi completa del sito (tecnica + contenuto + schema + performance) |
| `/seo-audit` | Audit full-site fino a 500 pagine con subagent paralleli — usare su siti con molte route |
| `/seo-technical` | Solo aspetti tecnici: crawlability, indexability, URL structure, mobile, CWV, JS rendering |
| `/seo-page` | Analisi approfondita di una singola pagina (on-page, schema, immagini, performance) |

**Schema e struttura dati**

| Skill | Quando usarla |
|-------|--------------|
| `/seo-schema` | Rilevare, validare e generare JSON-LD (Organization, Service, Article, FAQ, ecc.) |
| `/seo-sitemap` | Analizzare o generare sitemap XML; validare formato e URL |

**Contenuto e keyword**

| Skill | Quando usarla |
|-------|--------------|
| `/seo-content` | Qualità del contenuto, E-E-A-T, AI citation readiness, thin content |
| `/seo-cluster` | Clustering semantico di keyword per architettura hub-and-spoke |
| `/seo-content-brief` | Brief editoriale competitivo con word count per sezione e keyword density |

**Performance e immagini**

| Skill | Quando usarla |
|-------|--------------|
| `/seo-images` | Alt text, formati, dimensioni, lazy loading, CLS da immagini |
| `/seo-google` | Dati CrUX reali, GSC (Search Console), PageSpeed Insights v5 |

**Monitoraggio e drift**

| Skill | Quando usarla |
|-------|--------------|
| `/seo-drift` | Catturare baseline SEO e rilevare regressioni rispetto a snapshot precedenti |

**AI search e GEO**

| Skill | Quando usarla |
|-------|--------------|
| `/seo-geo` | Ottimizzazione per AI Overviews, ChatGPT web search, Perplexity — accessibilità AI crawler, llms.txt |

**Flusso di lavoro consigliato per un nuovo progetto:**

```
1. /seo-audit          → panoramica generale e priorità
2. /seo-technical      → fix tecnici (crawl, index, CWV)
3. /seo-schema         → aggiungere/correggere JSON-LD
4. /seo-content        → qualità e E-E-A-T delle pagine chiave
5. /seo-drift          → catturare baseline prima del deploy
```

---

### Pattern: singola sorgente di verità

In progetti Next.js, tutti i metadati SEO devono essere centralizzati in un unico file. **Non scrivere title/description hardcoded nelle singole pagine** — diventano incoerenti e impossibili da aggiornare in blocco.

Struttura consigliata per `src/lib/seo.ts`:

```ts
export const SITE = {
  name: 'Nome sito',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://esempio.com',
  description: 'Descrizione completa',
  locale: 'it_IT',
  ogImage: '/og-image.png',
}

export const PAGES: Record<string, { title: string; description: string }> = {
  home: { title: `${SITE.name} — Tagline`, description: SITE.description },
  'nome-pagina': { title: 'Titolo pagina | Sito', description: '...' },
}

export function buildMetadata(pageKey: keyof typeof PAGES): Metadata { ... }
export function buildOrganizationSchema() { ... }
export function buildServiceSchema(opts: ServiceOpts) { ... }
```

Quando aggiornare il file SEO centralizzato:

| Evento | Campo da aggiornare |
|--------|-------------------|
| Cambia tagline/descrizione | `SITE.description` |
| Cambia URL di produzione | `SITE.url` + env `NEXT_PUBLIC_SITE_URL` |
| Il cliente fornisce og-image.png | `SITE.ogImage` → salvare in `public/` |
| Nuova pagina | Aggiungere entry in `PAGES` + chiamare `buildMetadata()` |
| Cambiano title/description di una pagina | Modificare l'entry in `PAGES` |

### Pattern pagina (App Router)

```tsx
// src/app/nuova-pagina/page.tsx
import { buildMetadata, buildServiceSchema } from '@/lib/seo'

export const metadata = buildMetadata('nuova-pagina')  // aggiungere entry in PAGES prima

const jsonLd = buildServiceSchema({
  name: 'Nome servizio',
  description: 'Descrizione...',
  serviceType: 'Tipo',
  offers: ['Offerta 1', 'Offerta 2'],
})

export default function NuovaPagina() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NuovaPaginaComponents />
    </>
  )
}
```

### Sitemap e Robots

- `src/app/sitemap.ts` — generata da Next.js automaticamente, aggiornare quando si aggiungono pagine
- `src/app/robots.ts` — includere blocco crawler AI (Bytespider, CCBot, ecc.) se non si vuole indicizzazione per training

### Checklist SEO per ogni nuova pagina

- [ ] Entry in `PAGES` nel file SEO centralizzato
- [ ] `buildMetadata()` in page.tsx
- [ ] JSON-LD schema appropriato (Organization, Service, Article, ecc.)
- [ ] H1 unico e presente
- [ ] Canonical URL corretto
- [ ] OG image (1200×630px in `public/og-image.png`)
- [ ] Entry in `sitemap.ts`

---

## 10. Checklist go-live

### Prima del deploy

- [ ] Lanciare lo script audit e leggere il report
- [ ] Zero console errors su tutte le route
- [ ] Zero network 404
- [ ] Zero scroll orizzontale
- [ ] CLS = 0 su tutte le pagine
- [ ] H1 = 1 per pagina
- [ ] Immagini: tutte con `alt`
- [ ] Rimuovere tutti i tool di debug (FPS counter, overlay di sviluppo, tweaks panel) non destinati alla produzione

### Audit accessibilità

- [ ] Lanciare lo script diagnose-contrast
- [ ] Risolvere tutte le violazioni `color-contrast` WCAG AA (ratio ≥ 4.5:1 per testo normale, ≥ 3:1 per large text)
- [ ] Escludere solo i placeholder visivi contrassegnati che saranno sostituiti da contenuto reale

### Performance

- [ ] LCP < 2500ms su Lighthouse (o verificare CrUX se traffico sufficiente)
- [ ] Nessun `will-change` su elementi idle
- [ ] Script `beforeInteractive` ridotti al minimo indispensabile
- [ ] Font critici con `fetchPriority="high"` o preload link
- [ ] Immagini above-the-fold con `priority` su `<Image>`

### SEO

- [ ] Tutti i metadati presenti (title, description, canonical, og:title, og:image)
- [ ] `og-image.png` esistente in `public/` (1200×630px)
- [ ] Sitemap aggiornata con tutte le route
- [ ] Schema JSON-LD su ogni pagina servizio/contenuto
- [ ] robots.ts configurato correttamente

---

*Aggiornato: 2026-06-27 — Versione generica applicabile a qualsiasi progetto React/Next.js*
