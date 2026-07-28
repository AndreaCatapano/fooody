import SectionHeader from '@/components/blocks/SectionHeader'

export default function BrandCaps() {
  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="cosa">
      <div className="wrap">
        <SectionHeader
          eyebrow="cosa creiamo"
          eyebrowClass="brand-eyebrow"
          heading={<>Dalla strategia<br />al lancio.</>}
          lead="Quattro tappe per costruire un brand riconoscibile e pronto a vivere ovunque: online, offline ma soprattutto nella testa delle persone."
          leadMaxWidth="34ch"
        />

        <div className="brd-caps">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vw,20px)' }}>
            <article className="brd-cap brd-cap-sm brd-c1" data-reveal="">
              <div className="brd-cap-idx">01</div>
              <h3 className="brd-cap-title">Posizionamento</h3>
              <p className="brd-cap-sub mono">prima capiamo chi sei, poi decidiamo come farti riconoscere</p>
              <p className="brd-cap-desc text-pretty">Costruiamo le fondamenta del brand prima di toccare logo, colori o packaging.</p>
              <div className="brd-cap-chips">
                <span className="chip">Positioning</span>
                <span className="chip">Brand platform</span>
                <span className="chip">Ricerca</span>
              </div>
            </article>

            <article className="brd-cap brd-cap-sm brd-c2" data-reveal="" data-reveal-d="2">
              <div className="brd-cap-idx">02</div>
              <h3 className="brd-cap-title">Naming e ToV</h3>
              <p className="brd-cap-sub mono">il nome giusto non si limita a suonare bene</p>
              <p className="brd-cap-desc text-pretty">Naming, tagline, tono di voce e verifica di disponibilità. Diamo al brand parole che si pronunciano, si ricordano e si riconoscono.</p>
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
                <h3 className="brd-cap-title">Visual identity</h3>
                <p className="brd-cap-sub mono">un sistema che tiene insieme tutto</p>
                <p className="brd-cap-desc text-pretty">Marchio, palette, tipografia, griglie e linee guida. Ogni elemento lavora per rendere il brand coerente in ogni supporto.</p>
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
                <h3 className="brd-cap-title">Packaging</h3>
                <p className="brd-cap-sub mono">il packaging è il tuo brand quando tu non sei lì a spiegarlo</p>
                <p className="brd-cap-desc text-pretty">Etichette, confezioni, menù e materiali stampati devono attirare, raccontare e vendere in pochi secondi. Li progettiamo per far riconoscere, scegliere e ricordare il prodotto.</p>
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
