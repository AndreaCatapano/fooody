export default function ContattiHero() {
  return (
    <header
      className="section ink-region"
      data-bg="ink"
      style={{ paddingTop: 'clamp(130px,18vh,210px)', paddingBottom: 'clamp(36px,5vw,72px)' }}
    >
      <div className="wrap">
        <div className="lav-hero">
          <div>
            <div className="eyebrow no-slash" style={{ color: 'var(--tomato)' }}>— incontriamoci gratuitamente</div>
            <h1 className="mega" data-kinetic="lines" style={{ marginTop: 18 }}>
              Posso offrirti<br /><span style={{ color: 'var(--tomato)' }}>un caffè?</span>
            </h1>
          </div>
          <div className="lav-hero-desc" data-reveal="" data-reveal-d="1">
            <p className="lead text-pretty" style={{ color: 'rgba(247,244,238,.78)', maxWidth: '44ch' }}>
              Raccontaci il tuo progetto. Il primo confronto lo offriamo noi: guardiamo dove sei,
              dove vuoi arrivare e capiamo se possiamo aiutarti davvero.
            </p>
            <div className="lav-hero-pills" data-reveal="" data-reveal-d="2">
              <span className="lav-pill">↓ 30 minuti</span>
              <span className="lav-pill">↓ nessun obbligo</span>
              <span className="lav-pill">↓ risposta in 24h</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
