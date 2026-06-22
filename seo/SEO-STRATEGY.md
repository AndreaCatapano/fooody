# Piano SEO Strategico — Fooody
*Generato: giugno 2026 | Orizzonte: 12 mesi*

## Executive Summary

Fooody opera in una nicchia con buona domanda organica in Italia (food marketing B2B per HoReCa) e competitività media. Il sito parte da zero autorità di dominio ma ha vantaggi competitivi chiari: specializzazione verticale nel food, identità visiva forte, e servizi end-to-end che pochi competitor italiani offrono in modo integrato.

**KPI target a 12 mesi:**
| Metrica | Baseline | 3 mesi | 6 mesi | 12 mesi |
|---------|----------|--------|--------|---------|
| Traffico organico/mese | 0 | 200–400 | 800–1.500 | 2.500–5.000 |
| Keyword in top 10 | 0 | 5–10 | 20–35 | 60–100 |
| Domain Rating stimato | 0 | 5–10 | 15–25 | 30–45 |
| Pagine indicizzate | 6 | 10–15 | 20–30 | 40–60 |
| Conversioni da organico | 0 | 2–5 | 8–15 | 20–40 |

---

## Analisi competitiva

### Competitor principali

| Sito | Punti di forza | Punti deboli | Opportunità Fooody |
|------|---------------|--------------|-------------------|
| erbacipollina.com | Brand storico (10+ anni), contenuti | Design datato, no metodo strutturato | Posizionamento più visivo e moderno |
| aromi.group | Esperienza HoReCa, blog attivo | Comunicazione generica | Metodo Fooody differenzia con sistema integrato |
| restaurant-revolution.it | Focus ristoranti, buona SEO | Solo marketing, no branding completo | Offrire stack completo |
| foodpromotion.it | Social marketing puro | Nessun web/branding | Hub integrato vs servizio singolo |
| webmarketingforfood.com | Keyword "marketing food" | Solo consulenza, no produzione | Produzione contenuti + strategia |

### Gap keyword da sfruttare
- Nessun competitor domina "menu engineering ristorante" → opportunità editoriale
- "agenzia creativa food" ha KD basso → posizionamento rapido homepage
- Long-tail "come riempire i tavoli" con intento informazionale forte → blog Cluster D

---

## Fase 1 — Foundation (Mesi 1-2) ✅ COMPLETATA

### Completato in questa sessione:
- [x] Sitemap XML completa (6 URL)
- [x] Canonical su tutte le pagine
- [x] OG + Twitter Card su tutte le pagine
- [x] JSON-LD Organization (ProfessionalService) nel layout
- [x] JSON-LD Service su ogni pagina servizio
- [x] Security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [x] robots.ts con AI crawler management
- [x] llms.txt per AI search visibility

### Da completare (bloccanti):
- [ ] Creare `og-image.png` (1200×630px) in `/public/`
- [ ] Creare `apple-touch-icon.png` in `/public/`
- [ ] Configurare Google Search Console (verificare dominio)
- [ ] Configurare Google Analytics 4
- [ ] Impostare `NEXT_PUBLIC_SITE_URL=https://fooody.it` in produzione

---

## Fase 2 — Contenuti (Mesi 2-5)

### Priorità 1: creare sezione blog
- URL: `/blog/` o `/risorse/`
- Struttura: lista articoli + pagina singola con `Article` JSON-LD
- Targeting iniziale: 4 blog post del Cluster D (Metodo) — volume alto, KD basso

### Priorità 2: ottimizzare pagine esistenti
- `/metodo` → aggiungere FAQ con `FAQPage` JSON-LD (domande da "People Also Ask" Google)
- `/social` → aggiungere sezione con statistiche e case study (E-E-A-T)
- `/branding` → aggiungere portfolio con `ImageGallery` + `CreativeWork` schema
- `/web` → aggiungere sezione con tecnologie e case study (tempo di caricamento, conversioni)

### Priorità 3: Google Business Profile
Creare/ottimizzare profilo GBP con:
- Categoria: "Agenzia di marketing"
- Servizi elencati (branding, social, web)
- Foto studio/team
- Descrizione con keyword "agenzia marketing food"

### Priorità 4: LocalBusiness schema
Aggiungere schema `LocalBusiness` nel layout (address, telephone, openingHours) se Fooody ha sede fisica.

---

## Fase 3 — Scale (Mesi 5-9)

### Blog: pubblicazione sistematica
- Cadenza: 2 articoli/mese
- Priorità: Cluster A (social), poi Cluster B (branding), poi Cluster C (web)
- Ogni articolo: 1.200–1.800 parole, H2/H3 strutturati, immagini ottimizzate, JSON-LD Article
- Vedere `CONTENT-CALENDAR.md` per il piano editoriale

### Link building (tier 1)
1. **Comunicati stampa food**: inviare a testate di settore (Identità Golose, Dissapore, Ristorazione Italiana)
2. **Guest post**: scrivere su blog HoReCa (FIPE, Confcommercio Turismo)
3. **Directory di settore**: iscriversi a directory agenzie italiane (Clutch.co IT, Sortlist IT)
4. **PR digitale**: casi studio su clienti (con permesso) → backlink naturali

### GEO (AI Search Optimization)
- Mantenere `llms.txt` aggiornato
- Aggiungere sezione FAQ nelle pagine principali
- Usare linguaggio diretto e "citabile" (statistiche proprie, definizioni chiare)
- Strutturare testi con paragrafi brevi e heading chiari (favorisce AI Overview)

---

## Fase 4 — Authority (Mesi 9-12)

### Thought leadership
- 1 report di settore annuale: "Social media per la ristorazione italiana: dati e trend"
- Partecipazione a podcast/webinar del settore HoReCa
- Case study dettagliati (con numeri reali) → contenuto E-E-A-T fortissimo

### Avanzamento tecnico
- Implementare IndexNow per Bing
- Monitoring SEO drift con `/seo drift baseline`
- Analisi CrUX trimestrale via Google Search Console
- A/B test meta description su pagine servizio

---

## Schema markup roadmap

| Pagina | Schema attuale | Da aggiungere |
|--------|---------------|---------------|
| Layout (tutte) | ProfessionalService ✅ | LocalBusiness (se sede fisica) |
| /metodo | Service ✅ | FAQPage |
| /social | Service ✅ | FAQPage, Review |
| /web | Service ✅ | FAQPage |
| /branding | Service ✅ | FAQPage |
| /blog/[slug] | — | Article, BreadcrumbList |
| /lavori/[slug] | — | CreativeWork, Review |

---

## Note su E-E-A-T

Google valuta Esperienza, Competenza, Autorevolezza, Affidabilità. Per Fooody:

- **Esperienza**: aggiungere case study con numeri reali (non placeholder) → priorità alta
- **Competenza**: autori degli articoli con bio e ruolo (es. "Andrea, Founder & Strategist")
- **Autorevolezza**: menzioni su testate di settore, testimonial con nome e azienda reale
- **Affidabilità**: Privacy Policy, cookie banner conforme, email verificabile, P.IVA visibile
