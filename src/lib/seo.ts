/**
 * SEO CONFIG — unica sorgente di verità per tutto il sito.
 *
 * Quando cambia qualcosa (tagline, servizi, email, URL, ecc.)
 * aggiorna solo questo file: metadata, OG, JSON-LD si aggiornano di conseguenza.
 *
 * Cose che richiedono aggiornamento qui:
 *   - Nuova pagina/servizio → aggiungi una entry in PAGES
 *   - Cambia tagline o descrizione → SITE.description / SITE.tagline
 *   - Nuova email o URL → SITE.email / SITE.url
 *   - OG image pronta → SITE.ogImage (sostituisci il placeholder)
 *   - Cambio nome o dati aziendali → SITE.*
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fooody.it'

// ─── Dati aziendali ─────────────────────────────────────────────────────────

export const SITE = {
  name: 'Fooody',
  url: BASE_URL,
  email: 'ciao@fooody.it',
  tagline: 'Agenzia creativa · food & dintorni',
  description:
    'Strategia, social, branding e web per chi ha qualcosa di buono da dire. Agenzia creativa specializzata nel food.',
  descriptionShort:
    'Strategia, social, branding e web per chi ha qualcosa di buono da dire.',
  /** Sostituire con /og-image.png quando il cliente fornisce l'immagine (1200×630px) */
  ogImage: '/og-image.png',
  locale: 'it_IT',
  language: 'it',
  foundingYear: '2020',
  /** Aggiungere URL profili social quando disponibili */
  sameAs: [] as string[],
} as const

// ─── Metadata per pagina ────────────────────────────────────────────────────
// Aggiungere una entry ogni volta che si crea una nuova pagina.

export const PAGES = {
  home: {
    title: `${SITE.name} — Agenzia creativa food`,
    description: SITE.description,
    canonical: '/',
  },
  metodo: {
    title: 'Il Metodo Fooody — Cinque pilastri per riempire i tavoli',
    description:
      'Il sistema Fooody per la ristorazione: identità, social, menu engineering, esperienza digitale e crescita misurata. Cinque pilastri, zero fronzoli.',
    canonical: '/metodo',
  },
  social: {
    title: 'Social Media per ristoranti e food brand — Fooody',
    description:
      'Strategia, contenuti e community per chi lavora nel food. Dal reel virale alla campagna che converte: pensiamo, giriamo, pubblichiamo, misuriamo.',
    canonical: '/social',
  },
  web: {
    title: 'Web Design per ristoranti e food brand — Fooody',
    description:
      'Siti veloci, belli e onesti per il food. UX, UI, sviluppo e SEO sotto lo stesso tetto — dove il bottone giusto è sempre a portata di pollice.',
    canonical: '/web',
  },
  branding: {
    title: 'Branding per il food — Fooody',
    description:
      'Strategia, naming, identità visiva e packaging per ristoranti e brand food. Diamo al tuo brand una faccia che non si scorda — dal logo al packaging.',
    canonical: '/branding',
  },
  contatti: {
    title: 'Lavoriamo insieme — Fooody',
    description:
      'Raccontaci il tuo progetto food. Prima call gratuita: guardiamo i numeri di oggi e costruiamo insieme la strategia per far crescere il tuo brand.',
    canonical: '/contatti',
  },
} as const satisfies Record<string, { title: string; description: string; canonical: string }>

// ─── Helper: costruisce metadata Next.js da una entry PAGES ─────────────────

export function buildMetadata(page: keyof typeof PAGES) {
  const p = PAGES[page]
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: p.canonical },
    openGraph: {
      title: p.title,
      description: p.description,
      url: p.canonical,
      type: 'website' as const,
      locale: SITE.locale,
      siteName: SITE.name,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: p.title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: p.title,
      description: p.description,
      images: [SITE.ogImage],
    },
  }
}

// ─── JSON-LD Organization (usato nel layout, presente su ogni pagina) ────────

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.ogImage}`,
    email: SITE.email,
    description: SITE.description,
    foundingDate: SITE.foundingYear,
    areaServed: { '@type': 'Country', name: 'Italia' },
    knowsAbout: [
      'Food marketing',
      'Social media per ristoranti',
      'Branding food',
      'Web design per ristorazione',
      'Menu engineering',
    ],
    sameAs: SITE.sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servizi Fooody',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Metodo Fooody', url: `${SITE.url}/metodo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing', url: `${SITE.url}/social` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design', url: `${SITE.url}/web` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding', url: `${SITE.url}/branding` } },
      ],
    },
  }
}

// ─── JSON-LD Service (usato nelle pagine servizio) ───────────────────────────

export function buildServiceSchema(opts: {
  name: string
  description: string
  serviceType: string
  offers: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    description: opts.description,
    areaServed: { '@type': 'Country', name: 'Italia' },
    serviceType: opts.serviceType,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: opts.name,
      itemListElement: opts.offers.map(o => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: o },
      })),
    },
  }
}
