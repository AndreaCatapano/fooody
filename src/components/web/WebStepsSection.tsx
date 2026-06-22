'use client'
import { useState } from 'react'

const WEB_DATA: Record<number, {
  title: string; sub: string; desc: string; chips: string[]; badge: string
  mnum: string; mlbl: string
  cross: { pre: string; href: string; word: string; text: string } | null
}> = {
  1: { title: 'Strategia & UX', sub: 'prima capiamo dove deve cliccare', desc: "Obiettivi, architettura, flussi e wireframe. Mappiamo il percorso dell'utente prima di disegnare un solo pixel.", chips: ['Audit', 'Wireframe', 'User flow'], badge: 'Passo 01 — 4', mnum: '1.200+', mlbl: 'utenti testati per architettura', cross: null },
  2: { title: 'UI & design system', sub: 'bello, ma con un sistema dietro', desc: 'Interfaccia, componenti, micro-interazioni. Un design system coerente che scala senza perdere carattere.', chips: ['UI design', 'Design system', 'Prototipo'], badge: 'Passo 02 — 4', mnum: '1 kit', mlbl: 'consegnato, usabile dal primo giorno', cross: { pre: "Ancora senza un'identità visiva?", href: '/branding', word: 'Branding', text: 'Partiamo dal Branding ↗' } },
  3: { title: 'Sviluppo & CMS', sub: 'codice pulito, gestibile da te', desc: 'Front-end veloce, CMS su misura, e-commerce. Il sito lo aggiorni tu, senza chiamarci ogni volta che cambia un prezzo.', chips: ['Front-end', 'CMS', 'E-commerce'], badge: 'Passo 03 — 4', mnum: '0.9s', mlbl: 'caricamento medio', cross: null },
  4: { title: 'SEO & performance', sub: 'veloce e trovabile, sul serio', desc: 'Ottimizzazione tecnica, contenuti, Core Web Vitals. Un sito che Google capisce e le persone aprono senza aspettare.', chips: ['SEO tecnica', 'Core Web Vitals', 'Analytics'], badge: 'Passo 04 — 4', mnum: '98/100', mlbl: 'performance score medio', cross: null },
}

export default function WebStepsSection() {
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
