'use client'
import { useState, useEffect } from 'react'

type ParticleDir   = 'sparpaglia' | 'su' | 'giu' | 'esplode'
type ParticleColor = 'ink' | 'tomato' | 'paper' | 'cream'
type SensPreset    = 'dolce' | 'normale' | 'forte'

interface Tweaks {
  particleCount:     number
  particleSize:      number
  particleDir:       ParticleDir
  particleColor:     ParticleColor
  glow:              boolean
  scrollSensitivity: SensPreset
}

const DEFAULTS: Tweaks = {
  particleCount:     80,
  particleSize:      100,
  particleDir:       'sparpaglia',
  particleColor:     'ink',
  glow:              false,
  scrollSensitivity: 'normale',
}

const COLOR_SWATCHES: { key: ParticleColor; hex: string; label: string }[] = [
  { key: 'ink',    hex: '#17130f', label: 'Inchiostro' },
  { key: 'tomato', hex: '#e8442a', label: 'Pomodoro'   },
  { key: 'paper',  hex: '#f7f4ee', label: 'Carta'      },
  { key: 'cream',  hex: '#d2b48c', label: 'Crema'      },
]

function applyTweaks(t: Tweaks) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).FOOODY_TWEAKS = { ...t }
  window.dispatchEvent(new CustomEvent('tweakchange', { detail: t }))
}

export default function TweaksPanel() {
  const [open,   setOpen]   = useState(false)
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

      <button onClick={() => setOpen(o => !o)} aria-label={open ? 'Chiudi tweaks' : 'Apri tweaks'} style={toggleStyle}>
        <span style={{ opacity: 0.6 }}>✦</span> Hero
      </button>

      {open && (
        <div style={panelStyle}>
          <div style={headerStyle}>
            <span>// Hero · particelle</span>
            <button onClick={() => setOpen(false)} aria-label="Chiudi" style={closeStyle}>✕</button>
          </div>

          {/* ─── Colore ─── */}
          <SectionLabel>Colore</SectionLabel>
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {COLOR_SWATCHES.map(s => (
              <button
                key={s.key}
                onClick={() => update('particleColor', s.key)}
                title={s.label}
                style={{
                  flex: 1, height: 28, borderRadius: 6, cursor: 'pointer',
                  background: s.hex,
                  border: tweaks.particleColor === s.key
                    ? '2px solid var(--tomato)'
                    : '2px solid rgba(247,244,238,0.12)',
                  transition: 'border-color 0.2s',
                }}
              />
            ))}
          </div>

          {/* ─── Glow ─── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <Label style={{ marginBottom: 0 }}>Glow</Label>
            <Toggle active={tweaks.glow} onClick={() => update('glow', !tweaks.glow)}>
              {tweaks.glow ? 'On' : 'Off'}
            </Toggle>
          </div>

          <Divider />

          {/* ─── Densità ─── */}
          <Label>Densità — {tweaks.particleCount}</Label>
          <input
            type="range" min={20} max={120} step={10}
            value={tweaks.particleCount}
            onChange={e => update('particleCount', Number(e.target.value))}
            style={rangeStyle}
          />

          {/* ─── Grandezza ─── */}
          <Label>Grandezza — {tweaks.particleSize}%</Label>
          <input
            type="range" min={40} max={260} step={10}
            value={tweaks.particleSize}
            onChange={e => update('particleSize', Number(e.target.value))}
            style={rangeStyle}
          />

          <Divider />

          {/* ─── Velocità scatter ─── */}
          <SectionLabel>Scatter allo scroll</SectionLabel>
          <Label>Velocità</Label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {(['dolce', 'normale', 'forte'] as SensPreset[]).map(v => (
              <Chip key={v} active={tweaks.scrollSensitivity === v} onClick={() => update('scrollSensitivity', v)}>
                {v}
              </Chip>
            ))}
          </div>

          {/* ─── Direzione ─── */}
          <Label>Direzione</Label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(['sparpaglia', 'su', 'giu', 'esplode'] as ParticleDir[]).map(v => (
              <Chip key={v} active={tweaks.particleDir === v} onClick={() => update('particleDir', v)}>
                {v}
              </Chip>
            ))}
          </div>

          <div style={footerStyle}>Presentazione · non visibile in produzione</div>
        </div>
      )}
    </div>
  )
}

/* ── sub-components ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.2em',
      color: 'var(--tomato)', marginBottom: 10,
    }}>
      {children}
    </div>
  )
}

function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontSize: '0.56rem', textTransform: 'uppercase', letterSpacing: '0.14em',
      color: 'rgba(247,244,238,0.4)', marginBottom: 7, ...style,
    }}>
      {children}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(247,244,238,0.08)', margin: '16px 0' }} />
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '6px 0', borderRadius: 999, border: '1px solid',
      borderColor: active ? 'var(--tomato)' : 'rgba(247,244,238,0.15)',
      background: active ? 'var(--tomato)' : 'transparent',
      color: 'var(--paper)', fontSize: '0.56rem', textTransform: 'uppercase',
      letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'var(--mono)',
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      {children}
    </button>
  )
}

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 14px', borderRadius: 999, border: '1px solid',
      borderColor: active ? 'var(--tomato)' : 'rgba(247,244,238,0.15)',
      background: active ? 'var(--tomato)' : 'transparent',
      color: 'var(--paper)', fontSize: '0.56rem', textTransform: 'uppercase',
      letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'var(--mono)',
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      {children}
    </button>
  )
}

/* ── styles ── */

const toggleStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 7,
  padding: '9px 16px', borderRadius: 999,
  background: '#17130f', color: 'var(--paper)',
  border: '1px solid rgba(247,244,238,0.18)',
  fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em',
  cursor: 'pointer', boxShadow: '0 4px 24px rgba(23,19,15,0.4)',
  transition: 'opacity 0.2s',
}

const panelStyle: React.CSSProperties = {
  position: 'absolute', bottom: 'calc(100% + 10px)', right: 0,
  width: 290, background: '#0f0c09',
  border: '1px solid rgba(247,244,238,0.12)', borderRadius: 12,
  padding: '18px 20px', boxShadow: '0 16px 56px rgba(0,0,0,0.7)',
  color: 'var(--paper)',
}

const headerStyle: React.CSSProperties = {
  fontSize: '0.56rem', textTransform: 'uppercase', letterSpacing: '0.18em',
  color: 'rgba(247,244,238,0.35)', marginBottom: 18,
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
}

const closeStyle: React.CSSProperties = {
  background: 'none', border: 'none',
  color: 'rgba(247,244,238,0.3)', cursor: 'pointer',
  fontSize: '0.85rem', lineHeight: 1, padding: 0,
}

const rangeStyle: React.CSSProperties = {
  width: '100%', accentColor: 'var(--tomato)', marginBottom: 14, cursor: 'pointer',
  display: 'block',
}

const footerStyle: React.CSSProperties = {
  marginTop: 18, paddingTop: 12,
  borderTop: '1px solid rgba(247,244,238,0.08)',
  fontSize: '0.5rem', color: 'rgba(247,244,238,0.22)',
  textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center',
}
