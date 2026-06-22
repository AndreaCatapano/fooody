import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import StudioClient from './StudioClient'

export const metadata: Metadata = buildMetadata('studio')

export default function StudioPage() {
  return <StudioClient />
}
