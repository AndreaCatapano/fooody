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
            data-cid="HF1"
            data-ctype="img"
          >
            <span className="ph-label">team · foto studio</span>
          </figure>

          <div>
            <div className="eyebrow" data-cid="HF2">chi siamo</div>
            <h2
              className="h1 text-balance"
              data-kinetic="words"
              style={{ marginTop: 18, maxWidth: '18ch' }}
              data-cid="HF3"
            >
              Un gruppo di golosi con il vizio del buon lavoro.
            </h2>
            <p
              className="lead text-pretty"
              data-reveal=""
              style={{ marginTop: 22, maxWidth: '48ch' }}
              data-cid="HF4"
            >
              Strategist, designer, video-maker e copy che si prendono sul serio solo quando
              serve. Lavoriamo nel food perché ci piace — e perché nessuno racconta una storia
              meglio di un piatto fatto bene.
            </p>

            <div className="studio-vals" data-reveal="" data-reveal-d="2">
              <div className="val" data-cid="HF5">
                <span className="numeral">01</span>
                <span className="mono">Gusto prima di tutto</span>
              </div>
              <div className="val" data-cid="HF6">
                <span className="numeral">02</span>
                <span className="mono">Dati senza fuffa</span>
              </div>
              <div className="val" data-cid="HF7">
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
              data-cid="HF8"
            >
              <span className="btn-label">
                Conosci lo studio <span className="arrow">↗</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
