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
        <button className="vp-btn active" data-vp="desktop" role="tab" aria-selected="true">Desktop</button>
        <button className="vp-btn" data-vp="tablet" role="tab" aria-selected="false">Tablet</button>
        <button className="vp-btn" data-vp="mobile" role="tab" aria-selected="false">Mobile</button>
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
                  <span className="mock-btn">Prenota un tavolo</span>
                </div>
                <div className="mock-hero-img" />
              </div>
              <div className="mock-cards">
                <div className="mock-card" /><div className="mock-card" />
                <div className="mock-card" /><div className="mock-card" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
