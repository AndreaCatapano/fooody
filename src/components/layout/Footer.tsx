export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="eyebrow no-slash" style={{ color: 'rgba(247,244,238,.5)' }}>
              // agenzia creativa food
            </div>
            <p className="lead" style={{ color: 'rgba(247,244,238,.75)', marginTop: 14, maxWidth: '30ch' }}>
              Strategia, social, branding e web per chi ha qualcosa di buono da dire.
            </p>
          </div>

          <div className="foot-cols">
            <span className="mono-xs">menu</span>
            <a href="/metodo" data-transition="" data-transition-word="Metodo">Metodo Fooody</a>
            <a href="/social"   data-transition="" data-transition-word="Social">Social</a>
            <a href="/web"      data-transition="" data-transition-word="Web">Web Design</a>
            <a href="/branding" data-transition="" data-transition-word="Branding">Branding</a>
            <a href="/studio"   data-transition="" data-transition-word="Studio">Studio</a>
          </div>

          <div className="foot-cols">
            <span className="mono-xs">resta in contatto</span>
            <a href="mailto:ciao@fooody.it">ciao@fooody.it</a>
            {/* placeholder: sostituire con URL reali quando disponibili */}
            <span aria-label="Instagram Fooody" style={{ opacity: 0.4, cursor: 'default' }}>Instagram</span>
            <span aria-label="LinkedIn Fooody" style={{ opacity: 0.4, cursor: 'default' }}>LinkedIn</span>
            <span aria-label="Newsletter Fooody" style={{ opacity: 0.4, cursor: 'default' }}>Newsletter</span>
          </div>
        </div>

        <div className="foot-mega">
          fooody<span className="dot">.</span>
        </div>

        <div className="foot-bottom">
          <span className="mono-xs">© 2026 Fooody — tutti i diritti, zero conservanti.</span>
          {/* TODO: sostituire P.IVA con numero reale */}
          <span className="mono-xs">
            <a href="/privacy">Privacy</a>
            {' · '}
            <a href="/privacy#cookie">Cookie</a>
            {' · '}
            P.IVA 0000000000
          </span>
        </div>
      </div>
    </footer>
  )
}
