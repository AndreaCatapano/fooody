export default function ServiziSection() {
  return (
    <section className="section" data-bg="paper" id="servizi">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">I QUATTRO PILASTRI DI FOOODY</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Scegli cosa vuoi ottenere.<br />Al come ci pensiamo noi.
            </h2>
          </div>
          <p className="small" style={{ maxWidth: '34ch' }}>
            Abbiamo scelto quattro aree di specializzazione, perché preferiamo fare poche cose, ma
            farle davvero bene.
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
              <p className="service-sub mono">Per ristoranti, aziende food &amp; beverage e realtà Ho.Re.Ca.</p>
              <p className="body text-pretty service-desc">
                Un metodo testato su decine di clienti, personalizzato sulla tua realtà e
                progettato per trasformare la comunicazione in risultati concreti: non solo
                visualizzazioni, ma percezione, desiderio, clienti e fatturato.
              </p>
              <div className="service-chips">
                <span className="chip">Social Media</span>
                <span className="chip">Menu Engineering</span>
                <span className="chip">Branding</span>
                <span className="chip">Packaging</span>
                <span className="chip">Sito</span>
              </div>
              <p className="mono-xs service-kpi">
                ADDÒ MASTON: +735% ENGAGEMENT E +23% FATTURATO IN 6 MESI
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
              <p className="service-sub mono">Per brand, aziende, professionisti e attività che vogliono crescere online</p>
              <p className="body text-pretty service-desc">
                Dalla strategia organica alle campagne ads, costruiamo un sistema di comunicazione
                su misura. Pensiamo i contenuti, li produciamo, li pubblichiamo e analizziamo ogni
                risultato per trasformare attenzione in fiducia, e fiducia in clienti.
              </p>
              <div className="service-chips">
                <span className="chip">Strategia</span>
                <span className="chip">Content</span>
                <span className="chip">Reels &amp; UGC</span>
                <span className="chip">ADV</span>
                <span className="chip">Community</span>
              </div>
              <p className="mono-xs service-kpi">
                FITXGAME: 4,5M DI VISUALIZZAZIONI E COST PER LEAD -67% IN 4 MESI
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
              <p className="service-sub mono">Il tuo sito è la tua vetrina e la tua non può farti sembrare un discount</p>
              <p className="body text-pretty service-desc">
                Realizziamo siti veloci, dall’identità visiva forte e pensati per convertire.
                Dalla struttura delle pagine alle call to action, ogni dettaglio è pensato per
                guidare l’utente verso l’azione giusta.
              </p>
              <div className="service-chips">
                <span className="chip">UX</span>
                <span className="chip">UI</span>
                <span className="chip">CMS</span>
                <span className="chip">E-commerce</span>
                <span className="chip">SEO</span>
              </div>
              <p className="mono-xs service-kpi">
                CYBERTECHNO: +9K VISITE AL MESE E CHECKOUT IN 2 STEP.
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
              <p className="service-sub mono">L’identità non è solo estetica, è il motivo per cui le persone ti riconoscono, ti ricordano e ti scelgono.</p>
              <p className="body text-pretty service-desc">
                Un logo fatto con GPT può darti un’immagine. Una strategia di branding può darti
                una posizione nella mente delle persone. Strategia, naming, identità visiva, tono
                di voce e packaging. Costruiamo un’identità coerente, riconoscibile e difficile da
                dimenticare.
              </p>
              <div className="service-chips">
                <span className="chip">Strategia</span>
                <span className="chip">Naming</span>
                <span className="chip">Identità</span>
                <span className="chip">Packaging</span>
                <span className="chip">Stampa</span>
              </div>
              <p className="mono-xs service-kpi">
                LA FIAMMANTE: ETICHETTATURA E PACKAGING A SCAFFALE IN 4 SETTIMANE.
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
