'use client'
import { useState, useEffect } from 'react'

type ParticleDir = 'sparpaglia' | 'su' | 'giu' | 'esplode'

interface Tweaks {
  particleCount: number
  particleSize:  number
  particleDir:   ParticleDir
}

const DEFAULTS: Tweaks = {
  particleCount: 80,
  particleSize:  100,
  particleDir:   'sparpaglia',
}

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
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Chiudi tweaks' : 'Apri tweaks'}
        style={toggleStyle}
      >
        <span style={{ opacity: 0.7 }}>⚙</span> Hero
      </button>

      {open && (
        <div style={panelStyle}>
          <div style={headerStyle}>
            <span>// Hero · particelle</span>
            <button onClick={() => setOpen(false)} aria-label="Chiudi" style={closeStyle}>✕</button>
          </div>

          <Label>Densità — {tweaks.particleCount}</Label>
          <input
            type="range" min={20} max={120} step={10}
            value={tweaks.particleCount}
            onChange={e => update('particleCount', Number(e.target.value))}
            style={rangeStyle}
          />

          <Label>Grandezza — {tweaks.particleSize}%</Label>
          <input
            type="range" min={40} max={260} step={10}
            value={tweaks.particleSize}
            onChange={e => update('particleSize', Number(e.target.value))}
            style={rangeStyle}
          />

          <Label>Dispersione</Label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(['sparpaglia', 'su', 'giu', 'esplode'] as ParticleDir[]).map(v => (
              <RadioBtn key={v} active={tweaks.particleDir === v} onClick={() => update('particleDir', v)}>
                {v}
              </RadioBtn>
            ))}
          </div>

          <div style={footerStyle}>Presentazione · non visibile in produzione</div>
        </div>
      )}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em',
      color: 'rgba(247,244,238,0.45)', marginBottom: 8, marginTop: 16,
    }}>
      {children}
    </div>
  )
}

function RadioBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
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
  width: 280, background: '#17130f',
  border: '1px solid rgba(247,244,238,0.16)', borderRadius: 14,
  padding: '20px 22px', boxShadow: '0 12px 48px rgba(23,19,15,0.6)',
  color: 'var(--paper)',
}

const headerStyle: React.CSSProperties = {
  fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.16em',
  color: 'var(--tomato)', marginBottom: 16,
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
}

const closeStyle: React.CSSProperties = {
  background: 'none', border: 'none',
  color: 'rgba(247,244,238,0.4)', cursor: 'pointer',
  fontSize: '0.9rem', lineHeight: 1, padding: 0,
}

const rangeStyle: React.CSSProperties = {
  width: '100%', accentColor: 'var(--tomato)', marginBottom: 4, cursor: 'pointer',
  display: 'block',
}

const footerStyle: React.CSSProperties = {
  marginTop: 20, paddingTop: 14,
  borderTop: '1px solid rgba(247,244,238,0.1)',
  fontSize: '0.55rem', color: 'rgba(247,244,238,0.28)',
  textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center',
}
