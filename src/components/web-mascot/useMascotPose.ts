'use client'

import { useEffect, useRef, useState } from 'react'
import type { PoseName } from './frames'

export type AnchorKey = 'hero' | 'anteprima' | 'costruiamo' | 'metodo' | 'faq' | 'end'

const FAST_SCROLL_PX_PER_MS = 2.5 // 2500px/s per Nib's spec
const SCROLL_THROTTLE_MS = 100
const WOBBLE_MS = 180
const FALLEN_MS = 1500
const GET_UP_MS = 300
const REACTION_STEP_MS = 700 // each pose in a build->typing / think->point beat
const WAVE_MS = 900
const WAVE_SESSION_KEY = 'nib-waved'

interface Options {
  reducedMotion: boolean
}

/**
 * Single hook owning Nib's state. Round 2 design pass narrows this from "6
 * scroll-anchored poses" to "born once in the hero, reacts only to genuine
 * interaction": position/background contrast still track scroll continuously
 * (so Nib stays sensibly placed near the reader and the fast-scroll/exit
 * gags have somewhere visible to play), but the resting *pose* no longer
 * derives from which section is centered — it's always `idle` unless a real
 * interaction (tab click, step select, CTA hover, hover/click on Nib, fast
 * scroll, page exit) briefly overrides it. No animation library — every
 * transition is a plain setTimeout swap.
 *
 * `peek` (from the 13-pose handoff) has no trigger here: it was the old
 * scroll-arrival pose for `anteprima`, and that whole "re-anchor on scroll"
 * behavior is exactly what this pass removes. Kept in frames.ts as an
 * available pose in case a future genuine-interaction moment wants it.
 */
export function useMascotPose({ reducedMotion }: Options) {
  const [anchor, setAnchor] = useState<AnchorKey>('hero')
  const [onDark, setOnDark] = useState(true)
  const [top, setTop] = useState<number | null>(null)
  const [override, setOverride] = useState<PoseName | null>(null)

  const overrideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const overrideChainRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Section detection: an IntersectionObserver with a thin band around the
  // vertical center of the viewport — a section counts as "current" exactly
  // when it crosses that line, so at most one is active at a time without
  // hand-rolled scroll math.
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

    const activeRef = { current: known[0] }

    function place(entry: { key: AnchorKey; el: HTMLElement }) {
      activeRef.current = entry
      const rect = entry.el.getBoundingClientRect()
      const navHeight =
        entry.key === 'hero' ? (document.querySelector('.nav')?.getBoundingClientRect().height ?? 0) : 0
      setAnchor((prev) => (prev === entry.key ? prev : entry.key))
      setOnDark(entry.el.getAttribute('data-bg') === 'ink')
      setTop(rect.top + window.scrollY + navHeight + (entry.key === 'hero' ? 24 : 40))
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const match = known.find((s) => s.el === entry.target)
          if (match) place(match)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    known.forEach((s) => io.observe(s.el))

    // Land on the right section immediately (IO's first callback is async).
    place(known[0])

    // Sections don't resize height on window resize in a way that moves their
    // top, but re-measure anyway (e.g. nav height changes at the mobile
    // breakpoint) so the mascot doesn't drift out of place.
    function onResize() {
      place(activeRef.current)
    }
    window.addEventListener('resize', onResize)
    return () => {
      io.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  function clearOverrideTimers() {
    if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current)
    overrideChainRef.current.forEach(clearTimeout)
    overrideChainRef.current = []
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
    if (reducedMotion) {
      // No comic timing when the user asked for less motion — just the plain
      // "fallen" state for the same total duration, no wobble/getUp beats.
      setOverride('fallen')
      const t = setTimeout(() => setOverride(null), FALLEN_MS)
      overrideChainRef.current.push(t)
      return
    }
    clearOverrideTimers()
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

  // "Cosa costruiamo": a tab (or its mobile dot equivalent) click gets a
  // brief build -> typing reaction — fires on the click, not on merely
  // scrolling the section into view.
  useEffect(() => {
    const container = document.getElementById('costruiamo')
    if (!container) return
    function onClick(e: MouseEvent) {
      if (!(e.target as Element).closest?.('.web-cap-tab, .web-cap-dot')) return
      triggerSequence(['build', 'typing'], REACTION_STEP_MS)
    }
    container.addEventListener('click', onClick)
    return () => container.removeEventListener('click', onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  // "Come lavoriamo": selecting a step (desktop rail node or mobile
  // accordion summary — keyboard activation dispatches a click on both) gets
  // a brief think -> point reaction, not a scroll-arrival pose.
  useEffect(() => {
    const container = document.getElementById('metodo')
    if (!container) return
    function onClick(e: MouseEvent) {
      if (!(e.target as Element).closest?.('.web-tl-node, .web-tl-step-head')) return
      triggerSequence(['think', 'point'], REACTION_STEP_MS)
    }
    container.addEventListener('click', onClick)
    return () => container.removeEventListener('click', onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  // Footer contact CTA: the one explicit "invite" in the experience — Nib
  // points at the form for as long as the primary CTA is hovered/focused.
  useEffect(() => {
    const cta = document.querySelector<HTMLElement>('#contatti .web-btn')
    if (!cta) return
    function onEnter() {
      setHoverOverride('point')
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

  useEffect(() => () => clearOverrideTimers(), [])

  const pose = override ?? 'idle'

  return { anchor, pose, onDark, top, triggerOverride }
}
