import type { Metadata } from 'next'
import SocialClient from './SocialClient'

export const metadata: Metadata = {
  title: 'Social Media — Fooody',
  description: 'Strategia, contenuti e community per il food. Dal reel che gira alla campagna che converte.',
}

export default function SocialPage() {
  return <SocialClient />
}
