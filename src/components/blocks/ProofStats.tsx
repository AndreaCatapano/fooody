import type { ReactNode } from 'react'

interface StatEntry {
  count: number | string
  prefix?: string
  suffix?: string
  label: string
}

interface ProofStatsProps {
  eyebrow: ReactNode
  eyebrowClass?: string
  heading: ReactNode
  items: StatEntry[]
  gridClass: string
  itemClass: string
  numeralClass: string
  id?: string
}

export default function ProofStats({
  eyebrow,
  eyebrowClass,
  heading,
  items,
  gridClass,
  itemClass,
  numeralClass,
  id,
}: ProofStatsProps) {
  const eyebrowCls = ['eyebrow no-slash', eyebrowClass].filter(Boolean).join(' ')

  return (
    <section className="section ink-region" data-bg="ink" id={id}>
      <div className="wrap">
        <div className={eyebrowCls} data-reveal="">{eyebrow}</div>
        <h2
          className="h1 text-balance"
          data-kinetic="words"
          style={{ marginTop: 16, maxWidth: '18ch', color: 'var(--paper)' }}
        >
          {heading}
        </h2>
        <div className={gridClass} data-reveal="" data-reveal-d="2">
          {items.map((item, i) => (
            <div key={i} className={itemClass}>
              <span
                className={['numeral', numeralClass].filter(Boolean).join(' ')}
                data-count={String(item.count)}
                {...(item.prefix ? { 'data-pre': item.prefix } : {})}
                {...(item.suffix ? { 'data-suf': item.suffix } : {})}
              >
                0
              </span>
              <span className="mono-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
