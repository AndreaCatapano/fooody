export default function LavoriSection() {
  return (
    <section className="section" data-bg="paper" id="lavori">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">già fatto venire l&apos;acquolina a</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Lavori scelti.
            </h2>
          </div>
          <a className="tlink" href="/lavori">
            vedi tutti i casi <span className="arrow">↗</span>
          </a>
        </div>

        <div className="work-grid">
          {/* TODO: sostituire con case study reali + immagini di copertina 4:5 */}
          <a className="work" href="/lavori/trattoria-tale" data-cursor="apri">
            <div className="ph tall work-cover" data-placeholder="case · cover 4:5">
              <span className="ph-label">case · cover</span>
            </div>
            <div className="work-meta">
              <div>
                <span className="h3">Nome Cliente</span>
                <p className="mono-xs">ristorazione · social + branding</p>
              </div>
              <span className="numeral work-kpi">+340%</span>
            </div>
          </a>

          <a className="work" href="/lavori/brand-tale" data-cursor="apri">
            <div className="ph tall work-cover" data-placeholder="case · cover 4:5">
              <span className="ph-label">case · cover</span>
            </div>
            <div className="work-meta">
              <div>
                <span className="h3">Nome Cliente</span>
                <p className="mono-xs">food brand · social + adv</p>
              </div>
              <span className="numeral work-kpi">5M</span>
            </div>
          </a>

          <a className="work" href="/lavori/eshop-tale" data-cursor="apri">
            <div className="ph tall work-cover" data-placeholder="case · cover 4:5">
              <span className="ph-label">case · cover</span>
            </div>
            <div className="work-meta">
              <div>
                <span className="h3">Nome Cliente</span>
                <p className="mono-xs">e-commerce · web + seo</p>
              </div>
              <span className="numeral work-kpi">18k</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
