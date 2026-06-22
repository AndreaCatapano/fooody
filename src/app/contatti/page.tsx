import type { Metadata } from 'next'
import ContattiClient from './ContattiClient'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata('contatti')

export default function ContattiPage() {
  return <ContattiClient />
}
