interface StatItem {
  count: number | string
  from?: number
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
  /** Render statically: no reveal-on-scroll, no count-up animation. */
  noMotion?: boolean
}

export default function StatsGrid({
  items,
  gridClass,
  itemClass,
  defaultNumeralClass,
  staggerItems = false,
  noMotion = false,
}: StatsGridProps) {
  return (
    <div
      className={gridClass}
      {...(!noMotion && !staggerItems ? { 'data-reveal': '', 'data-reveal-d': '2' } : {})}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={itemClass}
          {...(!noMotion && staggerItems ? { 'data-reveal': '', ...(i > 0 ? { 'data-reveal-d': String(i) } : {}) } : {})}
        >
          <span
            className={['numeral', item.numeralClass ?? defaultNumeralClass].filter(Boolean).join(' ')}
            {...(noMotion
              ? {}
              : {
                  'data-count': String(item.count),
                  ...(item.from !== undefined ? { 'data-from': String(item.from) } : {}),
                  ...(item.prefix ? { 'data-pre': item.prefix } : {}),
                  ...(item.suffix ? { 'data-suf': item.suffix } : {}),
                  ...(item.placeholder ? { 'data-placeholder': item.placeholder } : {}),
                })}
          >
            {noMotion ? `${item.prefix ?? ''}${item.count}${item.suffix ?? ''}` : 0}
          </span>
          <span className="mono-xs">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
