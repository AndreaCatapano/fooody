export default function ManifestoSection() {
  return (
    <section className="section ink-region" data-bg="ink" id="manifesto">
      <div className="wrap">
        <div className="manifesto-grid">
          <div>
            <div className="eyebrow no-slash" style={{ color: 'var(--tomato)' }} data-cid="HB1">
              — manifesto
            </div>
            <h2
              className="h1 text-balance"
              data-kinetic="words"
              style={{ marginTop: 18, maxWidth: '18ch' }}
              data-cid="HB2"
            >
              Il food non si vende. Si fa desiderare.
            </h2>
            <p
              className="lead text-pretty"
              data-reveal=""
              style={{ marginTop: 24, maxWidth: '52ch' }}
              data-cid="HB3"
            >
              Crediamo che dietro ogni piatto, ogni brand e ogni scroll ci sia una persona affamata
              di qualcosa di buono. Il nostro lavoro è apparecchiare la tavola giusta — con metodo,
              gusto e un pizzico di sfacciataggine.
            </p>
          </div>

          <div className="stats">
            <div className="stat" data-reveal="" data-reveal-d="1" data-cid="HB4">
              {/* TODO: sostituire con dati reali approvati dal cliente */}
              <span className="numeral stat-num" data-count="40" data-suf="+" data-placeholder="KPI clienti">0</span>
              <span className="mono-xs">clienti serviti</span>
            </div>
            <div className="stat" data-reveal="" data-reveal-d="2" data-cid="HB5">
              <span className="numeral stat-num" data-count="340" data-pre="+" data-suf="%" data-placeholder="KPI engagement">0</span>
              <span className="mono-xs">engagement medio</span>
            </div>
            <div className="stat" data-reveal="" data-reveal-d="3" data-cid="HB6">
              <span className="numeral stat-num" data-count="5" data-placeholder="KPI anni">0</span>
              <span className="mono-xs">anni a tavola</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
