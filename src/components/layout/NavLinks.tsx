'use client'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Metodo',   href: '/metodo',   word: 'Metodo' },
  { label: 'Social',   href: '/social',   word: 'Social' },
  { label: 'Web',      href: '/web',      word: 'Web' },
  { label: 'Branding', href: '/branding', word: 'Branding' },
  { label: 'Studio',   href: '/studio',   word: 'Studio' },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="nav-links">
      {NAV_ITEMS.map((item) => (
        /* Plain <a> ensures full-page reload so motion.js page-mask animation works correctly */
        <a
          key={item.href}
          className={`nav-link${pathname === item.href ? ' active' : ''}`}
          href={item.href}
          data-transition=""
          data-transition-word={item.word}
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}
