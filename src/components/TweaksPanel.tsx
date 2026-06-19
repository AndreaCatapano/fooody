'use client'
import { useState, useEffect } from 'react'

type WorkHover    = 'tilt' | 'lift' | 'off'
type ParticleDir  = 'sparpaglia' | 'su' | 'giu' | 'esplode'
type SpeedPreset  = 'lenta' | 'normale' | 'veloce'
type ScrollPreset = 'dolce' | 'normale' | 'forte'
type ColorKey     = 'ink' | 'tomato' | 'paper' | 'cream'
type ExitMode     = 'radiale' | 'su' | 'gravità' | 'vortice' | 'nebbia'
type ExitCurve    = 'lineare' | 'esplosiva' | 'impulso'
type ExitFade     = 'lento' | 'normale' | 'veloce'

interface Tweaks {
  intro:             boolean
  workHover:         WorkHover
  particleCount:     number
  particleDir:       ParticleDir
  particleSize:      number
  assemblySpeed:     SpeedPreset
  scrollSensitivity: ScrollPreset
  particleColor:     ColorKey
  glow:              boolean
  exitMode:          ExitMode
  exitCurve:         ExitCurve
  exitFade:          ExitFade
}

const DEFAULTS: Tweaks = {
  intro: true, workHover: 'tilt',
  particleCount: 80, particleDir: 'sparpaglia', particleSize: 100,
  assemblySpeed: 'normale', scrollSensitivity: 'normale',
  particleColor: 'ink', glow: false,
  exitMode: 'radiale', exitCurve: 'lineare', exitFade: 'normale',
}

const COLOR_SWATCHES: { key: ColorKey; hex: string; label: string }[] = [
  { key: 'ink',    hex: '#17130f', label: 'Inchiostro' },
  { key: 'tomato', hex: '#e8442a', label: 'Pomodoro'   },
  { key: 'paper',  hex: '#f7f4ee', label: 'Carta'      },
  { key: 'cream',  hex: '#d2b48c', label: 'Crema'      },
]

function applyTweaks(t: Tweaks) {
  document.body.classList.remove('wh-tilt', 'wh-lift')
  if (t.workHover !== 'off') document.body.classList.add(`wh-${t.workHover}`)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).FOOODY_TWEAKS = { ...t }
  window.dispatchEvent(new CustomEvent('tweakchange', { detail: t }))
}

