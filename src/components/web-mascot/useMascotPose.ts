'use client'

import { useEffect, useRef, useState } from 'react'
import type { PoseName } from './frames'

export type AnchorKey = 'hero' | 'anteprima' | 'costruiamo' | 'metodo' | 'faq' | 'end'

type Position = { top: number; left: number }
type Point = { x: number; y: number }

const FAST_SCROLL_PX_PER_MS = 2.5 // 2500px/s per Nib's spec
const SCROLL_THROTTLE_MS = 100
const WOBBLE_MS = 180
const FALLEN_MS = 1500
const GET_UP_MS = 300
const REACTION_STEP_MS = 700 // each pose in a build->typing / think->point beat
const WAVE_MS = 900
const WAVE_SESSION_KEY = 'nib-waved'
const NIB_TOP_OFFSET = 24 // gap below the fixed nav
const NIB_WIDTH = 84 // poseBox (72) plus the label's max-width headroom
const NIB_HEIGHT = 96
const VIEWPORT_MARGIN = 12

interface Options {
  reducedMotion: boolean
}

/**
 * Single hook owning Nib's state. Round 2 design pass narrows this from "6
 * scroll-anchored poses" to "born once in the hero, reacts only to genuine
 * interaction," and this pass adds "feels alive" layers on top: Nib walks
 * over to whatever's actually being interacted with (tab, step, CTA) instead
 * of sitting fixed in one corner; `pointTarget` is the screen-space point the
 * `point` pose's arm should actually aim at (WebMascot.tsx does the rotation
 * — this hook only tracks where "at" is); and — in WebMascot.tsx, not here —
 * its pupils track the cursor when it's nearby. Position always has a
 * well-defined value (home corner, or a spot next to the active element) so
 * moving between them is a CSS transition, not a teleport. The resting
 * *pose* still doesn't derive from which section is centered — it's always
 * `idle` unless a real interaction (tab click, step select, CTA hover,
 * hover/click on Nib, fast scroll, page exit) briefly overrides it. No
 * animation library — every transition is a plain setTimeout swap.
 *
 * `peek` (from the 13-pose handoff) has no trigger here: it was the old
 * scroll-arrival pose for `anteprima`, and that whole "re-anchor on scroll"
 * behavior is exactly what this pass removes. Kept in frames.ts as an
 * available pose in case a future genuine-interaction moment wants it.
 */
