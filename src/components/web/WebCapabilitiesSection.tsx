const CARDS = [
  {
    tag: 'Landing page',
    desc: "Una pagina, un obiettivo. Per lanciare un prodotto, validare un'offerta o dare una destinazione alle tue campagne. Progettata per convertire, misurabile dal primo giorno, veloce da mettere online e da iterare.",
    stack: 'Stack tipico: Next.js o WordPress, in base a chi dovrà aggiornarla e a cosa deve integrare.',
  },
  {
    tag: 'Sito corporate',
    desc: 'Il sito che racconta chi sei, come lavori e perché sceglierti. Struttura pensata sui tuoi contenuti reali, non su un tema comprato. Gestibile in autonomia dal tuo team, senza chiamarci per cambiare una virgola.',
    stack: 'Stack tipico: WordPress con tema sviluppato su misura.',
  },
  {
    tag: 'E-commerce',
    desc: "Un negozio online costruito attorno al tuo catalogo e ai tuoi processi: pagamenti, spedizioni, gestionale, fatturazione. Non il contrario. Dalla prima vendita alla scalata, con un'architettura che regge la crescita.",
    stack: 'Stack tipico: Shopify, WooCommerce o soluzioni headless, in base a catalogo, volumi e integrazioni.',
  },
  {
    tag: 'Web app',
    desc: 'Quando un sito non basta: aree riservate, dashboard, prenotazioni, strumenti interni, integrazioni con i tuoi sistemi. Software su misura con interfaccia curata come un prodotto.',
    stack: 'Stack tipico: Next.js, React e TypeScript.',
  },
]

export default function WebCapabilitiesSection() {
  return (
    <section className="section" data-bg="paper" id="costruiamo">
      <div className="wrap">
        <div className="eyebrow web-eyebrow" data-reveal="">cosa costruiamo</div>
        <h2 className="h1 text-balance" data-kinetic="words" style={{ marginTop: 16, maxWidth: '20ch' }}>
          Cosa costruiamo
        </h2>
        <p className="lead text-pretty" data-reveal="" style={{ marginTop: 18, maxWidth: '62ch' }}>
          Non abbiamo una tecnologia preferita da rivendere a tutti. Abbiamo quattro tipologie di
          progetto che conosciamo a fondo — e per ognuna, lo stack lo decidiamo insieme a te, alla
          fine dell&apos;audit.
        </p>
        <div className="web-cap-grid" data-reveal="" data-reveal-d="2">
          {CARDS.map((c) => (
            <div className="web-cap-card" key={c.tag}>
              <span className="mono-xs web-cap-tag">{c.tag}</span>
              <p className="body text-pretty">{c.desc}</p>
              <p className="mono-xs" style={{ color: 'var(--ink-3)' }}>{c.stack}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
