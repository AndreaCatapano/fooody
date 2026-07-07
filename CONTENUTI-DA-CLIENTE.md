# Contenuti richiesti al cliente — Fooody

Documento unico e completo: tutto ciò che serve per completare il sito (immagini, video, testi, dati legali, SEO). Da inviare una sola volta al cliente/copywriter.

**Come organizzare l'invio:** una cartella condivisa (Drive/Dropbox) con le sotto-cartelle numerate come le sezioni qui sotto (`1-logo`, `2-og-image`, `3-team`, ...). Aiuta a non perdere pezzi.

**Formati preferiti in generale:**
- Loghi/icone → **SVG** (o PNG trasparente ad alta risoluzione se SVG non disponibile)
- Foto → **JPG o PNG**, risoluzione **almeno** quella indicata per ogni voce (mai sotto — meglio in eccesso, ritagliamo noi)
- Video → **MP4 H.264** o sorgente non compresso, risoluzione almeno Full HD
- Evitare screenshot, immagini scaricate da Google, o stock photo con watermark non licenziate

---

## 1. Logo e brand

| File | Formato | Specifiche | Uso |
|---|---|---|---|
| Logo principale | **SVG** (vettoriale, preferito) | Colori piatti, testo convertito in tracciati | Header, footer |
| Logo principale (fallback) | PNG trasparente | Almeno **1000×1000 px**, sfondo trasparente | Fallback dove SVG non è supportato |
| Logo monocromatico | SVG o PNG trasparente | Versione a 1 colore (bianco e/o nero) | Su sfondi scuri/colorati — il sito cambia colore per pagina (nero, arancio, viola) |
| Simbolo/icona da solo (se esiste) | SVG | Solo l'icona, senza scritta, leggibile anche piccolo | Base per favicon e icone app (vedi sezione 2) |

Se non esiste una versione "solo simbolo", va bene il logo completo: lo adattiamo noi.

---

## 2. Favicon & icone app

**Non serve che il cliente prepari questi file** — li generiamo noi a partire dal logo (sezione 1) in alta risoluzione. Elenco per trasparenza su cosa verrà prodotto automaticamente:

| File | Dimensione |
|---|---|
| `favicon.ico` | 16×16, 32×32, 48×48 px (multi-size in un unico file) |
| `apple-touch-icon.png` | 180×180 px |
| Icona manifest PWA | 192×192 px |
| Icona manifest PWA | 512×512 px |

**Requisito minimo dal cliente:** il file sorgente del logo/simbolo deve essere almeno 512×512 px (idealmente vettoriale) perché queste icone vengano bene a tutte le dimensioni.

---

## 3. Immagine OG (anteprima condivisioni social)

Quando un link al sito viene condiviso su WhatsApp, LinkedIn, Facebook, iMessage, ecc., viene mostrata questa immagine.

| File | Formato | Dimensioni | Note |
|---|---|---|---|
| `og-image.png` | PNG o JPG | **1200×630 px esatti** | Logo/testo centrato, margine di sicurezza ~80px sui bordi (alcune piattaforme ritagliano ai lati). Peso file consigliato < 300 KB |

---

## 4. Foto team (sezione "Studio")

| Cosa | Aspect ratio | Risoluzione minima | Quantità |
|---|---|---|---|
| Foto hero team (foto di gruppo/studio) | **3:4** verticale | 1200×1600 px | 1 |
| Ritratto — fondatore | **3:4** verticale | 900×1200 px | 1 |
| Ritratto — creative director | **3:4** verticale | 900×1200 px | 1 |
| Ritratto — head of content | **3:4** verticale | 900×1200 px | 1 |
| Ritratto — video director | **3:4** verticale | 900×1200 px | 1 |

Formato JPG o PNG, no watermark. Se ruoli/nomi in squadra sono diversi da questi 4, segnalalo: la sezione si adatta.

Insieme alle foto, servono anche: **nome e cognome, ruolo esatto** di ciascuna persona (per didascalie e eventuale schema.org `Person`).

