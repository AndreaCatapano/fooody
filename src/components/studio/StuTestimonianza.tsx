export default function StuTestimonianza() {
  return (
    <section className="section section-paper-fixed" data-bg="paper" id="quote">
      <div className="wrap">
        <blockquote className="stu-quote">
          <span className="stu-quote-mark" aria-hidden="true">&ldquo;</span>
          <p className="stu-quote-text">
            I ragazzi mi hanno fatto letteralmente volare sui social! Inizialmente ero scettico,
            poi con loro ho capito la vera opportunità di guadagno che ti danno i social se
            gestiti bene come fanno loro.
          </p>
          <footer className="stu-quote-foot">
            <div className="stu-quote-meta">
              <span className="h3 stu-quote-name">Alessio Ippolis</span>
              <span className="mono-xs" style={{ color: 'var(--ink-3)', marginTop: 4 }}>
                Paninoteca Il Mastone
              </span>
            </div>
            <div className="stu-quote-kpis">
              <div className="stu-quote-kpi">
                <span className="numeral" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--tomato-deep)' }}>5M</span>
                <span className="mono-xs">views</span>
              </div>
              <div className="stu-quote-kpi">
                <span className="numeral" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--gold-deep)' }}>+28k</span>
                <span className="mono-xs">community</span>
              </div>
              <div className="stu-quote-kpi">
                <span className="numeral" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--violet-deep)' }}>4</span>
                <span className="mono-xs">mesi</span>
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
