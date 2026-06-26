export default function ClientiMarquee() {
  return (
    <section className="section-tight" data-bg="paper-2" style={{ background: 'var(--paper-2)' }}>
      <div
        className="wrap"
        style={{
          marginBottom: 26,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span className="eyebrow">hanno mangiato con noi</span>
        {/* TODO: sostituire con SVG monocromo dei loghi reali */}
        <span className="mono-xs">loghi clienti · versione monocromatica</span>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {/* TODO: sostituire con nomi/SVG clienti reali */}
          <span className="client-logo" data-placeholder="logo cliente">CLIENTE</span>
          <span className="client-logo" data-placeholder="logo cliente">Trattoria</span>
          <span className="client-logo" data-placeholder="logo cliente">FoodCo</span>
          <span className="client-logo" data-placeholder="logo cliente">Brand·</span>
          <span className="client-logo" data-placeholder="logo cliente">Mercato</span>
          <span className="client-logo" data-placeholder="logo cliente">Forno+</span>
          <span className="client-logo" data-placeholder="logo cliente">Vino &amp; Co</span>
          <span className="client-logo" data-placeholder="logo cliente">DeliKa</span>
        </div>
      </div>
    </section>
  )
}
