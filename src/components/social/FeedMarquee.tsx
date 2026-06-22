'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { FeedCard } from './FeedCard'
import { ReelModal } from './ReelModal'
import type { CardData } from './FeedCard'

const A = [
  'var(--tomato)',
  'var(--tomato-deep)',
  '#e8921a',
  '#1bbf8a',
  '#7b55ff',
  '#1a9fe8',
]

const ROWS: CardData[][] = [
  [
    { meta: 'reel · ricetta',      like: '♥ 12,4k', video: true,  accent: A[0] },
    { meta: 'carosello · menù',    like: '↗ 2,1k',  video: false, accent: A[2] },
    { meta: 'behind · cucina',     like: '♥ 8,9k',  video: true,  accent: A[3] },
    { meta: 'UGC · cliente',       like: '♥ 5,5k',  video: false, accent: A[4] },
    { meta: 'reel · trend',        like: '▶ 5,0M',  video: true,  accent: A[1] },
    { meta: 'copertina · piatto',  like: '♥ 7,2k',  video: false, accent: A[5] },
    { meta: 'story · poll',        like: '↗ 4,3k',  video: false, accent: A[2] },
    { meta: 'reel · backstage',    like: '♥ 9,1k',  video: true,  accent: A[0] },
    { meta: 'carosello · tips',    like: '↗ 3,8k',  video: false, accent: A[3] },
    { meta: 'reel · collab',       like: '▶ 2,2M',  video: true,  accent: A[4] },
    { meta: 'food photo · menù',   like: '♥ 3,1k',  video: false, accent: A[1] },
    { meta: 'reel · apertura',     like: '♥ 22k',   video: true,  accent: A[5] },
  ],
  [
    { meta: 'reel · lancio',       like: '♥ 21k',   video: true,  accent: A[3] },
    { meta: 'quote · recensione',  like: '↗ 980',   video: false, accent: A[0] },
    { meta: 'tutorial · 3 step',   like: '▶ 1,3M',  video: true,  accent: A[4] },
    { meta: 'poster · apertura',   like: '♥ 4,1k',  video: false, accent: A[2] },
    { meta: 'reel · chef',         like: '▶ 880k',  video: true,  accent: A[1] },
    { meta: 'carosello · offerta', like: '↗ 3,4k',  video: false, accent: A[5] },
    { meta: 'reel · prodotto',     like: '♥ 6,6k',  video: true,  accent: A[0] },
    { meta: 'story · swipe',       like: '↗ 1,1k',  video: false, accent: A[3] },
    { meta: 'reel · evento',       like: '♥ 14k',   video: true,  accent: A[2] },
    { meta: 'grafica · quote',     like: '↗ 2,7k',  video: false, accent: A[4] },
    { meta: 'reel · degu.',        like: '▶ 1,1M',  video: true,  accent: A[1] },
    { meta: 'carosello · pack',    like: '↗ 2,0k',  video: false, accent: A[5] },
  ],
]

const SPEEDS  = [1.1, 0.8]
const REVERSE = [false, true]

function FeedRow({
  cards,
  pxPerFrame,
  reverse,
  onCardClick,
}: {
  cards: CardData[]
  pxPerFrame: number
  reverse: boolean
  onCardClick: (c: CardData) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef   = useRef<number>(0)
  const posRef   = useRef(0)
  const curRef   = useRef(pxPerFrame)
  const tgtRef   = useRef(pxPerFrame)
  const hwRef    = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => { hwRef.current = track.scrollWidth / 2 }
    measure()

    // Reverse rows start mid-point so cards appear to travel right
    if (reverse) posRef.current = hwRef.current

    const ro = new ResizeObserver(measure)
    ro.observe(track)

    const dir = reverse ? -1 : 1

    function tick() {
      const hw = hwRef.current
      if (hw > 0 && track) {
        curRef.current += (tgtRef.current - curRef.current) * 0.04
        posRef.current += curRef.current * dir
        if (posRef.current >= hw) posRef.current -= hw
        if (posRef.current <  0)  posRef.current += hw
        track.style.transform = `translateX(${-posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [reverse])

  const slowDown = () => { tgtRef.current = pxPerFrame * 0.12 }
  const resume   = () => { tgtRef.current = pxPerFrame }

  return (
    <div className="mq-row" onMouseEnter={slowDown} onMouseLeave={resume}>
      <div ref={trackRef} className="mq-track">
        {cards.map((c, i) => (
          <FeedCard key={i} data={c} onClick={() => onCardClick(c)} />
        ))}
        {cards.map((c, i) => (
          <FeedCard key={`cl${i}`} data={c} onClick={() => onCardClick(c)} isClone />
        ))}
      </div>
    </div>
  )
}

export function FeedMarquee() {
  const [active, setActive] = useState<CardData | null>(null)
  const open  = useCallback((c: CardData) => setActive(c), [])
  const close = useCallback(() => setActive(null), [])

  return (
    <>
      <div
        className="feed-marquee"
        role="region"
        aria-label="Anteprima feed social Fooody"
      >
        {ROWS.map((cards, i) => (
          <FeedRow
            key={i}
            cards={cards}
            pxPerFrame={SPEEDS[i]}
            reverse={REVERSE[i]}
            onCardClick={open}
          />
        ))}
      </div>
      <ReelModal card={active} onClose={close} />
    </>
  )
}
