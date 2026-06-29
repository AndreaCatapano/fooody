import type { Metadata } from 'next'
import Script from 'next/script'
import { buildMetadata } from '@/lib/seo'
import HomeHero from '@/components/home/HomeHero'
import ManifestoSection from '@/components/home/ManifestoSection'
import ServiziSection from '@/components/home/ServiziSection'
import ClientiMarquee from '@/components/home/ClientiMarquee'
import LavoriSection from '@/components/home/LavoriSection'
import StudioTeaser from '@/components/home/StudioTeaser'
import CtaSection from '@/components/blocks/CtaSection'

export const metadata: Metadata = buildMetadata('home')

export default function Home() {
  return (
    <>
      <HomeHero />
      <ManifestoSection />
      <ServiziSection />
      <ClientiMarquee />
      <LavoriSection />
      <StudioTeaser />
      <CtaSection
        eyebrow="— a tavola"
        eyebrowStyle={{ color: 'var(--tomato)' }}
        heading={<>Hai fame di<br />crescere?</>}
        lead="Raccontaci il tuo progetto. Primo confronto offerto dalla casa — caffè incluso, conto mai."
        ctaPrimary={{
          label: <>Prenota una call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn accent lg',
          dataTransitionWord: 'Contatti',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="btn on-ink ghost lg" href="mailto:ciao@fooody.it">
            <span className="btn-label">ciao@fooody.it</span>
          </a>
        }
      />
      <Script src="/hero-cine.js?v=2" strategy="afterInteractive" />
    </>
  )
}
