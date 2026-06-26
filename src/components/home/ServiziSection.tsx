export default function ServiziSection() {
  return (
    <section className="section" data-bg="paper" id="servizi">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">quattro modi di lavorare con noi</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Scegli la portata.<br />Al resto pensiamo noi.
            </h2>
          </div>
          <p className="small" style={{ maxWidth: '34ch' }}>
            Stesso studio, quattro appetiti diversi. Entra dalla porta che ti somiglia — o chiamaci
            e te lo diciamo noi.
          </p>
        </div>

        <div className="services">
          <a
            className="service"
            href="/metodo"
            data-transition=""
            data-transition-word="Metodo"
            data-preview="#211c17"
            data-preview-label="metodo · ristorazione"
            data-magnetic="0.08"
          >
            <div className="service-idx idx">01 / 04</div>
            <div className="service-main">
              <h3 className="h2 service-title">Metodo Fooody</h3>
              <p className="service-sub mono">per ristoranti, catene &amp; chi vive di coperti</p>
              <p className="body text-pretty service-desc">
                Il nostro sistema completo per la ristorazione: social che riempiono i tavoli,
                menù che vendono, identità che si ricordano. Cinque pilastri, zero fronzoli.
              </p>
              <div className="service-chips">
                <span className="chip">Social</span>
                <span className="chip">Menu engineering</span>
                <span className="chip">Branding</span>
                <span className="chip">Packaging</span>
                <span className="chip">Sito</span>
              </div>
              {/* TODO: sostituire con nome cliente reale */}
              <p className="mono-xs service-kpi">
                es. Trattoria Tale · +340% engagement, +180% prenotazioni in 6 mesi
              </p>
            </div>
            <div className="service-go">
              <span className="mono-xs">scopri</span>
              <span className="arrow">↗</span>
            </div>
          </a>

          <a
            className="service"
            href="/social"
            data-transition=""
            data-transition-word="Social"
            data-preview="#1d2a22"
            data-preview-label="social · oltre il food"
            data-magnetic="0.08"
          >
            <div className="service-idx idx">02 / 04</div>
            <div className="service-main">
              <h3 className="h2 service-title">Social Media</h3>
              <p className="service-sub mono">per brand, retailer e aziende — anche oltre il food</p>
              <p className="body text-pretty service-desc">
                Strategia, contenuti e community che non fanno scrollare oltre. Dal reel virale
                alla campagna che converte: pensiamo, giriamo, pubblichiamo, misuriamo.
              </p>
              <div className="service-chips">
                <span className="chip">Strategia</span>
                <span className="chip">Content</span>
                <span className="chip">Reels &amp; UGC</span>
                <span className="chip">ADV</span>
                <span className="chip">Community</span>
              </div>
              <p className="mono-xs service-kpi">
                es. Brand Tale · 5M views virali · community +28k in 4 mesi
              </p>
            </div>
            <div className="service-go">
              <span className="mono-xs">scopri</span>
              <span className="arrow">↗</span>
            </div>
          </a>

          <a
            className="service"
            href="/web"
            data-transition=""
            data-transition-word="Web"
            data-preview="#22201a"
            data-preview-label="web · sito + dev"
            data-magnetic="0.08"
          >
            <div className="service-idx idx">03 / 04</div>
            <div className="service-main">
              <h3 className="h2 service-title">Web Design</h3>
              <p className="service-sub mono">siti che convertono, non solo che si guardano</p>
              <p className="body text-pretty service-desc">
                UX, UI, sviluppo e SEO sotto lo stesso tetto. Costruiamo siti veloci, belli e
                onesti — dove il bottone giusto è sempre a portata di pollice.
              </p>
              <div className="service-chips">
                <span className="chip">UX</span>
                <span className="chip">UI</span>
                <span className="chip">CMS</span>
                <span className="chip">E-commerce</span>
                <span className="chip">SEO</span>
              </div>
              <p className="mono-xs service-kpi">
                es. E-shop Tale · da 0 a 18k visite/mese · checkout in 2 step
              </p>
            </div>
            <div className="service-go">
              <span className="mono-xs">scopri</span>
              <span className="arrow">↗</span>
            </div>
          </a>

          <a
            className="service"
            href="/branding"
            data-transition=""
            data-transition-word="Branding"
            data-preview="#2a211f"
            data-preview-label="branding · identità"
            data-magnetic="0.08"
          >
            <div className="service-idx idx">04 / 04</div>
            <div className="service-main">
              <h3 className="h2 service-title">Branding</h3>
              <p className="service-sub mono">identità che si riconoscono al primo morso</p>
              <p className="body text-pretty service-desc">
                Strategia, naming, identità visiva e packaging. Diamo al tuo brand una faccia,
                una voce e un carattere — di quelli che non si scordano facilmente.
              </p>
              <div className="service-chips">
                <span className="chip">Strategia</span>
                <span className="chip">Naming</span>
                <span className="chip">Identità</span>
                <span className="chip">Packaging</span>
                <span className="chip">Stampa</span>
              </div>
              <p className="mono-xs service-kpi">
                es. Brand Tale · rebranding completo · a scaffale in 8 settimane
              </p>
            </div>
            <div className="service-go">
              <span className="mono-xs">scopri</span>
              <span className="arrow">↗</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
