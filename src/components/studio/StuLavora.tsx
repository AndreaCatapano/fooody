export default function StuLavora() {
  return (
    <section className="section" data-bg="paper" id="lavora-con-noi">
      <div className="wrap">
        <div className="stu-lavora">
          <div>
            <div className="eyebrow stu-eyebrow">entra nel team</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Vuoi entrare nella<br />macchina Fooody?
            </h2>
            <p className="lead text-pretty" data-reveal="" style={{ marginTop: 20, maxWidth: '44ch' }}>
              Cerchiamo persone che ci facciano sempre migliorare. Mandaci portfolio, profilo
              LinkedIn e due righe su cosa sai fare. Anche se non c&apos;è una posizione aperta, se
              hai qualcosa di buono da portare vogliamo incontrarti!
            </p>
            <ul className="stu-job-hints" data-reveal="" data-reveal-d="1">
              <li>Project Manager · SMM · Copywriter · Graphic Designer · Videomaker · Video Editor · Content Creator · UX/UI Designer · Web Designer</li>
              <li>Risposta garantita entro 5 giorni lavorativi</li>
            </ul>
          </div>
          <div data-reveal="" data-reveal-d="2" style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
            <a className="btn lg" href="mailto:lavora@fooody.it" data-magnetic="0.3">
              <span className="btn-label">Inviaci la tua candidatura <span className="arrow">↗</span></span>
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
