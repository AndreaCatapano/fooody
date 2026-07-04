'use client'

import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

interface WordScrambleProps {
  words: string[]
  intervalMs?: number
  scrambleMs?: number
  className?: string
}

export default function WordScramble({
  words,
  intervalMs = 2200,
  scrambleMs = 550,
  className,
}: WordScrambleProps) {
  const elRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el || words.length < 2) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let index = 0
    let frame = 0
    let timer: ReturnType<typeof setTimeout>

    function scrambleTo(target: string) {
      const current = el!.textContent || ''
      const maxLen = Math.max(current.length, target.length)
      const start = performance.now()

      function tick(now: number) {
        const t = Math.min(1, (now - start) / scrambleMs)
        let out = ''
        for (let i = 0; i < maxLen; i++) {
          const revealAt = (i / maxLen) * 0.6
          if (t > revealAt + 0.35) {
            out += target[i] ?? ''
          } else if (t > revealAt) {
            out += CHARS[Math.floor(Math.random() * CHARS.length)]
          } else {
            out += current[i] ?? ''
          }
        }
        el!.textContent = out

        if (t < 1) {
          frame = requestAnimationFrame(tick)
        } else {
          el!.textContent = target
        }
      }

      frame = requestAnimationFrame(tick)
    }

    function next() {
      index = (index + 1) % words.length
      scrambleTo(words[index])
      timer = setTimeout(next, intervalMs)
    }

    timer = setTimeout(next, intervalMs)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [words, intervalMs, scrambleMs])

  return (
    <span className={className} ref={elRef} data-word-scramble="">
      {words[0]}
    </span>
  )
}
