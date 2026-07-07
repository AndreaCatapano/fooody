export default function LavoriSection() {
  return (
    <section className="section" data-bg="paper" id="lavori">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Sì, ma nella pratica?</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Ecco alcuni lavori scelti
            </h2>
          </div>
        </div>

        <div className="work-grid">
          {/* TODO: sostituire con immagini di copertina 4:5 reali. Non linkare finché non esiste una pagina /lavori reale. */}
          <div className="work">
            <div className="ph tall work-cover" data-placeholder="case · cover 4:5">
              <span className="ph-label">case · cover</span>
            </div>
            <div className="work-meta">
              <div>
                <span className="h3">Mister Kebab ®</span>
                <p className="mono-xs">Social Media · Content Creation · Menu Engineering</p>
              </div>
              <span className="numeral work-kpi">+60K follower</span>
            </div>
          </div>

          <div className="work">
            <div className="ph tall work-cover" data-placeholder="case · cover 4:5">
              <span className="ph-label">case · cover</span>
            </div>
            <div className="work-meta">
              <div>
                <span className="h3">N’Artigiana</span>
                <p className="mono-xs">Advertising · Social Media · Event Planning</p>
              </div>
              <span className="numeral work-kpi">-80% cost per lead</span>
            </div>
          </div>

          <div className="work">
            <div className="ph tall work-cover" data-placeholder="case · cover 4:5">
              <span className="ph-label">case · cover</span>
            </div>
            <div className="work-meta">
              <div>
                <span className="h3">La Fiammante</span>
                <p className="mono-xs">Branding · Packaging · Etichettatura</p>
              </div>
              <span className="numeral work-kpi">15 giorni per progetto</span>
            </div>
          </div>

          <div className="work">
            <div className="ph tall work-cover" data-placeholder="case · cover 4:5">
              <span className="ph-label">case · cover</span>
            </div>
            <div className="work-meta">
              <div>
                <span className="h3">Mastone</span>
                <p className="mono-xs">Food Cost · Social Media · Advertising</p>
              </div>
              <span className="numeral work-kpi">+700% community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
