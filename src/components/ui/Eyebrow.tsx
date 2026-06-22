import type { CSSProperties, ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  noSlash?: boolean
  className?: string
  style?: CSSProperties
}

export default function Eyebrow({ children, noSlash, className, style }: EyebrowProps) {
  const cls = ['eyebrow', noSlash && 'no-slash', className].filter(Boolean).join(' ')
  return <div className={cls} style={style}>{children}</div>
}
