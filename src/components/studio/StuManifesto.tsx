export default function StuManifesto() {
  return (
    <section className="section ink-region" data-bg="ink" id="manifesto">
      <div className="wrap">
        <div className="eyebrow no-slash stu-accent-fg" data-reveal="">— manifesto</div>
        <h2 className="h1 text-balance" data-kinetic="words"
          style={{ marginTop: 16, maxWidth: '18ch', color: 'var(--paper)' }}>
          Il food non si vende. Si fa desiderare.
        </h2>
        <div className="stu-manifesto-body" data-reveal="" data-reveal-d="2">
          <p className="lead text-pretty" style={{ maxWidth: '54ch', color: 'rgba(247,244,238,.82)' }}>
            Crediamo che dietro ogni piatto, ogni brand e ogni scroll ci sia una persona affamata di
            qualcosa di buono. Il nostro lavoro è apparecchiare la tavola giusta — con metodo, gusto
            e un pizzico di sfacciatosta.
          </p>
          <p className="lead text-pretty" style={{ maxWidth: '54ch', color: 'rgba(247,244,238,.82)', marginTop: 22 }}>
            Non facciamo contenuti per riempire un calendario. Facciamo contenuti per riempire una
            sala. C&apos;è differenza — e si vede nei numeri.
          </p>
        </div>
      </div>
    </section>
  )
}
