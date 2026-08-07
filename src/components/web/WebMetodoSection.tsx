'use client'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

// Un colore per fase, dal caldo (Audit) al freddo/violetto del brand web
// (Assistenza) — usato per il segmento di progresso, il numero e l'icona di
// ogni fase, così le cinque tappe sono visivamente distinte ("fasi colorate").
const PHASE_COLORS = ['#DD5049', '#E9933E', '#EFB44F', '#7E68EE', '#6352F0']

// Grafica generata via codice (SVG line-art, currentColor) al posto di un
// asset/foto — una icona per fase del metodo, stesso tratto sottile della
// serie usata altrove sul sito.
const ICON_PROPS = {
  viewBox: '0 0 160 160',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
}

function IconAudit() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="20" y="18" width="86" height="108" rx="8" />
      <line x1="36" y1="42" x2="90" y2="42" />
      <line x1="36" y1="58" x2="90" y2="58" />
      <line x1="36" y1="74" x2="72" y2="74" />
      <circle cx="118" cy="100" r="26" opacity="0.7" />
      <line x1="136" y1="118" x2="150" y2="132" />
    </svg>
  )
}

function IconDesign() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="24" y="24" width="112" height="96" rx="6" />
      <line x1="24" y1="54" x2="136" y2="54" />
      <line x1="68" y1="54" x2="68" y2="120" />
      <circle cx="24" cy="24" r="4" fill="currentColor" stroke="none" />
      <circle cx="136" cy="24" r="4" fill="currentColor" stroke="none" />
      <circle cx="24" cy="120" r="4" fill="currentColor" stroke="none" />
      <circle cx="136" cy="120" r="4" fill="currentColor" stroke="none" />
      <circle cx="45" cy="87" r="10" opacity="0.5" />
      <line x1="90" y1="80" x2="118" y2="80" opacity="0.5" />
      <line x1="90" y1="94" x2="110" y2="94" opacity="0.5" />
    </svg>
  )
}

function IconSviluppo() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M56 46 L26 80 L56 114" />
      <path d="M104 46 L134 80 L104 114" />
      <line x1="88" y1="40" x2="72" y2="120" opacity="0.5" />
    </svg>
  )
}

function IconOttimizzazione() {
  return (
    <svg {...ICON_PROPS}>
      <line x1="24" y1="128" x2="136" y2="128" />
      <rect x="34" y="96" width="16" height="32" opacity="0.5" />
      <rect x="66" y="72" width="16" height="56" opacity="0.6" />
      <rect x="98" y="44" width="16" height="84" opacity="0.7" />
      <path d="M108 30 L128 30 L128 50" />
      <line x1="106" y1="52" x2="128" y2="30" />
    </svg>
  )
}

function IconAssistenza() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M80 22 L134 40 V78 C134 108 110 128 80 140 C50 128 26 108 26 78 V40 Z" />
      <path d="M58 82 L74 98 L104 62" />
    </svg>
  )
}

const STEPS = [
  {
    idx: '01',
    title: 'Audit',
    Icon: IconAudit,
    body: [
      'Prima di progettare, capiamo: obiettivi del business, chi sono i tuoi clienti, come comunichi oggi e con quali materiali — contenuti, foto, identità, dati di traffico se un sito esiste già.',
      'Vale anche se parti da zero: in quel caso analizziamo mercato, competitor e cosa i clienti cercano davvero. A te basta una call e l’accesso a quello che hai.',
      'Ricevi un documento chiaro: cosa serve, con quali priorità e con quale tecnologia. Lo stack si sceglie qui — alla fine dell’audit, mai prima.',
    ],
  },
  {
    idx: '02',
    title: 'Design',
    Icon: IconDesign,
    body: [
      "Progettiamo su contenuti reali e sugli obiettivi di ogni pagina. Niente lorem ipsum, niente layout riempiti a caso: dove i contenuti mancano, ti aiutiamo a crearli.",
      'Prima di scrivere codice vedi un prototipo navigabile: struttura, gerarchie, interazioni. Si discute, si rivede, si approva — è il momento giusto per cambiare rotta.',
    ],
  },
  {
    idx: '03',
    title: 'Sviluppo',
    Icon: IconSviluppo,
    body: [
      "Sviluppiamo sul design approvato, con la tecnologia scelta in audit: WordPress per l’autonomia sui contenuti, Next.js per performance e logiche su misura, Shopify o WooCommerce per vendere online.",
      'Standard fissi su ogni stack: Core Web Vitals in verde, accessibilità WCAG, codice pulito e documentato. Test su dispositivi e browser reali prima del lancio.',
    ],
  },
  {
    idx: '04',
    title: 'Ottimizzazione',
    label: 'Ottimizzazione (SEO e GEO)',
    Icon: IconOttimizzazione,
    body: [
      'Il sito nasce ottimizzato: SEO tecnica, struttura semantica e dati strutturati sono dentro dal primo commit, non un extra da aggiungere dopo.',
      'Poi la GEO — Generative Engine Optimization. Sempre più persone non cercano: chiedono, a ChatGPT, Gemini, alle AI Overviews di Google. Strutturiamo i contenuti perché le AI possano leggerli e citarti — non solo Google.',
    ],
  },
  {
    idx: '05',
    title: 'Assistenza',
    Icon: IconAssistenza,
    body: [
      'Il lancio apre una fase, non la chiude: monitoraggio, aggiornamenti di sicurezza, piccole evoluzioni, dati alla mano per capire cosa funziona.',
      'Concordiamo insieme un piano di assistenza proporzionato al progetto — così sai sempre chi chiamare, e quanto costa.',
    ],
  },
]

