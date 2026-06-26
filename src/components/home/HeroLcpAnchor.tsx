'use client'
import { useRef } from 'react'

export default function HeroLcpAnchor() {
  const ref = useRef<HTMLImageElement>(null)
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src="/hero-lcp.svg"
      alt=""
      aria-hidden="true"
      width={1440}
      height={900}
      fetchPriority="high"
      onLoad={() => ref.current?.remove()}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
