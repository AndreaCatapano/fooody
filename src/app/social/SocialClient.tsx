'use client'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

type Card = { meta: string; like: string; video: boolean }

const ROWS: Card[][] = [
  [
    { meta: 'reel · ricetta',       like: '♥ 12,4k', video: true },
    { meta: 'carosello · menù',     like: '↗ 2,1k',  video: false },
    { meta: 'behind · cucina',      like: '♥ 8,9k',  video: true },
    { meta: 'UGC · cliente',        like: '♥ 5,5k',  video: false },
    { meta: 'reel · trend',         like: '▶ 5,0M',  video: true },
    { meta: 'copertina · piatto',   like: '♥ 7,2k',  video: false },
    { meta: 'story · poll',         like: '↗ 4,3k',  video: false },
    { meta: 'reel · backstage',     like: '♥ 9,1k',  video: true },
    { meta: 'carosello · tips',     like: '↗ 3,8k',  video: false },
    { meta: 'reel · collab',        like: '▶ 2,2M',  video: true },
    { meta: 'food photo · menu',    like: '♥ 3,1k',  video: false },
    { meta: 'reel · apertura',      like: '♥ 22k',   video: true },
  ],
  [
    { meta: 'reel · lancio',        like: '♥ 21k',   video: true },
    { meta: 'quote · recensione',   like: '↗ 980',   video: false },
    { meta: 'tutorial · 3 step',    like: '▶ 1,3M',  video: true },
    { meta: 'poster · apertura',    like: '♥ 4,1k',  video: false },
    { meta: 'reel · chef',          like: '▶ 880k',  video: true },
    { meta: 'carosello · offerta',  like: '↗ 3,4k',  video: false },
    { meta: 'reel · prodotto',      like: '♥ 6,6k',  video: true },
    { meta: 'story · swipe',        like: '↗ 1,1k',  video: false },
    { meta: 'reel · evento',        like: '♥ 14k',   video: true },
    { meta: 'grafica · quote',      like: '↗ 2,7k',  video: false },
    { meta: 'reel · degustazione',  like: '▶ 1,1M',  video: true },
    { meta: 'carosello · pack',     like: '↗ 2,0k',  video: false },
  ],
  [
    { meta: 'food photo · still',       like: '♥ 6,7k',  video: false },
    { meta: 'reel · stagione',          like: '♥ 15k',   video: true },
    { meta: 'carosello · how-to',       like: '↗ 1,7k',  video: false },
    { meta: 'reel · trend',             like: '♥ 11k',   video: true },
    { meta: 'UGC · cliente',            like: '♥ 5,5k',  video: false },
    { meta: 'reel · ricetta',           like: '♥ 12,4k', video: true },
    { meta: 'copertina · new',          like: '↗ 3,2k',  video: false },
    { meta: 'reel · dietro le quinte',  like: '▶ 1,8M',  video: true },
    { meta: 'carosello · menù',         like: '↗ 2,9k',  video: false },
    { meta: 'reel · chef ospite',       like: '♥ 18k',   video: true },
    { meta: 'behind · mise en place',   like: '♥ 7,3k',  video: false },
    { meta: 'reel · risposta',          like: '▶ 990k',  video: true },
  ],
]

// ms per slide: higher = slower. Matches original px/frame speeds (×6000 ref)
const ROW_SPEEDS = [6000, 9000, 7500]
const ROW_REVERSE = [false, true, false]
const ROW_CLASSES = ['', 'feed-row-2', 'feed-row-3']