---

## 5. Case study (portfolio lavori)

Per **ogni progetto** da mostrare come case study — minimo 3 per riempire la sezione "Lavori scelti" in home:

| Elemento | Specifiche |
|---|---|
| Immagine di copertina | Aspect ratio **4:5** verticale, min. 1200×1500 px, JPG/PNG |
| Nome cliente | Testo — solo se il cliente finale è ok ad essere citato pubblicamente |
| Settore | Es. "ristorazione", "food brand", "e-commerce" |
| Servizi erogati | Es. "social + branding", "web + SEO" |
| KPI/risultato chiave | Un numero forte e verificabile, es. "+340% engagement", "5M views", "+64% conversione" |
| Testo case study (facoltativo, consigliato) | 150–400 parole: contesto, cosa avete fatto, risultato ottenuto |

> Nota tecnica: la pagina `/lavori` è stata rimossa dal sito perché oggi non c'era contenuto reale (era tutto placeholder con dati finti). Appena arrivano almeno 3 case study reali, la ricreiamo con link funzionanti e la rimettiamo in sitemap.

---

## 6. Loghi clienti

| File | Formato | Specifiche |
|---|---|---|
| Logo di ogni cliente da mostrare in home/Studio | SVG (preferito) o PNG trasparente | Altezza equivalente minima 400px, sfondo trasparente, versione monocromatica se disponibile |

Servono almeno **6–8 loghi** per riempire bene la striscia scorrevole in home. **Serve l'ok esplicito di ogni cliente finale** a comparire sul sito.

---

## 7. Video hero (homepage)

| Elemento | Specifiche |
|---|---|
| Formato | MP4 (H.264) o sorgente ad alta qualità (ProRes/MOV va bene, comprimiamo noi) |
| Risoluzione | Minimo **1920×1080** (Full HD), meglio 4K per margine di ricompressione |
| Orientamento | Orizzontale, copre l'intero schermo (16:9 o più largo) |
| Durata | Ideale **10–20 secondi** in loop continuo senza stacchi netti (loop breve = file più leggero = sito più veloce) |
| Audio | Non necessario (parte muto in autoplay) |

