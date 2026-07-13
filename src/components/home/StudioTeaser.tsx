export default function StudioTeaser() {
  return (
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
            <div className="eyebrow">CHI SIAMO?</div>
            <h2
              className="h1 text-balance"
              data-kinetic="words"
              style={{ marginTop: 18, maxWidth: '18ch' }}
            >
              Siamo un team giovane, ma non improvvisato.
            </h2>
            <p
              className="lead text-pretty"
              data-reveal=""
              style={{ marginTop: 22, maxWidth: '48ch' }}
            >
              Passiamo le giornate tra idee, shooting, montaggi, grafiche, strategie e dati.
              Dentro Fooody ci sono designer, videomaker, video editor, copywriter e business
              analyst che lavorano insieme per dare forma ai progetti, non solo per “pubblicare
              contenuti”. Ci piace far diventare riconoscibile ciò che prima passava inosservato.
            </p>

            <div className="studio-vals" data-reveal="" data-reveal-d="2">
              <div className="val">
                <span className="numeral">01</span>
                <span className="mono">Pronti a sporcarci le mani</span>
              </div>
              <div className="val">
                <span className="numeral">02</span>
                <span className="mono">Numeri senza fuffa</span>
              </div>
              <div className="val">
                <span className="numeral">03</span>
                <span className="mono">Gusto, ma con criterio</span>
              </div>
            </div>

            <a
              className="btn ghost"
              href="/chi-siamo"
              style={{ marginTop: 30 }}
              data-magnetic="0.3"
              data-transition=""
              data-transition-word="Chi siamo"
            >
              <span className="btn-label">
                Scopri chi c’è dietro Fooody <span className="arrow">↗</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
