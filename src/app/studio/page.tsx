import type { Metadata } from 'next'
import StudioClient from './StudioClient'

export const metadata: Metadata = {
  title: 'Studio — Fooody',
  description: 'Un gruppo di golosi con il vizio del buon lavoro. Strategist, designer, video-maker e copy che vivono nel food perché ci credono davvero.',
}

export default function StudioPage() {
  return <StudioClient />
}
