export default function StuClienti() {
  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="clienti">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow stu-eyebrow">con chi lavoriamo</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Hanno mangiato<br />con noi.
            </h2>
          </div>
          <p className="small" style={{ maxWidth: '32ch' }}>
            Ristoranti, brand food e aziende che hanno qualcosa di buono da raccontare.
          </p>
        </div>
        <div className="stu-clients">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="stu-client-logo ph" data-reveal="" data-reveal-d={String(i)}>
              <span className="ph-label">logo cliente</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
