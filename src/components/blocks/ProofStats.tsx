import type { ReactNode } from 'react'
import StatsGrid from '@/components/blocks/StatsGrid'

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
  cidPrefix?: string
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
  cidPrefix,
}: ProofStatsProps & { cidPrefix?: string }) {
  const eyebrowCls = ['eyebrow no-slash', eyebrowClass].filter(Boolean).join(' ')

  return (
    <section className="section ink-region" data-bg="ink" id={id}>
      <div className="wrap">
        <div className={eyebrowCls} data-reveal="" {...(cidPrefix ? { 'data-cid': cidPrefix+'1' } : {})}>{eyebrow}</div>
        <h2
          className="h1 text-balance"
          data-kinetic="words"
          {...(cidPrefix ? { 'data-cid': cidPrefix+'2' } : {})}
          style={{ marginTop: 16, maxWidth: '18ch', color: 'var(--paper)' }}
        >
          {heading}
        </h2>
        <StatsGrid
          gridClass={gridClass}
          itemClass={itemClass}
          defaultNumeralClass={numeralClass}
          items={items}
        />
      </div>
    </section>
  )
}
