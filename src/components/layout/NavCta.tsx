'use client'
import { usePathname } from 'next/navigation'

/* Nav CTA adopts each page's identity color (hover always goes to ink) —
   pages without their own color (home, chi-siamo, contatti) fall back to
   plain tomato-deep accent. Reads the route directly via usePathname()
   instead of the html[data-page] attribute: that attribute is set by a
   beforeInteractive script that currently never runs (separate known bug),
   so it can't be trusted here. */
const CTA_CLASS_BY_SECTION: Record<string, string> = {
  metodo: 'btn met-btn nav-cta',
  social: 'btn accent nav-cta',
  web: 'btn web-btn nav-cta',
  branding: 'btn brand-gradient nav-cta',
  'chi-siamo': 'btn accent nav-cta',
}

const DEFAULT_CTA_CLASS = 'btn accent nav-cta'

export function NavCta() {
  const pathname = usePathname()
  const section = pathname.replace(/^\//, '').split('/')[0]
  const className = CTA_CLASS_BY_SECTION[section] ?? DEFAULT_CTA_CLASS

  return (
    <a
      className={className}
      href="/contatti"
      data-magnetic="0.35"
      data-transition=""
      data-transition-word="Contatti"
    >
      <span className="btn-label">
        Lavoriamo insieme <span className="arrow">↗</span>
      </span>
    </a>
  )
}
