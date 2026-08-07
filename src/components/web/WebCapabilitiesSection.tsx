import type { CSSProperties } from 'react'

const CARDS = [
  {
    tag: 'Landing page',
    desc: "Una pagina, un obiettivo: lanciare un prodotto, validare un'offerta, dare una destinazione alle tue campagne. Progettata per convertire e misurabile dal primo giorno.",
    stack: 'Next.js o WordPress, in base a chi la aggiorna.',
    visual: 'screenshot · landing page realizzata',
  },
  {
    tag: 'Sito corporate',
    desc: 'Racconta chi sei e perché sceglierti. Costruito sui tuoi contenuti reali, non su un tema comprato — e gestibile in autonomia dal tuo team.',
    stack: 'WordPress con tema sviluppato su misura.',
    visual: 'screenshot · sito corporate realizzato',
  },
  {
    tag: 'E-commerce',
    desc: "Un negozio costruito attorno al tuo catalogo e ai tuoi processi: pagamenti, spedizioni, gestionale, fatturazione. Un'architettura che regge la crescita.",
    stack: 'Shopify, WooCommerce o headless, in base a volumi e integrazioni.',
    visual: 'screenshot · e-commerce realizzato',
  },
  {
    tag: 'Web app',
    desc: 'Quando un sito non basta: aree riservate, dashboard, prenotazioni, strumenti interni, integrazioni con i tuoi sistemi. Software su misura, curato come un prodotto.',
    stack: 'Next.js, React e TypeScript.',
    visual: 'screenshot · web app realizzata',
  },
]

// Ogni card sticky si impila leggermente sfalsata sulla precedente mentre
// scrolli (la sua card-wrap sotto le dà lo spazio per farlo) — sotto 861px
// il CSS resetta position/top e diventa un semplice elenco verticale, niente
// sticky: stesso principio di "Come lavoriamo" (mai scommettere l'esperienza
// mobile su position:sticky), qui applicato copiando un pattern che su
// native.inc fa esattamente questo — desktop elaborato, mobile che non
// prova nemmeno a imitarlo e resta semplice e robusto.
const STICKY_TOP_BASE = 24
const STICKY_TOP_STEP = 28

export default function WebCapabilitiesSection() {
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

        <div className="web-cap-stack">
          {CARDS.map((c, i) => (
            <div className="web-cap-scard-wrap" key={c.tag}>
              <div
                className="web-cap-scard"
                style={{ '--card-top': `${STICKY_TOP_BASE + i * STICKY_TOP_STEP}px` } as CSSProperties}
              >
                <span className="web-cap-scard-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="web-cap-scard-main">
                  <h3 className="web-cap-scard-title">{c.tag}</h3>
                  <div className="web-cap-scard-row">
                    <div className="web-cap-scard-text">
                      <p className="web-cap-scard-desc text-pretty">{c.desc}</p>
                      <p className="mono-xs web-cap-scard-stack">{c.stack}</p>
                    </div>
                    {/* TODO: sostituire con screenshot reale del sito consegnato */}
                    <div className="ph web-cap-scard-visual" data-placeholder={c.visual}>
                      <span className="ph-label">{c.visual}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
