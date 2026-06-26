export default function BrandCaps() {
  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="cosa">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow brand-eyebrow">cosa facciamo</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Dalla strategia<br />al lancio.
            </h2>
          </div>
          <p className="small" style={{ maxWidth: '34ch' }}>
            Quattro tappe per costruire un marchio coerente — dentro e fuori dal piatto.
          </p>
        </div>

        <div className="brd-caps">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vw,20px)' }}>
            <article className="brd-cap brd-cap-sm brd-c1" data-reveal="">
              <div className="brd-cap-idx">01</div>
              <h3 className="brd-cap-title">Strategia di marca</h3>
              <p className="brd-cap-sub mono">cosa sei, per chi, e perché ti scelgono</p>
              <p className="brd-cap-desc text-pretty">Posizionamento, valori, pubblico, archetipo. Le fondamenta su cui poggia ogni scelta visiva successiva.</p>
              <div className="brd-cap-chips">
                <span className="chip">Positioning</span>
                <span className="chip">Brand platform</span>
                <span className="chip">Ricerca</span>
              </div>
            </article>

            <article className="brd-cap brd-cap-sm brd-c2" data-reveal="" data-reveal-d="2">
              <div className="brd-cap-idx">02</div>
              <h3 className="brd-cap-title">Naming &amp; voce</h3>
              <p className="brd-cap-sub mono">il nome giusto e come lo dici</p>
              <p className="brd-cap-desc text-pretty">Naming, tagline, tono di voce, verifica di disponibilità. Un nome che si pronuncia, si ricorda e si trova.</p>
              <div className="brd-cap-chips">
                <span className="chip">Naming</span>
                <span className="chip">Tagline</span>
                <span className="chip">Tone of voice</span>
              </div>
            </article>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vw,20px)' }}>
            <article className="brd-cap brd-cap-lg brd-c3" data-reveal="" data-reveal-d="1">
              <div className="brd-cap-inner">
                <div className="brd-cap-idx">03</div>
                <h3 className="brd-cap-title">Identità visiva</h3>
                <p className="brd-cap-sub mono">logo, colori, tipografia, sistema</p>
                <p className="brd-cap-desc text-pretty">Marchio, palette, font, griglie e linee guida. Un sistema che resta coerente dal biglietto da visita all&apos;insegna — e che il sito eredita di default.</p>
                <div className="brd-cap-chips">
                  <span className="chip">Logo</span>
                  <span className="chip">Design system</span>
                  <span className="chip">Brand book</span>
                </div>
              </div>
              <a className="brd-cross brd-cross-web" href="/web" data-transition="" data-transition-word="Web">
                <span className="brd-cross-pre">Pronto a portarla online?</span>
                <span className="brd-cross-cta">Costruiamo il sito con il Web Design ↗</span>
              </a>
            </article>

            <article className="brd-cap brd-cap-lg brd-c4" data-reveal="" data-reveal-d="3">
              <div className="brd-cap-inner">
                <div className="brd-cap-idx">04</div>
                <h3 className="brd-cap-title">Packaging &amp; stampa</h3>
                <p className="brd-cap-sub mono">il brand che prendi in mano</p>
                <p className="brd-cap-desc text-pretty">Etichette, confezioni, menù, materiali stampati. L&apos;identità che diventa oggetto — pronta per lo scaffale e per la foto che gira sui social.</p>
                <div className="brd-cap-chips">
                  <span className="chip">Packaging</span>
                  <span className="chip">Etichette</span>
                  <span className="chip">Stampa</span>
                </div>
              </div>
              <a className="brd-cross brd-cross-soc" href="/social" data-transition="" data-transition-word="Social">
                <span className="brd-cross-pre">Vuoi darle voce sui social?</span>
                <span className="brd-cross-cta">Pensiamoci col Social Media ↗</span>
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
