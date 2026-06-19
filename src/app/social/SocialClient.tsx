'use client'
import { useEffect, useRef, useState } from 'react'

function FeedMarquee() {
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const feed = feedRef.current
    if (!feed) return

    const PER_SET = 6 // cards per set (each row duplicates 6 cards)
    const configs = [
      { nth: 0, speed: 0.55, dir: -1 },
      { nth: 1, speed: 0.38, dir:  1 },
      { nth: 2, speed: 0.46, dir: -1 },
    ]

    const rows = configs.map(c => {
      const row = feed.querySelectorAll<HTMLElement>('.mq-row')[c.nth]
      if (!row) return null
      const track = row.querySelector<HTMLElement>('.mq-track')
      if (!track) return null
      return { track, speed: c.speed, dir: c.dir, x: 0, half: 0 }
    }).filter(Boolean) as { track: HTMLElement; speed: number; dir: number; x: number; half: number }[]

    function measure() {
      rows.forEach(r => {
        // Distance from first item of set1 to first item of set2 = exact seamless wrap distance
        const c0 = r.track.children[0] as HTMLElement | null
        const c1 = r.track.children[PER_SET] as HTMLElement | null
        r.half = c0 && c1 ? c1.offsetLeft - c0.offsetLeft : r.track.scrollWidth / 2
      })
    }

    let paused = false
    feed.addEventListener('mouseenter', () => { paused = true })
    feed.addEventListener('mouseleave', () => { paused = false })

    let rafId: number
    function tick() {
      rows.forEach(r => {
        if (!paused) {
          r.x += r.dir * r.speed
          if (r.dir === -1 && r.x <= -r.half) r.x += r.half
          if (r.dir ===  1 && r.x >= 0)       r.x -= r.half
        }
        r.track.style.transform = `translate3d(${r.x}px,0,0)`
      })
      rafId = requestAnimationFrame(tick)
    }

    // Double rAF ensures layout is complete before measuring and starting
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        measure()
        rows.forEach(r => { r.x = r.dir === 1 ? -r.half : 0 })
        rafId = requestAnimationFrame(tick)
      })
    })

    return () => cancelAnimationFrame(rafId)
  }, [])

  const row1 = [
    { meta: 'reel · ricetta', like: '♥ 12,4k', video: true },
    { meta: 'carosello · menù', like: '↗ 2,1k', video: false },
    { meta: 'behind · cucina', like: '♥ 8,9k', video: true },
    { meta: 'UGC · cliente', like: '♥ 5,5k', video: false },
    { meta: 'reel · trend', like: '▶ 5,0M', video: true },
    { meta: 'copertina · piatto', like: '♥ 7,2k', video: false },
  ]
  const row2 = [
    { meta: 'reel · lancio', like: '♥ 21k', video: true },
    { meta: 'quote · recensione', like: '↗ 980', video: false },
    { meta: 'tutorial · 3 step', like: '▶ 1,3M', video: true },
    { meta: 'poster · apertura', like: '♥ 4,1k', video: false },
    { meta: 'reel · chef', like: '▶ 880k', video: true },
    { meta: 'carosello · offerta', like: '↗ 3,4k', video: false },
  ]
  const row3 = [
    { meta: 'food photo · still', like: '♥ 6,7k', video: false },
    { meta: 'reel · evento', like: '♥ 9,8k', video: true },
    { meta: 'carosello · how-to', like: '↗ 1,7k', video: false },
    { meta: 'reel · stagione', like: '♥ 15k', video: true },
    { meta: 'UGC · cliente', like: '♥ 5,5k', video: false },
    { meta: 'reel · ricetta', like: '♥ 12,4k', video: true },
  ]

  function renderCards(cards: typeof row1) {
    return [...cards, ...cards].map((c, i) => (
      <div key={i} className={`reel-card ph on-ink${c.video ? ' video' : ''}`}>
        <span className="reel-meta">{c.meta}</span>
        <span className="reel-like">{c.like}</span>
      </div>
    ))
  }

  return (
    <div className="feed-marquee" ref={feedRef} aria-label="Anteprima feed Fooody">
      <div className="mq-row mq-left">
        <div className="mq-track">{renderCards(row1)}</div>
      </div>
      <div className="mq-row mq-right feed-row-2">
        <div className="mq-track">{renderCards(row2)}</div>
      </div>
      <div className="mq-row mq-left feed-row-3">
        <div className="mq-track">{renderCards(row3)}</div>
      </div>
    </div>
  )
}

