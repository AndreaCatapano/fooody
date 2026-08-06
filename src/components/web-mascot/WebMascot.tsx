'use client'

/**
 * Nib — the /web mascot (experiment/web-mascot branch). Round 2 design pass
 * (design_handoff_nib_mascot/): 13 SVG line-art poses replacing the original
 * ASCII glyphs, plus a narrower reappearance model — born once in the hero,
 * then only reacts to genuine interaction (see useMascotPose.ts) instead of
 * re-anchoring on every scroll position. This file wires the artwork, the
 * one-time hero transformation, and the "feels alive" touches on top of that
 * hook: cursor-aware pupils and the idle sway (both live here, cosmetic-only
 * DOM/CSS work), walking over to whatever's being interacted with (position
 * math lives in the hook, since the interaction listeners already do), and
 * `quip` — a short line of copy (quips.ts) shown in the same slot as the
 * costruiamo/metodo label, quip taking priority when both would apply.
 *
 * Isolation contract unchanged: this folder + one import/mount line in
 * app/web/page.tsx are the only files this experiment owns. It only *reads*
 * DOM state that already exists (section positions/data-bg, active-tab
 * classes, open <details>) — never edits another component's source.
 */

import { useEffect, useRef, useState } from 'react'
import styles from './webMascot.module.css'
import { frames, INTRO_TEXT, TRANSFORM_TICKS, type PoseName } from './frames'
import { useMascotPose } from './useMascotPose'
import { QUIP_EXCITED, QUIP_HERO, QUIP_WAVE } from './quips'

type IntroStage = 'hold' | 'compile' | 'done'

const INTRO_HOLD_MS = 1500 // Frame 1: the wordmark holds
const TRANSFORM_MS = 250 // Frame 2: tick marks, ~250ms, before settling on Frame 3 (idle)
const IDLE_BLINK_EVERY_MS = 3400
const WINK_MS = 500
const EXCITED_MS = 600
const WAVE_MS = 900
const GAZE_MAX = 1.6 // pupil offset cap, in the pose's own 120x160 viewBox units
const GAZE_RADIUS = 260 // px — cursor distance at which gaze intensity reaches 0

