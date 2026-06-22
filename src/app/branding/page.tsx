import type { Metadata } from 'next'
import BrandingClient from './BrandingClient'
import { buildMetadata, buildServiceSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata('branding')

const jsonLd = buildServiceSchema({
  name: 'Branding per ristoranti e food brand',
  description: 'Strategia di brand, naming, identità visiva e packaging per chi opera nel settore food & beverage.',
  serviceType: 'Brand Identity',
  offers: ['Strategia di brand', 'Naming', 'Identità visiva', 'Packaging', 'Stampa'],
})

export default function BrandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BrandingClient />
    </>
  )
}
