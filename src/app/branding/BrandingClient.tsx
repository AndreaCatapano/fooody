'use client'
import { useEffect } from 'react'

const BRANDS = [
  {
    name: 'Pomo', dot: '#DD5049', tag: 'Sugo come una volta', cat: 'conserve artigianali',
    sw: [['#DD5049', '#DD5049'], ['#EFB44F', '#EFB44F'], ['#17130f', 'ink']],
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(221,80,73,.34), transparent 60%)',
  },
  {
    name: 'Cru', dot: '#6352F0', tag: 'Vino senza etichetta', cat: 'cantina urbana',
    sw: [['#6352F0', '#6352F0'], ['#17130f', 'ink'], ['#f7f4ee', 'paper']],
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(99,82,240,.34), transparent 60%)',
  },
  {
    name: 'Mielo', dot: '#EFB44F', tag: 'Dolce di mestiere', cat: 'pasticceria',
    sw: [['#EFB44F', '#EFB44F'], ['#DD5049', '#DD5049'], ['#fdf3e0', 'soft']],
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(239,180,79,.40), transparent 60%)',
  },
  {
    name: 'Brace', dot: '#DD5049', tag: 'Fuoco e niente fronzoli', cat: 'griglieria',
    sw: [['#17130f', 'ink'], ['#DD5049', '#DD5049'], ['#EFB44F', '#EFB44F']],
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(221,80,73,.30), transparent 55%)',
  },
  {
    name: 'Orto', dot: '#6352F0', tag: 'Dal campo, oggi', cat: 'box di stagione',
    sw: [['#EFB44F', '#EFB44F'], ['#6352F0', '#6352F0'], ['#17130f', 'ink']],
    pack: 'radial-gradient(120% 80% at 50% 30%, rgba(239,180,79,.30), transparent 60%)',
  },
]

function BrandBoard() {
  useEffect(() => {
    let i = 0
    const card = document.getElementById('board-card')
    const nameEl = document.getElementById('b-name')
    const dotEl = document.getElementById('b-dot')
    const tagEl = document.getElementById('b-tag')
    const catEl = document.getElementById('b-cat')
    const swEl = document.getElementById('b-swatches')
    const packEl = document.getElementById('b-pack') as HTMLElement | null
    const btn = document.getElementById('b-regen')

    function render(b: typeof BRANDS[0]) {
      if (nameEl) { (nameEl.childNodes[0] as Text).textContent = b.name }
      if (dotEl) { dotEl.style.color = b.dot }
      if (tagEl) { tagEl.textContent = b.tag }
      if (catEl) { catEl.textContent = b.cat }
      if (swEl) {
        swEl.innerHTML = b.sw.map(s =>
          `<span class="board-sw" style="background:${s[0]}"><i class="mono-xs">${s[1]}</i></span>`
        ).join('')
      }
      if (packEl) { packEl.style.setProperty('--pack-grad', b.pack) }
    }

    if (btn) {
      btn.addEventListener('click', () => {
        i = (i + 1) % BRANDS.length
        card?.classList.add('is-shuffling')
        setTimeout(() => { render(BRANDS[i]); card?.classList.remove('is-shuffling') }, 180)
      })
    }
  }, [])

  return (
    <div className="board" data-reveal="" id="board-card">
      <div className="board-tile board-wordmark">
        <span className="mono-xs board-cap">wordmark</span>
        <span className="board-logo" id="b-name">Pomo<span className="board-dot" id="b-dot" style={{ color: '#DD5049' }}>.</span></span>
        <span className="board-tagline mono" id="b-tag">Sugo come una volta</span>
      </div>
      <div className="board-tile board-palette">
        <span className="mono-xs board-cap">palette</span>
        <div className="board-swatches" id="b-swatches">
          <span className="board-sw" style={{ background: '#DD5049' }}><i className="mono-xs">#DD5049</i></span>
          <span className="board-sw" style={{ background: '#EFB44F' }}><i className="mono-xs">#EFB44F</i></span>
          <span className="board-sw" style={{ background: '#17130f' }}><i className="mono-xs">ink</i></span>
        </div>
      </div>
      <div className="board-tile board-type">
        <span className="mono-xs board-cap">tipografia</span>
        <span className="board-type-big">Aa</span>
        <span className="board-type-meta mono-xs">Mont · grottesca</span>
      </div>
      <div className="board-tile board-pack">
        <span className="mono-xs board-cap">packaging</span>
        {/* TODO: sostituire con mockup packaging reale */}
        <div className="board-pack-mock ph" id="b-pack"><span className="ph-label">mockup · etichetta</span></div>
      </div>
      <div className="board-tile board-ctrl">
        <span className="mono-xs board-cap">settore</span>
        <span className="board-cat" id="b-cat">conserve artigianali</span>
        <button className="btn brand-btn board-regen" id="b-regen" data-magnetic="0.2">
          <span className="btn-label">Rigenera <span className="arrow">↻</span></span>
        </button>
      </div>
    </div>
  )
}

