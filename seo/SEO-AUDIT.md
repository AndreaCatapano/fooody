# Audit SEO Tecnico — Fooody
*Generato: giugno 2026*

## Score Tecnico: 87/100 (post-fix Fase 1+2)

| Categoria | Stato | Score |
|-----------|-------|-------|
| Crawlability | ✅ pass | 95/100 |
| Indexability | ✅ pass | 90/100 |
| Security Headers | ✅ pass (fix applicato) | 85/100 |
| URL Structure | ✅ pass | 100/100 |
| Mobile / Responsive | ✅ pass | 95/100 |
| Core Web Vitals (stima) | ⚠ warn | 72/100 |
| Structured Data | ✅ pass (aggiunto Fase 1) | 90/100 |
| JS Rendering (SSG) | ✅ pass | 95/100 |
| AI Crawler Management | ✅ pass (fix applicato) | 80/100 |

---

## Problemi risolti in Fase 2

- ✅ **Studio page metadata** — aggiunto `buildMetadata('studio')` con canonical, OG, Twitter Card; aggiunta entry `studio` in PAGES (seo.ts)
- ✅ **Studio in sitemap** — aggiunta URL `/studio` con `priority: 0.6`
- ✅ **hreflang self-referencing** — aggiunto `alternates.languages['it']` nel layout root

---

## Problemi risolti in Fase 1

- ✅ **Sitemap incompleta** — aggiunte `/social`, `/web`, `/branding`, `/contatti`
- ✅ **Canonical mancanti** — aggiunti su tutte le pagine
- ✅ **OG + Twitter Card mancanti** — aggiunti su branding, web, social, contatti
- ✅ **JSON-LD assente** — aggiunto `ProfessionalService` (Organization) nel layout + `Service` su ogni pagina servizio
- ✅ **Security headers assenti** — aggiunti in `next.config.ts` (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- ✅ **AI crawler management** — aggiunto blocco per Bytespider e CCBot in `robots.ts`
- ✅ **llms.txt** — creato in `public/llms.txt` per visibilità AI search

---

## Problemi aperti — priorità alta

### 1. `og-image.png` mancante dal public/
**Impatto:** ogni condivisione su social (WhatsApp, LinkedIn, Twitter) mostra anteprima vuota.
**Fix:** creare un'immagine 1200×630px e salvarla in `/public/og-image.png`.
Usare il logo Fooody su sfondo scuro (colore ink) con tagline.

### 2. Script `tweaks-init` con `strategy="beforeInteractive"`
**Impatto:** blocca il rendering finché lo script non è eseguito (~10-30ms extra).
**Situazione:** necessario per evitare FOUC sul pannello tweaks. Valutare se il pannello tweaks sarà in produzione — se è solo dev, rimuovere `TweaksPanel` e il relativo script dal build di produzione.

### 3. Core Web Vitals — LCP stimato
**Impatto:** il hero a 100vh con canvas particle + SVG knockout + 3 `<Script>` può causare LCP lento.
**Fix consigliato:**
- Aggiungere `<link rel="preload">` per i font Mont (già caricati con `display: swap` ✅)
- Valutare `fetchpriority="high"` sull'elemento LCP una volta identificato in produzione
- Verificare che il video placeholder non generi layout shift (CLS)

---

## Problemi aperti — priorità media

### 4. H1 homepage è `visually-hidden`
L'H1 "Fooody — agenzia creativa food" è presente ma nascosto visivamente. Google lo legge ✅, ma il visual knockout SVG non è testo indicizzabile. Considerare di rendere l'H1 visibile (o almeno non `display:none`).

### 6. IndexNow non implementato
Bing/Yandex indexano più lentamente senza IndexNow. Aggiungere il file di verifica in `public/` e l'API call su ogni deploy.

---

## Problemi aperti — priorità bassa

### 5. IndexNow non implementato
Bing/Yandex indexano più lentamente senza IndexNow. Aggiungere il file di verifica in `public/` e l'API call su ogni deploy.
