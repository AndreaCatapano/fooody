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
        <span className="eyebrow" data-cid="HD1">hanno mangiato con noi</span>
        {/* TODO: sostituire con SVG monocromo dei loghi reali */}
        <span className="mono-xs">loghi clienti · versione monocromatica</span>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {/* TODO: sostituire con nomi/SVG clienti reali */}
          <span className="client-logo" data-placeholder="logo cliente" data-cid="HD2" data-ctype="img">CLIENTE</span>
          <span className="client-logo" data-placeholder="logo cliente" data-cid="HD3" data-ctype="img">Trattoria</span>
          <span className="client-logo" data-placeholder="logo cliente" data-cid="HD4" data-ctype="img">FoodCo</span>
          <span className="client-logo" data-placeholder="logo cliente" data-cid="HD5" data-ctype="img">Brand·</span>
          <span className="client-logo" data-placeholder="logo cliente" data-cid="HD6" data-ctype="img">Mercato</span>
          <span className="client-logo" data-placeholder="logo cliente" data-cid="HD7" data-ctype="img">Forno+</span>
          <span className="client-logo" data-placeholder="logo cliente" data-cid="HD8" data-ctype="img">Vino &amp; Co</span>
          <span className="client-logo" data-placeholder="logo cliente" data-cid="HD9" data-ctype="img">DeliKa</span>
        </div>
      </div>
    </section>
  )
}