const PUNTI = [
  { n: 1, pa: 'var(--tomato)', title: 'Strategia & posizionamento', sub: 'prima il perché, poi il post', desc: 'Tono di voce, pilastri di contenuto, calendario. Decidiamo cosa dire e a chi, prima di accendere la fotocamera.', chips: ['Audit', 'Tone of voice', 'Piano editoriale'], like: '12.4k' },
  { n: 2, pa: 'var(--gold)',   title: 'Content & format', sub: 'il contenuto che ferma il pollice', desc: 'Food photography, grafiche, copertine, copy. Format riconoscibili che diventano la firma del brand sul feed.', chips: ['Foto', 'Grafica', 'Copywriting'], like: '8.9k' },
  { n: 3, pa: 'var(--violet)', title: 'Reels & UGC', sub: 'il motore della crescita organica', desc: 'Riprese, montaggio, trend. Più creator e clienti che parlano di te: il contenuto che gira senza spingere a pagamento.', chips: ['Video', 'Montaggio', 'Creator'], like: '1.3M' },
  { n: 4, pa: 'var(--tomato)', title: 'ADV & performance', sub: 'quando serve spingere, spingiamo bene', desc: 'Campagne Meta e TikTok con budget che rende. Targeting e creatività testate, ottimizzazione settimanale sul costo per risultato.', chips: ['Meta ADV', 'TikTok ADS', 'A/B test'], like: '880k' },
  { n: 5, pa: 'var(--gold)',   title: 'Community & report', sub: 'le persone, non i follower', desc: 'Gestione DM e commenti, moderazione, report mensile con i numeri che contano davvero.', chips: ['Community', 'Moderazione', 'Report'], like: '4.1k' },
]

