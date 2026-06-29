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

export const metadata: Metadata = buildMetadata('studio')

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Chi siamo — Fooody Studio',
  description:
    'Strategist, designer, video-maker e copy specializzati nel settore food & beverage. Fondato nel 2020 a Milano.',
  url: 'https://fooody.it/studio',
}

export default function StudioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <PageHero
        innerClass="stu-hero"
        textClass="stu-hero-text"
        eyebrow={<div className="eyebrow no-slash stu-accent-fg">— chi siamo · studio</div>}
        heading={<>Testa,<br />cuore<br />e <span className="stu-accent-fg">metodo.</span></>}
        headingStyle={{ marginTop: 20 }}
        lead="Strategist, designer, video-maker e copy che si prendono sul serio solo quando serve. Siamo nel food perché ci piace — e lavoriamo con qualsiasi brand abbia qualcosa di vero da dire."
        leadStyle={{ marginTop: 26, maxWidth: '46ch' }}
        ctaPrimary={{
          label: <>Lavoriamo insieme <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn stu-btn lg',
          dataTransitionWord: 'Parliamo.',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="btn on-ink ghost lg" href="#numeri">
            <span className="btn-label">Chi siamo <span className="arrow">↓</span></span>
          </a>
        }
        strip={
          <figure className="ph tall stu-hero-photo on-ink" data-reveal="" data-tilt="3">
            <span className="ph-label">foto · studio / team</span>
          </figure>
        }
        belowWrap={
          <div className="stu-hero-foot" data-reveal="" data-reveal-d="2">
            <span className="mono-xs">fondato nel 2020 · Milano</span>
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
        heading={<>30 minuti.<br />Gratis.</>}
        lead="Ti ascoltiamo, analizziamo la situazione attuale e ti diciamo se — e come — possiamo aiutarti. Nessun obbligo, nessuna vendita: solo una valutazione onesta."
        leadStyle={{ maxWidth: '44ch' }}
        ctaPrimary={{
          label: <>Prenota la call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn stu-btn lg',
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
            <span>✓ Audit gratuito del tuo canale</span>
            <span>✓ Stima budget e tempi</span>
            <span>✓ Piano d&apos;azione su misura</span>
          </div>
        }
      />
    </>
  )
}
