export default function MetodoIntro() {
  return (
    <section className="section ink-region" data-bg="ink" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="divider" style={{ marginBottom: 'clamp(40px,6vw,80px)' }} />
        <div className="metodo-intro">
          <span className="eyebrow no-slash" style={{ color: 'rgba(247,244,238,.5)' }} data-cid="MB1">
            il problema
          </span>
          <h2
            className="h1 text-balance"
            data-kinetic="words"
            style={{ maxWidth: '20ch', color: 'var(--paper)' }}
            data-cid="MB2"
          >
            Si mangia benissimo. Ma lo sa solo chi è già entrato.
          </h2>
          <p className="lead text-pretty" data-reveal="" style={{ maxWidth: '54ch' }} data-cid="MB3">
            Il piatto è perfetto, la sala pure. Poi fuori, sul telefono di chi non ti conosce, il
            tuo ristorante è un puntino tra mille. Il Metodo serve a far arrivare
            l&apos;acquolina{' '}
            <em className="italic-serif">prima</em> del menù.
          </p>
        </div>
      </div>
    </section>
  )
}
