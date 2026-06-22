import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata('home')

export default function Home() {
  return (
    <>
      {/* ============================================================
          HERO · 100vh · modalità "cola" (testo gooey pomodoro)
          TODO: scegliere la modalità definitiva con il cliente.
          Opzioni: mode-particelle | mode-reel | mode-cola (attuale) | default (video knockout)
          ============================================================ */}
      <header className="hero100 mode-particelle" id="hero" data-bg="paper">
        <div className="hero-stage">

          {/* Video placeholder — diventerà <video> con il file reale */}
          {/* data-placeholder: marcatore per trovare facilmente i placeholder da sostituire */}
          <div
            className="hero-vid ph on-ink video"
            id="hero-vid"
            data-cursor="play"
            data-placeholder="video · presentazione · 40&quot;"
          >
            <span className="ph-label" style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
              video · presentazione · 40&quot;
            </span>
          </div>

          {/* SVG mask: la carta con FOOODY trasparente mostra il video attraverso le lettere */}
          <svg
            className="hero-knockout"
            id="hero-knockout"
            width="100%"
            height="100%"
            aria-hidden="true"
          >
            <defs>
              <mask id="foody-mask">
                <rect className="kn-fill" x="0" y="0" width="100%" height="100%" fill="#fff" />
                <text
                  id="foody-text"
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#000"
                  fontWeight="800"
                >
                  FOOODY
                </text>
              </mask>
            </defs>
            <rect className="kn-bg" x="0" y="0" width="100%" height="100%" mask="url(#foody-mask)" />
          </svg>

          <h1 className="visually-hidden">Fooody — agenzia creativa food</h1>

          <div className="hero-paper" id="hero-paper" aria-hidden="true" />
          <canvas className="hero-particles" id="hero-particles" aria-hidden="true" />

          <div className="hero-cap" data-reveal="fade">
            <span className="mono-xs">agenzia creativa · food &amp; dintorni</span>
          </div>

          <div className="hero-eyebrow" data-reveal="fade">
            <span className="eyebrow">agenzia creativa · food &amp; dintorni</span>
          </div>

          <a className="hero-scroll" href="#manifesto" data-reveal="" data-reveal-d="3">
            <span className="mono-xs">scroll</span>
            <span className="hero-scroll-arrow">↓</span>
          </a>
        </div>
      </header>

      {/* ============================================================
          MANIFESTO + NUMERI (sfondo inchiostro)
          ============================================================ */}
      <section className="section ink-region" data-bg="ink" id="manifesto">
        <div className="wrap">
          <div className="manifesto-grid">
            <div>
              <div className="eyebrow no-slash" style={{ color: 'var(--tomato)' }}>
                — manifesto
              </div>
              <h2
                className="h1 text-balance"
                data-kinetic="words"
                style={{ marginTop: 18, maxWidth: '18ch' }}
              >
                Il food non si vende. Si fa desiderare.
              </h2>
              <p
                className="lead text-pretty"
                data-reveal=""
                style={{ marginTop: 24, maxWidth: '52ch' }}
              >
                Crediamo che dietro ogni piatto, ogni brand e ogni scroll ci sia una persona affamata
                di qualcosa di buono. Il nostro lavoro è apparecchiare la tavola giusta — con metodo,
                gusto e un pizzico di sfacciataggine.
              </p>
            </div>

            <div className="stats">
              <div className="stat" data-reveal="" data-reveal-d="1">
                {/* TODO: sostituire con dati reali approvati dal cliente */}
                <span className="numeral stat-num" data-count="40" data-suf="+" data-placeholder="KPI clienti">0</span>
                <span className="mono-xs">clienti serviti</span>
              </div>
              <div className="stat" data-reveal="" data-reveal-d="2">
                <span className="numeral stat-num" data-count="340" data-pre="+" data-suf="%" data-placeholder="KPI engagement">0</span>
                <span className="mono-xs">engagement medio</span>
              </div>
              <div className="stat" data-reveal="" data-reveal-d="3">
                <span className="numeral stat-num" data-count="5" data-placeholder="KPI anni">0</span>
                <span className="mono-xs">anni a tavola</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVIZI — 4 porte
          ============================================================ */}
      <section className="section" data-bg="paper" id="servizi">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">quattro modi di lavorare con noi</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                Scegli la portata.<br />Al resto pensiamo noi.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '34ch' }}>
              Stesso studio, quattro appetiti diversi. Entra dalla porta che ti somiglia — o chiamaci
              e te lo diciamo noi.
            </p>
          </div>

          <div className="services">
            <a
              className="service"
              href="/metodo"
              data-transition=""
              data-transition-word="Metodo"
              data-preview="#211c17"
              data-preview-label="metodo · ristorazione"
              data-magnetic="0.08"
            >
              <div className="service-idx idx">01 / 04</div>
              <div className="service-main">
                <h3 className="h2 service-title">Metodo Fooody</h3>
                <p className="service-sub mono">per ristoranti, catene &amp; chi vive di coperti</p>
                <p className="body text-pretty service-desc">
                  Il nostro sistema completo per la ristorazione: social che riempiono i tavoli,
                  menù che vendono, identità che si ricordano. Cinque pilastri, zero fronzoli.
                </p>
                <div className="service-chips">
                  <span className="chip">Social</span>
                  <span className="chip">Menu engineering</span>
                  <span className="chip">Branding</span>
                  <span className="chip">Packaging</span>
                  <span className="chip">Sito</span>
                </div>
                {/* TODO: sostituire con nome cliente reale */}
                <p className="mono-xs service-kpi">
                  es. Trattoria Tale · +340% engagement, +180% prenotazioni in 6 mesi
                </p>
              </div>
              <div className="service-go">
                <span className="mono-xs">scopri</span>
                <span className="arrow">↗</span>
              </div>
            </a>

            <a
              className="service"
              href="/social"
              data-transition=""
              data-transition-word="Social"
              data-preview="#1d2a22"
              data-preview-label="social · oltre il food"
              data-magnetic="0.08"
            >
              <div className="service-idx idx">02 / 04</div>
              <div className="service-main">
                <h3 className="h2 service-title">Social Media</h3>
                <p className="service-sub mono">per brand, retailer e aziende — anche oltre il food</p>
                <p className="body text-pretty service-desc">
                  Strategia, contenuti e community che non fanno scrollare oltre. Dal reel virale
                  alla campagna che converte: pensiamo, giriamo, pubblichiamo, misuriamo.
                </p>
                <div className="service-chips">
                  <span className="chip">Strategia</span>
                  <span className="chip">Content</span>
                  <span className="chip">Reels &amp; UGC</span>
                  <span className="chip">ADV</span>
                  <span className="chip">Community</span>
                </div>
                <p className="mono-xs service-kpi">
                  es. Brand Tale · 5M views virali · community +28k in 4 mesi
                </p>
              </div>
              <div className="service-go">
                <span className="mono-xs">scopri</span>
                <span className="arrow">↗</span>
              </div>
            </a>

            <a
              className="service"
              href="/web"
              data-transition=""
              data-transition-word="Web"
              data-preview="#22201a"
              data-preview-label="web · sito + dev"
              data-magnetic="0.08"
            >
              <div className="service-idx idx">03 / 04</div>
              <div className="service-main">
                <h3 className="h2 service-title">Web Design</h3>
                <p className="service-sub mono">siti che convertono, non solo che si guardano</p>
                <p className="body text-pretty service-desc">
                  UX, UI, sviluppo e SEO sotto lo stesso tetto. Costruiamo siti veloci, belli e
                  onesti — dove il bottone giusto è sempre a portata di pollice.
                </p>
                <div className="service-chips">
                  <span className="chip">UX</span>
                  <span className="chip">UI</span>
                  <span className="chip">CMS</span>
                  <span className="chip">E-commerce</span>
                  <span className="chip">SEO</span>
                </div>
                <p className="mono-xs service-kpi">
                  es. E-shop Tale · da 0 a 18k visite/mese · checkout in 2 step
                </p>
              </div>
              <div className="service-go">
                <span className="mono-xs">scopri</span>
                <span className="arrow">↗</span>
              </div>
            </a>

            <a
              className="service"
              href="/branding"
              data-transition=""
              data-transition-word="Branding"
              data-preview="#2a211f"
              data-preview-label="branding · identità"
              data-magnetic="0.08"
            >
              <div className="service-idx idx">04 / 04</div>
              <div className="service-main">
                <h3 className="h2 service-title">Branding</h3>
                <p className="service-sub mono">identità che si riconoscono al primo morso</p>
                <p className="body text-pretty service-desc">
                  Strategia, naming, identità visiva e packaging. Diamo al tuo brand una faccia,
                  una voce e un carattere — di quelli che non si scordano facilmente.
                </p>
                <div className="service-chips">
                  <span className="chip">Strategia</span>
                  <span className="chip">Naming</span>
                  <span className="chip">Identità</span>
                  <span className="chip">Packaging</span>
                  <span className="chip">Stampa</span>
                </div>
                <p className="mono-xs service-kpi">
                  es. Brand Tale · rebranding completo · a scaffale in 8 settimane
                </p>
              </div>
              <div className="service-go">
                <span className="mono-xs">scopri</span>
                <span className="arrow">↗</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          CLIENTI — marquee
          ============================================================ */}
      <section className="section-tight" data-bg="paper-2" style={{ background: 'var(--paper-2)' }}>
        <div
          className="wrap"
          style={{
            marginBottom: 26,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span className="eyebrow">hanno mangiato con noi</span>
          {/* TODO: sostituire con SVG monocromo dei loghi reali */}
          <span className="mono-xs">loghi clienti · versione monocromatica</span>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {/* TODO: sostituire con nomi/SVG clienti reali */}
            <span className="client-logo" data-placeholder="logo cliente">CLIENTE</span>
            <span className="client-logo" data-placeholder="logo cliente">Trattoria</span>
            <span className="client-logo" data-placeholder="logo cliente">FoodCo</span>
            <span className="client-logo" data-placeholder="logo cliente">Brand·</span>
            <span className="client-logo" data-placeholder="logo cliente">Mercato</span>
            <span className="client-logo" data-placeholder="logo cliente">Forno+</span>
            <span className="client-logo" data-placeholder="logo cliente">Vino &amp; Co</span>
            <span className="client-logo" data-placeholder="logo cliente">DeliKa</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          LAVORI SCELTI
          ============================================================ */}
      <section className="section" data-bg="paper" id="lavori">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">già fatto venire l&apos;acquolina a</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                Lavori scelti.
              </h2>
            </div>
            <a className="tlink" href="/lavori">
              vedi tutti i casi <span className="arrow">↗</span>
            </a>
          </div>

          <div className="work-grid">
            {/* TODO: sostituire con case study reali + immagini di copertina 4:5 */}
            <a className="work" href="/lavori/trattoria-tale" data-cursor="apri">
              <div className="ph tall work-cover" data-placeholder="case · cover 4:5">
                <span className="ph-label">case · cover</span>
              </div>
              <div className="work-meta">
                <div>
                  <span className="h3">Nome Cliente</span>
                  <p className="mono-xs">ristorazione · social + branding</p>
                </div>
                <span className="numeral work-kpi">+340%</span>
              </div>
            </a>

            <a className="work" href="/lavori/brand-tale" data-cursor="apri">
              <div className="ph tall work-cover" data-placeholder="case · cover 4:5">
                <span className="ph-label">case · cover</span>
              </div>
              <div className="work-meta">
                <div>
                  <span className="h3">Nome Cliente</span>
                  <p className="mono-xs">food brand · social + adv</p>
                </div>
                <span className="numeral work-kpi">5M</span>
              </div>
            </a>

            <a className="work" href="/lavori/eshop-tale" data-cursor="apri">
              <div className="ph tall work-cover" data-placeholder="case · cover 4:5">
                <span className="ph-label">case · cover</span>
              </div>
              <div className="work-meta">
                <div>
                  <span className="h3">Nome Cliente</span>
                  <p className="mono-xs">e-commerce · web + seo</p>
                </div>
                <span className="numeral work-kpi">18k</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          STUDIO teaser
          ============================================================ */}
      <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="studio">
        <div className="wrap">
          <div className="studio-grid">
            {/* TODO: sostituire con foto team reale (formato 4:5) */}
            <figure
              className="ph tall studio-photo"
              data-reveal=""
              data-tilt="4"
              data-placeholder="team · foto studio · formato 4:5"
            >
              <span className="ph-label">team · foto studio</span>
            </figure>

            <div>
              <div className="eyebrow">chi siamo</div>
              <h2
                className="h1 text-balance"
                data-kinetic="words"
                style={{ marginTop: 18, maxWidth: '18ch' }}
              >
                Un gruppo di golosi con il vizio del buon lavoro.
              </h2>
              <p
                className="lead text-pretty"
                data-reveal=""
                style={{ marginTop: 22, maxWidth: '48ch' }}
              >
                Strategist, designer, video-maker e copy che si prendono sul serio solo quando
                serve. Lavoriamo nel food perché ci piace — e perché nessuno racconta una storia
                meglio di un piatto fatto bene.
              </p>

              <div className="studio-vals" data-reveal="" data-reveal-d="2">
                <div className="val">
                  <span className="numeral">01</span>
                  <span className="mono">Gusto prima di tutto</span>
                </div>
                <div className="val">
                  <span className="numeral">02</span>
                  <span className="mono">Dati senza fuffa</span>
                </div>
                <div className="val">
                  <span className="numeral">03</span>
                  <span className="mono">Mani in pasta</span>
                </div>
              </div>

              <a
                className="btn ghost"
                href="/studio"
                style={{ marginTop: 30 }}
                data-magnetic="0.3"
                data-transition=""
                data-transition-word="Studio"
              >
                <span className="btn-label">
                  Conosci lo studio <span className="arrow">↗</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA finale (sfondo inchiostro)
          ============================================================ */}
      <section className="section ink-region" data-bg="ink" id="contatti">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div
            className="eyebrow no-slash"
            style={{ justifyContent: 'center', color: 'var(--tomato)' }}
          >
            — a tavola
          </div>
          <h2
            className="mega"
            data-kinetic="lines"
            style={{ margin: '22px auto 0', maxWidth: '16ch' }}
          >
            Hai fame di<br />crescere?
          </h2>
          <p
            className="lead text-pretty"
            data-reveal=""
            style={{ margin: '26px auto 0', maxWidth: '42ch' }}
          >
            Raccontaci il tuo progetto. Primo confronto offerto dalla casa — caffè incluso, conto mai.
          </p>
          <div
            data-reveal=""
            data-reveal-d="2"
            style={{
              marginTop: 36,
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              className="btn accent lg"
              href="/contatti"
              data-magnetic="0.3"
              data-transition=""
              data-transition-word="Contatti"
            >
              <span className="btn-label">
                Prenota una call <span className="arrow">↗</span>
              </span>
            </a>
            <a className="btn on-ink ghost lg" href="mailto:ciao@fooody.it">
              <span className="btn-label">ciao@fooody.it</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