function SocCosaSection() {
  const [active, setActive] = useState(1)
  const p = PUNTI[active - 1]

  return (
    <section className="soc-cosa-vh" id="cosa" data-bg="paper">
      <div className="soc-cosa-inner">
        <div className="soc-cosa-left">
          <div className="soc-cosa-head">
            <div className="eyebrow no-slash soc-accent-fg">— cosa facciamo</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 14, color: 'var(--ink)' }}>
              Cinque mosse.<br />Un solo feed.
            </h2>
          </div>
          <nav className="soc-punti" role="tablist" aria-label="Servizi social">
            {PUNTI.map(pt => (
              <button
                key={pt.n}
                className={`soc-punto${active === pt.n ? ' active' : ''}`}
                data-punto={pt.n}
                role="tab"
                aria-selected={active === pt.n}
                onClick={() => setActive(pt.n)}
                onMouseEnter={() => setActive(pt.n)}
              >
                <span className="soc-punto-idx">0{pt.n}</span>
                <div className="soc-punto-body">
                  <span className="soc-punto-title">{pt.title}</span>
                  <span className="soc-punto-sub">{pt.sub}</span>
                </div>
                <span className="soc-punto-arrow">↗</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="soc-cosa-right">
          <div className="soc-reel-phone" role="img" aria-label="Anteprima reel social">
            <div className="soc-reel-status">
              <span className="soc-reel-time">09:41</span>
              <div className="soc-reel-signal" aria-hidden="true"><i /><i /><i /></div>
            </div>
            <div className="soc-reel-content">
              {PUNTI.map(pt => (
                <div
                  key={pt.n}
                  className={`soc-reel-panel${active === pt.n ? ' active' : ''}`}
                  data-panel={pt.n}
                  style={{ '--pa': pt.pa } as React.CSSProperties}
                >
                  <div className="soc-reel-user-bar">
                    <div className="soc-reel-av">F</div>
                    <span className="soc-reel-un">@fooody</span>
                    <span className="soc-reel-fw">Segui</span>
                  </div>
                  <div className="soc-reel-spacer" />
                  <div className="soc-reel-bignum">0{pt.n}</div>
                  <div className="soc-reel-txt">
                    <strong>{pt.title}</strong>
                    <p>{pt.desc}</p>
                  </div>
                  <div className="soc-reel-pchips">
                    {pt.chips.map(c => <span key={c} className="chip">{c}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="soc-reel-actions" aria-hidden="true">
              <div className="soc-reel-act">
                <span className="soc-act-icon">♥</span>
                <span className="soc-act-lbl">{p.like}</span>
              </div>
              <div className="soc-reel-act"><span className="soc-act-icon">✦</span><span className="soc-act-lbl">Invia</span></div>
              <div className="soc-reel-act"><span className="soc-act-icon">⋯</span></div>
            </div>
            <div className="soc-reel-bottom" aria-hidden="true">
              <span className="soc-rbot">⌂</span>
              <span className="soc-rbot">◎</span>
              <span className="soc-rbot soc-rbot-plus">＋</span>
              <span className="soc-rbot soc-rbot-on">▶</span>
              <span className="soc-rbot">⬡</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function SocialClient() {
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
          <div className="soc-hero">
            <div className="soc-hero-text">
              <div className="eyebrow no-slash soc-accent-fg">— social media · food &amp; oltre</div>
              <h1 className="mega" data-kinetic="lines" style={{ marginTop: 20 }}>
                Contenuti che<br />fermano<br /><span className="soc-accent-fg">il pollice.</span>
              </h1>
              <p className="lead text-pretty" data-reveal="" data-reveal-d="2" style={{ marginTop: 26, maxWidth: '46ch' }}>
                Strategia, contenuti e community che non fanno scrollare oltre. Dal reel che gira
                alla campagna che converte: pensiamo, giriamo, pubblichiamo, misuriamo.
              </p>
              <div data-reveal="" data-reveal-d="3" style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a className="btn soc-btn lg" href="/contatti" data-transition="" data-transition-word="Contatti" data-magnetic="0.3">
                  <span className="btn-label">Prenota una call <span className="arrow">↗</span></span>
                </a>
                <a className="btn on-ink ghost lg" href="#feed">
                  <span className="btn-label">Guarda il feed <span className="arrow">↓</span></span>
                </a>
              </div>
            </div>
            <div className="soc-hero-strip" data-reveal="" aria-hidden="true">
              {/* TODO: sostituire con reel reali */}
              <div className="reel-mini ph on-ink video"><span className="reel-mini-tag">reel · 0:14</span></div>
              <div className="reel-mini ph on-ink video"><span className="reel-mini-tag">carosello · ×7</span></div>
              <div className="reel-mini ph on-ink video"><span className="reel-mini-tag">UGC · cliente</span></div>
            </div>
          </div>
          <div className="soc-hero-foot" data-reveal="" data-reveal-d="2">
            <span className="mono-xs">marca per marca · format su misura · niente post a vuoto</span>
            <span className="mono-xs soc-accent-fg">↓ il feed, vivo</span>
          </div>
        </div>
      </header>

      {/* ============================================================
          SIGNATURE · FEED VIVO
          ============================================================ */}
      <section className="section" data-bg="paper" id="feed" data-sig="">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow soc-eyebrow">il feed, vivo</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                Non un portfolio.<br />Un feed che respira.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '32ch' }}>
              Passa sopra per fermarlo. Ogni tessera è un format che produciamo davvero —
              reel, caroselli, UGC, copertine. Tre righe, tre ritmi.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="soc-live" data-reveal="">
            <div className="soc-live-item">
              <span className="numeral soc-live-num" data-count="5" data-suf="M">0</span>
              <span className="mono-xs">views sul reel top</span>
            </div>
            <div className="soc-live-item">
              <span className="numeral soc-live-num" data-count="28" data-pre="+" data-suf="k">0</span>
              <span className="mono-xs">community in 4 mesi</span>
            </div>
            <div className="soc-live-item">
              <span className="numeral soc-live-num" data-count="340" data-pre="+" data-suf="%">0</span>
              <span className="mono-xs">engagement medio</span>
            </div>
            <div className="soc-live-item">
              <span className="numeral soc-live-num" data-count="12" data-suf="/mese">0</span>
              <span className="mono-xs">contenuti in pubblicazione</span>
            </div>
          </div>
        </div>

        <FeedMarquee />
      </section>

      {/* ============================================================
          COSA FACCIAMO — phone mockup + tab nav
          ============================================================ */}
      <SocCosaSection />

      {/* ============================================================
          PROOF (ink)
          ============================================================ */}
      <section className="section ink-region" data-bg="ink" id="numeri">
        <div className="wrap">
          <div className="eyebrow no-slash soc-accent-fg" data-reveal="">— numeri, non sensazioni</div>
          <h2 className="h1 text-balance" data-kinetic="words" style={{ marginTop: 16, maxWidth: '18ch', color: 'var(--paper)' }}>
            Quello che pubblichiamo, lo misuriamo.
          </h2>
          <div className="soc-proof" data-reveal="" data-reveal-d="2">
            <div className="soc-proof-item">
              <span className="numeral soc-proof-num" data-count="340" data-pre="+" data-suf="%">0</span>
              <span className="mono-xs">engagement medio · 6 mesi</span>
            </div>
            <div className="soc-proof-item">
              <span className="numeral soc-proof-num" data-count="5" data-suf="M">0</span>
              <span className="mono-xs">views sul reel più virale</span>
            </div>
            <div className="soc-proof-item">
              <span className="numeral soc-proof-num" data-count="28" data-pre="+" data-suf="k">0</span>
              <span className="mono-xs">nuova community in 4 mesi</span>
            </div>
            <div className="soc-proof-item">
              <span className="numeral soc-proof-num" data-count="3.1" data-suf="x">0</span>
              <span className="mono-xs">ritorno sulla spesa ADV</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CASE integrato
          ============================================================ */}
      <section className="section" data-bg="paper" id="caso">
        <div className="wrap">
          <div className="eyebrow soc-eyebrow" data-reveal="">caso · food brand</div>
          <div className="case-grid">
            {/* TODO: sostituire con immagini reali */}
            <figure className="ph tall case-cover" data-reveal="" data-tilt="4" data-cursor="guarda" data-placeholder="case · reel + feed · 4:5">
              <span className="ph-label">case · reel + feed</span>
            </figure>
            <div>
              <h2 className="h1 text-balance" data-kinetic="words" style={{ maxWidth: '16ch' }}>
                Da feed spento a 5 milioni di views.
              </h2>
              <p className="lead text-pretty" data-reveal="" style={{ marginTop: 20, maxWidth: '46ch' }}>
                Strategia rifatta, format nuovi, un reel al giorno per 90 giorni. In quattro mesi
                il brand è passato dal post di cortesia alla coda fuori dal punto vendita.
              </p>
              <div className="case-kpis" data-reveal="" data-reveal-d="2">
                <div className="case-kpi">
                  <span className="numeral" style={{ color: 'var(--tomato-deep)' }}>5M</span>
                  <span className="mono-xs">views</span>
                </div>
                <div className="case-kpi">
                  <span className="numeral" style={{ color: 'var(--tomato-deep)' }}>+28k</span>
                  <span className="mono-xs">community</span>
                </div>
                <div className="case-kpi">
                  <span className="numeral">4</span>
                  <span className="mono-xs">mesi</span>
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
          <div className="eyebrow no-slash soc-accent-fg" style={{ justifyContent: 'center' }}>
            — pronti a postare?
          </div>
          <h2 className="mega" data-kinetic="lines" style={{ margin: '22px auto 0', maxWidth: '15ch' }}>
            Facciamo girare<br />il tuo feed.
          </h2>
          <p className="lead text-pretty" data-reveal="" style={{ margin: '26px auto 0', maxWidth: '42ch' }}>
            Raccontaci il brand. Prima call gratuita: guardiamo i numeri di oggi e da dove far
            partire la crescita.
          </p>
          <div data-reveal="" data-reveal-d="2" style={{ marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn soc-btn lg" href="/contatti" data-transition="" data-transition-word="Contatti" data-magnetic="0.3">
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
