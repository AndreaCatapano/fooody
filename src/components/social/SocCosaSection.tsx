'use client'
import { useEffect, useRef, useState } from 'react'

const PUNTI = [
  { n: 1, pa: 'var(--tomato)',      title: 'Strategia & posizionamento', sub: 'prima il perché, poi il post', desc: 'Tono di voce, pilastri di contenuto, calendario. Decidiamo cosa dire e a chi, prima di accendere la fotocamera.', chips: ['Audit', 'Tone of voice', 'Piano editoriale'], like: '12.4k' },
  { n: 2, pa: 'var(--tomato-deep)', title: 'Content & format', sub: 'il contenuto che ferma il pollice', desc: 'Food photography, grafiche, copertine, copy. Format riconoscibili che diventano la firma del brand sul feed.', chips: ['Foto', 'Grafica', 'Copywriting'], like: '8.9k' },
  { n: 3, pa: 'var(--tomato)',      title: 'Reels & UGC', sub: 'il motore della crescita organica', desc: 'Riprese, montaggio, trend. Più creator e clienti che parlano di te: il contenuto che gira senza spingere a pagamento.', chips: ['Video', 'Montaggio', 'Creator'], like: '1.3M' },
  { n: 4, pa: 'var(--tomato-deep)', title: 'ADV & performance', sub: 'quando serve spingere, spingiamo bene', desc: 'Campagne Meta e TikTok con budget che rende. Targeting e creatività testate, ottimizzazione settimanale sul costo per risultato.', chips: ['Meta ADV', 'TikTok ADS', 'A/B test'], like: '880k' },
  { n: 5, pa: 'var(--tomato)',      title: 'Community & report', sub: 'le persone, non i follower', desc: 'Gestione DM e commenti, moderazione, report mensile con i numeri che contano davvero.', chips: ['Community', 'Moderazione', 'Report'], like: '4.1k' },
]

export default function SocCosaSection() {
  const [active, setActive] = useState(1)
  const sectionRef = useRef<HTMLElement>(null)
  const puntiNavRef = useRef<HTMLElement>(null)
  const N = PUNTI.length
  const p = PUNTI[active - 1]

  useEffect(() => {
    const nav = puntiNavRef.current
    if (!nav || window.matchMedia('(min-width: 880px)').matches) return
    const btn = nav.querySelector<HTMLElement>(`[data-punto="${active}"]`)
    if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (!window.matchMedia('(min-width: 860px)').matches) return

    let rafId: number
    let last = -1

    function update() {
      const rect = section!.getBoundingClientRect()
      const total = section!.offsetHeight - window.innerHeight
      if (total > 0) {
        const scrolled = Math.max(0, Math.min(total, -rect.top))
        const next = Math.min(N, Math.floor((scrolled / total) * N) + 1)
        if (next !== last) { last = next; setActive(next) }
      }
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [N])

  return (
    <section
      ref={sectionRef}
      className="soc-cosa-scroll"
      id="cosa"
      data-bg="paper"
      style={{ height: `calc(${N} * 58svh)` }}
    >
      <div className="soc-cosa-sticky">
      <div className="soc-cosa-inner">
        <div className="soc-cosa-left">
          <div className="soc-cosa-head">
            <div className="eyebrow no-slash soc-accent-fg">— cosa facciamo</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 14, color: 'var(--ink)' }}>
              Cinque mosse.<br />Un solo feed.
            </h2>
          </div>
          <nav className="soc-punti" ref={puntiNavRef} role="tablist" aria-label="Servizi social">
            {PUNTI.map(pt => (
              <button
                key={pt.n}
                className={`soc-punto${active === pt.n ? ' active' : ''}`}
                data-punto={pt.n}
                role="tab"
                aria-selected={active === pt.n}
                onClick={() => setActive(pt.n)}
              >
                <span className="soc-punto-idx">0{pt.n}</span>
                <div className="soc-punto-body">
                  <span className="soc-punto-title">{pt.title}</span>
                  <span className="soc-punto-sub">{pt.sub}</span>
                </div>
                <span className="soc-punto-arrow">↗</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="soc-cosa-right">
          <div className="soc-reel-phone" role="img" aria-label="Anteprima reel social">
            <div className="soc-reel-status">
              <span className="soc-reel-time">09:41</span>
              <div className="soc-reel-signal" aria-hidden="true"><i /><i /><i /></div>
            </div>
            <div className="soc-reel-content">
              {PUNTI.map(pt => (
                <div
                  key={pt.n}
                  className={`soc-reel-panel${active === pt.n ? ' active' : ''}`}
                  data-panel={pt.n}
                  style={{ '--pa': pt.pa } as React.CSSProperties}
                >
                  <div className="soc-reel-user-bar">
                    <div className="soc-reel-av">F</div>
                    <span className="soc-reel-un">@fooody</span>
                    <span className="soc-reel-fw">Segui</span>
                  </div>
                  <div className="soc-reel-spacer" />
                  <div className="soc-reel-bignum">0{pt.n}</div>
                  <div className="soc-reel-txt">
                    <strong>{pt.title}</strong>
                    <p>{pt.desc}</p>
                  </div>
                  <div className="soc-reel-pchips">
                    {pt.chips.map(c => <span key={c} className="chip">{c}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="soc-reel-actions" aria-hidden="true">
              <div className="soc-reel-act">
                <span className="soc-act-icon">♥</span>
                <span className="soc-act-lbl">{p.like}</span>
              </div>
              <div className="soc-reel-act"><span className="soc-act-icon">✦</span><span className="soc-act-lbl">Invia</span></div>
              <div className="soc-reel-act"><span className="soc-act-icon">⋯</span></div>
            </div>
            <div className="soc-reel-bottom" aria-hidden="true">
              <span className="soc-rbot">⌂</span>
              <span className="soc-rbot">◎</span>
              <span className="soc-rbot soc-rbot-plus">＋</span>
              <span className="soc-rbot soc-rbot-on">▶</span>
              <span className="soc-rbot">⬡</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
