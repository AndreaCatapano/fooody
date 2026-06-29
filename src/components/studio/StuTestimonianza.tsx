export default function StuTestimonianza() {
  return (
    <section className="section" data-bg="paper" id="quote">
      <div className="wrap">
        <blockquote className="stu-quote" data-reveal="">
          <span className="stu-quote-mark" aria-hidden="true">&ldquo;</span>
          <p className="stu-quote-text" data-cid="TG1">
            Avevamo un buon prodotto, ma sui social eravamo invisibili. In quattro mesi siamo
            diventati il brand di riferimento nella nostra categoria.
          </p>
          <footer className="stu-quote-foot">
            <div className="stu-quote-meta">
              <span className="h3 stu-quote-name" data-cid="TG2">Nome Cliente</span>
              <span className="mono-xs" data-cid="TG3" style={{ color: 'var(--ink-3)', marginTop: 4 }}>
                Marketing Director · Brand · Milano
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