const TOTAL = STEPS.length

export default function WebMetodoSection() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const storyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const programmaticRef = useRef(false)
  const programmaticTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeRef = useRef(0)
  useEffect(() => {
    activeRef.current = active
  }, [active])

  // First time the section enters the viewport → arm the icon reveal. The
  // timeout is a safety net: if the observer is delayed for any reason, the
  // icons still reveal rather than staying stuck in their hidden base state.
  useEffect(() => {
    const el = storyRef.current
    if (!el) return
    const fallback = setTimeout(() => setInView(true), 2500)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setInView(true); clearTimeout(fallback); io.disconnect(); break }
        }
      },
      { threshold: 0 }
    )
    io.observe(el)
    return () => { clearTimeout(fallback); io.disconnect() }
  }, [])

  // Icon reveal is pure CSS: base state is VISIBLE (icons never disappear even
  // if this misfires), and the `is-drawing` class — added below when a phase is
  // active and the section is in view — replays the self-draw + assemble as an
  // enhancement. See .web-story-visual rules in globals.css.

  // Horizontal scroll-snap track, not position:sticky + pinned scroll: the
  // /metodo page's own scroll-telling (sticky media, chapter-rail) has known
  // mobile problems (dynamic browser-toolbar resizing fights position:sticky
  // mid-scroll — the classic iOS Safari failure mode for pinned layouts).
  // Scroll-snap has no such dependency — it's just where native swipe
  // naturally comes to rest — so touch, trackpad and the arrow/segment
  // buttons below all drive the exact same mechanism.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const io = new IntersectionObserver(
      (entries) => {
        if (programmaticRef.current) return
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.6) continue
          const idx = slideRefs.current.findIndex((el) => el === entry.target)
          if (idx !== -1) setActive(idx)
        }
      },
      { root: track, threshold: [0.6] }
    )
    slideRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  // Scroll-snap positions are pixel offsets, so a width change (resize, or a
  // phone rotating) leaves the track scrolled to a stale offset that no
  // longer lines up with any slide boundary — re-snap to whichever slide was
  // actually active, instantly, not a smooth scroll (this is a correction,
  // not a navigation).
  useEffect(() => {
    function onResize() {
      const el = slideRefs.current[activeRef.current]
      if (!el) return
      programmaticRef.current = true
      el.scrollIntoView({ behavior: 'auto', inline: 'start', block: 'nearest' })
      requestAnimationFrame(() => {
        programmaticRef.current = false
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function goTo(i: number) {
    const clamped = Math.max(0, Math.min(TOTAL - 1, i))
    const el = slideRefs.current[clamped]
    if (!el) return
    setActive(clamped)
    // The IO above would otherwise fight this programmatic scroll (it'd see
    // the in-between slides pass threshold and reset `active` mid-transition).
    programmaticRef.current = true
    if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', inline: 'start', block: 'nearest' })
    programmaticTimerRef.current = setTimeout(() => {
      programmaticRef.current = false
    }, 700)
  }

  useEffect(() => () => {
    if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current)
  }, [])

  const step = STEPS[active]

  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="metodo">
      <div className="wrap">
        <div className="sec-head sec-head--solo">
          <div>
            <div className="eyebrow web-eyebrow">il metodo</div>
            {/* data-reveal (fade), non data-kinetic: quest'ultimo riscrive
                l'innerHTML dell'h2 via motion.js e va in conflitto con React
                quando il componente ri-renderizza al cambio fase (errore
                removeChild). Il reveal semplice non tocca l'innerHTML. */}
            <h2 className="hero-type" data-reveal="" style={{ marginTop: 16 }}>
              Come lavoriamo
            </h2>
          </div>
        </div>

        <div className="web-story" data-reveal="" ref={storyRef}>
          <div className="web-story-rail" role="tablist" aria-label="Fasi del metodo">
            {STEPS.map((s, i) => (
              <button
                key={s.idx}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${s.idx} ${s.title}`}
                className={`web-story-seg${i <= active ? ' filled' : ''}${i === active ? ' current' : ''}`}
                style={{ '--seg': PHASE_COLORS[i] } as CSSProperties}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <div className="web-story-track" ref={trackRef} data-lenis-prevent>
            {STEPS.map((s, i) => (
              <div className="web-story-slide" key={s.idx} ref={(el) => { slideRefs.current[i] = el }}>
                <div className="web-story-text">
                  <span className="web-story-idx" aria-hidden="true" style={{ color: PHASE_COLORS[i] }}>{s.idx}</span>
                  <h3 className="h3 web-story-title">{s.label ?? s.title}</h3>
                  {s.body.map((p, pi) => (
                    <p className="body text-pretty" key={pi}>{p}</p>
                  ))}
                </div>
                <div
                  className={`web-story-visual${active === i && inView ? ' is-drawing' : ''}`}
                  style={{ color: PHASE_COLORS[i] }}
                >
                  <s.Icon />
                </div>
              </div>
            ))}
          </div>

          <div className="web-story-nav">
            <button
              type="button"
              className="web-story-arrow"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Fase precedente"
            >
              ←
            </button>
            <span className="mono-xs web-story-count">{step.idx} / {String(TOTAL).padStart(2, '0')}</span>
            <button
              type="button"
              className="web-story-arrow"
              onClick={() => goTo(active + 1)}
              disabled={active === TOTAL - 1}
              aria-label="Fase successiva"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