export default function BrandingClient() {
  return (
    <>
      {/* ============================================================
          HERO (ink)
          ============================================================ */}
      <header
        className="section ink-region"
        data-bg="ink"
        style={{ paddingTop: 'clamp(130px,18vh,220px)', paddingBottom: 'clamp(48px,7vw,96px)' }}
      >
        <div className="wrap">
          <div className="eyebrow no-slash" style={{ color: 'rgba(247,244,238,.6)' }}>
            — branding · identità &amp; packaging
          </div>
          <h1 className="mega" data-kinetic="lines" style={{ marginTop: 20, maxWidth: '15ch' }}>
            Riconoscibili<br />a prima <span className="brand-spectrum-text">vista.</span>
          </h1>
          <div className="brand-spectrum-bar" data-reveal="" aria-hidden="true" />
          <div className="brand-hero-foot">
            <p className="lead text-pretty" data-reveal="" data-reveal-d="2" style={{ maxWidth: '48ch' }}>
              Strategia, naming, identità visiva e packaging. Diamo al tuo brand una faccia, una
              voce e un carattere — di quelli che non si scordano facilmente.
            </p>
            <div className="brand-hero-cta" data-reveal="" data-reveal-d="3">
              <a className="btn brand-btn lg" href="/contatti" data-transition="" data-transition-word="Contatti" data-magnetic="0.3">
                <span className="btn-label">Prenota una call <span className="arrow">↗</span></span>
              </a>
              <span className="mono-xs" style={{ color: 'rgba(247,244,238,.5)' }}>
                ↓ generane uno in tempo reale
              </span>
            </div>
          </div>
        </div>
      </header>

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
            {/* colonna sinistra: 2 card piccole */}
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

            {/* colonna destra: 2 card grandi */}
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

      {/* ============================================================
          CASE integrato
          ============================================================ */}
      <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="caso">
        <div className="wrap">
          <div className="eyebrow brand-eyebrow" data-reveal="">caso · rebranding</div>
          <div className="case-grid">
            {/* TODO: sostituire con immagini reali */}
            <figure className="ph tall case-cover" data-reveal="" data-tilt="4" data-cursor="guarda" data-placeholder="case · identità + packaging · 4:5">
              <span className="ph-label">case · identità + packaging</span>
            </figure>
            <div>
              <h2 className="h1 text-balance" data-kinetic="words" style={{ maxWidth: '16ch' }}>
                Dal brief al lancio in otto settimane.
              </h2>
              <p className="lead text-pretty" data-reveal="" style={{ marginTop: 20, maxWidth: '46ch' }}>
                Rebranding completo: nuovo nome, identità da zero, sistema di packaging per tutta
                la linea. Otto settimane dal primo schizzo al prodotto sullo scaffale.
              </p>
              <div className="case-kpis" data-reveal="" data-reveal-d="2">
                <div className="case-kpi">
                  <span className="numeral" style={{ color: 'var(--tomato-deep)' }}>8</span>
                  <span className="mono-xs">settimane</span>
                </div>
                <div className="case-kpi">
                  <span className="numeral" style={{ color: 'var(--gold-deep)' }}>12</span>
                  <span className="mono-xs">referenze</span>
                </div>
                <div className="case-kpi">
                  <span className="numeral" style={{ color: 'var(--violet-deep)' }}>+45%</span>
                  <span className="mono-xs">a scaffale</span>
                </div>
              </div>
              <a className="tlink" href="/lavori" style={{ marginTop: 28, display: 'inline-flex' }}>
                leggi il caso completo <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA (ink)
          ============================================================ */}
      <section className="section ink-region" data-bg="ink" id="contatti">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div className="eyebrow no-slash" style={{ justifyContent: 'center', color: 'rgba(247,244,238,.6)' }}>
            — pronti a farvi riconoscere?
          </div>
          <h2 className="mega" data-kinetic="lines" style={{ margin: '22px auto 0', maxWidth: '15ch' }}>
            Diamo una faccia<br />al tuo <span className="brand-spectrum-text">brand.</span>
          </h2>
          <p className="lead text-pretty" data-reveal="" style={{ margin: '26px auto 0', maxWidth: '42ch' }}>
            Raccontaci chi sei. Prima call gratuita: capiamo cosa rende il tuo marchio diverso
            dagli altri.
          </p>
          <div data-reveal="" data-reveal-d="2" style={{ marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn brand-btn lg" href="/contatti" data-transition="" data-transition-word="Contatti" data-magnetic="0.3">
              <span className="btn-label">Prenota una call <span className="arrow">↗</span></span>
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
