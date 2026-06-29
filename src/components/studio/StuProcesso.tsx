import StepsTimeline from '@/components/blocks/StepsTimeline'

export default function StuProcesso() {
  return (
    <section className="section ink-region" data-bg="ink" id="processo">
      <div className="wrap">
        <div className="eyebrow no-slash stu-accent-fg" data-reveal="" data-cid="TF1e">— il processo</div>
        <h2 className="h1 text-balance" data-kinetic="words" data-cid="TF1"
          style={{ marginTop: 16, maxWidth: '18ch', color: 'var(--paper)' }}>
          Prima si prepara il terreno. Poi si esegue.
        </h2>
        <StepsTimeline
          wrapperClass="stu-processo"
          itemClass="stu-step"
          numberClass="stu-step-n"
          bodyClass="stu-step-main"
          bodyMaxWidth="40ch"
          items={[
            { title: 'Ascolto', body: 'Prima call gratuita. Capiamo il brand, i numeri di oggi, i prossimi obiettivi. Niente brief infiniti — una conversazione.' },
            { title: 'Diagnosi', body: 'Analizziamo canali, competitor, posizionamento. Tiriamo fuori i dati che contano e presentiamo una lettura onesta della situazione.', numberColor: 'var(--gold)' },
            { title: 'Strategia', body: 'Piano operativo su misura: obiettivi chiari, KPI condivisi, calendario di lavoro. Nessuna promessa vaga — solo passi concreti.', numberColor: 'var(--violet)' },
            { title: 'Esecuzione', body: 'Produciamo, pubblichiamo, ottimizziamo. Cadenza settimanale di allineamento e report mensile che mostra esattamente dove siamo.', numberColor: 'var(--tomato)' },
          ]}
        />
      </div>
    </section>
  )
}
