import StepsTimeline from '@/components/blocks/StepsTimeline'

export default function StuProcesso() {
  return (
    <section className="section ink-region" data-bg="ink" id="processo">
      <div className="wrap">
        <div className="eyebrow no-slash stu-accent-fg" data-reveal="">— il processo</div>
        <h2 className="h1 text-balance" data-kinetic="words"
          style={{ marginTop: 16, maxWidth: '18ch', color: 'var(--paper)' }}>
          Trust the process.
        </h2>
        <StepsTimeline
          wrapperClass="stu-processo"
          itemClass="stu-step"
          numberClass="stu-step-n"
          bodyClass="stu-step-main"
          bodyMaxWidth="40ch"
          items={[
            { title: 'Ti ascoltiamo', body: 'Partiamo da una call gratuita. Guardiamo dove sei oggi, cosa vuoi ottenere e cosa serve davvero per arrivarci. Niente brief, solo domande ed un caffè.' },
            { title: 'Ti analizziamo', body: 'Guardiamo canali, competitor, posizionamento e numeri. Capire il tuo posizionamento è il primo passo per decidere dove ha senso andare.', numberColor: 'var(--gold)' },
            { title: 'Ti strutturiamo', body: 'Disegniamo la rotta. Costruiamo un piano operativo su misura: obiettivi chiari, KPI condivisi, priorità e calendario di lavoro. Niente promesse vaghe, solo passi concreti.', numberColor: 'var(--violet)' },
            { title: 'Ti aggiorniamo', body: 'Produciamo, pubblichiamo e ottimizziamo con ritmo costante. Ogni mese leggiamo i risultati e capiamo il prossimo passo.', numberColor: 'var(--tomato)' },
          ]}
        />
      </div>
    </section>
  )
}
