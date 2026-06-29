import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import ContattiHero from '@/components/contatti/ContattiHero'
import ContattiComeFunziona from '@/components/contatti/ContattiComeFunziona'
import ContattiFormSection from '@/components/contatti/ContattiFormSection'

export const metadata: Metadata = buildMetadata('contatti')

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contatti — Fooody',
  description:
    'Prenota una call gratuita con il team Fooody. Prima call senza impegno: analizziamo la tua situazione e vediamo come possiamo aiutarti.',
  url: 'https://fooody.it/contatti',
}

export default function ContattiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContattiHero />
      <ContattiComeFunziona />
      <ContattiFormSection />
    </>
  )
}
