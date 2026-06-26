import type { ReactNode } from 'react'

interface StepItem {
  title: ReactNode
  body: ReactNode
  numberColor?: string
}

interface StepsTimelineProps {
  items: StepItem[]
  wrapperClass: string
  itemClass: string
  numberClass: string
  bodyClass: string
  bodyMaxWidth?: string
}

export default function StepsTimeline({
  items,
  wrapperClass,
  itemClass,
  numberClass,
  bodyClass,
  bodyMaxWidth = '40ch',
}: StepsTimelineProps) {
  return (
    <div className={wrapperClass}>
      {items.map((item, i) => (
        <div
          key={i}
          className={itemClass}
          data-reveal=""
          {...(i > 0 ? { 'data-reveal-d': String(i) } : {})}
        >
          <div
            className={numberClass}
            {...(item.numberColor ? { style: { color: item.numberColor } } : {})}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          <div className={bodyClass}>
            <h3 className="h3" style={{ color: 'var(--paper)' }}>{item.title}</h3>
            <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: bodyMaxWidth }}>
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
