interface StatItemProps {
  count: number | string
  prefix?: string
  suffix?: string
  label: string
  className?: string
  numeralClass?: string
}

export default function StatItem({ count, prefix, suffix, label, className, numeralClass }: StatItemProps) {
  const numCls = ['numeral', numeralClass].filter(Boolean).join(' ')
  return (
    <div className={className}>
      <span
        className={numCls}
        data-count={String(count)}
        {...(prefix ? { 'data-pre': prefix } : {})}
        {...(suffix ? { 'data-suf': suffix } : {})}
      >
        0
      </span>
      <span className="mono-xs">{label}</span>
    </div>
  )
}
