import { NavLinks } from './NavLinks'

export default function Nav() {
  return (
    <nav className="nav" id="nav">
      {/* Plain <a> for home — same-page or full reload, no transition animation needed */}
      <a className="brand" href="/" data-cursor="home">
        Fooody<span className="dot">.</span>
      </a>

      {/* NavLinks is 'use client' for usePathname() active state */}
      <NavLinks />

      {/* Plain <a> so motion.js page-mask fires on click */}
      <a
        className="btn nav-cta"
        href="/contatti"
        data-magnetic="0.35"
        data-transition=""
        data-transition-word="Contatti"
      >
        <span className="btn-label">
          Lavoriamo insieme <span className="arrow">↗</span>
        </span>
      </a>

      {/* Toggle label managed by motion.js initNav() */}
      <button className="nav-toggle" aria-label="Apri menu">
        Menu
      </button>
    </nav>
  )
}
