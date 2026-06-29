interface StatItem {
  count: number | string
  prefix?: string
  suffix?: string
  label: string
  numeralClass?: string
  placeholder?: string
}

interface StatsGridProps {
  items: StatItem[]
  gridClass: string
  itemClass: string
  defaultNumeralClass?: string
  staggerItems?: boolean
  cids?: string[]
}

export default function StatsGrid({
  items,
  gridClass,
  itemClass,
  defaultNumeralClass,
  staggerItems = false,
  cids,
}: StatsGridProps) {
  return (
    <div
      className={gridClass}
      {...(!staggerItems ? { 'data-reveal': '', 'data-reveal-d': '2' } : {})}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={itemClass}
          {...(staggerItems ? { 'data-reveal': '', ...(i > 0 ? { 'data-reveal-d': String(i) } : {}) } : {})}
          {...(cids && cids[i] ? { 'data-cid': cids[i] } : {})}
        >
          <span
            className={['numeral', item.numeralClass ?? defaultNumeralClass].filter(Boolean).join(' ')}
            data-count={String(item.count)}
            {...(item.prefix ? { 'data-pre': item.prefix } : {})}
            {...(item.suffix ? { 'data-suf': item.suffix } : {})}
            {...(item.placeholder ? { 'data-placeholder': item.placeholder } : {})}
          >
            0
          </span>
          <span className="mono-xs">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
