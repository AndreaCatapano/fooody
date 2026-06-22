import type { Metadata } from 'next'
import { buildMetadata, buildServiceSchema } from '@/lib/seo'
import PageHero from '@/components/blocks/PageHero'
import CtaSection from '@/components/blocks/CtaSection'
import CaseStudyBlock from '@/components/blocks/CaseStudyBlock'
import BrandBoard from '@/components/branding/BrandBoard'

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

      {/* ============================================================
          SIGNATURE · BRAND BOARD
          ============================================================ */}
      <section className="section" data-bg="paper" id="board" data-sig="">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow brand-eyebrow">il sistema, assemblato</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                Un&apos;identità non è<br />un logo. È un sistema.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '32ch' }}>
              Nome, colori, tipografia, packaging: tutto parla la stessa lingua. Premi{' '}
              <em className="italic-serif">rigenera</em> per vederlo cambiare.
            </p>
          </div>
          <BrandBoard />
        </div>
      </section>

      {/* ============================================================
          COSA FACCIAMO — griglia asimmetrica brd-caps
          ============================================================ */}
      <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="cosa">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow brand-eyebrow">cosa facciamo</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                Dalla strategia<br />al lancio.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '34ch' }}>
              Quattro tappe per costruire un marchio coerente — dentro e fuori dal piatto.
            </p>
          </div>

          <div className="brd-caps">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vw,20px)' }}>
              <article className="brd-cap brd-cap-sm brd-c1" data-reveal="">
                <div className="brd-cap-idx">01</div>
                <h3 className="brd-cap-title">Strategia di marca</h3>
                <p className="brd-cap-sub mono">cosa sei, per chi, e perché ti scelgono</p>
                <p className="brd-cap-desc text-pretty">Posizionamento, valori, pubblico, archetipo. Le fondamenta su cui poggia ogni scelta visiva successiva.</p>
                <div className="brd-cap-chips">
                  <span className="chip">Positioning</span>
                  <span className="chip">Brand platform</span>
                  <span className="chip">Ricerca</span>
                </div>
              </article>

              <article className="brd-cap brd-cap-sm brd-c2" data-reveal="" data-reveal-d="2">
                <div className="brd-cap-idx">02</div>
                <h3 className="brd-cap-title">Naming &amp; voce</h3>
                <p className="brd-cap-sub mono">il nome giusto e come lo dici</p>
                <p className="brd-cap-desc text-pretty">Naming, tagline, tono di voce, verifica di disponibilità. Un nome che si pronuncia, si ricorda e si trova.</p>
                <div className="brd-cap-chips">
                  <span className="chip">Naming</span>
                  <span className="chip">Tagline</span>
                  <span className="chip">Tone of voice</span>
                </div>
              </article>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vw,20px)' }}>
              <article className="brd-cap brd-cap-lg brd-c3" data-reveal="" data-reveal-d="1">
                <div className="brd-cap-inner">
                  <div className="brd-cap-idx">03</div>
                  <h3 className="brd-cap-title">Identità visiva</h3>
                  <p className="brd-cap-sub mono">logo, colori, tipografia, sistema</p>
                  <p className="brd-cap-desc text-pretty">Marchio, palette, font, griglie e linee guida. Un sistema che resta coerente dal biglietto da visita all&apos;insegna — e che il sito eredita di default.</p>
                  <div className="brd-cap-chips">
                    <span className="chip">Logo</span>
                    <span className="chip">Design system</span>
                    <span className="chip">Brand book</span>
                  </div>
                </div>
                <a className="brd-cross brd-cross-web" href="/web" data-transition="" data-transition-word="Web">
                  <span className="brd-cross-pre">Pronto a portarla online?</span>
                  <span className="brd-cross-cta">Costruiamo il sito con il Web Design ↗</span>
                </a>
              </article>

              <article className="brd-cap brd-cap-lg brd-c4" data-reveal="" data-reveal-d="3">
                <div className="brd-cap-inner">
                  <div className="brd-cap-idx">04</div>
                  <h3 className="brd-cap-title">Packaging &amp; stampa</h3>
                  <p className="brd-cap-sub mono">il brand che prendi in mano</p>
                  <p className="brd-cap-desc text-pretty">Etichette, confezioni, menù, materiali stampati. L&apos;identità che diventa oggetto — pronta per lo scaffale e per la foto che gira sui social.</p>
                  <div className="brd-cap-chips">
                    <span className="chip">Packaging</span>
                    <span className="chip">Etichette</span>
                    <span className="chip">Stampa</span>
                  </div>
                </div>
                <a className="brd-cross brd-cross-soc" href="/social" data-transition="" data-transition-word="Social">
                  <span className="brd-cross-pre">Vuoi darle voce sui social?</span>
                  <span className="brd-cross-cta">Pensiamoci col Social Media ↗</span>
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ELEMENTI DEL SISTEMA
          ============================================================ */}
      <section className="section" data-bg="paper" id="elementi">
        <div className="wrap">
          <div className="eyebrow brand-eyebrow" data-reveal="">gli elementi che consegniamo</div>
          <h2 className="h1 text-balance" data-kinetic="words" style={{ marginTop: 16, maxWidth: '18ch' }}>
            Tutto quello che serve per essere un brand.
          </h2>
          <div className="sys-grid" data-reveal="" data-reveal-d="2">
            <div className="sys-tile sys-color">
              <span className="mono-xs">colore</span>
              <div className="sys-color-row">
                <i style={{ background: '#DD5049' }} />
                <i style={{ background: '#EFB44F' }} />
                <i style={{ background: '#6352F0' }} />
                <i style={{ background: '#17130f' }} />
                <i style={{ background: '#f7f4ee' }} />
              </div>
              <p className="small">Palette primaria, secondaria e neutri — con i codici per ogni supporto.</p>
            </div>
            <div className="sys-tile sys-typeface">
              <span className="mono-xs">tipografia</span>
              <span className="sys-type-big">Aa Bb</span>
              <p className="small">Famiglia display e da testo, scala tipografica, regole d&apos;uso.</p>
            </div>
            <div className="sys-tile sys-logo">
              <span className="mono-xs">marchio</span>
              <div className="sys-logo-row">
                <span className="sys-mark">M<i>.</i></span>
                <span className="sys-mark sys-mark-mono">M.</span>
              </div>
              <p className="small">Logo principale, versioni, area di rispetto e dimensioni minime.</p>
            </div>
          </div>
        </div>
      </section>

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
