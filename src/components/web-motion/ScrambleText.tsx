'use client'

/**
 * Cinematic decode for the one accent keyword in the /web hero
 * ("sito su misura"): random glyphs from many scripts — katakana, CJK
 * ideograms, Cyrillic, Greek, math/technical symbols — settle left-to-right
 * into the real word, in lilac. Slow enough to read as an effect, not a flash.
 *
 * No-reflow contract: the real word (visibility:hidden) stays in flow and
 * reserves the final Latin width; the scrambling glyphs — many of them
 * full-width — render in an absolutely-positioned overlay (white-space:nowrap)
 * so they overflow instead of pushing the rest of the line around. As glyphs
 * lock to Latin the string narrows back into place. Accessible name is the
 * real text via aria-label; every visual layer is aria-hidden.
 */

import { useEffect, useState } from 'react'

// Multi-script pool. Montserrat has no CJK/kana, so the browser falls back to
// a system face for those — fine, the variety is the point.
const GLYPHS = [
  ...'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  ...'時空光速情報未来設計創造無限電子網夢流星海森語文字体',
  ...'ДЖЗИЛПФЦЧШЩЯБГЄ',
  ...'ΓΔΘΛΞΠΣΦΨΩ',
  ...'◆◇○●□■△▲▽▼→←↑↓↔※§¶∆∑∏∫√∞≈≠∴∵',
  ...'0123456789/\\{}<>*+=|·',
]

const TICK_MS = 55
const REVEAL_TICKS = 20 // ~1.1s to fully decode, then it locks

function randGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

function scramble(text: string, progress: number): string {
  const lockCount = Math.floor(text.length * progress)
  return text
    .split('')
    .map((ch, i) => {
      if (ch === ' ') return ' '
      if (i < lockCount) return ch
      return randGlyph()
    })
    .join('')
}

interface Props {
  text: string
  className?: string
}

export default function ScrambleText({ text, className }: Props) {
  // Deterministic placeholder for SSR/first paint (no Math.random → no
  // hydration mismatch); the real scramble takes over on mount.
  const [display, setDisplay] = useState(() =>
    text.split('').map((c) => (c === ' ' ? ' ' : '◆')).join('')
  )
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Reduced motion: skip straight to the real text — but from a rAF callback,
    // not synchronously in the effect body (avoids the set-state-in-effect lint
    // and a cascading render), same reason the scramble runs from the interval.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const raf = requestAnimationFrame(() => { setDisplay(text); setDone(true) })
      return () => cancelAnimationFrame(raf)
    }
    let tick = 0
    const id = setInterval(() => {
      tick++
      if (tick >= REVEAL_TICKS) {
        clearInterval(id)
        setDisplay(text)
        setDone(true)
        return
      }
      setDisplay(scramble(text, tick / REVEAL_TICKS))
    }, TICK_MS)
    return () => clearInterval(id)
  }, [text])

  return (
    <span className={className} aria-label={text} style={{ position: 'relative', display: 'inline-block' }}>
      {/* in-flow, reserves the final width so wide glyphs never reflow the line */}
      <span aria-hidden="true" style={{ visibility: done ? 'visible' : 'hidden' }}>{text}</span>
      {!done && (
        <span
          aria-hidden="true"
          style={{ position: 'absolute', insetInlineStart: 0, top: 0, whiteSpace: 'nowrap' }}
        >
          {display}
        </span>
      )}
    </span>
  )
}