Se preferite un video narrativo più lungo (~40"), va bene: lo useremo per una versione estesa e ne ricaveremo un loop breve per lo sfondo.

---

## 8. Immagini "I 5 pilastri" (pagina Metodo)

Una immagine per ciascun pilastro del metodo:

| File | Aspect ratio | Risoluzione minima |
|---|---|---|
| Pilastro 01 — Identità | **4:5** verticale | 1200×1500 px |
| Pilastro 02 — Social | **4:5** verticale | 1200×1500 px |
| Pilastro 03 — Menu | **4:5** verticale | 1200×1500 px |
| Pilastro 04 — Esperienza digitale | **4:5** verticale | 1200×1500 px |
| Pilastro 05 — Crescita | **4:5** verticale | 1200×1500 px |

Possono essere foto reali di progetti passati coerenti col tema del pilastro, o immagini rappresentative/mood.

---

## 9. Testi e informazioni aziendali

| Cosa | Dove serve |
|---|---|
| Tagline/descrizione agenzia definitiva | Meta description, homepage, condivisioni social |
| Email di contatto definitiva (se diversa da `ciao@fooody.it`) | Header, footer, form, schema.org |
| Città/indirizzo operativo definitivi | Footer, pagina contatti, schema.org (oggi: "Milano" placeholder) |
| Testi definitivi per ogni pagina | Tutte le pagine — il copy è già scritto ma va validato/corretto dal cliente prima del lancio |
| Numeri statistiche homepage | Sezione "Manifesto" in home — oggi placeholder: **40+ clienti**, **+340% engagement**, **5 anni di attività**. Confermare o correggere questi numeri |

---

## 10. Link social e presenza online

| Piattaforma | Cosa serve |
|---|---|
| Instagram | URL profilo completo (oggi placeholder `#` in footer e pagina contatti) |
| TikTok | URL profilo completo (oggi placeholder `#`) |
| LinkedIn | URL profilo completo (oggi placeholder `#`) |
| Altri profili attivi (Facebook, Pinterest, YouTube...) | URL, se esistono e vanno mostrati |

Questi link vengono usati anche nello schema.org (`sameAs`) — aiutano Google a collegare il sito ai profili social ufficiali, utile per SEO e per la scheda "Knowledge Panel".

---

## 11. Dati legali (per Privacy Policy / Cookie Policy)

La pagina `/privacy` oggi è un placeholder generico. Per completarla (anche tramite Iubenda, vedi sezione 13) servono:

| Dato | Note |
|---|---|
| Ragione sociale completa | Es. "Fooody S.r.l." o nome ditta individuale |
| P.IVA / Codice Fiscale | Obbligatorio per informativa privacy |
| Indirizzo sede legale | Via, città, CAP, provincia |
| PEC o email legale (se diversa da quella di contatto) | Per comunicazioni formali |
| Eventuale RPD/DPO nominato | Solo se applicabile alla vostra struttura |
| Servizi terzi che trattano dati (da confermare) | Oggi previsti: Resend (invio email form), Google Analytics 4 (statistiche), Iubenda (gestione consensi) — vanno elencati nella cookie policy |

---

## 12. SEO — dati e conferme necessarie

| Cosa | Perché serve |
|---|---|
| Conferma/correzione parole chiave target per servizio (Metodo, Social, Web, Branding) | Verificare che titoli e descrizioni SEO (`src/lib/seo.ts`) rispecchino come i clienti reali cercano questi servizi |
| Testimonianze/recensioni clienti (testo + nome + eventuale foto) | Aumentano fiducia (E-E-A-T) e possono diventare schema.org `Review`/`AggregateRating` |
| Zone geografiche servite, se rilevante oltre "tutta Italia" | Per eventuale local SEO / schema con `areaServed` più preciso |
| Account Google Business Profile (se esiste, o va creato) | Migliora visibilità locale su Google Maps/ricerca, specialmente se avete una sede fisica o incontrate clienti di persona |
| Contenuti/articoli già pubblicati altrove (guest post, interviste, menzioni stampa) | Utili per backlink e per rafforzare l'autorevolezza del dominio |

---

## 13. Account esterni da creare (operativo, non contenuto — ma serve la vostra approvazione/accesso)

Questi non sono file da inviare, ma **servizi da attivare** perché il sito sia pienamente funzionante. Se preferite li creiamo noi per vostro conto — serve solo l'ok e, in alcuni casi, un accesso al pannello DNS del dominio `fooody.it`:

| Servizio | A cosa serve | Cosa serve da voi |
|---|---|---|
| **Resend** | Invio email dal form contatti del sito | Un accesso email per l'account + 1 record DNS su `fooody.it` (lo aggiungiamo noi se ci date accesso al pannello dominio) |
| **Iubenda** | Cookie banner GDPR-compliant + generazione Privacy/Cookie Policy | I dati legali della sezione 11 |
| **Google Analytics 4** | Statistiche di traffico e conversioni | Un account Google da collegare (anche gratuito, va bene quello aziendale) |
| **Google Search Console** | Monitoraggio indicizzazione su Google | Stesso account Google di cui sopra |

---

## Riepilogo rapido — cosa manca, in ordine di priorità per andare live

1. Logo (sblocca favicon, icone, header/footer) — **priorità massima**
2. Dati legali per privacy policy (sezione 11) — obbligatorio per legge prima del lancio
3. Link social reali (sezione 10) — oggi sono placeholder rotti (`#`)
4. OG image 1200×630 — altrimenti le condivisioni social sono rotte
5. Foto team + case study — completano le pagine principali
6. Video hero, loghi clienti, immagini pilastri — rifiniture, il sito funziona anche senza ma è molto meglio con
