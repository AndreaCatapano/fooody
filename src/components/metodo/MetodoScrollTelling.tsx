export default function MetodoScrollTelling() {
  return (
    <section
      data-scrolly=""
      id="pilastri"
      style={{ '--scene-bg': '#0f0c0a' } as React.CSSProperties}
    >
      <div
        className="wrap"
        style={{ paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 18 }}
      >
        <div className="sec-head sec-head--solo" style={{ marginBottom: 0 }}>
          <div>
            <div className="eyebrow no-slash met-accent-fg">
              — il sistema
            </div>
            <h2 className="h2" style={{ marginTop: 14, color: 'var(--paper)' }}>
              I cinque pilastri.
            </h2>
          </div>
        </div>
      </div>

      <div className="scrolly-inner">
        <div className="scrolly-media-col">
          <div className="scene-stack">
            {/* TODO: sostituire con immagini/video reali */}
            <div className="scene-media active ph on-ink" data-scene="1" data-placeholder="immagine pilastro 01 · identità · 4:5">
              <span className="scene-num-huge">01</span>
              <span className="scene-cap">identità · brand a tavola</span>
            </div>
            <div className="scene-media ph on-ink" data-scene="2" data-placeholder="immagine pilastro 02 · social · 4:5">
              <span className="scene-num-huge">02</span>
              <span className="scene-cap">social · riempi i tavoli</span>
            </div>
            <div className="scene-media ph on-ink" data-scene="3" data-placeholder="immagine pilastro 03 · menu · 4:5">
              <span className="scene-num-huge">03</span>
              <span className="scene-cap">menu engineering</span>
            </div>
            <div className="scene-media ph on-ink" data-scene="4" data-placeholder="immagine pilastro 04 · esperienza · 4:5">
              <span className="scene-num-huge">04</span>
              <span className="scene-cap">esperienza · dal click al conto</span>
            </div>
            <div className="scene-media ph on-ink" data-scene="5" data-placeholder="immagine pilastro 05 · crescita · 4:5">
              <span className="scene-num-huge">05</span>
              <span className="scene-cap">crescita · numeri da mangiare</span>
            </div>
          </div>
        </div>

        <div className="scrolly-steps">
          <div className="scrolly-step" data-scene="1" data-scene-bg="deep">
            <div className="step-pillar"><span>Pilastro 01</span> — identità</div>
            <h3 className="step-title">Chi sei, prima ancora del menù.</h3>
            <p className="step-body">
              Nome, logo, palette, packaging, font e menù devono parlare la stessa lingua.
              Costruiamo un’identità visiva chiara, coerente e riconoscibile, capace di far
              percepire subito il valore del tuo locale.
            </p>
            <div className="step-list">
              <span className="chip">Naming</span>
              <span className="chip">Logo &amp; identità</span>
              <span className="chip">Menu design</span>
              <span className="chip">Packaging</span>
            </div>
          </div>

          <div className="scrolly-step" data-scene="2" data-scene-bg="paper">
            <div className="step-pillar"><span>Pilastro 02</span> — social</div>
            <h3 className="step-title" style={{ color: 'var(--ink)' }}>Riempire i tavoli, non solo il feed.</h3>
            <p className="step-body" style={{ color: 'rgba(23,19,15,.72)' }}>
              Facciamo venire fame prima ancora di arrivare al tavolo. Reel, shooting, food
              photography, piano editoriale e campagne diventano un sistema unico per far parlare
              del tuo locale, far crescere la community e trasformare l’attenzione in vendite.
            </p>
            <div className="step-list">
              <span className="chip">Content plan</span>
              <span className="chip">Reel &amp; UGC</span>
              <span className="chip">Food photo</span>
              <span className="chip">Community</span>
            </div>
            <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(23,19,15,.15)', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '5px 10px' }}>
              <span className="mono-xs" style={{ color: 'rgba(23,19,15,.45)' }}>Vuoi solo il social?</span>
              <a className="tlink" href="/social" data-transition="" data-transition-word="Social" style={{ color: 'rgba(23,19,15,.75)' }}>
                Scopri il servizio Social <span className="arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="scrolly-step" data-scene="3" data-scene-bg="tomato">
            <div className="step-pillar" style={{ color: 'var(--ink)' }}>
              <span>Pilastro 03</span> — menu engineering
            </div>
            <h3 className="step-title" style={{ color: 'var(--ink)' }}>
              Il menù è il tuo miglior cameriere.
            </h3>
            <p className="step-body" style={{ color: 'rgba(23,19,15,.72)' }}>
              Studiamo prezzi, marginalità, food cost e comportamento d’acquisto per spingere i
              piatti giusti nel modo giusto. Un menù progettato bene vende di più, migliora i
              margini e aumenta il valore percepito.
            </p>
            <div className="step-list">
              <span className="chip">Pricing</span>
              <span className="chip">Layout</span>
              <span className="chip">Piatti civetta</span>
              <span className="chip">Food cost</span>
            </div>
          </div>

          <div className="scrolly-step" data-scene="4" data-scene-bg="paper">
            <div className="step-pillar"><span>Pilastro 04</span> — esperienza</div>
            <h3 className="step-title" style={{ color: 'var(--ink)' }}>Dal primo scroll all&apos;ultimo boccone.</h3>
            <p className="step-body" style={{ color: 'rgba(23,19,15,.72)' }}>
              Realizziamo siti web, sistemi di prenotazione e menù digitali pensati per la tua
              attività. Tutto deve funzionare in modo semplice, veloce e coerente, dal primo click
              alla prenotazione.
            </p>
            <div className="step-list">
              <span className="chip">Sito &amp; prenotazioni</span>
              <span className="chip">Menu digitale</span>
              <span className="chip">Recensioni</span>
              <span className="chip">CRM</span>
            </div>
            <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(23,19,15,.15)', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '5px 10px' }}>
              <span className="mono-xs" style={{ color: 'rgba(23,19,15,.45)' }}>Vuoi solo il sito?</span>
              <a className="tlink" href="/web" data-transition="" data-transition-word="Web" style={{ color: 'rgba(23,19,15,.75)' }}>
                Scopri il servizio Web Design <span className="arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="scrolly-step" data-scene="5" data-scene-bg="deep">
            <div className="step-pillar"><span>Pilastro 05</span> — crescita</div>
            <h3 className="step-title">Numeri che si possono mangiare.</h3>
            <p className="step-body">
              ADS mirate, analisi dei dati, fidelizzazione e controllo delle performance.
              Misuriamo coperti, ordini, scontrino medio, ritorni e risultati reali, perché
              crescere non può essere una sensazione: devi leggerlo nei numeri.
            </p>
            <div className="step-list">
              <span className="chip">ADV</span>
              <span className="chip">Analytics</span>
              <span className="chip">Fidelity</span>
              <span className="chip">Report mensile</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chapter-rail">
        <div className="chapter-rail-inner">
          <span className="mono-xs" style={{ color: 'rgba(247,244,238,.55)' }}>Metodo</span>
          <div className="chapter-progress">
            <span data-scrolly-progress="" />
          </div>
          <div className="chapter-steps">
            <span className="chapter-dot active" data-chapter-step="">01 Identità</span>
            <span className="chapter-dot" data-chapter-step="">02 Social</span>
            <span className="chapter-dot" data-chapter-step="">03 Menu</span>
            <span className="chapter-dot" data-chapter-step="">04 Esperienza</span>
            <span className="chapter-dot" data-chapter-step="">05 Crescita</span>
          </div>
        </div>
      </div>
    </section>
  )
}
