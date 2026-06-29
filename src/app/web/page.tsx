import type { Metadata } from 'next'
import { buildMetadata, buildServiceSchema } from '@/lib/seo'
import PageHero from '@/components/blocks/PageHero'
import CtaSection from '@/components/blocks/CtaSection'
import CaseStudyBlock from '@/components/blocks/CaseStudyBlock'
import WebAnteprimaSection from '@/components/web/WebAnteprimaSection'
import WebStepsSection from '@/components/web/WebStepsSection'
import WebCapabilitiesSection from '@/components/web/WebCapabilitiesSection'

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

      <PageHero
        cidPrefix="WA"
        eyebrow={<div className="eyebrow no-slash web-accent-fg">— web design · ux · sviluppo</div>}
        heading={<>Siti che<br /><span className="web-accent-fg">convertono.</span><br />Non solo che si guardano.</>}
        headingStyle={{ marginTop: 20, maxWidth: '16ch' }}
        lead="UX, UI, sviluppo e SEO sotto lo stesso tetto. Costruiamo siti veloci, belli e onesti — dove il bottone giusto è sempre a portata di pollice."
        leadStyle={{ maxWidth: '48ch' }}
        footerClass="web-hero-foot"
        ctaClass="web-hero-cta"
        ctaPrimary={{
          label: <>Prenota una call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn web-btn lg',
          dataTransitionWord: 'Contatti',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <span className="mono-xs" style={{ color: 'rgba(247,244,238,.5)' }}>
            ↓ provalo: desktop, tablet, mobile
          </span>
        }
      />

      <WebAnteprimaSection />
      <WebStepsSection />
      <WebCapabilitiesSection />

      <CaseStudyBlock
        cidPrefix="WE"
        eyebrow="caso · e-commerce"
        eyebrowClass="web-eyebrow"
        coverLabel="case · sito + checkout"
        coverPlaceholder="case · sito + checkout · 4:5"
        heading={<>Da zero a 18k visite al mese.</>}
        lead="Nuovo e-commerce, checkout ridisegnato in due step, SEO da capo. In sei mesi il negozio è passato dal «ce l'abbiamo anche online» a primo canale di vendita."
        kpis={[
          { value: '18k', label: 'visite/mese', color: 'var(--violet-deep)' },
          { value: '+64%', label: 'conversione', color: 'var(--violet-deep)' },
          { value: '0.9s', label: 'caricamento' },
        ]}
        caseHref="/lavori"
        dataBg="paper-2"
        sectionStyle={{ background: 'var(--paper-2)' }}
      />

      <CtaSection
        cidPrefix="WF"
        eyebrow="— pronti a costruire?"
        eyebrowClass="web-accent-fg"
        heading={<>Mettiamo online<br />qualcosa di buono.</>}
        lead="Raccontaci il progetto. Prima call gratuita: capiamo cosa serve davvero e cosa no."
        ctaPrimary={{
          label: <>Prenota una call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn web-btn lg',
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
