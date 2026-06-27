'use client'
import { useEffect } from 'react'

type Brand = {
  name: string
  sep: string
  sepColor: string
  font: string
  weight: number
  tracking: string
  upper: boolean
  fontStyle?: string
  tag: string
  cat: string
  typeMeta: string
  sw: [string, string, string][]
  band: string
  pack: string
}

const BRANDS: Brand[] = [
  {
    name: 'Pomo', sep: '.', sepColor: '#DD5049',
    font: "'Mont','Helvetica Neue',Helvetica,Arial,sans-serif", weight: 700, tracking: '-.04em', upper: false,
    tag: 'Sugo come una volta', cat: 'conserve artigianali', typeMeta: 'Mont · grottesca calda',
    sw: [['#DD5049', '#DD5049', 'primario'], ['#EFB44F', '#EFB44F', 'accento'], ['#17130f', 'ink', 'testo']],
    band: '#DD5049',
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(221,80,73,.3), transparent 60%)',
  },
  {
    name: 'Cru', sep: '·', sepColor: '#6352F0',
    font: "'Cormorant Garamond','Georgia',serif", weight: 600, tracking: '.06em', upper: true, fontStyle: 'italic',
    tag: 'Vino senza etichetta', cat: 'cantina urbana', typeMeta: 'Cormorant · serif elegante',
    sw: [['#6352F0', '#6352F0', 'primario'], ['#17130f', 'ink', 'testo'], ['#f7f4ee', 'paper', 'fondo']],
    band: '#6352F0',
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(99,82,240,.3), transparent 60%)',
  },
  {
    name: 'Mielo', sep: '.', sepColor: '#EFB44F',
    font: "'Playfair Display','Georgia',serif", weight: 800, tracking: '-.02em', upper: false,
    tag: 'Dolce di mestiere', cat: 'pasticceria', typeMeta: 'Playfair · display serif',
    sw: [['#EFB44F', '#EFB44F', 'primario'], ['#DD5049', '#DD5049', 'accento'], ['#fdf3e0', 'soft', 'fondo']],
    band: '#EFB44F',
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(239,180,79,.40), transparent 60%)',
  },
  {
    name: 'Brace', sep: '.', sepColor: '#DD5049',
    font: "'Anton','Impact',sans-serif", weight: 400, tracking: '.02em', upper: true,
    tag: 'Fuoco e niente fronzoli', cat: 'griglieria', typeMeta: 'Anton · display condensed',
    sw: [['#17130f', 'ink', 'testo'], ['#DD5049', '#DD5049', 'primario'], ['#EFB44F', '#EFB44F', 'accento']],
    band: '#DD5049',
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(221,80,73,.30), transparent 55%)',
  },
  {
    name: 'Orto', sep: '.', sepColor: '#EFB44F',
    font: "'Space Grotesk','Helvetica Neue',sans-serif", weight: 500, tracking: '-.01em', upper: false,
    tag: 'Dal campo, oggi', cat: 'box di stagione', typeMeta: 'Space Grotesk · grottesca',
    sw: [['#EFB44F', '#EFB44F', 'primario'], ['#6352F0', '#6352F0', 'accento'], ['#17130f', 'ink', 'testo']],
    band: '#EFB44F',
    pack: 'radial-gradient(120% 80% at 50% 30%, rgba(239,180,79,.30), transparent 60%)',
  },
  {
    name: 'Forno', sep: '.', sepColor: '#3d3d3d',
    font: "'Spectral','Georgia',serif", weight: 600, tracking: '-.02em', upper: false,
    tag: 'Pane come si deve', cat: 'panificio', typeMeta: 'Spectral · serif classico',
    sw: [['#17130f', 'ink', 'primario'], ['#EFB44F', '#EFB44F', 'accento'], ['#f7f4ee', 'paper', 'fondo']],
    band: '#17130f',
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(23,19,15,.5), transparent 60%)',
  },
  {
    name: 'Tosto', sep: '.', sepColor: '#DD5049',
    font: "'Syne','Helvetica Neue',sans-serif", weight: 800, tracking: '-.03em', upper: false,
    tag: 'Caffè senza compromessi', cat: 'torrefazione', typeMeta: 'Syne · display geometrico',
    sw: [['#DD5049', '#DD5049', 'primario'], ['#17130f', 'ink', 'testo'], ['#EFB44F', '#EFB44F', 'accento']],
    band: '#DD5049',
    pack: 'radial-gradient(120% 80% at 55% 25%, rgba(221,80,73,.35), transparent 60%)',
  },
  {
    name: 'Onda', sep: '.', sepColor: '#6352F0',
    font: "'Instrument Serif','Georgia',serif", weight: 400, tracking: '0em', upper: false,
    tag: 'Dal mare, freschi', cat: 'pescheria', typeMeta: 'Instrument · serif morbido',
    sw: [['#6352F0', '#6352F0', 'primario'], ['#17130f', 'ink', 'testo'], ['#f0eefc', 'soft', 'fondo']],
    band: '#6352F0',
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(99,82,240,.3), transparent 60%)',
  },
  {
    name: 'Gelo', sep: '.', sepColor: '#6352F0',
    font: "'Unbounded','Helvetica Neue',sans-serif", weight: 600, tracking: '-.02em', upper: false,
    tag: 'Gelato autentico', cat: 'gelateria', typeMeta: 'Unbounded · display tecnico',
    sw: [['#6352F0', '#6352F0', 'primario'], ['#DD5049', '#DD5049', 'accento'], ['#f7f4ee', 'paper', 'fondo']],
    band: '#6352F0',
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(99,82,240,.3), transparent 60%)',
  },
  {
    name: 'Mola', sep: '.', sepColor: '#DD5049',
    font: "'Bricolage Grotesque','Helvetica Neue',sans-serif", weight: 700, tracking: '-.03em', upper: false,
    tag: 'Pasta fresca ogni giorno', cat: 'pastificio', typeMeta: 'Bricolage · grottesca',
    sw: [['#DD5049', '#DD5049', 'primario'], ['#EFB44F', '#EFB44F', 'accento'], ['#17130f', 'ink', 'testo']],
    band: '#DD5049',
    pack: 'radial-gradient(120% 80% at 60% 30%, rgba(221,80,73,.3), transparent 60%)',
  },
]

