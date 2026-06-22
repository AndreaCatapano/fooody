'use client'

export type CardData = {
  meta: string
  like: string
  video: boolean
  videoSrc?: string
  accent: string
}

interface Props {
  data: CardData
  onClick: () => void
  isClone?: boolean
}

export function FeedCard({ data, onClick, isClone = false }: Props) {
  return (
    <div
      className={`reel-card${data.video ? ' is-video' : ''}`}
      style={{ '--card-accent': data.accent } as React.CSSProperties}
      onClick={onClick}
      role={isClone ? undefined : 'button'}
      aria-label={isClone ? undefined : `Apri ${data.meta}`}
      aria-hidden={isClone || undefined}
      tabIndex={isClone ? -1 : 0}
      onKeyDown={
        isClone
          ? undefined
          : (e) => (e.key === 'Enter' || e.key === ' ') && onClick()
      }
    >
      {data.video && (
        <span className="reel-badge" aria-hidden="true">Reel</span>
      )}

      <div className="reel-play" aria-hidden="true">
        <span className="reel-play-circle">▶</span>
      </div>

      <div className="reel-info" aria-hidden="true">
        <span className="reel-meta">{data.meta}</span>
        <span className="reel-like">{data.like}</span>
      </div>
    </div>
  )
}
