'use client'
import { useEffect, useRef } from 'react'
import type { CardData } from './FeedCard'

interface Props {
  card: CardData | null
  onClose: () => void
}

export function ReelModal({ card, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!card) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [card, onClose])

  if (!card) return null

  return (
    <div
      className="reel-modal-bd"
      role="dialog"
      aria-modal
      aria-label={`Reel: ${card.meta}`}
      onClick={onClose}
    >
      <div
        className="reel-modal-inner"
        style={{ '--card-accent': card.accent } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="reel-modal-close"
          onClick={onClose}
          aria-label="Chiudi"
        >
          ✕
        </button>

        {card.videoSrc ? (
          <video
            ref={videoRef}
            src={card.videoSrc}
            autoPlay
            playsInline
            controls
            preload="auto"
            className="reel-modal-video"
          />
        ) : (
          <div className="reel-modal-placeholder">
            <div className="reel-modal-ph-icon" aria-hidden="true">▶</div>
            <p className="reel-modal-ph-meta">{card.meta}</p>
            <p className="reel-modal-ph-like">{card.like}</p>
            <span className="reel-modal-ph-note">
              Il video verrà collegato qui
            </span>
          </div>
        )}

        <div className="reel-modal-foot">
          <span className="mono-xs">{card.meta}</span>
          <span className="mono-xs reel-modal-foot-like">{card.like}</span>
        </div>
      </div>
    </div>
  )
}
