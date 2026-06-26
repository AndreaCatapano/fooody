import type { Metadata } from 'next'
import { buildMetadata, buildServiceSchema } from '@/lib/seo'
import PageHero from '@/components/blocks/PageHero'
import CtaSection from '@/components/blocks/CtaSection'
import ProofStats from '@/components/blocks/ProofStats'
import CaseStudyBlock from '@/components/blocks/CaseStudyBlock'
import SocFeedSection from '@/components/social/SocFeedSection'
import SocCosaSection from '@/components/social/SocCosaSection'

export const metadata: Metadata = buildMetadata('social')

const jsonLd = buildServiceSchema({
  name: 'Social Media Marketing per ristoranti e food brand',
  description: 'Strategia social, produzione contenuti, community management e advertising per ristoranti, food brand e aziende del settore food & beverage.',
  serviceType: 'Social Media Marketing',
  offers: ['Strategia editoriale', 'Produzione contenuti e Reels', 'Community management', 'Advertising (Meta Ads)'],
})

export default function SocialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        innerClass="soc-hero"
        textClass="soc-hero-text"
        eyebrow={<div className="eyebrow no-slash soc-accent-fg">— social media · food &amp; oltre</div>}
        heading={<>Contenuti che<br />fermano<br /><span className="soc-accent-fg">il pollice.</span></>}
        headingStyle={{ marginTop: 20 }}
        lead="Strategia, contenuti e community che non fanno scrollare oltre. Dal reel che gira alla campagna che converte: pensiamo, giriamo, pubblichiamo, misuriamo."
        leadStyle={{ marginTop: 26, maxWidth: '46ch' }}
        ctaPrimary={{
          label: <>Prenota una call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn soc-btn lg',
          dataTransitionWord: 'Contatti',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="btn on-ink ghost lg" href="#feed">
            <span className="btn-label">Guarda il feed <span className="arrow">↓</span></span>
          </a>
        }
        strip={
          <div className="soc-hero-strip" data-reveal="" aria-hidden="true">
            {/* TODO: sostituire con reel reali */}
            <div className="reel-mini ph on-ink video"><span className="reel-mini-tag">reel · 0:14</span></div>
            <div className="reel-mini ph on-ink video"><span className="reel-mini-tag">carosello · ×7</span></div>
            <div className="reel-mini ph on-ink video"><span className="reel-mini-tag">UGC · cliente</span></div>
          </div>
        }
        belowWrap={
          <div className="soc-hero-foot" data-reveal="" data-reveal-d="2">
            <span className="mono-xs">marca per marca · format su misura · niente post a vuoto</span>
            <span className="mono-xs soc-accent-fg">↓ il feed, vivo</span>
          </div>
        }
      />

      <SocFeedSection />

      <SocCosaSection />

      <ProofStats
        eyebrow="— numeri, non sensazioni"
        eyebrowClass="soc-accent-fg"
        heading="Quello che pubblichiamo, lo misuriamo."
        items={[
          { count: 340, prefix: '+', suffix: '%', label: 'engagement medio · 6 mesi' },
          { count: 5, suffix: 'M', label: 'views sul reel più virale' },
          { count: 28, prefix: '+', suffix: 'k', label: 'nuova community in 4 mesi' },
          { count: 3.1, suffix: 'x', label: 'ritorno sulla spesa ADV' },
        ]}
        gridClass="soc-proof"
        itemClass="soc-proof-item"
        numeralClass="soc-proof-num"
        id="numeri"
      />

      <CaseStudyBlock
        eyebrow="caso · food brand"
        eyebrowClass="soc-eyebrow"
        coverLabel="case · reel + feed"
        coverPlaceholder="case · reel + feed · 4:5"
        heading={<>Da feed spento a 5 milioni di views.</>}
        lead="Strategia rifatta, format nuovi, un reel al giorno per 90 giorni. In quattro mesi il brand è passato dal post di cortesia alla coda fuori dal punto vendita."
        kpis={[
          { value: '5M', label: 'views', color: 'var(--tomato-deep)' },
          { value: '+28k', label: 'community', color: 'var(--tomato-deep)' },
          { value: '4', label: 'mesi' },
        ]}
        caseHref="/lavori"
        dataBg="paper"
      />

      <CtaSection
        eyebrow="— pronti a postare?"
        eyebrowClass="soc-accent-fg"
        heading={<>Facciamo girare<br />il tuo feed.</>}
        lead="Raccontaci il brand. Prima call gratuita: guardiamo i numeri di oggi e da dove far partire la crescita."
        ctaPrimary={{
          label: <>Prenota una call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn soc-btn lg',
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
