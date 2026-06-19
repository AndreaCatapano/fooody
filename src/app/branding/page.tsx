import type { Metadata } from 'next'
import BrandingClient from './BrandingClient'

export const metadata: Metadata = {
  title: 'Branding — Fooody',
  description: 'Strategia, naming, identità visiva e packaging. Diamo al tuo brand una faccia che non si scorda.',
}

export default function BrandingPage() {
  return <BrandingClient />
}
