import { FeedMarquee } from '@/components/social/FeedMarquee'

export default function SocFeedSection() {
  return (
    <section className="section ink-region" data-bg="ink" id="feed" data-sig="">
      <div className="wrap">
        <div className="soc-feed-head">
          <div className="soc-feed-lede">
            <div className="eyebrow no-slash">
              <span className="soc-live-dot" aria-hidden="true" />
              <span className="soc-accent-fg">il feed che fa scegliere</span>
            </div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16, color: 'var(--paper)' }}>
              Non semplici video<br />da mostrare.<br />Risultati da guardare.
            </h2>
          </div>
          <div className="soc-live soc-live-feed" data-reveal="" data-reveal-d="2">
            <div className="soc-live-item">
              <span className="numeral soc-live-num" data-count="5" data-suf="M">0</span>
              <span className="mono-xs">views reel top</span>
            </div>
            <div className="soc-live-item">
              <span className="numeral soc-live-num" data-count="28" data-pre="+" data-suf="k">0</span>
              <span className="mono-xs">community in 4 mesi</span>
            </div>
            <div className="soc-live-item">
              <span className="numeral soc-live-num" data-count="340" data-pre="+" data-suf="%">0</span>
              <span className="mono-xs">engagement medio</span>
            </div>
            <div className="soc-live-item">
              <span className="numeral soc-live-num" data-count="12" data-suf="/mese">0</span>
              <span className="mono-xs">contenuti</span>
            </div>
          </div>
        </div>
      </div>

      <FeedMarquee />
    </section>
  )
}
