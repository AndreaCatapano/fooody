'use client'
import { useEffect } from 'react'

export default function DevicePreview() {
  useEffect(() => {
    const stage = document.getElementById('preview-stage')
    const sizeEl = document.getElementById('vp-size')
    const sizes: Record<string, string> = { desktop: '1280 × 800', tablet: '768 × 1024', mobile: '390 × 844' }
    const btns = document.querySelectorAll<HTMLButtonElement>('.vp-btn')
    const handlers = new Map<Element, () => void>()

    btns.forEach(btn => {
      const handler = () => {
        btns.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected', 'false') })
        btn.classList.add('active')
        btn.setAttribute('aria-selected', 'true')
        const vp = btn.getAttribute('data-vp') || 'desktop'
        stage?.classList.remove('is-tablet', 'is-mobile')
        if (vp === 'tablet') stage?.classList.add('is-tablet')
        if (vp === 'mobile') stage?.classList.add('is-mobile')
        if (sizeEl) sizeEl.textContent = sizes[vp]
      }
      handlers.set(btn, handler)
      btn.addEventListener('click', handler)
    })

    return () => { handlers.forEach((h, btn) => btn.removeEventListener('click', h)) }
  }, [])

  return (
    <div className="preview-wrap" data-reveal="">
      <div className="preview-toolbar" role="tablist" aria-label="Scegli dispositivo">
        <div className="vp-seg">
          <button className="vp-btn active" data-vp="desktop" role="tab" aria-selected="true">
            <span className="vp-icon">
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                <rect x=".5" y=".5" width="13" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5 10h4M7 8.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </span>
            Desktop
          </button>
          <button className="vp-btn" data-vp="tablet" role="tab" aria-selected="false">
            <span className="vp-icon">
              <svg width="9" height="12" viewBox="0 0 9 12" fill="none">
                <rect x=".5" y=".5" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="4.5" cy="10" r=".7" fill="currentColor"/>
              </svg>
            </span>
            Tablet
          </button>
          <button className="vp-btn" data-vp="mobile" role="tab" aria-selected="false">
            <span className="vp-icon">
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <rect x=".5" y=".5" width="6" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="3.5" cy="10" r=".7" fill="currentColor"/>
                <path d="M2.5 2h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </span>
            Mobile
          </button>
        </div>
        <span className="vp-size mono-xs" id="vp-size">1280 × 800</span>
      </div>

      <div className="preview-stage" id="preview-stage">
        <div className="browser" id="browser">
          <div className="browser-bar">
            <span className="browser-dots"><i /><i /><i /></span>
            <span className="browser-url mono-xs">fooody.it / cliente</span>
            <span className="browser-reload" aria-hidden="true">⟳</span>
          </div>
          <div className="browser-view">
            {/* TODO: sostituire con screenshot sito reale cliente */}
            <div className="mock">
              <div className="mock-nav">
                <span className="mock-logo">Marca<i>.</i></span>
                <span className="mock-links"><b /><b /><b /></span>
                <span className="mock-cta">Ordina</span>
              </div>
              <div className="mock-hero">
                <div className="mock-hero-txt">
                  <span className="mock-eyebrow">// menù di stagione</span>
                  <span className="mock-h1">Il gusto<br />a domicilio.</span>
                  <span className="mock-sub-txt">Ingredienti freschi, consegna in 30 minuti.</span>
                  <div className="mock-btns">
                    <span className="mock-btn">Prenota un tavolo</span>
                    <span className="mock-b-ghost">Sfoglia il menù</span>
                  </div>
                </div>
                <div className="mock-hero-img" />
              </div>
              <div className="mock-features">
                <div className="mock-feat"><span className="mock-feat-ic">✦</span><span className="mock-feat-lbl">Ingredienti km0</span></div>
                <div className="mock-feat"><span className="mock-feat-ic">✦</span><span className="mock-feat-lbl">Consegna 30min</span></div>
                <div className="mock-feat"><span className="mock-feat-ic">✦</span><span className="mock-feat-lbl">Prenota online</span></div>
              </div>
              <div className="mock-cards-head">
                <span className="mock-section-lbl">// i nostri piatti</span>
                <span className="mock-tlink">vedi tutti →</span>
              </div>
              <div className="mock-cards">
                <div className="mock-card" /><div className="mock-card" />
                <div className="mock-card" /><div className="mock-card" />
              </div>
              <div className="mock-footer">
                <span className="mock-logo" style={{ fontSize: '.6rem' }}>Marca<i>.</i></span>
                <span className="mock-footer-links"><b /><b /><b /><b /></span>
                <span className="mock-footer-copy">© 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="web-stats" data-reveal="">
        <div className="web-stat">
          <span className="numeral" data-count="0.9" data-suf="s">0</span>
          <span className="mono-xs">caricamento medio</span>
        </div>
        <div className="web-stat">
          <span className="numeral" data-count="98" data-suf="/100">0</span>
          <span className="mono-xs">performance score</span>
        </div>
        <div className="web-stat">
          <span className="numeral" data-count="2" data-suf=" step">0</span>
          <span className="mono-xs">al checkout</span>
        </div>
        <div className="web-stat">
          <span className="numeral" data-count="100" data-suf="%">0</span>
          <span className="mono-xs">responsive &amp; accessibile</span>
        </div>
      </div>
    </div>
  )
}
