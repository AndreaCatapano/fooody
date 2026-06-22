import type { Metadata } from 'next'
import { buildMetadata, buildServiceSchema } from '@/lib/seo'
import PageHero from '@/components/blocks/PageHero'
import CtaSection from '@/components/blocks/CtaSection'
import CaseStudyBlock from '@/components/blocks/CaseStudyBlock'

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
        eyebrow={<div className="eyebrow no-slash met-accent-fg">— il metodo · per chi vive di coperti</div>}
        heading={<>Cinque mosse<br />per riempire<br /><span className="met-accent-fg">i tavoli.</span></>}
        headingStyle={{ marginTop: 22, maxWidth: '15ch' }}
        lead="Il Metodo Fooody è il nostro sistema completo per la ristorazione. Non una lista di servizi sciolti: un percorso unico che parte dall'identità e arriva ai numeri. Lo stesso che usiamo ogni giorno per chi cucina sul serio."
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

      {/* ============================================================
          INTRO — il problema
          ============================================================ */}
      <section className="section ink-region" data-bg="ink" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="divider" style={{ marginBottom: 'clamp(40px,6vw,80px)' }} />
          <div className="metodo-intro">
            <span className="eyebrow no-slash" style={{ color: 'rgba(247,244,238,.5)' }}>
              il problema
            </span>
            <h2
              className="h1 text-balance"
              data-kinetic="words"
              style={{ maxWidth: '20ch', color: 'var(--paper)' }}
            >
              Si mangia benissimo. Ma lo sa solo chi è già entrato.
            </h2>
            <p className="lead text-pretty" data-reveal="" style={{ maxWidth: '54ch' }}>
              Il piatto è perfetto, la sala pure. Poi fuori, sul telefono di chi non ti conosce, il
              tuo ristorante è un puntino tra mille. Il Metodo serve a far arrivare
              l&apos;acquolina{' '}
              <em className="italic-serif">prima</em> del menù.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          PANORAMICA — 5 pilastri (signature module)
          ============================================================ */}
      <section className="section" data-bg="paper" id="panoramica" data-sig="">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow met-eyebrow">il sistema in un colpo d&apos;occhio</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                Cinque pilastri.<br />Un percorso solo.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '32ch' }}>
              Funzionano separati, ma danno il meglio insieme.
              Sotto, ogni pilastro si compone mentre scorri.
            </p>
          </div>

          <div className="pillars-map">
            <a className="pmap pmap-1" href="#pilastri" data-reveal="">
              <span className="pmap-idx idx">01</span>
              <h3 className="h3 pmap-title">Identità</h3>
              <p className="mono pmap-sub">chi sei, prima del menù</p>
              <span className="pmap-go arrow">↓</span>
            </a>
            <a className="pmap pmap-2" href="#pilastri" data-reveal="" data-reveal-d="1">
              <span className="pmap-idx idx">02</span>
              <h3 className="h3 pmap-title">Social</h3>
              <p className="mono pmap-sub">riempire i tavoli, non il feed</p>
              <span className="pmap-go arrow">↓</span>
            </a>
            <a className="pmap pmap-3" href="#pilastri" data-reveal="" data-reveal-d="2">
              <span className="pmap-idx idx">03</span>
              <h3 className="h3 pmap-title">Menu engineering</h3>
              <p className="mono pmap-sub">il menù che vende per te</p>
              <span className="pmap-go arrow">↓</span>
            </a>
            <a className="pmap pmap-4" href="#pilastri" data-reveal="" data-reveal-d="3">
              <span className="pmap-idx idx">04</span>
              <h3 className="h3 pmap-title">Esperienza</h3>
              <p className="mono pmap-sub">dal click all&apos;ultimo boccone</p>
              <span className="pmap-go arrow">↓</span>
            </a>
            <a className="pmap pmap-5" href="#pilastri" data-reveal="" data-reveal-d="4">
              <span className="pmap-idx idx">05</span>
              <h3 className="h3 pmap-title">Crescita</h3>
              <p className="mono pmap-sub">numeri da mangiare</p>
              <span className="pmap-go arrow">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          SCROLL-TELLING — 5 pilastri
          ============================================================ */}
      <section
        data-scrolly=""
        id="pilastri"
        style={{ '--scene-bg': '#0f0c0a' } as React.CSSProperties}
      >
        <div
          className="wrap"
          style={{ paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 18 }}
        >
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <div>
              <div className="eyebrow no-slash met-accent-fg">
                — il sistema
              </div>
              <h2 className="h2" style={{ marginTop: 14, color: 'var(--paper)' }}>
                I cinque pilastri.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '30ch', color: 'rgba(247,244,238,.6)' }}>
              Scorri: ogni pilastro si compone mentre leggi. Insieme fanno il Metodo.
            </p>
          </div>
        </div>

        <div className="scrolly-inner">
          <div className="scrolly-media-col">
            <div className="scene-stack">
              {/* TODO: sostituire con immagini/video reali */}
              <div className="scene-media active ph on-ink" data-scene="1" data-placeholder="immagine pilastro 01 · identità · 4:5">
                <span className="scene-num-huge">01</span>
                <span className="scene-cap">identità · brand a tavola</span>
              </div>
              <div className="scene-media ph on-ink" data-scene="2" data-placeholder="immagine pilastro 02 · social · 4:5">
                <span className="scene-num-huge">02</span>
                <span className="scene-cap">social · riempi i tavoli</span>
              </div>
              <div className="scene-media ph on-ink" data-scene="3" data-placeholder="immagine pilastro 03 · menu · 4:5">
                <span className="scene-num-huge">03</span>
                <span className="scene-cap">menu engineering</span>
              </div>
              <div className="scene-media ph on-ink" data-scene="4" data-placeholder="immagine pilastro 04 · esperienza · 4:5">
                <span className="scene-num-huge">04</span>
                <span className="scene-cap">esperienza · dal click al conto</span>
              </div>
              <div className="scene-media ph on-ink" data-scene="5" data-placeholder="immagine pilastro 05 · crescita · 4:5">
                <span className="scene-num-huge">05</span>
                <span className="scene-cap">crescita · numeri da mangiare</span>
              </div>
            </div>
          </div>

          <div className="scrolly-steps">
            <div className="scrolly-step" data-scene="1" data-scene-bg="deep">
              <div className="step-pillar"><span>Pilastro 01</span> — identità</div>
              <h3 className="step-title">Chi sei, prima ancora del menù.</h3>
              <p className="step-body">
                Nome, logo, palette, packaging, font del menù. Diamo al locale una faccia
                riconoscibile — quella che resta in testa mentre si decide dove cenare stasera.
              </p>
              <div className="step-list">
                <span className="chip">Naming</span>
                <span className="chip">Logo &amp; identità</span>
                <span className="chip">Menu design</span>
                <span className="chip">Packaging</span>
              </div>
            </div>

            <div className="scrolly-step" data-scene="2" data-scene-bg="paper">
              <div className="step-pillar"><span>Pilastro 02</span> — social</div>
              <h3 className="step-title" style={{ color: 'var(--ink)' }}>Riempire i tavoli, non solo il feed.</h3>
              <p className="step-body" style={{ color: 'rgba(23,19,15,.72)' }}>
                Contenuti che fanno venire fame e community che prenota davvero. Reel, food
                photography, calendario editoriale: ogni post ha un coperto come obiettivo.
              </p>
              <div className="step-list">
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Content plan</span>
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Reel &amp; UGC</span>
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Food photo</span>
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Community</span>
              </div>
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(23,19,15,.15)', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '5px 10px' }}>
                <span className="mono-xs" style={{ color: 'rgba(23,19,15,.45)' }}>Vuoi solo il social?</span>
                <a className="tlink" href="/social" data-transition="" data-transition-word="Social" style={{ color: 'rgba(23,19,15,.75)' }}>
                  Scopri il servizio Social <span className="arrow">↗</span>
                </a>
              </div>
            </div>

            <div className="scrolly-step" data-scene="3" data-scene-bg="tomato">
              <div className="step-pillar" style={{ color: 'var(--ink)' }}>
                <span>Pilastro 03</span> — menu engineering
              </div>
              <h3 className="step-title" style={{ color: 'var(--ink)' }}>
                Il menù è il tuo miglior cameriere.
              </h3>
              <p className="step-body" style={{ color: 'rgba(23,19,15,.72)' }}>
                Studiamo posizione, prezzi e descrizioni per spingere i piatti giusti. Un menù
                progettato bene vende di più senza alzare la voce — e nemmeno i prezzi.
              </p>
              <div className="step-list">
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Pricing</span>
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Layout</span>
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Piatti civetta</span>
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Food cost</span>
              </div>
            </div>

            <div className="scrolly-step" data-scene="4" data-scene-bg="paper">
              <div className="step-pillar"><span>Pilastro 04</span> — esperienza</div>
              <h3 className="step-title" style={{ color: 'var(--ink)' }}>Dal primo scroll all&apos;ultimo boccone.</h3>
              <p className="step-body" style={{ color: 'rgba(23,19,15,.72)' }}>
                Sito veloce, prenotazione in due tap, recensioni gestite, QR del menù che funziona
                davvero. Tutto quello che succede tra &ldquo;ho fame&rdquo; e &ldquo;torno di sicuro&rdquo;.
              </p>
              <div className="step-list">
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Sito &amp; prenotazioni</span>
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Menu digitale</span>
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>Recensioni</span>
                <span className="chip" style={{ borderColor: 'rgba(23,19,15,.25)', color: 'var(--ink)' }}>CRM</span>
              </div>
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(23,19,15,.15)', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '5px 10px' }}>
                <span className="mono-xs" style={{ color: 'rgba(23,19,15,.45)' }}>Vuoi solo il sito?</span>
                <a className="tlink" href="/web" data-transition="" data-transition-word="Web" style={{ color: 'rgba(23,19,15,.75)' }}>
                  Scopri il servizio Web Design <span className="arrow">↗</span>
                </a>
              </div>
            </div>

            <div className="scrolly-step" data-scene="5" data-scene-bg="deep">
              <div className="step-pillar"><span>Pilastro 05</span> — crescita</div>
              <h3 className="step-title">Numeri che si possono mangiare.</h3>
              <p className="step-body">
                ADV mirata, analisi dei dati, fidelizzazione. Misuriamo coperti, scontrino medio e
                ritorno — perché &ldquo;andare bene&rdquo; deve voler dire qualcosa di preciso.
              </p>
              <div className="step-list">
                <span className="chip">ADV</span>
                <span className="chip">Analytics</span>
                <span className="chip">Fidelity</span>
                <span className="chip">Report mensile</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chapter-rail">
          <div className="chapter-rail-inner">
            <span className="mono-xs" style={{ color: 'rgba(247,244,238,.55)' }}>Metodo</span>
            <div className="chapter-progress">
              <span data-scrolly-progress="" />
            </div>
            <div className="chapter-steps">
              <span className="chapter-dot active" data-chapter-step="">01 Identità</span>
              <span className="chapter-dot" data-chapter-step="">02 Social</span>
              <span className="chapter-dot" data-chapter-step="">03 Menu</span>
              <span className="chapter-dot" data-chapter-step="">04 Esperienza</span>
              <span className="chapter-dot" data-chapter-step="">05 Crescita</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          RISULTATI
          ============================================================ */}
      <section className="section" data-bg="paper" id="risultati">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow met-eyebrow">cosa succede dopo</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                I conti tornano.<br />Anche quelli belli.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '32ch' }}>
              Medie sui ristoranti seguiti con il Metodo completo nei primi sei mesi. Niente magie, solo metodo.
            </p>
          </div>

          <div className="results-grid">
            {/* TODO: sostituire con dati reali */}
            <div className="result" data-reveal="">
              <span className="numeral result-num met-result-num" data-count="340" data-pre="+" data-suf="%" data-placeholder="KPI engagement">0</span>
              <span className="mono-xs">engagement medio</span>
            </div>
            <div className="result" data-reveal="" data-reveal-d="1">
              <span className="numeral result-num met-result-num-ink" data-count="180" data-pre="+" data-suf="%" data-placeholder="KPI prenotazioni">0</span>
              <span className="mono-xs">prenotazioni online</span>
            </div>
            <div className="result" data-reveal="" data-reveal-d="2">
              <span className="numeral result-num met-result-num" data-count="2.4" data-suf="x" data-placeholder="KPI copertura">0</span>
              <span className="mono-xs">copertura nel weekend</span>
            </div>
            <div className="result" data-reveal="" data-reveal-d="3">
              <span className="numeral result-num met-result-num-ink" data-count="18" data-suf="%" data-placeholder="KPI scontrino">0</span>
              <span className="mono-xs">scontrino medio</span>
            </div>
          </div>
        </div>
      </section>

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
        caseHref="/lavori/trattoria-tale"
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
