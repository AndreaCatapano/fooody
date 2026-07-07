export default function MetodoIntro() {
  return (
    <section className="section ink-region" data-bg="ink" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="divider" style={{ marginBottom: 'clamp(40px,6vw,80px)' }} />
        <div className="metodo-intro">
          <span className="eyebrow no-slash" style={{ color: 'rgba(247,244,238,.5)' }}>
            IL PROBLEMA
          </span>
          <h2
            className="h1 text-balance"
            data-kinetic="words"
            style={{ maxWidth: '20ch', color: 'var(--paper)' }}
          >
            La qualità ce l’hanno tutti. Il tuo vero problema è la percezione.
          </h2>
          <p className="lead text-pretty" data-reveal="" style={{ maxWidth: '54ch' }}>
            Quando vai al ristorante, leggi davvero tutto il menù? Quasi mai. Guardi i primi
            piatti, ti fai colpire da qualcosa e inizi già a scegliere. Online funziona allo
            stesso modo. Se il tuo locale non comunica subito valore, finisce in fondo al menù.
          </p>
        </div>
      </div>
    </section>
  )
}
