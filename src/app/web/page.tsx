import type { Metadata } from 'next'
import { buildMetadata, buildServiceSchema } from '@/lib/seo'
import PageHero from '@/components/blocks/PageHero'
import CtaSection from '@/components/blocks/CtaSection'
import CaseStudyBlock from '@/components/blocks/CaseStudyBlock'
import DevicePreview from '@/components/web/DevicePreview'
import WebStepsSection from '@/components/web/WebStepsSection'

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

      {/* ============================================================
          SIGNATURE · ANTEPRIMA DAL VIVO
          ============================================================ */}
      <section className="section" data-bg="paper" id="anteprima" data-sig="">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow web-eyebrow">anteprima dal vivo</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                Un sito che sta<br />bene ovunque.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '32ch' }}>
              Stessa pagina, tre viewport. Cambia dispositivo: il layout si ricompone, non si rompe.
            </p>
          </div>

          <DevicePreview />

          <div className="web-stats" data-reveal="">
            <div className="web-stat">
              <span className="numeral" data-count="0.9" data-suf="s">0</span>
              <span className="mono-xs">caricamento medio</span>
            </div>
            <div className="web-stat">
              <span className="numeral" data-count="98" data-suf="/100">0</span>
              <span className="mono-xs">performance score</span>
            </div>
            <div className="web-stat">
              <span className="numeral" data-count="2" data-suf=" step">0</span>
              <span className="mono-xs">al checkout</span>
            </div>
            <div className="web-stat">
              <span className="numeral" data-count="100" data-suf="%">0</span>
              <span className="mono-xs">responsive &amp; accessibile</span>
            </div>
          </div>
        </div>
      </section>

      <WebStepsSection />

      {/* ============================================================
          STACK / capabilities
          ============================================================ */}
      <section className="section" data-bg="paper" id="stack">
        <div className="wrap">
          <div className="eyebrow web-eyebrow" data-reveal="">cosa sappiamo costruire</div>
          <h2 className="h1 text-balance" data-kinetic="words" style={{ marginTop: 16, maxWidth: '20ch' }}>
            Dal sito vetrina all&apos;e-commerce con mille referenze.
          </h2>
          <div className="web-cap-grid" data-reveal="" data-reveal-d="2">
            <div className="web-cap-card">
              <span className="mono-xs web-cap-tag">vetrina</span>
              <p className="body text-pretty">Siti istituzionali e landing che presentano bene e caricano in fretta.</p>
            </div>
            <div className="web-cap-card">
              <span className="mono-xs web-cap-tag">e-commerce</span>
              <p className="body text-pretty">Negozi online con checkout in due step, pagamenti e logistica integrati.</p>
            </div>
            <div className="web-cap-card">
              <span className="mono-xs web-cap-tag">prenotazioni</span>
              <p className="body text-pretty">Sistemi di booking per ristoranti, eventi e servizi — senza intermediari.</p>
            </div>
            <div className="web-cap-card">
              <span className="mono-xs web-cap-tag">web app</span>
              <p className="body text-pretty">Strumenti su misura: gestionali, dashboard, configuratori di prodotto.</p>
            </div>
          </div>
        </div>
      </section>

      <CaseStudyBlock
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
