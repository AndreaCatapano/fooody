import { NavLinks } from './NavLinks'
import { NavCta } from './NavCta'

export default function Nav() {
  return (
    <nav className="nav" id="nav">
      {/* Plain <a> for home — same-page or full reload, no transition animation needed */}
      <a className="brand" href="/" data-cursor="home">
        fooody<span className="dot">.</span>
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
