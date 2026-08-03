'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { TESTIMONIANZE } from '@/lib/testimonianze'

// Metà della durata della transizione CSS (.stu-quote-content), usata per
// sincronizzare il momento in cui il contenuto viene sostituito col crossfade.
const SWAP_DELAY_MS = 220
const AUTOPLAY_MS = 7000

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function StuTestimonianza() {
  const total = TESTIMONIANZE.length
  const isCarousel = total > 1

  const [index, setIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  // Rispecchia hasInteractedRef in stato React solo per pilotare la UI del
  // bottone di stop esplicito (WCAG 2.2.2): la logica di autoplay resta
  // gestita dal ref, questo stato serve solo a disabilitare/etichettare
  // il bottone una volta che l'autoplay è già stato fermato in qualsiasi modo.
  const [autoplayStopped, setAutoplayStopped] = useState(false)
  const hasInteractedRef = useRef(false)
  const swapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartXRef = useRef<number | null>(null)

  const goTo = useCallback(
    (nextIndex: number) => {
      if (!isCarousel) return
      const n = ((nextIndex % total) + total) % total
      if (n === index || isChanging) return
      setIsChanging(true)
      if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current)
      swapTimeoutRef.current = setTimeout(() => {
        setIndex(n)
        setIsChanging(false)
      }, SWAP_DELAY_MS)
    },
    [index, isChanging, isCarousel, total]
  )

  const markInteracted = useCallback(() => {
    hasInteractedRef.current = true
    setAutoplayStopped(true)
  }, [])

  // Autoplay: solo con più recensioni, mai se l'utente ha già interagito
  // e mai se l'utente preferisce ridurre le animazioni.
  useEffect(() => {
    if (!isCarousel) return
    if (hasInteractedRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = setTimeout(() => {
      if (!hasInteractedRef.current) goTo(index + 1)
    }, AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [index, isCarousel, goTo])

  useEffect(() => {
    return () => {
      if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current)
    }
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isCarousel) return
    touchStartXRef.current = e.touches[0].clientX
    markInteracted()
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isCarousel || touchStartXRef.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartXRef.current
    touchStartXRef.current = null
    if (Math.abs(delta) < 50) return
    goTo(delta < 0 ? index + 1 : index - 1)
  }

  const current = TESTIMONIANZE[index]
  const metaBlock = (
    <div className="stu-quote-meta">
      <span className="h3 stu-quote-name">{current.name}</span>
      <span className="mono-xs" style={{ color: 'var(--ink-3)', marginTop: 4 }}>
        {current.attivita}
      </span>
    </div>
  )

  return (
    <section
      className="section section-paper-fixed"
      data-bg="paper"
      id="quote"
      onMouseEnter={markInteracted}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="wrap">
        <blockquote className="stu-quote" aria-live="polite">
          {isCarousel && (
            <span className="idx stu-quote-idx" aria-hidden="true">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          )}
          <div className={`stu-quote-content${isChanging ? ' is-changing' : ''}`}>
            <span className="stu-quote-mark" aria-hidden="true">&ldquo;</span>
            <p className="stu-quote-text">{current.quote}</p>
            <footer className="stu-quote-foot">
              {isCarousel ? (
                <div className="stu-quote-namerow">
                  <span className="stu-quote-avatar ph" aria-hidden="true">
                    {initials(current.name)}
                  </span>
                  {metaBlock}
                </div>
              ) : (
                metaBlock
              )}
              {current.kpis && current.kpis.length > 0 && (
                <div className="stu-quote-kpis">
                  {current.kpis.map((kpi) => (
                    <div className="stu-quote-kpi" key={kpi.label}>
                      <span
                        className="numeral"
                        style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: kpi.color }}
                      >
                        {kpi.value}
                      </span>
                      <span className="mono-xs">{kpi.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </footer>
          </div>
        </blockquote>

        {isCarousel && (
          <div className="stu-quote-nav">
            <button
              type="button"
              className="stu-quote-arrow"
              aria-label={
                autoplayStopped
                  ? 'Rotazione automatica delle recensioni interrotta'
                  : 'Interrompi la rotazione automatica delle recensioni'
              }
              aria-pressed={autoplayStopped}
              onClick={markInteracted}
              disabled={autoplayStopped}
            >
              <span className="arrow" aria-hidden="true">
                ❚❚
              </span>
            </button>
            <button
              type="button"
              className="stu-quote-arrow"
              aria-label="Recensione precedente"
              onClick={() => {
                markInteracted()
                goTo(index - 1)
              }}
              onFocus={markInteracted}
            >
              <span className="arrow">←</span>
            </button>
            <div className="stu-quote-dots">
              {TESTIMONIANZE.map((t, i) => (
                <button
                  key={t.name + i}
                  type="button"
                  className={`stu-quote-dot${i === index ? ' active' : ''}`}
                  aria-label={`Vai alla recensione ${i + 1} di ${total}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => {
                    markInteracted()
                    goTo(i)
                  }}
                  onFocus={markInteracted}
                />
              ))}
            </div>
            <button
              type="button"
              className="stu-quote-arrow"
              aria-label="Recensione successiva"
              onClick={() => {
                markInteracted()
                goTo(index + 1)
              }}
              onFocus={markInteracted}
            >
              <span className="arrow">→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
