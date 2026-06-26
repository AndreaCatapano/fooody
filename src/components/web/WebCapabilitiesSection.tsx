export default function WebCapabilitiesSection() {
  return (
    <section className="section" data-bg="paper" id="stack">
      <div className="wrap">
        <div className="eyebrow web-eyebrow" data-reveal="">cosa sappiamo costruire</div>
        <h2 className="h1 text-balance" data-kinetic="words" style={{ marginTop: 16, maxWidth: '20ch' }}>
          Dal sito vetrina all&apos;e-commerce con mille referenze.
        </h2>
        <div className="web-cap-grid" data-reveal="" data-reveal-d="2">
          <div className="web-cap-card">
            <span className="mono-xs web-cap-tag">vetrina</span>
            <p className="body text-pretty">Siti istituzionali e landing che presentano bene e caricano in fretta.</p>
          </div>
          <div className="web-cap-card">
            <span className="mono-xs web-cap-tag">e-commerce</span>
            <p className="body text-pretty">Negozi online con checkout in due step, pagamenti e logistica integrati.</p>
          </div>
          <div className="web-cap-card">
            <span className="mono-xs web-cap-tag">prenotazioni</span>
            <p className="body text-pretty">Sistemi di booking per ristoranti, eventi e servizi — senza intermediari.</p>
          </div>
          <div className="web-cap-card">
            <span className="mono-xs web-cap-tag">web app</span>
            <p className="body text-pretty">Strumenti su misura: gestionali, dashboard, configuratori di prodotto.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
