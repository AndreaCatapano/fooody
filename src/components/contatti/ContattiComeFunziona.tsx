import StepsTimeline from '@/components/blocks/StepsTimeline'

export default function ContattiComeFunziona() {
  return (
    <section className="section ink-region" data-bg="ink" id="come">
      <div className="wrap">
        <div className="eyebrow no-slash" style={{ color: 'var(--tomato)' }} data-reveal="">— come funziona</div>
        <h2 className="h1 text-balance" data-kinetic="words"
          style={{ marginTop: 16, maxWidth: '16ch', color: 'var(--paper)' }}>
          Tre step. Nessun impegno.
        </h2>
        <StepsTimeline
          wrapperClass="lav-steps"
          itemClass="lav-step"
          numberClass="lav-step-n"
          bodyClass="lav-step-body"
          bodyMaxWidth="36ch"
          items={[
            { title: 'Ci scrivi', body: 'Due righe sulla tua attività e cosa vorresti migliorare. Puoi usare il form qui sotto o scrivere direttamente a ciao@fooody.it — come preferisci.' },
            { title: 'Ci incontriamo', body: 'Ci prendiamo questo famoso caffè: 30 minuti, senza impegno, per capire dove sei e dove vuoi arrivare.', numberColor: 'var(--gold)' },
            { title: 'Ti facciamo una proposta', body: 'Prepariamo un piano strategico su misura: obiettivi, servizi, tempistiche e budget. Chiaro, non standard.', numberColor: 'var(--violet)' },
          ]}
        />
      </div>
    </section>
  )
}
