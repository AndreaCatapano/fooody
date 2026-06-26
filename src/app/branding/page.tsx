import type { Metadata } from 'next'
import { buildMetadata, buildServiceSchema } from '@/lib/seo'
import PageHero from '@/components/blocks/PageHero'
import CtaSection from '@/components/blocks/CtaSection'
import CaseStudyBlock from '@/components/blocks/CaseStudyBlock'
import BrandBoardSection from '@/components/branding/BrandBoardSection'
import BrandCaps from '@/components/branding/BrandCaps'
import BrandElementi from '@/components/branding/BrandElementi'

export const metadata: Metadata = buildMetadata('branding')

const jsonLd = buildServiceSchema({
  name: 'Branding per ristoranti e food brand',
  description: 'Strategia di brand, naming, identità visiva e packaging per chi opera nel settore food & beverage.',
  serviceType: 'Brand Identity',
  offers: ['Strategia di brand', 'Naming', 'Identità visiva', 'Packaging', 'Stampa'],
})

export default function BrandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={
          <div className="eyebrow no-slash" style={{ color: 'rgba(247,244,238,.6)' }}>
            — branding · identità &amp; packaging
          </div>
        }
        heading={<>Riconoscibili<br />a prima <span className="brand-spectrum-text">vista.</span></>}
        headingStyle={{ marginTop: 20, maxWidth: '15ch' }}
        extra={<div className="brand-spectrum-bar" data-reveal="" aria-hidden="true" />}
        lead="Strategia, naming, identità visiva e packaging. Diamo al tuo brand una faccia, una voce e un carattere — di quelli che non si scordano facilmente."
        leadStyle={{ maxWidth: '48ch' }}
        footerClass="brand-hero-foot"
        ctaClass="brand-hero-cta"
        ctaPrimary={{
          label: <>Prenota una call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn brand-btn lg',
          dataTransitionWord: 'Contatti',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <span className="mono-xs" style={{ color: 'rgba(247,244,238,.5)' }}>
            ↓ generane uno in tempo reale
          </span>
        }
      />

      <BrandBoardSection />
      <BrandCaps />
      <BrandElementi />

      <CaseStudyBlock
        eyebrow="caso · rebranding"
        eyebrowClass="brand-eyebrow"
        coverLabel="case · identità + packaging"
        coverPlaceholder="case · identità + packaging · 4:5"
        heading={<>Dal brief al lancio in otto settimane.</>}
        lead="Rebranding completo: nuovo nome, identità da zero, sistema di packaging per tutta la linea. Otto settimane dal primo schizzo al prodotto sullo scaffale."
        kpis={[
          { value: '8', label: 'settimane', color: 'var(--tomato-deep)' },
          { value: '12', label: 'referenze', color: 'var(--gold-deep)' },
          { value: '+45%', label: 'a scaffale', color: 'var(--violet-deep)' },
        ]}
        caseHref="/lavori"
        dataBg="paper-2"
        sectionStyle={{ background: 'var(--paper-2)' }}
      />

      <CtaSection
        eyebrow="— pronti a farvi riconoscere?"
        eyebrowStyle={{ color: 'rgba(247,244,238,.6)' }}
        heading={<>Diamo una faccia<br />al tuo <span className="brand-spectrum-text">brand.</span></>}
        lead="Raccontaci chi sei. Prima call gratuita: capiamo cosa rende il tuo marchio diverso dagli altri."
        ctaPrimary={{
          label: <>Prenota una call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn brand-btn lg',
          dataTransitionWord: 'Contatti',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="btn on-ink ghost lg" href="mailto:ciao@fooody.it">
            <span className="btn-label">ciao@fooody.it</span>
          </a>
        }
      />
    </>
  )
}
