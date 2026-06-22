@AGENTS.md

## SEO — regole di aggiornamento

Il file `src/lib/seo.ts` è l'unica sorgente di verità per tutti i metadati SEO del sito.
**Non modificare direttamente i metadata nelle singole pagine**: aggiorna sempre `seo.ts`.

### Quando aggiornare `src/lib/seo.ts`

| Evento | Campo da aggiornare |
|--------|-------------------|
| Cambia tagline o descrizione dell'agenzia | `SITE.description`, `SITE.descriptionShort` |
| Cambia email di contatto | `SITE.email` |
| Cambia URL di produzione | `SITE.url` (e `NEXT_PUBLIC_SITE_URL` in env) |
| Il cliente fornisce `og-image.png` | `SITE.ogImage` → mettere `/og-image.png` in `public/` |
| Cambia il nome del brand | `SITE.name` |
| Si aggiungono profili social | `SITE.sameAs` → array di URL |
| Si aggiunge una nuova pagina | Aggiungere entry in `PAGES` + chiamare `buildMetadata()` nella nuova `page.tsx` |
| Cambia title o description di una pagina esistente | Modificare l'entry corrispondente in `PAGES` |
| Cambiano i servizi offerti | Aggiornare `buildOrganizationSchema()` → `hasOfferCatalog` + `buildServiceSchema()` nella pagina |

### Pattern da seguire per le nuove pagine

```tsx
// src/app/nuova-pagina/page.tsx
import { buildMetadata, buildServiceSchema } from '@/lib/seo'

export const metadata = buildMetadata('nuova-pagina') // aggiungere entry in PAGES prima

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
      <NuovaPaginaClient />
    </>
  )
}
```

### File strategici SEO (non deployati, solo per il team)
- `seo/SEO-AUDIT.md` — audit tecnico con score e problemi aperti
- `seo/SEO-STRATEGY.md` — piano strategico 12 mesi + analisi competitor
- `seo/CLUSTER-PLAN.md` — 5 cluster keyword con volumi e priorità
- `seo/CONTENT-CALENDAR.md` — 8 articoli pianificati per 6 mesi

### OG image (TODO cliente)
Quando il cliente fornisce il file:
1. Salvare come `public/og-image.png` (dimensioni: 1200×630px)
2. Nessun'altra modifica necessaria — `SITE.ogImage` punta già a quel path