export function useMascotPose({ reducedMotion }: Options) {
  const [anchor, setAnchor] = useState<AnchorKey>('hero')
  const [onDark, setOnDark] = useState(true)
  const [home, setHome] = useState<Position | null>(null)
  const [moveTarget, setMoveTarget] = useState<Position | null>(null)
  const [pointTarget, setPointTarget] = useState<Point | null>(null)
  const [override, setOverride] = useState<PoseName | null>(null)

  const overrideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const overrideChainRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Home corner: just below the (fixed) nav, hugging the right edge — same
  // math as the CSS clamp() the old right-anchored layout used, so the
  // resting spot looks identical to before. The nav isn't just resize-
  // sensitive: it also shrinks its own padding on scroll (.nav.scrolled in
  // globals.css), so a plain resize listener leaves `home` stale — a
  // ResizeObserver on the nav itself catches both.
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.nav')
    function measure() {
      if (window.innerWidth <= 0) return // layout not settled yet, wait for the next resize
      const navHeight = nav?.getBoundingClientRect().height ?? 0
      const paddingRight = Math.min(48, Math.max(16, window.innerWidth * 0.04))
      setHome({ top: navHeight + NIB_TOP_OFFSET, left: window.innerWidth - paddingRight - NIB_WIDTH })
    }
    measure()
    window.addEventListener('resize', measure)
    // border-box, not the (default) content-box: .nav.scrolled only changes
    // padding, and padding isn't part of the content box, so the default
    // observation mode would never fire for it.
    const ro = nav ? new ResizeObserver(measure) : null
    if (nav && ro) ro.observe(nav, { box: 'border-box' })
    return () => {
      window.removeEventListener('resize', measure)
      ro?.disconnect()
    }
  }, [])

  // Section detection for background contrast + context label only (not
  // position): an IntersectionObserver with a thin band near the top of the
  // viewport, roughly where Nib's home spot sits, so onDark and the
  // costruiamo/metodo label reflect whatever's currently behind it.
  useEffect(() => {
    const all: { key: AnchorKey; el: HTMLElement | null }[] = [
      { key: 'hero', el: document.querySelector<HTMLElement>('#main-content > header') },
      { key: 'anteprima', el: document.getElementById('anteprima') },
      { key: 'costruiamo', el: document.getElementById('costruiamo') },
      { key: 'metodo', el: document.getElementById('metodo') },
      { key: 'faq', el: document.getElementById('faq') },
      { key: 'end', el: document.getElementById('contatti') },
    ]
    const known = all.filter((s): s is { key: AnchorKey; el: HTMLElement } => !!s.el)

    if (!known.length) return

    function place(entry: { key: AnchorKey; el: HTMLElement }) {
      setAnchor((prev) => (prev === entry.key ? prev : entry.key))
      setOnDark(entry.el.getAttribute('data-bg') === 'ink')
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const match = known.find((s) => s.el === entry.target)
          if (match) place(match)
        }
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0 } // top 20% of the viewport
    )
    known.forEach((s) => io.observe(s.el))

    // Land on the right section immediately (IO's first callback is async).
    place(known[0])

    return () => io.disconnect()
  }, [])

  /** A spot next to `el` (above it by default), clamped so Nib never lands under the nav or off-screen. */
  function positionNear(el: HTMLElement): Position {
    const rect = el.getBoundingClientRect()
    const navHeight = document.querySelector('.nav')?.getBoundingClientRect().height ?? 0
    const top = Math.max(navHeight + VIEWPORT_MARGIN, rect.top - NIB_HEIGHT - 16)
    const left = Math.max(
      VIEWPORT_MARGIN,
      Math.min(window.innerWidth - NIB_WIDTH - VIEWPORT_MARGIN, rect.left + rect.width / 2 - NIB_WIDTH / 2)
    )
    return { top, left }
  }

  /** Screen-space center of `el` — what the `point` pose's arm actually aims at. */
  function centerOf(el: HTMLElement): Point {
    const rect = el.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }

  function clearOverrideTimers() {
    if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current)
    overrideChainRef.current.forEach(clearTimeout)
    overrideChainRef.current = []
    setMoveTarget(null)
    setPointTarget(null)
  }

  function triggerOverride(pose: PoseName, ms: number) {
    if (reducedMotion) return
    clearOverrideTimers()
    setOverride(pose)
    overrideTimerRef.current = setTimeout(() => {
      overrideTimerRef.current = null
      setOverride(null)
    }, ms)
  }

  /** Plays a short pose sequence (one step per stepMs), then reverts to idle. */
  function triggerSequence(poses: PoseName[], stepMs: number) {
    if (reducedMotion) return
    clearOverrideTimers()
    setOverride(poses[0])
    let elapsed = 0
    for (let i = 1; i < poses.length; i++) {
      elapsed += stepMs
      const t = setTimeout(() => setOverride(poses[i]), elapsed)
      overrideChainRef.current.push(t)
    }
    const tEnd = setTimeout(() => setOverride(null), elapsed + stepMs)
    overrideChainRef.current.push(tEnd)
  }

  /** Sticky override for as long as a genuine interaction lasts (CTA hover/focus) — no auto-revert timer. */
  function setHoverOverride(pose: PoseName | null) {
    if (reducedMotion && pose) return
    clearOverrideTimers()
    setOverride(pose)
  }

  /** wobble (anticipation) -> fallen (in place) -> getUp (recovery) -> base pose. */
  function triggerFall() {
    clearOverrideTimers()
    if (reducedMotion) {
      // No comic timing when the user asked for less motion — just the plain
      // "fallen" state for the same total duration, no wobble/getUp beats.
      setOverride('fallen')
      const t = setTimeout(() => setOverride(null), FALLEN_MS)
      overrideChainRef.current.push(t)
      return
    }
    setOverride('wobble')
    const t1 = setTimeout(() => {
      setOverride('fallen')
      const t2 = setTimeout(() => {
        setOverride('getUp')
        const t3 = setTimeout(() => setOverride(null), GET_UP_MS)
        overrideChainRef.current.push(t3)
      }, FALLEN_MS)
      overrideChainRef.current.push(t2)
    }, WOBBLE_MS)
    overrideChainRef.current.push(t1)
  }

  // "Cosa costruiamo": a tab (or its mobile dot equivalent) click walks Nib
  // over to it for a brief build -> typing reaction — fires on the click
  // (mouse or tap, same event either way), not on scrolling the section into
  // view.
  useEffect(() => {
    const container = document.getElementById('costruiamo')
    if (!container) return
    function onClick(e: MouseEvent) {
      const tab = (e.target as Element).closest?.('.web-cap-tab, .web-cap-dot') as HTMLElement | null
      if (!tab) return
      triggerSequence(['build', 'typing'], REACTION_STEP_MS)
      setMoveTarget(positionNear(tab))
      const t = setTimeout(() => setMoveTarget(null), REACTION_STEP_MS * 2)
      overrideChainRef.current.push(t)
    }
    container.addEventListener('click', onClick)
    return () => container.removeEventListener('click', onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  // "Come lavoriamo": selecting a step (desktop rail node or mobile
  // accordion summary — keyboard activation dispatches a click on both)
  // walks Nib over to it for a brief think -> point reaction, not a
  // scroll-arrival pose.
  useEffect(() => {
    const container = document.getElementById('metodo')
    if (!container) return
    function onClick(e: MouseEvent) {
      const step = (e.target as Element).closest?.('.web-tl-node, .web-tl-step-head') as HTMLElement | null
      if (!step) return
      triggerSequence(['think', 'point'], REACTION_STEP_MS)
      setMoveTarget(positionNear(step))
      setPointTarget(centerOf(step))
      const t = setTimeout(() => {
        setMoveTarget(null)
        setPointTarget(null)
      }, REACTION_STEP_MS * 2)
      overrideChainRef.current.push(t)
    }
    container.addEventListener('click', onClick)
    return () => container.removeEventListener('click', onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  // Footer contact CTA: the one explicit "invite" in the experience — Nib
  // walks over and points at the form for as long as the primary CTA is
  // hovered/focused (tap-and-hold on touch fires the same focus/enter pair).
  useEffect(() => {
    const cta = document.querySelector<HTMLElement>('#contatti .web-btn')
    if (!cta) return
    function onEnter() {
      setHoverOverride('point')
      setMoveTarget(positionNear(cta!))
      setPointTarget(centerOf(cta!))
    }
    function onLeave() {
      setHoverOverride(null)
    }
    cta.addEventListener('mouseenter', onEnter)
    cta.addEventListener('mouseleave', onLeave)
    cta.addEventListener('focus', onEnter)
    cta.addEventListener('blur', onLeave)
    return () => {
      cta.removeEventListener('mouseenter', onEnter)
      cta.removeEventListener('mouseleave', onLeave)
      cta.removeEventListener('focus', onEnter)
      cta.removeEventListener('blur', onLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  // Page-exit gag: cursor leaving toward the browser chrome, once per tab
  // session (persisted so it doesn't repeat across /web visits in the same tab).
  useEffect(() => {
    if (reducedMotion) return
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(WAVE_SESSION_KEY)) return
    function onExitIntent() {
      if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(WAVE_SESSION_KEY, '1')
      triggerOverride('wave', WAVE_MS)
      document.removeEventListener('mouseleave', onExitIntent)
    }
    document.addEventListener('mouseleave', onExitIntent)
    return () => document.removeEventListener('mouseleave', onExitIntent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  // Fast-scroll-anywhere-on-the-page gag, throttled so trackpad inertia
  // doesn't spam false positives.
  const lastScrollRef = useRef<{ y: number; t: number }>({ y: 0, t: 0 })
  const lastCheckRef = useRef(0)
  useEffect(() => {
    function onScroll() {
      const now = performance.now()
      if (now - lastCheckRef.current < SCROLL_THROTTLE_MS) return
      lastCheckRef.current = now
      const y = window.scrollY
      const { y: lastY, t: lastT } = lastScrollRef.current
      const dt = now - lastT
      if (lastT > 0 && dt > 0) {
        const speed = Math.abs(y - lastY) / dt
        if (speed > FAST_SCROLL_PX_PER_MS) triggerFall()
      }
      lastScrollRef.current = { y, t: now }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  useEffect(
    () => () => {
      if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current)
      overrideChainRef.current.forEach(clearTimeout)
    },
    []
  )

  const pose = override ?? 'idle'
  const position = moveTarget ?? home

  return {
    anchor,
    pose,
    onDark,
    top: position?.top ?? null,
    left: position?.left ?? null,
    pointTarget,
    triggerOverride,
  }
}