function FeedMarquee() {
  const swipers = useRef<SwiperType[]>([])

  const pause  = () => swipers.current.forEach(s => s?.autoplay?.stop())
  const resume = () => swipers.current.forEach(s => s?.autoplay?.start())

  return (
    <div
      className="feed-marquee"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-label="Anteprima feed Fooody"
    >
      {ROWS.map((cards, rowIdx) => (
        <div key={rowIdx} className={`mq-row ${ROW_CLASSES[rowIdx]}`}>
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={14}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: ROW_REVERSE[rowIdx],
              waitForTransition: false,
            }}
            speed={ROW_SPEEDS[rowIdx]}
            allowTouchMove={false}
            onSwiper={(s) => { swipers.current[rowIdx] = s }}
            className="mq-swiper"
          >
            {cards.map((c, i) => (
              <SwiperSlide key={i} className={`reel-card ph on-ink${c.video ? ' video' : ''}`}>
                <span className="reel-meta">{c.meta}</span>
                <span className="reel-like">{c.like}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  )
}

const PUNTI = [
  { n: 1, pa: 'var(--tomato)',      title: 'Strategia & posizionamento', sub: 'prima il perché, poi il post', desc: 'Tono di voce, pilastri di contenuto, calendario. Decidiamo cosa dire e a chi, prima di accendere la fotocamera.', chips: ['Audit', 'Tone of voice', 'Piano editoriale'], like: '12.4k' },
  { n: 2, pa: 'var(--tomato-deep)', title: 'Content & format', sub: 'il contenuto che ferma il pollice', desc: 'Food photography, grafiche, copertine, copy. Format riconoscibili che diventano la firma del brand sul feed.', chips: ['Foto', 'Grafica', 'Copywriting'], like: '8.9k' },
  { n: 3, pa: 'var(--tomato)',      title: 'Reels & UGC', sub: 'il motore della crescita organica', desc: 'Riprese, montaggio, trend. Più creator e clienti che parlano di te: il contenuto che gira senza spingere a pagamento.', chips: ['Video', 'Montaggio', 'Creator'], like: '1.3M' },
  { n: 4, pa: 'var(--tomato-deep)', title: 'ADV & performance', sub: 'quando serve spingere, spingiamo bene', desc: 'Campagne Meta e TikTok con budget che rende. Targeting e creatività testate, ottimizzazione settimanale sul costo per risultato.', chips: ['Meta ADV', 'TikTok ADS', 'A/B test'], like: '880k' },
  { n: 5, pa: 'var(--tomato)',      title: 'Community & report', sub: 'le persone, non i follower', desc: 'Gestione DM e commenti, moderazione, report mensile con i numeri che contano davvero.', chips: ['Community', 'Moderazione', 'Report'], like: '4.1k' },
]

function SocCosaSection() {
  const [active, setActive] = useState(1)
  const sectionRef = useRef<HTMLElement>(null)
  const puntiNavRef = useRef<HTMLElement>(null)
  const N = PUNTI.length
  const p = PUNTI[active - 1]

  useEffect(() => {
    const nav = puntiNavRef.current
    if (!nav || window.matchMedia('(min-width: 880px)').matches) return
    const btn = nav.querySelector<HTMLElement>(`[data-punto="${active}"]`)
    if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (!window.matchMedia('(min-width: 860px)').matches) return

    let rafId: number
    let last = -1

    function update() {
      const rect = section!.getBoundingClientRect()
      const total = section!.offsetHeight - window.innerHeight
      if (total > 0) {
        const scrolled = Math.max(0, Math.min(total, -rect.top))
        const next = Math.min(N, Math.floor((scrolled / total) * N) + 1)
        if (next !== last) { last = next; setActive(next) }
      }
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [N])

  return (
    <section
      ref={sectionRef}
      className="soc-cosa-scroll"
      id="cosa"
      data-bg="paper"
      style={{ height: `calc(${N} * 58svh)` }}
    >
      <div className="soc-cosa-sticky">
      <div className="soc-cosa-inner">
        <div className="soc-cosa-left">
          <div className="soc-cosa-head">
            <div className="eyebrow no-slash soc-accent-fg">— cosa facciamo</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 14, color: 'var(--ink)' }}>
              Cinque mosse.<br />Un solo feed.
            </h2>
          </div>
          <nav className="soc-punti" ref={puntiNavRef} role="tablist" aria-label="Servizi social">
            {PUNTI.map(pt => (
              <button
                key={pt.n}
                className={`soc-punto${active === pt.n ? ' active' : ''}`}
                data-punto={pt.n}
                role="tab"
                aria-selected={active === pt.n}
                onClick={() => setActive(pt.n)}
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
