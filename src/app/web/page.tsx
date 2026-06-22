import type { Metadata } from 'next'
import WebClient from './WebClient'
import { buildMetadata, buildServiceSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata('web')

const jsonLd = buildServiceSchema({
  name: 'Web Design per ristoranti e food brand',
  description: 'Siti web, e-commerce e landing page per ristoranti, food brand e produttori. UX, UI, sviluppo e SEO.',
  serviceType: 'Web Design',
  offers: ['UX & UI Design', 'Sviluppo web', 'CMS', 'E-commerce', 'SEO on-site'],
})

export default function WebPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebClient />
    </>
  )
}
