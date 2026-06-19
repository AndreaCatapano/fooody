import type { Metadata } from 'next'
import WebClient from './WebClient'

export const metadata: Metadata = {
  title: 'Web Design — Fooody',
  description: 'Siti che convertono. UX, UI, sviluppo e SEO sotto lo stesso tetto.',
}

export default function WebPage() {
  return <WebClient />
}
