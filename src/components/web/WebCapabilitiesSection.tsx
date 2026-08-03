'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

const CARDS = [
  {
    tag: 'Landing page',
    desc: "Una pagina, un obiettivo: lanciare un prodotto, validare un'offerta, dare una destinazione alle tue campagne. Progettata per convertire e misurabile dal primo giorno.",
    stack: 'Next.js o WordPress, in base a chi la aggiorna.',
    visual: 'mockup · landing page',
  },
  {
    tag: 'Sito corporate',
    desc: 'Racconta chi sei e perché sceglierti. Costruito sui tuoi contenuti reali, non su un tema comprato — e gestibile in autonomia dal tuo team.',
    stack: 'WordPress con tema sviluppato su misura.',
    visual: 'mockup · sito corporate',
  },
  {
    tag: 'E-commerce',
    desc: "Un negozio costruito attorno al tuo catalogo e ai tuoi processi: pagamenti, spedizioni, gestionale, fatturazione. Un'architettura che regge la crescita.",
    stack: 'Shopify, WooCommerce o headless, in base a volumi e integrazioni.',
    visual: 'mockup · e-commerce',
  },
  {
    tag: 'Web app',
    desc: 'Quando un sito non basta: aree riservate, dashboard, prenotazioni, strumenti interni, integrazioni con i tuoi sistemi. Software su misura, curato come un prodotto.',
    stack: 'Next.js, React e TypeScript.',
    visual: 'mockup · web app',
  },
]

const TOTAL = CARDS.length

type IndicatorRect = { left: number; top: number; width: number }

export default function WebCapabilitiesSection() {
  const [active, setActive] = useState(0)
  const card = CARDS[active]

  // Barra che scorre sotto la tab attiva (stile .nav-link), calcolata via
  // getBoundingClientRect perché le tab vanno a capo su più righe (flex-wrap).
  const tabsWrapRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null)

  const updateIndicator = useCallback(() => {
    const wrap = tabsWrapRef.current
    const btn = tabRefs.current[active]
    if (!wrap || !btn) return
    const wrapRect = wrap.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    setIndicator({
      left: btnRect.left - wrapRect.left + 8,
      top: btnRect.bottom - wrapRect.top + 8,
      width: btnRect.width - 16,
    })
  }, [active])

  useEffect(() => {
    updateIndicator()
  }, [updateIndicator])

  useEffect(() => {
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  // Swipe touch (mobile): stessa logica soglia-50px di StuTestimonianza.
  const touchStartXRef = useRef<number | null>(null)

  const goTo = useCallback((nextIndex: number) => {
    setActive(((nextIndex % TOTAL) + TOTAL) % TOTAL)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartXRef.current
    touchStartXRef.current = null
    if (Math.abs(delta) < 50) return
    goTo(delta < 0 ? active + 1 : active - 1)
  }

  return (
    <section className="section" data-bg="paper" id="costruiamo">
      <div className="wrap">
        <div className="eyebrow web-eyebrow" data-reveal="">cosa costruiamo</div>
        <h2 className="h1 text-balance" data-kinetic="words" style={{ marginTop: 16, maxWidth: '20ch' }}>
          Cosa costruiamo
        </h2>
        <p className="lead text-pretty" data-reveal="" style={{ marginTop: 18, maxWidth: '58ch' }}>
          Non abbiamo una tecnologia preferita da rivendere a tutti. Quattro tipologie di progetto
          che conosciamo a fondo — lo stack lo decidiamo insieme a te, alla fine dell&apos;audit.
        </p>

        <div className="web-cap-tabs" role="tablist" aria-label="Tipologie di progetto" data-reveal="" ref={tabsWrapRef}>
          {CARDS.map((c, i) => (
            <button
              key={c.tag}
              ref={(el) => { tabRefs.current[i] = el }}
              className={`web-cap-tab${i === active ? ' active' : ''}`}
              role="tab"
              aria-selected={i === active}
              data-cursor="scegli"
              onClick={() => setActive(i)}
            >
              {c.tag}
            </button>
          ))}
          {indicator && (
            <span
              className="web-cap-tab-indicator is-visible"
              style={{ left: indicator.left, top: indicator.top, width: indicator.width }}
              aria-hidden="true"
            />
          )}
        </div>

        <div
          className="web-cap-panel"
          key={card.tag}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* TODO: sostituire con screenshot/mockup reale della tipologia */}
          <figure
            className="ph web-cap-visual"
            data-placeholder={card.visual}
          >
            <span className="ph-label">{card.visual}</span>
          </figure>
          <div className="web-cap-info">
            <span className="mono-xs web-cap-info-tag">{card.tag}</span>
            <p className="body text-pretty web-cap-info-desc">{card.desc}</p>
            <p className="mono-xs web-cap-stack">{card.stack}</p>
          </div>
        </div>

        <div className="web-cap-dots" role="tablist" aria-label="Tipologie di progetto">
          {CARDS.map((c, i) => (
            <button
              key={c.tag}
              type="button"
              className={`web-cap-dot${i === active ? ' active' : ''}`}
              role="tab"
              aria-selected={i === active}
              aria-label={c.tag}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
