import HeroLcpAnchor from './HeroLcpAnchor'

export default function HomeHero() {
  return (
    <header className="hero100 mode-particelle" id="hero" data-bg="paper">
      <div className="hero-stage">

        {/* LCP anchor: carica un img leggero per dare a Chrome un LCP candidate rapido
            (~200ms) invece del canvas che si assembla in ~5s. Si auto-rimuove dal DOM
            dopo il caricamento così non pesa sull'animazione. */}
        <HeroLcpAnchor />

        <div
          className="hero-vid ph on-ink video"
          id="hero-vid"
          data-cursor="play"
          data-placeholder="video · presentazione · 40&quot;"
        >
          <span className="ph-label" style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
            video · presentazione · 40&quot;
          </span>
        </div>

        <svg
          className="hero-knockout"
          id="hero-knockout"
          width="100%"
          height="100%"
          aria-hidden="true"
        >
          <defs>
            <mask id="foody-mask">
              <rect className="kn-fill" x="0" y="0" width="100%" height="100%" fill="#fff" />
              <text
                id="foody-text"
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000"
                fontWeight="700"
                style={{ fontFamily: 'var(--font-mont), Helvetica, Arial, sans-serif' }}
              >
                Fooody
              </text>
            </mask>
          </defs>
          <rect className="kn-bg" x="0" y="0" width="100%" height="100%" mask="url(#foody-mask)" />
        </svg>

        <h1 className="visually-hidden">Fooody — agenzia creativa food</h1>

        <div className="hero-paper" id="hero-paper" aria-hidden="true" />
        <canvas className="hero-particles" id="hero-particles" aria-hidden="true" />

        <div className="hero-cap" data-reveal="fade">
          <span className="mono-xs">agenzia creativa · food &amp; dintorni</span>
        </div>

        <div className="hero-eyebrow" data-reveal="fade">
          <span className="eyebrow">agenzia creativa · food &amp; dintorni</span>
        </div>

        <a className="hero-scroll" href="#manifesto" data-reveal="" data-reveal-d="3">
          <span className="mono-xs">scroll</span>
          <span className="hero-scroll-arrow">↓</span>
        </a>
      </div>
    </header>
  )
}
