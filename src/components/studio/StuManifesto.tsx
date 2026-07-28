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
            Un piatto buono non basta, se nessuno lo desidera prima. Un brand forte non nasce
            perché pubblica tanto, ma perché riesce a entrare nella testa delle persone.
          </p>
          <p className="lead text-pretty" style={{ maxWidth: '54ch', color: 'rgba(247,244,238,.82)', marginTop: 22 }}>
            Noi lavoriamo lì: tra attenzione e desiderio, tra contenuto e risultato, tra quello che
            sei e quello che il cliente percepisce. Non riempiamo calendari. Costruiamo motivi per
            prenotare, ordinare, tornare e parlare di te.
          </p>
        </div>
      </div>
    </section>
  )
}
