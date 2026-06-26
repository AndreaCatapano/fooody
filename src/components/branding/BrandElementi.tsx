export default function BrandElementi() {
  return (
    <section className="section" data-bg="paper" id="elementi">
      <div className="wrap">
        <div className="eyebrow brand-eyebrow" data-reveal="">gli elementi che consegniamo</div>
        <h2 className="h1 text-balance" data-kinetic="words" style={{ marginTop: 16, maxWidth: '18ch' }}>
          Tutto quello che serve per essere un brand.
        </h2>
        <div className="sys-grid" data-reveal="" data-reveal-d="2">
          <div className="sys-tile sys-color">
            <span className="mono-xs">colore</span>
            <div className="sys-color-row">
              <i style={{ background: '#DD5049' }} />
              <i style={{ background: '#EFB44F' }} />
              <i style={{ background: '#6352F0' }} />
              <i style={{ background: '#17130f' }} />
              <i style={{ background: '#f7f4ee' }} />
            </div>
            <p className="small">Palette primaria, secondaria e neutri — con i codici per ogni supporto.</p>
          </div>
          <div className="sys-tile sys-typeface">
            <span className="mono-xs">tipografia</span>
            <span className="sys-type-big">Aa Bb</span>
            <p className="small">Famiglia display e da testo, scala tipografica, regole d&apos;uso.</p>
          </div>
          <div className="sys-tile sys-logo">
            <span className="mono-xs">marchio</span>
            <div className="sys-logo-row">
              <span className="sys-mark">M<i>.</i></span>
              <span className="sys-mark sys-mark-mono">M.</span>
            </div>
            <p className="small">Logo principale, versioni, area di rispetto e dimensioni minime.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
