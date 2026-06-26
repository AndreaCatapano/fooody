export default function MetodoRisultati() {
  return (
    <section className="section" data-bg="paper" id="risultati">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow met-eyebrow">cosa succede dopo</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              I conti tornano.<br />Anche quelli belli.
            </h2>
          </div>
          <p className="small" style={{ maxWidth: '32ch' }}>
            Medie sui ristoranti seguiti con il Metodo completo nei primi sei mesi. Niente magie, solo metodo.
          </p>
        </div>

        <div className="results-grid">
          {/* TODO: sostituire con dati reali */}
          <div className="result" data-reveal="">
            <span className="numeral result-num met-result-num" data-count="340" data-pre="+" data-suf="%" data-placeholder="KPI engagement">0</span>
            <span className="mono-xs">engagement medio</span>
          </div>
          <div className="result" data-reveal="" data-reveal-d="1">
            <span className="numeral result-num met-result-num-ink" data-count="180" data-pre="+" data-suf="%" data-placeholder="KPI prenotazioni">0</span>
            <span className="mono-xs">prenotazioni online</span>
          </div>
          <div className="result" data-reveal="" data-reveal-d="2">
            <span className="numeral result-num met-result-num" data-count="2.4" data-suf="x" data-placeholder="KPI copertura">0</span>
            <span className="mono-xs">copertura nel weekend</span>
          </div>
          <div className="result" data-reveal="" data-reveal-d="3">
            <span className="numeral result-num met-result-num-ink" data-count="18" data-suf="%" data-placeholder="KPI scontrino">0</span>
            <span className="mono-xs">scontrino medio</span>
          </div>
        </div>
      </div>
    </section>
  )
}
