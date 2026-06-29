import StepsTimeline from '@/components/blocks/StepsTimeline'

export default function ContattiComeFunziona() {
  return (
    <section className="section ink-region" data-bg="ink" id="come">
      <div className="wrap">
        <div className="eyebrow no-slash" data-cid="CB1e" style={{ color: 'var(--tomato)' }} data-reveal="">— come funziona</div>
        <h2 className="h1 text-balance" data-kinetic="words" data-cid="CB1"
          style={{ marginTop: 16, maxWidth: '16ch', color: 'var(--paper)' }}>
          Tre passi. Nessun impegno.
        </h2>
        <StepsTimeline
          wrapperClass="lav-steps"
          itemClass="lav-step"
          numberClass="lav-step-n"
          bodyClass="lav-step-body"
          bodyMaxWidth="36ch"
          items={[
            { title: 'Ci scrivi', body: 'Due righe sul tuo brand e su cosa vorresti migliorare. Puoi usare il form qui sotto o scrivere direttamente a ciao@fooody.it — come preferisci.' },
            { title: 'Prima call · gratuita', body: 'Fissiamo 30 minuti per sentirci. Guardiamo i numeri di oggi, capiamo dove sei e dove vuoi arrivare. Nessun obbligo, nessun preventivo automatico.', numberColor: 'var(--gold)' },
            { title: 'Ti facciamo una proposta', body: "Se c'è la sintonia giusta, prepariamo una proposta su misura: obiettivi, servizi, tempistiche e budget. Chiara, non quella standard.", numberColor: 'var(--violet)' },
          ]}
        />
      </div>
    </section>
  )
}
