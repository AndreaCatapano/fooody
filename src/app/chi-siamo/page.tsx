import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import PageHero from '@/components/blocks/PageHero'
import CtaSection from '@/components/blocks/CtaSection'
import StuNumeri from '@/components/studio/StuNumeri'
import StuManifesto from '@/components/studio/StuManifesto'
import StuTeam from '@/components/studio/StuTeam'
import StuValori from '@/components/studio/StuValori'
import StuProcesso from '@/components/studio/StuProcesso'
import StuTestimonianza from '@/components/studio/StuTestimonianza'
import StuClienti from '@/components/studio/StuClienti'
import StuLavora from '@/components/studio/StuLavora'

export const metadata: Metadata = buildMetadata('chiSiamo')

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Chi siamo — Fooody',
  description:
    'Strategist, designer, video-maker e copy specializzati nel settore food & beverage. Fondato nel 2020 a Portici (Napoli).',
  url: 'https://fooody.it/chi-siamo',
}

export default function ChiSiamoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <PageHero
        innerClass="stu-hero"
        textClass="stu-hero-text"
        eyebrow={<div className="eyebrow no-slash stu-accent-fg">— chi siamo</div>}
        heading={<>Le teste dietro<br />i tuoi <span className="stu-accent-fg">contenuti.</span></>}
        headingStyle={{ marginTop: 20 }}
        lead="Fooody è un insieme di teste diverse che lavorano nella stessa direzione. Ognuno con la sua skill, ognuno fondamentale nel far girare la macchina. Ci piace costruire progetti veri, con identità, contenuti e numeri che abbiano senso."
        leadStyle={{ marginTop: 26, maxWidth: '46ch' }}
        ctaPrimary={{
          label: <>Collabora con noi <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn lg',
          dataTransitionWord: 'Parliamo.',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="btn on-ink ghost lg" href="#numeri">
            <span className="btn-label">Chi siamo <span className="arrow">↓</span></span>
          </a>
        }
        strip={
          <figure className="ph stu-hero-photo on-ink" data-reveal="" data-tilt="3">
            <span className="ph-label">foto · studio / team</span>
          </figure>
        }
        belowWrap={
          <div className="stu-hero-foot" data-reveal="" data-reveal-d="2">
            <span className="mono-xs">fondato nel 2020 · Portici (NA)</span>
            <span className="mono-xs stu-accent-fg">↓ la nostra storia</span>
          </div>
        }
      />

      <StuNumeri />
      <StuManifesto />
      <StuTeam />
      <StuValori />
      <StuProcesso />
      <StuTestimonianza />
      <StuClienti />
      <StuLavora />

      <CtaSection
        eyebrow="— prima call"
        eyebrowClass="stu-accent-fg"
        heading={<>30 minuti per capire<br />se ha senso lavorare insieme.</>}
        lead="Ti ascoltiamo, guardiamo dove sei oggi e capiamo se possiamo aiutarti realmente. Nessun obbligo, nessuna vendita forzata: solo una valutazione chiara su cosa funziona."
        leadStyle={{ maxWidth: '44ch' }}
        ctaPrimary={{
          label: <>Incontriamoci <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn lg',
          dataTransitionWord: 'Parliamo.',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="btn on-ink ghost lg" href="mailto:ciao@fooody.it">
            <span className="btn-label">ciao@fooody.it</span>
          </a>
        }
        extra={
          <div className="stu-call-punti" data-reveal="" data-reveal-d="1">
            <span>✓ Audit del tuo canale</span>
            <span>✓ Preventivo</span>
            <span>✓ Strategia su misura</span>
          </div>
        }
      />
    </>
  )
}
