export default function StuProcesso() {
  return (
    <section className="section ink-region" data-bg="ink" id="processo">
      <div className="wrap">
        <div className="eyebrow no-slash stu-accent-fg" data-reveal="">— il processo</div>
        <h2 className="h1 text-balance" data-kinetic="words"
          style={{ marginTop: 16, maxWidth: '18ch', color: 'var(--paper)' }}>
          Prima si prepara il terreno. Poi si esegue.
        </h2>
        <div className="stu-processo">
          <div className="stu-step" data-reveal="">
            <div className="stu-step-n">01</div>
            <div className="stu-step-main">
              <h3 className="h3" style={{ color: 'var(--paper)' }}>Ascolto</h3>
              <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '40ch' }}>
                Prima call gratuita. Capiamo il brand, i numeri di oggi, i prossimi obiettivi.
                Niente brief infiniti — una conversazione.
              </p>
            </div>
          </div>
          <div className="stu-step" data-reveal="" data-reveal-d="1">
            <div className="stu-step-n" style={{ color: 'var(--gold)' }}>02</div>
            <div className="stu-step-main">
              <h3 className="h3" style={{ color: 'var(--paper)' }}>Diagnosi</h3>
              <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '40ch' }}>
                Analizziamo canali, competitor, posizionamento. Tiriamo fuori i dati che contano
                e presentiamo una lettura onesta della situazione.
              </p>
            </div>
          </div>
          <div className="stu-step" data-reveal="" data-reveal-d="2">
            <div className="stu-step-n" style={{ color: 'var(--violet)' }}>03</div>
            <div className="stu-step-main">
              <h3 className="h3" style={{ color: 'var(--paper)' }}>Strategia</h3>
              <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '40ch' }}>
                Piano operativo su misura: obiettivi chiari, KPI condivisi, calendario di lavoro.
                Nessuna promessa vaga — solo passi concreti.
              </p>
            </div>
          </div>
          <div className="stu-step" data-reveal="" data-reveal-d="3">
            <div className="stu-step-n" style={{ color: 'var(--tomato)' }}>04</div>
            <div className="stu-step-main">
              <h3 className="h3" style={{ color: 'var(--paper)' }}>Esecuzione</h3>
              <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '40ch' }}>
                Produciamo, pubblichiamo, ottimizziamo. Cadenza settimanale di allineamento
                e report mensile che mostra esattamente dove siamo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
