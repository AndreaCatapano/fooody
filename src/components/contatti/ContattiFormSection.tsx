import ContactForm from '@/components/contatti/ContactForm'

export default function ContattiFormSection() {
  return (
    <section className="section" data-bg="paper" id="form">
      <div className="wrap">
        <div className="lav-grid">
          <ContactForm />

          <aside className="lav-info" data-reveal="" data-reveal-d="2">
            <div className="lav-info-block">
              <span className="mono-xs lav-info-label">// email diretta</span>
              <a className="lav-info-link" href="mailto:ciao@fooody.it" data-cid="CC1">ciao@fooody.it</a>
            </div>

            <div className="lav-info-block">
              <span className="mono-xs lav-info-label">// social</span>
              <div className="lav-socials">
                <a className="lav-social-link" href="#" target="_blank" rel="noopener">
                  Instagram <span className="arrow">↗</span>
                </a>
                <a className="lav-social-link" href="#" target="_blank" rel="noopener">
                  TikTok <span className="arrow">↗</span>
                </a>
                <a className="lav-social-link" href="#" target="_blank" rel="noopener">
                  LinkedIn <span className="arrow">↗</span>
                </a>
              </div>
            </div>

            <div className="lav-info-block">
              <span className="mono-xs lav-info-label">// dove siamo</span>
              <p className="body" data-cid="CC2" style={{ color: 'var(--ink-2)', marginTop: 6 }}>
                Milano<br />
                <span style={{ color: 'var(--ink-3)' }}>Lavoriamo su tutto il territorio italiano.</span>
              </p>
            </div>

            <div className="lav-info-block lav-info-callout">
              <div className="lav-callout-n">0€</div>
              <p className="body" data-cid="CC3" style={{ color: 'var(--ink-2)', marginTop: 8, maxWidth: '26ch' }}>
                La prima call è sempre gratuita. Nessun obbligo, nessun preventivo automatico.
              </p>
            </div>

            <div className="lav-info-block">
              <span className="mono-xs lav-info-label">// di cosa ci occupiamo</span>
              <div className="lav-services-list">
                <a className="lav-svc" href="/metodo" data-transition="" data-transition-word="Metodo">
                  <span className="lav-svc-idx" style={{ color: 'var(--gold-deep)' }}>01</span>
                  <span>Metodo Fooody</span>
                  <span className="arrow">↗</span>
                </a>
                <a className="lav-svc" href="/social" data-transition="" data-transition-word="Social">
                  <span className="lav-svc-idx" style={{ color: 'var(--tomato-deep)' }}>02</span>
                  <span>Social Media</span>
                  <span className="arrow">↗</span>
                </a>
                <a className="lav-svc" href="/web" data-transition="" data-transition-word="Web">
                  <span className="lav-svc-idx" style={{ color: 'var(--violet-deep)' }}>03</span>
                  <span>Web Design</span>
                  <span className="arrow">↗</span>
                </a>
                <a className="lav-svc" href="/branding" data-transition="" data-transition-word="Branding">
                  <span className="lav-svc-idx" style={{ color: 'var(--tomato-deep)' }}>04</span>
                  <span>Branding</span>
                  <span className="arrow">↗</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
