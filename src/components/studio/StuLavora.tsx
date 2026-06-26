export default function StuLavora() {
  return (
    <section className="section" data-bg="paper" id="lavora-con-noi">
      <div className="wrap">
        <div className="stu-lavora">
          <div>
            <div className="eyebrow stu-eyebrow">entra nel team</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Cerchi un posto<br />dove contare?
            </h2>
            <p className="lead text-pretty" data-reveal="" style={{ marginTop: 20, maxWidth: '44ch' }}>
              Non assumiamo ruoli, assumiamo persone. Mandaci portfolio, profilo LinkedIn o due
              righe su cosa sai fare — anche se non c&apos;è una posizione aperta in questo momento.
            </p>
            <ul className="stu-job-hints" data-reveal="" data-reveal-d="1">
              <li>Designer · Strategist · Videomaker · Copywriter</li>
              <li>Risposta garantita entro 5 giorni lavorativi</li>
            </ul>
          </div>
          <div data-reveal="" data-reveal-d="2" style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
            <a className="btn stu-btn lg" href="mailto:lavora@fooody.it" data-magnetic="0.3">
              <span className="btn-label">Manda la candidatura <span className="arrow">↗</span></span>
            </a>
            <a className="btn ghost lg" href="mailto:ciao@fooody.it">
              <span className="btn-label">ciao@fooody.it</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
