import type { Metadata } from 'next'
import { buildMetadata, buildServiceSchema } from '@/lib/seo'
import PageHero from '@/components/blocks/PageHero'
import WordScramble from '@/components/blocks/WordScramble'
import CtaSection from '@/components/blocks/CtaSection'
import CaseStudyBlock from '@/components/blocks/CaseStudyBlock'
import MetodoIntro from '@/components/metodo/MetodoIntro'
import MetodoPanoramica from '@/components/metodo/MetodoPanoramica'
import MetodoScrollTelling from '@/components/metodo/MetodoScrollTelling'
import MetodoRisultati from '@/components/metodo/MetodoRisultati'

const jsonLd = buildServiceSchema({
  name: 'Metodo Fooody — Sistema integrato per la ristorazione',
  description: 'Sistema completo per ristoranti: identità visiva, social media, menu engineering, esperienza digitale e crescita misurata.',
  serviceType: 'Consulenza marketing per la ristorazione',
  offers: [
    'Identità visiva per ristoranti',
    'Social media per la ristorazione',
    'Menu engineering',
    'Esperienza digitale (sito, prenotazioni, QR)',
    'Crescita e advertising',
  ],
})

export const metadata: Metadata = buildMetadata('metodo')

export default function MetodoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        paddingBottom="clamp(60px,8vh,110px)"
        eyebrow={<div className="eyebrow no-slash met-accent-fg">— IL METODO · PER CHI AMA E VIVE DI RISTORAZIONE</div>}
        heading={
          <>
            <WordScramble
              className="met-accent-fg"
              words={[
                'Pizzerie',
                'Fine dining',
                'Fast casual',
                'Pasticcerie',
                'Bakery',
                'Pub',
                'Bistrot',
                'Take away',
                'Boulangerie',
              ]}
            />
            <br />
            format diversi,<br />
            stessa sfida farsi scegliere.
          </>
        }
        headingKinetic={false}
        headingStyle={{ marginTop: 22, maxWidth: '18ch' }}
        lead="Il Metodo Fooody è per chi non vuole essere un locale come tanti. Valorizziamo ciò che ti rende forte, sistemiamo ciò che ti frena e costruiamo una strategia verticale per riempire tavoli, aumentare ordini, far tornare clienti e incidere sulle performance del tuo locale."
        leadStyle={{ maxWidth: '48ch' }}
        footerClass="metodo-hero-foot"
        ctaClass="metodo-hero-cta"
        ctaPrimary={{
          label: <>Scopri i 5 pilastri <span className="arrow">↓</span></>,
          href: '#panoramica',
          className: 'btn met-btn',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <span className="mono-xs" style={{ color: 'rgba(247,244,238,.5)' }}>
            tempo di lettura · 4 min di scroll
          </span>
        }
      />

      <MetodoIntro />
      <MetodoPanoramica />
      <MetodoScrollTelling />
      <MetodoRisultati />

      <CaseStudyBlock
        eyebrow="caso · ristorazione"
        eyebrowClass="met-eyebrow"
        coverLabel="case · cover / reel"
        coverPlaceholder="case study · cover + reel · 4:5"
        heading={<>Trattoria Tale, da insegna a indirizzo.</>}
        lead="Identità rifatta, social ripensato, menù ridisegnato e sito con prenotazioni. In sei mesi la trattoria è passata dal passaparola al tutto-esaurito del sabato."
        kpis={[
          { value: '+340%', label: 'engagement', color: 'var(--gold-deep)' },
          { value: '+180%', label: 'prenotazioni', color: 'var(--gold-deep)' },
          { value: '6', label: 'mesi' },
        ]}
        dataBg="paper-2"
        sectionStyle={{ background: 'var(--paper-2)' }}
      />

      <CtaSection
        eyebrow="— pronti a ordinare?"
        eyebrowClass="met-accent-fg"
        heading={<>Mettiamo il<br />Metodo a tavola.</>}
        lead="Raccontaci il tuo locale. Prima call gratuita: capiamo se c'è feeling — e da dove partire."
        ctaPrimary={{
          label: <>Prenota una call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn accent lg',
          dataTransitionWord: 'Contatti',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="btn on-ink ghost lg" href="/" data-transition="" data-transition-word="Fooody.">
            <span className="btn-label">Torna alla home</span>
          </a>
        }
      />
    </>
  )
}