const FONT_SPECS = [
  '700 1em "Mont"',
  '600 1em "Cormorant Garamond"',
  '800 1em "Playfair Display"',
  '400 1em "Anton"',
  '500 1em "Space Grotesk"',
  '600 1em "Spectral"',
  '800 1em "Syne"',
  '400 1em "Instrument Serif"',
  '600 1em "Unbounded"',
  '700 1em "Bricolage Grotesque"',
]

export default function BrandBoard() {
  useEffect(() => {
    let idx = 0

    const board  = document.getElementById('bb-board')
    const numEl  = document.getElementById('bb-num') as HTMLElement | null
    const logoEl = document.getElementById('bb-logo') as HTMLElement | null
    const dotEl  = document.getElementById('bb-dot') as HTMLElement | null
    const tagEl  = document.getElementById('bb-tag') as HTMLElement | null
    const swEl   = document.getElementById('bb-swatches') as HTMLElement | null
    const typBig = document.getElementById('bb-typebig') as HTMLElement | null
    const typMet = document.getElementById('bb-typemeta') as HTMLElement | null
    const packEl = document.getElementById('bb-pack') as HTMLElement | null
    const bandEl = document.getElementById('bb-band') as HTMLElement | null
    const echoEl = document.getElementById('bb-echo') as HTMLElement | null
    const catEl  = document.getElementById('bb-cat') as HTMLElement | null
    const btn    = document.getElementById('bb-btn') as HTMLButtonElement | null

    function applyFont(el: HTMLElement, b: Brand) {
      el.style.fontFamily    = b.font
      el.style.fontWeight    = String(b.weight)
      el.style.letterSpacing = b.tracking
      el.style.textTransform = b.upper ? 'uppercase' : 'none'
      el.style.fontStyle     = b.fontStyle ?? 'normal'
    }

    function render(b: Brand) {
      if (!logoEl || !dotEl || !tagEl || !swEl || !typBig || !typMet || !packEl || !bandEl || !echoEl || !catEl || !numEl) return

      // wordmark
      ;(logoEl.childNodes[0] as Text).textContent = b.name
      applyFont(logoEl, b)
      dotEl.textContent = b.sep
      dotEl.style.color = b.sepColor
      tagEl.textContent = b.tag

      // tipografia
      typBig.style.fontFamily    = b.font
      typBig.style.fontWeight    = String(b.weight)
      typBig.style.letterSpacing = b.upper ? '0' : '-.02em'
      typBig.style.fontStyle     = b.fontStyle ?? 'normal'
      typMet.textContent = b.typeMeta

      // settore
      catEl.textContent = b.cat

      // palette
      swEl.innerHTML = b.sw.map(s =>
        `<span class="sw" style="background:${s[0]}">` +
        `<i>${s[1]}</i>` +
        `<i class="sw-role">${s[2]}</i>` +
        `</span>`
      ).join('')

      // packaging
      packEl.style.setProperty('--pack-grad', b.pack)
      bandEl.style.background = b.band
      echoEl.textContent = b.name + b.sep
      applyFont(echoEl, b)
      echoEl.style.color = '#fff'

      // counter color segue sepColor del brand
      numEl.style.color = b.sepColor
    }

    function enableBtn() {
      if (!btn) return
      btn.disabled = false
      setTimeout(() => { btn.classList.add('hint') }, 400)
    }

    if (document.fonts?.load) {
      Promise.all(FONT_SPECS.map(spec => document.fonts.load(spec).catch(() => null)))
        .then(enableBtn).catch(enableBtn)
      setTimeout(enableBtn, 3000)
    } else {
      enableBtn()
    }

    function onRegen() {
      idx = (idx + 1) % BRANDS.length
      board?.classList.add('shuffling')
      numEl?.classList.add('fade')
      setTimeout(() => {
        render(BRANDS[idx])
        if (numEl) numEl.textContent = String(idx + 1).padStart(2, '0')
        numEl?.classList.remove('fade')
        board?.classList.remove('shuffling')
      }, 200)
    }

    btn?.addEventListener('click', onRegen)
    render(BRANDS[0])

    return () => { btn?.removeEventListener('click', onRegen) }
  }, [])

  return (
    <div className="board-stage" data-reveal="">
      <div className="board-stage-head">
        <div className="bsh-left">
          <span className="mono-xs">brand</span>
          <span className="board-num" id="bb-num" style={{ color: '#DD5049' }}>01</span>
          <span className="mono-xs">/ {BRANDS.length}</span>
        </div>
        <span className="mono-xs">
          Un click ricoordina <strong>tutto</strong> — nome, font, colori, packaging
        </span>
      </div>

      <div className="board" id="bb-board">
        <div className="tile t-wordmark">
          <span className="tile-cap">wordmark</span>
          <span
            className="t-logo"
            id="bb-logo"
            style={{ fontFamily: "'Mont','Helvetica Neue',sans-serif", fontWeight: 700, letterSpacing: '-.04em' }}
          >
            Pomo<span className="t-dot" id="bb-dot" style={{ color: '#DD5049' }}>.</span>
          </span>
          <span className="t-tag" id="bb-tag">Sugo come una volta</span>
        </div>

        <div className="tile t-palette">
          <span className="tile-cap">palette</span>
          <div className="swatches" id="bb-swatches">
            <span className="sw" style={{ background: '#DD5049' }}><i>#DD5049</i><i className="sw-role">primario</i></span>
            <span className="sw" style={{ background: '#EFB44F' }}><i>#EFB44F</i><i className="sw-role">accento</i></span>
            <span className="sw" style={{ background: '#17130f' }}><i>ink</i><i className="sw-role">testo</i></span>
          </div>
        </div>

        <div className="tile t-type">
          <span className="tile-cap">tipografia</span>
          <span
            className="t-type-big"
            id="bb-typebig"
            style={{ fontFamily: "'Mont','Helvetica Neue',sans-serif", fontWeight: 700 }}
          >Aa</span>
          <span className="t-type-meta mono-xs" id="bb-typemeta">Mont · grottesca calda</span>
        </div>

        <div className="tile t-pack">
          <span className="tile-cap">packaging</span>
          <div className="pack-mock" id="bb-pack">
            <div className="pack-band" id="bb-band" style={{ background: '#DD5049' }}></div>
            <span
              className="pack-echo"
              id="bb-echo"
              style={{ fontFamily: "'Mont','Helvetica Neue',sans-serif", fontWeight: 700 }}
            >Pomo.</span>
            <span className="pack-lbl">etichetta · 1/1</span>
          </div>
        </div>

        <div className="tile t-ctrl">
          <span className="tile-cap">settore</span>
          <span className="t-cat" id="bb-cat">conserve artigianali</span>
          <p className="t-ctrl-note">nome · font · colori<br />packaging · voce</p>
        </div>
      </div>

      <div className="board-foot">
        <button className="regen-btn" id="bb-btn" disabled>
          <span className="regen-icon" aria-hidden="true">↻</span>
          <span>Rigenera identità</span>
        </button>
        <p className="foot-desc">
          Ogni click genera un sistema coordinato dal nulla — nome, tipografia,
          colori, packaging. Settimane di lavoro, risolte in un gesto.
        </p>
      </div>
    </div>
  )
}
