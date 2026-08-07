import { NavLinks } from './NavLinks'
import { NavCta } from './NavCta'

export default function Nav() {
  return (
    <nav className="nav" id="nav">
      {/* Plain <a> for home — same-page or full reload, no transition animation needed.
          Logo via CSS mask + currentColor so it flips ink/paper with the nav's
          on-ink state, exactly like the old text brand did. */}
      <a className="brand" href="/" data-cursor="home" aria-label="Fooody — home">
        <span className="brand-logo" aria-hidden="true" />
      </a>

      {/* NavLinks is 'use client' for usePathname() active state */}
      <NavLinks />

      {/* NavCta is 'use client' too — picks the page's identity color via usePathname() */}
      <NavCta />

      {/* Toggle label managed by motion.js initNav() */}
      <button className="nav-toggle" aria-label="Apri menu">
        Menu
      </button>
    </nav>
  )
}
