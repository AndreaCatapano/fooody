import type { Metadata } from 'next'
import SocialClient from './SocialClient'
import { buildMetadata, buildServiceSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata('social')

const jsonLd = buildServiceSchema({
  name: 'Social Media Marketing per ristoranti e food brand',
  description: 'Strategia social, produzione contenuti, community management e advertising per ristoranti, food brand e aziende del settore food & beverage.',
  serviceType: 'Social Media Marketing',
  offers: ['Strategia editoriale', 'Produzione contenuti e Reels', 'Community management', 'Advertising (Meta Ads)'],
})

export default function SocialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SocialClient />
    </>
  )
}
