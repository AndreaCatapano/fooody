'use client'
import { useEffect } from 'react'

const BRANDS = [
  {
    name: 'Pomo', dot: '#DD5049', tag: 'Sugo come una volta', cat: 'conserve artigianali',
    sw: [['#DD5049', '#DD5049'], ['#EFB44F', '#EFB44F'], ['#17130f', 'ink']],
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(221,80,73,.34), transparent 60%)',
  },
  {
    name: 'Cru', dot: '#6352F0', tag: 'Vino senza etichetta', cat: 'cantina urbana',
    sw: [['#6352F0', '#6352F0'], ['#17130f', 'ink'], ['#f7f4ee', 'paper']],
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(99,82,240,.34), transparent 60%)',
  },
  {
    name: 'Mielo', dot: '#EFB44F', tag: 'Dolce di mestiere', cat: 'pasticceria',
    sw: [['#EFB44F', '#EFB44F'], ['#DD5049', '#DD5049'], ['#fdf3e0', 'soft']],
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(239,180,79,.40), transparent 60%)',
  },
  {
    name: 'Brace', dot: '#DD5049', tag: 'Fuoco e niente fronzoli', cat: 'griglieria',
    sw: [['#17130f', 'ink'], ['#DD5049', '#DD5049'], ['#EFB44F', '#EFB44F']],
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(221,80,73,.30), transparent 55%)',
  },
  {
    name: 'Orto', dot: '#6352F0', tag: 'Dal campo, oggi', cat: 'box di stagione',
    sw: [['#EFB44F', '#EFB44F'], ['#6352F0', '#6352F0'], ['#17130f', 'ink']],
    pack: 'radial-gradient(120% 80% at 50% 30%, rgba(239,180,79,.30), transparent 60%)',
  },
]

export default function BrandBoard() {
  useEffect(() => {
    let i = 0
    const card = document.getElementById('board-card')
    const nameEl = document.getElementById('b-name')
    const dotEl = document.getElementById('b-dot')
    const tagEl = document.getElementById('b-tag')
    const catEl = document.getElementById('b-cat')
    const swEl = document.getElementById('b-swatches')
    const packEl = document.getElementById('b-pack') as HTMLElement | null
    const btn = document.getElementById('b-regen')

    function render(b: typeof BRANDS[0]) {
      if (nameEl) { (nameEl.childNodes[0] as Text).textContent = b.name }
      if (dotEl) { dotEl.style.color = b.dot }
      if (tagEl) { tagEl.textContent = b.tag }
      if (catEl) { catEl.textContent = b.cat }
      if (swEl) {
        swEl.innerHTML = b.sw.map(s =>
          `<span class="board-sw" style="background:${s[0]}"><i class="mono-xs">${s[1]}</i></span>`
        ).join('')
      }
      if (packEl) { packEl.style.setProperty('--pack-grad', b.pack) }
    }

    let handler: (() => void) | null = null
    if (btn) {
      handler = () => {
        i = (i + 1) % BRANDS.length
        card?.classList.add('is-shuffling')
        setTimeout(() => { render(BRANDS[i]); card?.classList.remove('is-shuffling') }, 180)
      }
      btn.addEventListener('click', handler)
    }

    return () => { if (btn && handler) btn.removeEventListener('click', handler) }
  }, [])

  return (
    <div className="board" data-reveal="" id="board-card">
      <div className="board-tile board-wordmark">
        <span className="mono-xs board-cap">wordmark</span>
        <span className="board-logo" id="b-name">Pomo<span className="board-dot" id="b-dot" style={{ color: '#DD5049' }}>.</span></span>
        <span className="board-tagline mono" id="b-tag">Sugo come una volta</span>
      </div>
      <div className="board-tile board-palette">
        <span className="mono-xs board-cap">palette</span>
        <div className="board-swatches" id="b-swatches">
          <span className="board-sw" style={{ background: '#DD5049' }}><i className="mono-xs">#DD5049</i></span>
          <span className="board-sw" style={{ background: '#EFB44F' }}><i className="mono-xs">#EFB44F</i></span>
          <span className="board-sw" style={{ background: '#17130f' }}><i className="mono-xs">ink</i></span>
        </div>
      </div>
      <div className="board-tile board-type">
        <span className="mono-xs board-cap">tipografia</span>
        <span className="board-type-big">Aa</span>
        <span className="board-type-meta mono-xs">Mont · grottesca</span>
      </div>
      <div className="board-tile board-pack">
        <span className="mono-xs board-cap">packaging</span>
        {/* TODO: sostituire con mockup packaging reale */}
        <div className="board-pack-mock ph" id="b-pack"><span className="ph-label">mockup · etichetta</span></div>
      </div>
      <div className="board-tile board-ctrl">
        <span className="mono-xs board-cap">settore</span>
        <span className="board-cat" id="b-cat">conserve artigianali</span>
        <button className="btn brand-btn board-regen" id="b-regen" data-magnetic="0.2">
          <span className="btn-label">Rigenera <span className="arrow">↻</span></span>
        </button>
      </div>
    </div>
  )
}
