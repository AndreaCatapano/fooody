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

const LIGHT_BG = new Set(['#c88a1a', '#f7f4ee'])

function pageKey(path: string) {
  return path.replace(/^\//, '').split('/')[0] || 'home'
}

export function PageTransition() {
  const pathname   = usePathname()
  const router     = useRouter()
  const [visible,  setVisible] = useState(true)
  const [color,    setColor]   = useState(() => PAGE_COLOR[pageKey(pathname)] ?? '#17130f')
  const [word,     setWord]    = useState('')
  const navigating = useRef(false)

  /* Entry animation: fade out on first paint */
  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(false)))
  }, [])

  /* Navigation complete: fade out overlay */
  useEffect(() => {
    if (!navigating.current) return
    navigating.current = false
    const t = setTimeout(() => setVisible(false), 80)
    return () => clearTimeout(t)
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
      setColor(bg)
      setWord(wt)
      setVisible(true)
      navigating.current = true

      setTimeout(() => router.push(href), 480)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: color,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: visible
          ? 'opacity 0.35s cubic-bezier(0.65,0,0.35,1)'
          : 'opacity 0.6s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {word && (
        <span style={{
          fontFamily: 'var(--exp)',
          fontWeight: 700,
          color: LIGHT_BG.has(color) ? '#17130f' : '#f7f4ee',
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