export default function WebMascot() {
  // Read once on first client render (this component always renders null
  // until the pose hook measures a position, so there's nothing for a
  // server/client mismatch to disagree about here).
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [introStage, setIntroStage] = useState<IntroStage>(() => (reducedMotion ? 'done' : 'hold'))
  const [blinkOn, setBlinkOn] = useState(false)
  const poseBoxRef = useRef<HTMLDivElement>(null)

  const {
    anchor,
    pose: hookPose,
    onDark,
    isCompact,
    top,
    left,
    pointTarget,
    quip,
    showQuip,
    triggerOverride,
  } = useMascotPose({
    reducedMotion,
  })

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
  // One-time "hi" the moment the transformation settles — the birth itself
  // is the introduction, this is just Nib saying so.
  useEffect(() => {
    if (introStage === 'done') showQuip(QUIP_HERO)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      showQuip(QUIP_WAVE)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Cursor-aware gaze: the pupils (every pose's currentColor-filled circles)
  // nudge toward the cursor when it's nearby, easing back to centered as it
  // moves away — reads as "notices you" without redrawing any of the 13
  // poses, since it just transforms whatever circles the current pose has.
  // Touch devices never fire mousemove, so pupils simply stay centered there
  // — the honest default, not a gap to fill.
  useEffect(() => {
    if (reducedMotion) return
    let raf = 0
    let pending: { x: number; y: number } | null = null
    function apply() {
      raf = 0
      const svg = poseBoxRef.current?.querySelector('svg')
      if (!svg || !pending) return
      const rect = svg.getBoundingClientRect()
      const dx = pending.x - (rect.left + rect.width / 2)
      const dy = pending.y - (rect.top + rect.height / 2)
      const dist = Math.hypot(dx, dy)
      const intensity = Math.max(0, 1 - dist / GAZE_RADIUS)
      const nx = dist > 0 ? (dx / dist) * GAZE_MAX * intensity : 0
      const ny = dist > 0 ? (dy / dist) * GAZE_MAX * intensity : 0
      svg.querySelectorAll('circle[fill="currentColor"]').forEach((c) => {
        ;(c as SVGCircleElement).style.transform = intensity > 0 ? `translate(${nx}px, ${ny}px)` : ''
      })
    }
    function onMove(e: MouseEvent) {
      pending = { x: e.clientX, y: e.clientY }
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  // Precise pointing: the `point` pose ships one fixed arm angle, which only
  // ever looks right by coincidence. Rotate the arm+chevron (tagged
  // `[data-nib-arm]` in frames.ts) around its shoulder pivot to actually aim
  // at pointTarget — the pivot's SVG-space coordinates are converted to
  // screen space via the SVG's own CTM, so this stays correct regardless of
  // the poseBox's on-screen size.
  //
  // React rewrites poseBox's innerHTML on every re-render of this component
  // (dangerouslySetInnerHTML isn't skipped just because the string is
  // unchanged), and something else here re-renders while `point` is still
  // showing — e.g. the section-tracking IntersectionObserver settling a beat
  // after Lenis's own scroll animation. Each rewrite wipes the imperative
  // rotation. A MutationObserver on the poseBox re-applies it right after
  // every such rewrite instead of trusting a single one-shot effect run.
  useEffect(() => {
    if (hookPose !== 'point' || !pointTarget) return
    function applyRotation() {
      const svg = poseBoxRef.current?.querySelector('svg')
      const arm = svg?.querySelector<SVGGElement>('[data-nib-arm]')
      if (!svg || !arm) return
      const [pivotX, pivotY] = (arm.getAttribute('data-nib-arm') || '0,0').split(',').map(Number)
      const ctm = svg.getScreenCTM()
      if (!ctm) return
      const pt = svg.createSVGPoint()
      pt.x = pivotX
      pt.y = pivotY
      const pivot = pt.matrixTransform(ctm)
      const targetAngle = Math.atan2(pointTarget!.y - pivot.y, pointTarget!.x - pivot.x) * (180 / Math.PI)
      const drawnAngle = Math.atan2(-16, 28) * (180 / Math.PI) // the arm's drawn direction: (80,76) -> (108,60)
      arm.style.transform = `rotate(${targetAngle - drawnAngle}deg)`
    }
    applyRotation()
    const box = poseBoxRef.current
    const mo = box ? new MutationObserver(applyRotation) : null
    if (box && mo) mo.observe(box, { childList: true, subtree: true })
    return () => mo?.disconnect()
  }, [hookPose, pointTarget])

  if (top === null || left === null) return null

  const poseKey: PoseName = idleNow && blinkOn ? 'idleBlink' : hookPose
  const infoLabel = anchor === 'costruiamo' || anchor === 'metodo' ? contextLabel : null
  // Compact viewports (mobile/tablet): Nib only shows in the hero (genuinely
  // empty) or mid-reaction (hookPose !== 'idle' covers every trigger in
  // useMascotPose.ts, including the boundary `peek`) — never idle over a
  // section's own body copy. Desktop keeps the always-on corner presence.
  const visible = !isCompact || anchor === 'hero' || hookPose !== 'idle'

  return (
    <div
      className={`${styles.figure} ${visible ? styles.visible : ''} ${onDark ? styles.onDark : styles.onLight}`}
      style={{ top, left }}
      aria-hidden="true"
      onMouseEnter={() => {
        // Swapping poseBox's innerHTML (any pose change) or Nib's own
        // top/left transition sweeping past a stationary cursor can both
        // fire a genuine-looking mouseenter with no real hover intent behind
        // it — gating on "currently idle" means it only ever reacts to an
        // actual hover of an at-rest Nib, not a side effect of it reacting
        // to something else.
        if (hookPose === 'idle') triggerOverride('wink', WINK_MS)
      }}
      onClick={() => {
        triggerOverride('excited', EXCITED_MS)
        showQuip(QUIP_EXCITED)
      }}
    >
      {introStage === 'hold' ? (
        <span className={styles.introText}>
          {INTRO_TEXT}
          <span className={styles.cursor} />
        </span>
      ) : introStage === 'compile' ? (
        <div className={styles.poseBox} dangerouslySetInnerHTML={{ __html: TRANSFORM_TICKS }} />
      ) : (
        <div
          ref={poseBoxRef}
          className={`${styles.poseBox} ${idleNow ? styles.idleSway : ''}`}
          dangerouslySetInnerHTML={{ __html: frames[poseKey] }}
        />
      )}
      {quip ? (
        <span className={styles.quip}>{quip}</span>
      ) : infoLabel ? (
        <span className={styles.label}>{infoLabel}</span>
      ) : null}
    </div>
  )
}
