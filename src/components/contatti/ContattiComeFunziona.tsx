export default function ContattiComeFunziona() {
  return (
    <section className="section ink-region" data-bg="ink" id="come">
      <div className="wrap">
        <div className="eyebrow no-slash" style={{ color: 'var(--tomato)' }} data-reveal="">— come funziona</div>
        <h2 className="h1 text-balance" data-kinetic="words"
          style={{ marginTop: 16, maxWidth: '16ch', color: 'var(--paper)' }}>
          Tre passi. Nessun impegno.
        </h2>
        <div className="lav-steps">
          <div className="lav-step" data-reveal="">
            <div className="lav-step-n">01</div>
            <div className="lav-step-body">
              <h3 className="h3" style={{ color: 'var(--paper)' }}>Ci scrivi</h3>
              <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '36ch' }}>
                Due righe sul tuo brand e su cosa vorresti migliorare. Puoi usare il form qui sotto
                o scrivere direttamente a ciao@fooody.it — come preferisci.
              </p>
            </div>
          </div>
          <div className="lav-step" data-reveal="" data-reveal-d="1">
            <div className="lav-step-n" style={{ color: 'var(--gold)' }}>02</div>
            <div className="lav-step-body">
              <h3 className="h3" style={{ color: 'var(--paper)' }}>Prima call · gratuita</h3>
              <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '36ch' }}>
                Fissiamo 30 minuti per sentirci. Guardiamo i numeri di oggi, capiamo dove sei
                e dove vuoi arrivare. Nessun obbligo, nessun preventivo automatico.
              </p>
            </div>
          </div>
          <div className="lav-step" data-reveal="" data-reveal-d="2">
            <div className="lav-step-n" style={{ color: 'var(--violet)' }}>03</div>
            <div className="lav-step-body">
              <h3 className="h3" style={{ color: 'var(--paper)' }}>Ti facciamo una proposta</h3>
              <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '36ch' }}>
                Se c&apos;è la sintonia giusta, prepariamo una proposta su misura: obiettivi, servizi,
                tempistiche e budget. Chiara, non quella standard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
