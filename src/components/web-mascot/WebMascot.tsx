'use client'

/**
 * Nib — the /web mascot (experiment/web-mascot branch). Round 2 design pass
 * (design_handoff_nib_mascot/): 13 SVG line-art poses replacing the original
 * ASCII glyphs, plus a narrower reappearance model — born once in the hero,
 * then only reacts to genuine interaction (see useMascotPose.ts) instead of
 * re-anchoring on every scroll position. This file wires the artwork and the
 * one-time hero transformation on top of that hook.
 *
 * Isolation contract unchanged: this folder + one import/mount line in
 * app/web/page.tsx are the only files this experiment owns. It only *reads*
 * DOM state that already exists (section positions/data-bg, active-tab
 * classes, open <details>) — never edits another component's source.
 */

import { useEffect, useState } from 'react'
import styles from './webMascot.module.css'
import { frames, INTRO_TEXT, TRANSFORM_TICKS, type PoseName } from './frames'
import { useMascotPose } from './useMascotPose'

type IntroStage = 'hold' | 'compile' | 'done'

const INTRO_HOLD_MS = 1500 // Frame 1: the wordmark holds
const TRANSFORM_MS = 250 // Frame 2: tick marks, ~250ms, before settling on Frame 3 (idle)
const IDLE_BLINK_EVERY_MS = 3400
const WINK_MS = 500
const EXCITED_MS = 600
const WAVE_MS = 900

export default function WebMascot() {
  // Read once on first client render (this component always renders null
  // until the pose hook measures a position, so there's nothing for a
  // server/client mismatch to disagree about here).
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [introStage, setIntroStage] = useState<IntroStage>(() => (reducedMotion ? 'done' : 'hold'))
  const [blinkOn, setBlinkOn] = useState(false)

  const { anchor, pose: hookPose, onDark, top, triggerOverride } = useMascotPose({ reducedMotion })

  // Symbolic transformation: "fooody." holds, then the tick-mark frame
  // (letters dissolving into the same primitive as Nib's nibble ticks)
  // before settling on `idle`. Skipped entirely under reduced motion
  // (initial state above is already 'done' in that case).
  useEffect(() => {
    if (reducedMotion) return
    const t = setTimeout(() => setIntroStage('compile'), INTRO_HOLD_MS)
    return () => clearTimeout(t)
  }, [reducedMotion])
  useEffect(() => {
    if (introStage !== 'compile') return
    const t = setTimeout(() => setIntroStage('done'), TRANSFORM_MS)
    return () => clearTimeout(t)
  }, [introStage])

  // idle <-> idleBlink breath: applies wherever Nib is genuinely at rest
  // (idle is the resting pose everywhere now, not just the hero), and
  // naturally pauses during any interaction override.
  const idleNow = introStage === 'done' && hookPose === 'idle'

  useEffect(() => {
    if (reducedMotion || !idleNow) return
    const id = setInterval(() => setBlinkOn((b) => !b), IDLE_BLINK_EVERY_MS)
    return () => clearInterval(id)
  }, [idleNow, reducedMotion])

  // "Cosa costruiamo": name the currently-selected category next to Nib.
  const [contextLabel, setContextLabel] = useState<string | null>(null)
  useEffect(() => {
    if (anchor !== 'costruiamo') return
    const container = document.getElementById('costruiamo')
    if (!container) return
    function read() {
      const activeTab = container!.querySelector('.web-cap-tab.active')
      setContextLabel(activeTab?.textContent?.trim() || null)
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(container, { attributes: true, attributeFilter: ['class'], subtree: true })
    return () => mo.disconnect()
  }, [anchor])

  // "Come lavoriamo": name the currently-open phase (desktop rail's .active
  // node, or the mobile accordion's open <details> — same underlying state).
  useEffect(() => {
    if (anchor !== 'metodo') return
    const container = document.getElementById('metodo')
    if (!container) return
    function read() {
      const idx =
        container!.querySelector('.web-tl-node.active .web-tl-dot')?.textContent ||
        container!.querySelector('.web-tl-step[open] .web-tl-dot')?.textContent
      const lbl =
        container!.querySelector('.web-tl-node.active .web-tl-lbl')?.textContent ||
        container!.querySelector('.web-tl-step[open] .web-tl-lbl')?.textContent
      setContextLabel(idx && lbl ? `${idx} · ${lbl}` : null)
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(container, { attributes: true, attributeFilter: ['class', 'open'], subtree: true })
    return () => mo.disconnect()
  }, [anchor])

  // Gag: clicking an internal link that leaves /web gets a quick wave first.
  // Purely observes the click already handled by the site's own nav/
  // PageTransition — never calls preventDefault, never touches that code.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element).closest?.('a[data-transition]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (!href || href.startsWith('#') || href.startsWith('/web')) return
      triggerOverride('wave', WAVE_MS)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (top === null) return null

  const poseKey: PoseName = idleNow && blinkOn ? 'idleBlink' : hookPose
  const showLabel = (anchor === 'costruiamo' || anchor === 'metodo') && contextLabel

  return (
    <div
      className={`${styles.wrap} ${styles.visible} ${onDark ? styles.onDark : styles.onLight}`}
      style={{ top }}
      aria-hidden="true"
    >
      <div
        className={styles.figure}
        onMouseEnter={() => triggerOverride('wink', WINK_MS)}
        onClick={() => triggerOverride('excited', EXCITED_MS)}
      >
        {introStage === 'hold' ? (
          <span className={styles.introText}>
            {INTRO_TEXT}
            <span className={styles.cursor} />
          </span>
        ) : introStage === 'compile' ? (
          <div className={styles.poseBox} dangerouslySetInnerHTML={{ __html: TRANSFORM_TICKS }} />
        ) : (
          <div className={styles.poseBox} dangerouslySetInnerHTML={{ __html: frames[poseKey] }} />
        )}
        {showLabel && <span className={styles.label}>{contextLabel}</span>}
      </div>
    </div>
  )
}
