'use client'
import { useState } from 'react'

// Distanza verticale (px) tra il centro di due pallini consecutivi nello stepper mobile.
// Deve restare in sync con .web-tl-step-head in globals.css (dot 44px + margin-bottom 20px).
const STEP_ROW_HEIGHT = 64

const STEPS = [
  {
    idx: '01',
    title: 'Audit',
    body: [
      'Prima di progettare, capiamo: obiettivi del business, chi sono i tuoi clienti, come comunichi oggi e con quali materiali — contenuti, foto, identità, dati di traffico se un sito esiste già.',
      'Vale anche se parti da zero: in quel caso analizziamo mercato, competitor e cosa i clienti cercano davvero. A te basta una call e l’accesso a quello che hai.',
      'Ricevi un documento chiaro: cosa serve, con quali priorità e con quale tecnologia. Lo stack si sceglie qui — alla fine dell’audit, mai prima.',
    ],
  },
  {
    idx: '02',
    title: 'Design',
    body: [
      "Progettiamo su contenuti reali e sugli obiettivi di ogni pagina. Niente lorem ipsum, niente layout riempiti a caso: dove i contenuti mancano, ti aiutiamo a crearli.",
      'Prima di scrivere codice vedi un prototipo navigabile: struttura, gerarchie, interazioni. Si discute, si rivede, si approva — è il momento giusto per cambiare rotta.',
    ],
  },
  {
    idx: '03',
    title: 'Sviluppo',
    body: [
      "Sviluppiamo sul design approvato, con la tecnologia scelta in audit: WordPress per l’autonomia sui contenuti, Next.js per performance e logiche su misura, Shopify o WooCommerce per vendere online.",
      'Standard fissi su ogni stack: Core Web Vitals in verde, accessibilità WCAG, codice pulito e documentato. Test su dispositivi e browser reali prima del lancio.',
    ],
  },
  {
    idx: '04',
    title: 'Ottimizzazione',
    label: 'Ottimizzazione (SEO e GEO)',
    body: [
      'Il sito nasce ottimizzato: SEO tecnica, struttura semantica e dati strutturati sono dentro dal primo commit, non un extra da aggiungere dopo.',
      'Poi la GEO — Generative Engine Optimization. Sempre più persone non cercano: chiedono, a ChatGPT, Gemini, alle AI Overviews di Google. Strutturiamo i contenuti perché le AI possano leggerli e citarti — non solo Google.',
    ],
  },
  {
    idx: '05',
    title: 'Assistenza',
    body: [
      'Il lancio apre una fase, non la chiude: monitoraggio, aggiornamenti di sicurezza, piccole evoluzioni, dati alla mano per capire cosa funziona.',
      'Concordiamo insieme un piano di assistenza proporzionato al progetto — così sai sempre chi chiamare, e quanto costa.',
    ],
  },
]

export default function WebMetodoSection() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="metodo">
      <div className="wrap">
        <div className="sec-head sec-head--solo">
          <div>
            <div className="eyebrow web-eyebrow">il metodo</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Come lavoriamo
            </h2>
          </div>
        </div>

        <div className="web-tl" data-reveal="">
          {/* Desktop: rail orizzontale con linea di progresso + pannello separato sotto */}
          <div className="web-tl-rail" role="tablist" aria-label="Fasi del metodo">
            <span
              className="web-tl-rail-fill"
              style={{ transform: `scaleX(${active / (STEPS.length - 1)})` }}
              aria-hidden="true"
            />
            {STEPS.map((s, i) => (
              <button
                key={s.idx}
                className={`web-tl-node${i === active ? ' active' : ''}`}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
              >
                <span className="web-tl-dot">{s.idx}</span>
                <span className="web-tl-lbl">{s.title}</span>
              </button>
            ))}
          </div>

          <div className="web-tl-panel" key={step.idx}>
            <span className="web-tl-panel-idx" aria-hidden="true">{step.idx}</span>
            <div className="web-tl-panel-body">
              <h3 className="h3 web-tl-panel-title">{step.label ?? step.title}</h3>
              {step.body.map((p, i) => (
                <p className="body text-pretty" key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Mobile: stepper verticale ad accordion, un pannello aperto alla volta */}
          <div className="web-tl-stepper">
            <span
              className="web-tl-stepper-fill"
              style={{ height: `${active * STEP_ROW_HEIGHT}px` }}
              aria-hidden="true"
            />
            {STEPS.map((s, i) => (
              <details
                key={s.idx}
                className="web-tl-step"
                open={i === active}
                onToggle={(e) => {
                  if (e.currentTarget.open) setActive(i)
                }}
              >
                <summary className="web-tl-step-head">
                  <span className="web-tl-dot">{s.idx}</span>
                  <span className="web-tl-lbl">{s.title}</span>
                </summary>
                <div className="web-tl-step-body">
                  <h3 className="h3 web-tl-panel-title">{s.label ?? s.title}</h3>
                  {s.body.map((p, pi) => (
                    <p className="body text-pretty" key={pi}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
