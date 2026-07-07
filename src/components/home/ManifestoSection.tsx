export default function ManifestoSection() {
  return (
    <section className="section ink-region" data-bg="ink" id="manifesto">
      <div className="wrap">
        <div className="manifesto-grid">
          <div>
            <div className="eyebrow no-slash" style={{ color: 'var(--tomato)' }}>
              MANIFESTO
            </div>
            <h2
              className="h1 text-balance"
              data-kinetic="words"
              style={{ marginTop: 18, maxWidth: '18ch' }}
            >
              Come puoi vendere, se nessuno sa chi sei?
            </h2>
            <p
              className="lead text-pretty"
              data-reveal=""
              style={{ marginTop: 24, maxWidth: '52ch' }}
            >
              Noi costruiamo identità digitali che fanno emergere il valore del tuo brand,
              trasformano la percezione del pubblico e ti rendono desiderabile agli occhi delle
              persone giuste.
            </p>
          </div>

          <div className="stats">
            <div className="stat" data-reveal="" data-reveal-d="1">
              <span className="numeral stat-num" data-count="30" data-suf="+" data-placeholder="KPI clienti">0</span>
              <span className="mono-xs">Clienti gestiti mensilmente</span>
            </div>
            <div className="stat" data-reveal="" data-reveal-d="2">
              <span className="numeral stat-num" data-count="2" data-suf="+" data-placeholder="KPI engagement">0</span>
              <span className="mono-xs">Anni di strategia e contenuti</span>
            </div>
            <div className="stat" data-reveal="" data-reveal-d="3">
              <span className="numeral stat-num" data-count="1" data-placeholder="KPI anni">0</span>
              <span className="mono-xs">Obiettivo: renderti riconoscibile</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
