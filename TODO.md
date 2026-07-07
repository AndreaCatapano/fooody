# TODO — Fooody

Stato lavori interni. Aggiornato: 2026-07-01.

## ✅ Fatto (tecnico, senza dipendenza dal cliente)

- Form contatti collegato a Resend (API route + validazione + rate limit)
- Route `/lavori` rimossa (nessun contenuto reale, link ripuliti in tutto il sito)
- Sitemap aggiornata (`/privacy` aggiunta)
- Pagine `not-found.tsx` ed `error.tsx` brandizzate
- Scaffolding Google Analytics 4 (rispetta Consent Mode v2)
- Integrazione Iubenda Cookie Solution (CMP + Google Consent Mode)
- `manifest.ts` (PWA, senza icone reali)
- CSP promossa da report-only a enforced, con allowlist GA4/Iubenda

## 🔴 Bloccato su account esterni (da fare appena hai le credenziali)

| Cosa | Dove metterla | Note |
|---|---|---|
| API key Resend | `.env.local` → `RESEND_API_KEY` | Crea account su resend.com, verifica dominio `fooody.it` (1 record DNS) |
| Email destinatario form (opzionale) | `.env.local` → `CONTACT_FORM_TO` | Default: `ciao@fooody.it` se lasci vuoto |
| Site ID + Cookie Policy ID Iubenda | `.env.local` → `NEXT_PUBLIC_IUBENDA_SITE_ID` / `NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID` | Nel pannello Iubenda attivare anche l'integrazione "Google Consent Mode" (Cookie Solution → Advanced) |
| Measurement ID GA4 | `.env.local` → `NEXT_PUBLIC_GA_ID` | Formato `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_SITE_URL` in produzione | env del provider di hosting | Deve combaciare col dominio reale in produzione |

## 🟡 Bloccato sui contenuti del cliente

Vedi `CONTENUTI-DA-CLIENTE.md` per l'elenco preciso di file, dimensioni e testi richiesti. Riassunto di cosa sblocca cosa:

- Logo → favicon reali, apple-touch-icon, icone manifest PWA, header/footer
- Foto/copy team → sezione Studio (hero + membri)
- Case study reali (testi + foto/numeri) → sezione "Lavori scelti" in home, blocchi case study nelle pagine servizio, eventuale nuova pagina `/lavori` (oggi rimossa apposta perché non c'era contenuto)
- Loghi clienti → marquee "clienti" in home
- OG image 1200×630 → condivisioni social (link WhatsApp, Facebook, LinkedIn, iMessage)
- Link social reali → footer e pagina contatti (oggi placeholder `#`)
- Testi definitivi per tutte le pagine (oggi copy in buona parte già scritto ma da validare col cliente)

## 🟢 Da fare a ridosso del go-live (dopo i contenuti)

- [ ] Sostituire ogni immagine placeholder (`data-placeholder`) con `next/image` reale
- [ ] Rigenerare favicon/apple-touch-icon/manifest icons dal logo definitivo
- [ ] Aggiungere `/lavori` alla sitemap solo quando esistono case study reali
- [ ] Popolare `SITE.sameAs` in `src/lib/seo.ts` con i profili social reali
- [ ] Audit contrasto colore finale (script `diagnose-contrast.ts`) — oggi sono esclusi i placeholder
- [ ] Lighthouse/CWV completo con immagini reali (i numeri cambiano molto rispetto a placeholder vuoti)
- [ ] Verificare redirect www↔apex a livello DNS/hosting (fuori dal codice, va fatto sul pannello dominio)
- [ ] Disattivare l'indicizzazione (`robots: noindex`) su eventuali ambienti di staging/preview
- [ ] Attivare Google Search Console + Bing Webmaster, sottomettere la sitemap
- [ ] Eseguire la checklist go-live già presente in `PLAYBOOK-NEXTJS-PERFORMANCE.md` (§10)

## ⚪ Facoltativo / da valutare

- [ ] Error tracking (es. Sentry) — non bloccante ma utile in produzione
- [ ] Sostituire il placeholder di `/privacy` con l'embed Iubenda (privacy policy + cookie policy generate dal loro tool)
