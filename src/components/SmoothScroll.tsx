'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function setupReveals() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduce) {
    document.querySelectorAll('[data-reveal], .kinetic').forEach(el =>
      el.classList.add('is-in'))
    document.querySelectorAll<HTMLElement>('[data-count]').forEach(node => {
      const to = parseFloat(node.dataset.count ?? '0')
      const dec = (node.dataset.count ?? '').includes('.') ? 1 : 0
      node.textContent = (node.dataset.pre ?? '') + to.toFixed(dec) + (node.dataset.suf ?? '')
    })
    return
  }

  // Reveal: [data-reveal] and .kinetic (after splitKinetic has run)
  ScrollTrigger.batch('[data-reveal], .kinetic', {
    start: 'top 90%',
    onEnter: (batch) => batch.forEach(el => el.classList.add('is-in')),
    once: true,
  })

  // Counters with GSAP tween
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach(node => {
    ScrollTrigger.create({
      trigger: node,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const to = parseFloat(node.dataset.count ?? '0')
        const dec = (node.dataset.count ?? '').includes('.') ? 1 : 0
        const pre = node.dataset.pre ?? ''
        const suf = node.dataset.suf ?? ''
        const obj = { val: 0 }
        gsap.to(obj, {
          val: to,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate() { node.textContent = pre + obj.val.toFixed(dec) + suf },
        })
      },
    })
  })
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // GSAP ticker drives Lenis — single RAF loop, no duplication
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Wait for motion.js splitKinetic() before setting up ScrollTrigger reveals
    const onReady = () => setupReveals()
    window.addEventListener('fooody:ready', onReady, { once: true })

    // Absolute fallback if motion.js never fires (e.g. script blocked)
    const fallback = setTimeout(() => setupReveals(), 2500)

    return () => {
      window.removeEventListener('fooody:ready', onReady)
      clearTimeout(fallback)
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      ScrollTrigger.getAll().forEach(t => t.kill())
      lenis.destroy()
    }
  }, [])

  return null
}
