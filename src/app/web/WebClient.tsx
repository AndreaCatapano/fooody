'use client'
import { useEffect, useState } from 'react'

function DevicePreview() {
  useEffect(() => {
    const stage = document.getElementById('preview-stage')
    const sizeEl = document.getElementById('vp-size')
    const sizes: Record<string, string> = { desktop: '1280 × 800', tablet: '768 × 1024', mobile: '390 × 844' }

    document.querySelectorAll<HTMLButtonElement>('.vp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll<HTMLButtonElement>('.vp-btn').forEach(x => {
          x.classList.remove('active')
          x.setAttribute('aria-selected', 'false')
        })
        btn.classList.add('active')
        btn.setAttribute('aria-selected', 'true')
        const vp = btn.getAttribute('data-vp') || 'desktop'
        stage?.classList.remove('is-tablet', 'is-mobile')
        if (vp === 'tablet') stage?.classList.add('is-tablet')
        if (vp === 'mobile') stage?.classList.add('is-mobile')
        if (sizeEl) sizeEl.textContent = sizes[vp]
      })
    })
  }, [])

  return (
    <div className="preview-wrap" data-reveal="">
      {/* toolbar */}
      <div className="preview-toolbar" role="tablist" aria-label="Scegli dispositivo">
        <div className="vp-seg">
          <button className="vp-btn active" data-vp="desktop" role="tab" aria-selected="true">
            <span className="vp-icon">
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                <rect x=".5" y=".5" width="13" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5 10h4M7 8.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </span>
            Desktop
          </button>
          <button className="vp-btn" data-vp="tablet" role="tab" aria-selected="false">
            <span className="vp-icon">
              <svg width="9" height="12" viewBox="0 0 9 12" fill="none">
                <rect x=".5" y=".5" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="4.5" cy="10" r=".7" fill="currentColor"/>
              </svg>
            </span>
            Tablet
          </button>
          <button className="vp-btn" data-vp="mobile" role="tab" aria-selected="false">
            <span className="vp-icon">
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <rect x=".5" y=".5" width="6" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="3.5" cy="10" r=".7" fill="currentColor"/>
                <path d="M2.5 2h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </span>
            Mobile
          </button>
        </div>
        <span className="vp-size mono-xs" id="vp-size">1280 × 800</span>
      </div>

      {/* browser stage */}
      <div className="preview-stage" id="preview-stage">
        <div className="browser">
          <div className="browser-bar">
            <span className="browser-dots"><i /><i /><i /></span>
            <span className="browser-url mono-xs">fooody.it / cliente</span>
          </div>
          <div className="browser-view">
            <div className="mock">
              <div className="mock-nav">
                <span className="mock-logo">Marca<i>.</i></span>
                <span className="mock-links"><b /><b /><b /></span>
                <span className="mock-cta">Ordina</span>
              </div>
              <div className="mock-hero">
                <div className="mock-hero-txt">
                  <span className="mock-eyebrow">// menù di stagione</span>
                  <span className="mock-h1">Il gusto<br />a domicilio.</span>
                  <span className="mock-sub-txt">Ingredienti freschi, consegna in 30 minuti.</span>
                  <div className="mock-btns">
                    <span className="mock-btn">Prenota un tavolo</span>
                    <span className="mock-b-ghost">Sfoglia il menù</span>
                  </div>
                </div>
                <div className="mock-hero-img" />
              </div>
              <div className="mock-features">
                <div className="mock-feat"><span className="mock-feat-ic">✦</span><span className="mock-feat-lbl">Ingredienti km0</span></div>
                <div className="mock-feat"><span className="mock-feat-ic">✦</span><span className="mock-feat-lbl">Consegna 30min</span></div>
                <div className="mock-feat"><span className="mock-feat-ic">✦</span><span className="mock-feat-lbl">Prenota online</span></div>
              </div>
              <div className="mock-cards-head">
                <span className="mock-section-lbl">// i nostri piatti</span>
                <span className="mock-tlink">vedi tutti →</span>
              </div>
              <div className="mock-cards">
                <div className="mock-card" /><div className="mock-card" />
                <div className="mock-card" /><div className="mock-card" />
              </div>
              <div className="mock-footer">
                <span className="mock-logo" style={{ fontSize: '.6rem' }}>Marca<i>.</i></span>
                <span className="mock-footer-links"><b /><b /><b /><b /></span>
                <span className="mock-footer-copy">© 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

const WEB_DATA: Record<number, { title: string; sub: string; desc: string; chips: string[]; badge: string; mnum: string; mlbl: string; cross: { pre: string; href: string; word: string; text: string } | null }> = {
  1: { title: 'Strategia & UX', sub: 'prima capiamo dove deve cliccare', desc: "Obiettivi, architettura, flussi e wireframe. Mappiamo il percorso dell'utente prima di disegnare un solo pixel.", chips: ['Audit', 'Wireframe', 'User flow'], badge: 'Passo 01 — 4', mnum: '1.200+', mlbl: 'utenti testati per architettura', cross: null },
  2: { title: 'UI & design system', sub: 'bello, ma con un sistema dietro', desc: 'Interfaccia, componenti, micro-interazioni. Un design system coerente che scala senza perdere carattere.', chips: ['UI design', 'Design system', 'Prototipo'], badge: 'Passo 02 — 4', mnum: '1 kit', mlbl: 'consegnato, usabile dal primo giorno', cross: { pre: "Ancora senza un'identità visiva?", href: '/branding', word: 'Branding', text: 'Partiamo dal Branding ↗' } },
  3: { title: 'Sviluppo & CMS', sub: 'codice pulito, gestibile da te', desc: 'Front-end veloce, CMS su misura, e-commerce. Il sito lo aggiorni tu, senza chiamarci ogni volta che cambia un prezzo.', chips: ['Front-end', 'CMS', 'E-commerce'], badge: 'Passo 03 — 4', mnum: '0.9s', mlbl: 'caricamento medio', cross: null },
  4: { title: 'SEO & performance', sub: 'veloce e trovabile, sul serio', desc: 'Ottimizzazione tecnica, contenuti, Core Web Vitals. Un sito che Google capisce e le persone aprono senza aspettare.', chips: ['SEO tecnica', 'Core Web Vitals', 'Analytics'], badge: 'Passo 04 — 4', mnum: '98/100', mlbl: 'performance score medio', cross: null },
}

function WebStepsSection() {
  const [heroStep, setHeroStep] = useState(1)
  const [smalls, setSmalls] = useState([2, 3, 4])
  const [fading, setFading] = useState(false)
  const d = WEB_DATA[heroStep]

  function activate(n: number) {
    setFading(true)
    setTimeout(() => {
      const prev = heroStep
      setHeroStep(n)
      setSmalls([prev, ...smalls.filter(x => x !== n)].sort((a, b) => a - b))
      setFading(false)
    }, 240)
  }

  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="cosa">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow web-eyebrow">come lavoriamo</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Dal brief<br />al deploy.
            </h2>
          </div>
          <p className="small" style={{ maxWidth: '34ch' }}>
            Un processo in quattro tappe. Niente sorprese in fattura, niente &ldquo;ci pensiamo dopo&rdquo;.
          </p>
        </div>

        <div className="web-steps">
          <div className="web-hero-card" style={{ opacity: fading ? 0 : 1 }}>
            <div className="web-hero-wm" aria-hidden="true">{'0' + heroStep}</div>
            <div className="web-hero-badge">{d.badge}</div>
            <h3 className="web-hero-title">{d.title}</h3>
            <p className="web-hero-sub mono">{d.sub}</p>
            <p className="web-hero-desc">{d.desc}</p>
            <div className="web-hero-chips">
              {d.chips.map(c => <span key={c} className="chip">{c}</span>)}
            </div>
            <div className="web-hero-cross">
              {d.cross && (
                <>
                  <span className="mono-xs" style={{ color: 'var(--ink-3)' }}>{d.cross.pre}</span>
                  <a className="tlink" href={d.cross.href} data-transition="" data-transition-word={d.cross.word}>
                    {d.cross.text}
                  </a>
                </>
              )}
            </div>
            <div className="web-hero-metric">
              <span className="web-hero-mnum">{d.mnum}</span>
              <span className="web-hero-mlbl">{d.mlbl}</span>
            </div>
          </div>
          <div className="web-smalls">
            {smalls.map(n => {
              const s = WEB_DATA[n]
              return (
                <button key={n} className="web-small" data-step={n} onClick={() => activate(n)}>
                  <span className="web-small-idx">{'0' + n}</span>
                  <div className="web-small-body">
                    <span className="web-small-title">{s.title}</span>
                    <span className="web-small-sub">{s.sub}</span>
                  </div>
                  <span className="web-small-go">↗</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function WebClient() {
  return (
    <>
      {/* ============================================================
          HERO (ink)
          ============================================================ */}
      <header
        className="section ink-region"
        data-bg="ink"
        style={{ paddingTop: 'clamp(130px,18vh,220px)', paddingBottom: 'clamp(48px,7vw,96px)' }}
      >
        <div className="wrap">
          <div className="eyebrow no-slash web-accent-fg">— web design · ux · sviluppo</div>
          <h1 className="mega" data-kinetic="lines" style={{ marginTop: 20, maxWidth: '16ch' }}>
            Siti che<br /><span className="web-accent-fg">convertono.</span><br />Non solo che si guardano.
          </h1>
          <div className="web-hero-foot">
            <p className="lead text-pretty" data-reveal="" data-reveal-d="2" style={{ maxWidth: '48ch' }}>
              UX, UI, sviluppo e SEO sotto lo stesso tetto. Costruiamo siti veloci, belli e onesti —
              dove il bottone giusto è sempre a portata di pollice.
            </p>
            <div className="web-hero-cta" data-reveal="" data-reveal-d="3">
              <a className="btn web-btn lg" href="/contatti" data-transition="" data-transition-word="Contatti" data-magnetic="0.3">
                <span className="btn-label">Prenota una call <span className="arrow">↗</span></span>
              </a>
              <span className="mono-xs" style={{ color: 'rgba(247,244,238,.5)' }}>
                ↓ provalo: desktop, tablet, mobile
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          SIGNATURE · ANTEPRIMA DAL VIVO
          ============================================================ */}
      <section className="section" data-bg="paper" id="anteprima" data-sig="">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow web-eyebrow">anteprima dal vivo</div>
              <h2 className="h2" style={{ marginTop: 12, maxWidth: '22ch' }}>
                Un sito che sta<br />bene ovunque.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '30ch' }}>
              Stessa pagina, tre viewport.<br />Il layout si ricompone, non si rompe.
            </p>
          </div>

          <DevicePreview />

          {/* stats incollate sotto il preview-wrap — bordi connessi */}
          <div className="anteprima-stats">
            <div className="a-stat">
              <span className="a-stat-num">0.9s</span>
              <span className="a-stat-lbl">caricamento medio</span>
            </div>
            <div className="a-stat">
              <span className="a-stat-num">98/100</span>
              <span className="a-stat-lbl">performance score</span>
            </div>
            <div className="a-stat">
              <span className="a-stat-num">2 step</span>
              <span className="a-stat-lbl">al checkout</span>
            </div>
            <div className="a-stat">
              <span className="a-stat-num">100%</span>
              <span className="a-stat-lbl">responsive &amp; accessibile</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          COME LAVORIAMO — hero card + smalls
          ============================================================ */}
      <WebStepsSection />

      {/* ============================================================
          STACK / capabilities
          ============================================================ */}
      <section className="section" data-bg="paper" id="stack">
        <div className="wrap">
          <div className="eyebrow web-eyebrow" data-reveal="">cosa sappiamo costruire</div>
          <h2 className="h1 text-balance" data-kinetic="words" style={{ marginTop: 16, maxWidth: '20ch' }}>
            Dal sito vetrina all&apos;e-commerce con mille referenze.
          </h2>
          <div className="web-cap-grid" data-reveal="" data-reveal-d="2">
            <div className="web-cap-card">
              <span className="mono-xs web-cap-tag">vetrina</span>
              <p className="body text-pretty">Siti istituzionali e landing che presentano bene e caricano in fretta.</p>
            </div>
            <div className="web-cap-card">
              <span className="mono-xs web-cap-tag">e-commerce</span>
              <p className="body text-pretty">Negozi online con checkout in due step, pagamenti e logistica integrati.</p>
            </div>
            <div className="web-cap-card">
              <span className="mono-xs web-cap-tag">prenotazioni</span>
              <p className="body text-pretty">Sistemi di booking per ristoranti, eventi e servizi — senza intermediari.</p>
            </div>
            <div className="web-cap-card">
              <span className="mono-xs web-cap-tag">web app</span>
              <p className="body text-pretty">Strumenti su misura: gestionali, dashboard, configuratori di prodotto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CASE integrato
          ============================================================ */}
      <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="caso">
        <div className="wrap">
          <div className="eyebrow web-eyebrow" data-reveal="">caso · e-commerce</div>
          <div className="case-grid">
            {/* TODO: sostituire con immagini reali */}
            <figure className="ph tall case-cover" data-reveal="" data-tilt="4" data-cursor="guarda" data-placeholder="case · sito + checkout · 4:5">
              <span className="ph-label">case · sito + checkout</span>
            </figure>
            <div>
              <h2 className="h1 text-balance" data-kinetic="words" style={{ maxWidth: '16ch' }}>
                Da zero a 18k visite al mese.
              </h2>
              <p className="lead text-pretty" data-reveal="" style={{ marginTop: 20, maxWidth: '46ch' }}>
                Nuovo e-commerce, checkout ridisegnato in due step, SEO da capo. In sei mesi il
                negozio è passato dal &ldquo;ce l&apos;abbiamo anche online&rdquo; a primo canale di vendita.
              </p>
              <div className="case-kpis" data-reveal="" data-reveal-d="2">
                <div className="case-kpi">
                  <span className="numeral" style={{ color: 'var(--violet-deep)' }}>18k</span>
                  <span className="mono-xs">visite/mese</span>
                </div>
                <div className="case-kpi">
                  <span className="numeral" style={{ color: 'var(--violet-deep)' }}>+64%</span>
                  <span className="mono-xs">conversione</span>
                </div>
                <div className="case-kpi">
                  <span className="numeral">0.9s</span>
                  <span className="mono-xs">caricamento</span>
                </div>
              </div>
              <a className="tlink" href="/lavori" style={{ marginTop: 28, display: 'inline-flex' }}>
                leggi il caso completo <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA (ink)
          ============================================================ */}
      <section className="section ink-region" data-bg="ink" id="contatti">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div className="eyebrow no-slash web-accent-fg" style={{ justifyContent: 'center' }}>
            — pronti a costruire?
          </div>
          <h2 className="mega" data-kinetic="lines" style={{ margin: '22px auto 0', maxWidth: '15ch' }}>
            Mettiamo online<br />qualcosa di buono.
          </h2>
          <p className="lead text-pretty" data-reveal="" style={{ margin: '26px auto 0', maxWidth: '42ch' }}>
            Raccontaci il progetto. Prima call gratuita: capiamo cosa serve davvero e cosa no.
          </p>
          <div data-reveal="" data-reveal-d="2" style={{ marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn web-btn lg" href="/contatti" data-transition="" data-transition-word="Contatti" data-magnetic="0.3">
              <span className="btn-label">Prenota una call <span className="arrow">↗</span></span>
            </a>
            <a className="btn on-ink ghost lg" href="mailto:ciao@fooody.it">
              <span className="btn-label">ciao@fooody.it</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