export default function TweaksPanel() {
  const [open, setOpen]     = useState(false)
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULTS)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fooody_tweaks')
      const t: Tweaks = saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS
      setTweaks(t)
      applyTweaks(t)
    } catch {
      applyTweaks(DEFAULTS)
    }
  }, [])

  function update<K extends keyof Tweaks>(key: K, value: Tweaks[K]) {
    const next = { ...tweaks, [key]: value }
    setTweaks(next)
    try { localStorage.setItem('fooody_tweaks', JSON.stringify(next)) } catch { /**/ }
    applyTweaks(next)
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 8000, fontFamily: 'var(--mono)' }}>

      {/* ── toggle ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Chiudi tweaks' : 'Apri tweaks'}
        style={toggleStyle}
      >
        <span style={{ opacity: 0.7 }}>⚙</span> Tweaks
      </button>

      {/* ── panel ── */}
      {open && (
        <div style={panelStyle}>

          {/* header */}
          <div style={headerStyle}>
            <span>// Particelle · tweaks</span>
            <button onClick={() => setOpen(false)} aria-label="Chiudi" style={closeStyle}>✕</button>
          </div>

          {/* ─── Colore ─── */}
          <SectionLabel>Colore</SectionLabel>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {COLOR_SWATCHES.map(s => (
              <button
                key={s.key}
                onClick={() => update('particleColor', s.key)}
                title={s.label}
                style={{
                  flex: 1, height: 30, borderRadius: 8, cursor: 'pointer',
                  background: s.hex,
                  border: tweaks.particleColor === s.key
                    ? '2px solid var(--tomato)'
                    : '2px solid rgba(247,244,238,0.15)',
                  transition: 'border-color 0.2s',
                }}
              />
            ))}
          </div>

          {/* ─── Glow ─── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <Label style={{ marginBottom: 0 }}>Effetto glow</Label>
            <RadioBtn active={tweaks.glow} onClick={() => update('glow', !tweaks.glow)}>
              {tweaks.glow ? 'On' : 'Off'}
            </RadioBtn>
          </div>

          <Divider />

          {/* ─── Densità ─── */}
          <Label>Densità — {tweaks.particleCount}%</Label>
          <input
            type="range" min={20} max={300} step={10}
            value={tweaks.particleCount}
            onChange={e => update('particleCount', Number(e.target.value))}
            style={rangeStyle}
          />

          {/* ─── Dimensione ─── */}
          <Label>Dimensione — {tweaks.particleSize}%</Label>
          <input
            type="range" min={40} max={260} step={10}
            value={tweaks.particleSize}
            onChange={e => update('particleSize', Number(e.target.value))}
            style={rangeStyle}
          />

          <Divider />

          {/* ─── Velocità assemblaggio ─── */}
          <Label>Assemblaggio</Label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {(['lenta', 'normale', 'veloce'] as SpeedPreset[]).map(v => (
              <RadioBtn key={v} active={tweaks.assemblySpeed === v} onClick={() => update('assemblySpeed', v)}>
                {v}
              </RadioBtn>
            ))}
          </div>

          {/* ─── Entrata ─── */}
          <Label>Entrata</Label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
            {(['sparpaglia', 'su', 'giu', 'esplode'] as ParticleDir[]).map(v => (
              <RadioBtn key={v} active={tweaks.particleDir === v} onClick={() => update('particleDir', v)}>
                {v}
              </RadioBtn>
            ))}
          </div>

          <Divider />

          {/* ─── Scatter scroll ─── */}
          <Label>Intensità scatter</Label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {(['dolce', 'normale', 'forte'] as ScrollPreset[]).map(v => (
              <RadioBtn key={v} active={tweaks.scrollSensitivity === v} onClick={() => update('scrollSensitivity', v)}>
                {v}
              </RadioBtn>
            ))}
          </div>

          <Divider />

          {/* ─── Uscita ─── */}
          <SectionLabel>Uscita particelle</SectionLabel>

          <Label>Direzione</Label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
            {([
              { v: 'radiale', label: 'radiale' },
              { v: 'su',      label: 'su ↑' },
              { v: 'gravità', label: 'gravità ↓' },
              { v: 'vortice', label: 'vortice ↻' },
              { v: 'nebbia',  label: 'nebbia' },
            ] as { v: ExitMode; label: string }[]).map(({ v, label }) => (
              <RadioBtn key={v} active={tweaks.exitMode === v} onClick={() => update('exitMode', v)}>
                {label}
              </RadioBtn>
            ))}
          </div>

          <Label>Curva</Label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {([
              { v: 'lineare',   label: 'lineare' },
              { v: 'esplosiva', label: 'esplosiva' },
              { v: 'impulso',   label: 'impulso' },
            ] as { v: ExitCurve; label: string }[]).map(({ v, label }) => (
              <RadioBtn key={v} active={tweaks.exitCurve === v} onClick={() => update('exitCurve', v)}>
                {label}
              </RadioBtn>
            ))}
          </div>

          <Label>Dissolvenza</Label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {(['lento', 'normale', 'veloce'] as ExitFade[]).map(v => (
              <RadioBtn key={v} active={tweaks.exitFade === v} onClick={() => update('exitFade', v)}>
                {v}
              </RadioBtn>
            ))}
          </div>

          <Divider />

          {/* ─── Lavori hover ─── */}
          <Label>Lavori — hover</Label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {(['tilt', 'lift', 'off'] as WorkHover[]).map(v => (
              <RadioBtn key={v} active={tweaks.workHover === v} onClick={() => update('workHover', v)}>
                {v}
              </RadioBtn>
            ))}
          </div>

          {/* ─── Intro ─── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Label style={{ marginBottom: 0 }}>Intro animazione</Label>
            <RadioBtn active={tweaks.intro} onClick={() => update('intro', !tweaks.intro)}>
              {tweaks.intro ? 'On' : 'Off'}
            </RadioBtn>
          </div>

          <div style={footerStyle}>Pannello di presentazione · non visibile in produzione</div>
        </div>
      )}
    </div>
  )
}

/* ── helpers ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '0.52rem', textTransform: 'uppercase', letterSpacing: '0.18em',
      color: 'var(--tomato)', marginBottom: 10,
    }}>
      {children}
    </div>
  )
}

function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em',
      color: 'rgba(247,244,238,0.45)', marginBottom: 8, ...style,
    }}>
      {children}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(247,244,238,0.1)', margin: '16px 0' }} />
}

function RadioBtn({
  active, onClick, children,
}: {
  active: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, padding: '7px 0', borderRadius: 999, border: '1px solid',
        borderColor: active ? 'var(--tomato)' : 'rgba(247,244,238,0.2)',
        background: active ? 'var(--tomato)' : 'transparent',
        color: 'var(--paper)', fontSize: '0.58rem', textTransform: 'uppercase',
        letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'var(--mono)',
        transition: 'background 0.25s, border-color 0.25s',
      }}
    >
      {children}
    </button>
  )
}

const toggleStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 8,
  padding: '10px 18px', borderRadius: 999,
  background: 'var(--ink)', color: 'var(--paper)',
  border: '1px solid rgba(247,244,238,0.22)',
  fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em',
  cursor: 'pointer', boxShadow: '0 4px 28px rgba(23,19,15,0.35)',
  transition: 'background 0.3s',
}

const panelStyle: React.CSSProperties = {
  position: 'absolute', bottom: 'calc(100% + 12px)', right: 0,
  width: 310, background: '#17130f',
  border: '1px solid rgba(247,244,238,0.16)', borderRadius: 14,
  padding: '20px 22px', boxShadow: '0 12px 48px rgba(23,19,15,0.6)',
  color: 'var(--paper)', maxHeight: '88vh', overflowY: 'auto',
}

const headerStyle: React.CSSProperties = {
  fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.16em',
  color: 'var(--tomato)', marginBottom: 20,
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
}

const closeStyle: React.CSSProperties = {
  background: 'none', border: 'none',
  color: 'rgba(247,244,238,0.4)', cursor: 'pointer',
  fontSize: '0.9rem', lineHeight: 1, padding: 0,
}

const rangeStyle: React.CSSProperties = {
  width: '100%', accentColor: 'var(--tomato)', marginBottom: 14, cursor: 'pointer',
  display: 'block',
}

const footerStyle: React.CSSProperties = {
  marginTop: 20, paddingTop: 14,
  borderTop: '1px solid rgba(247,244,238,0.1)',
  fontSize: '0.55rem', color: 'rgba(247,244,238,0.28)',
  textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center',
}
