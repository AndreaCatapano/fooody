'use client'
import { useState } from 'react'

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

export default function WebCapabilitiesSection() {
  const [active, setActive] = useState(0)
  const card = CARDS[active]

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

        <div className="web-cap-tabs" role="tablist" aria-label="Tipologie di progetto" data-reveal="">
          {CARDS.map((c, i) => (
            <button
              key={c.tag}
              className={`web-cap-tab${i === active ? ' active' : ''}`}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
            >
              {c.tag}
            </button>
          ))}
        </div>

        <div className="web-cap-panel" key={card.tag}>
          {/* TODO: sostituire con screenshot/mockup reale della tipologia */}
          <figure
            className="ph wide web-cap-visual"
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
      </div>
    </section>
  )
}
