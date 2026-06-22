import type { CSSProperties, ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  style?: CSSProperties
}

export default function Chip({ children, style }: ChipProps) {
  return <span className="chip" style={style}>{children}</span>
}
