import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import ContattiHero from '@/components/contatti/ContattiHero'
import ContattiComeFunziona from '@/components/contatti/ContattiComeFunziona'
import ContattiFormSection from '@/components/contatti/ContattiFormSection'

export const metadata: Metadata = buildMetadata('contatti')

export default function ContattiPage() {
  return (
    <>
      <ContattiHero />
      <ContattiComeFunziona />
      <ContattiFormSection />
    </>
  )
}
