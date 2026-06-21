'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const PAGE_COLOR: Record<string, string> = {
  home:     '#17130f',
  metodo:   '#c88a1a',
  social:   '#DD5049',
  web:      '#6352F0',
  branding: '#e8442a',
  studio:   '#17130f',
  contatti: '#17130f',
  lavori:   '#17130f',
}

const LIGHT_BG = new Set(['#c88a1a'])

function pageKey(path: string) {
  return path.replace(/^\//, '').split('/')[0] || 'home'
}

export function PageTransition() {
  const pathname   = usePathname()
  const router     = useRouter()
  const ref        = useRef<HTMLDivElement>(null)
  const [word,     setWord]      = useState('')
  const [wordColor, setWordColor] = useState('#f7f4ee')
  const navigating = useRef(false)

  /* Snap overlay to full coverage instantly */
  function show(bg: string) {
    const el = ref.current
    if (!el) return
    el.style.transition    = 'none'
    el.style.background    = bg
    el.style.opacity       = '1'
    el.style.pointerEvents = 'auto'
  }

  /* Fade overlay out: hold briefly, then ease out over 0.85s */
  function hide(delay = 60) {
    setTimeout(() => {
      const el = ref.current
      if (!el) return
      el.style.transition = 'opacity 0.85s cubic-bezier(0.16,1,0.3,1)'
      requestAnimationFrame(() => {
        if (ref.current) ref.current.style.opacity = '0'
      })
      setTimeout(() => {
        if (ref.current) ref.current.style.pointerEvents = 'none'
        setWord('')
      }, 920)
    }, delay)
  }

  /* Entry: show current-page colour, then fade out after a beat */
  useEffect(() => {
    const bg = PAGE_COLOR[pageKey(pathname)] ?? '#17130f'
    show(bg)
    requestAnimationFrame(() => requestAnimationFrame(() => hide(120)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Navigation complete → fade out + reinit motion.js for new page */
  useEffect(() => {
    if (!navigating.current) return
    navigating.current = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).motionReinit?.()
    hide(80)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  /* Click interceptor for data-transition links */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element).closest('a[data-transition]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href.startsWith('#') || a.target === '_blank') return
      e.preventDefault()
      if (navigating.current) return

      const key = pageKey(href)
      const bg  = PAGE_COLOR[key] ?? '#17130f'
      const wt  = a.getAttribute('data-transition-word')
               ?? (key.charAt(0).toUpperCase() + key.slice(1))

      document.documentElement.dataset.page = key
      show(bg)
      setWord(wt)
      setWordColor(LIGHT_BG.has(bg) ? '#17130f' : '#f7f4ee')
      navigating.current = true

      setTimeout(() => router.push(href), 480)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: PAGE_COLOR[pageKey(pathname)] ?? '#17130f',
        opacity: 1,
        pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {word && (
        <span style={{
          fontFamily: 'var(--exp)',
          fontWeight: 700,
          color: wordColor,
          fontSize: 'clamp(2.5rem, 9vw, 7rem)',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
        }}>
          {word}
        </span>
      )}
    </div>
  )
}
