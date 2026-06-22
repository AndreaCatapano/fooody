import type { CSSProperties, ReactNode } from 'react'

interface KineticHeadingProps {
  as?: 'h1' | 'h2' | 'h3'
  mode?: 'lines' | 'words'
  style?: CSSProperties
  className?: string
  children: ReactNode
}

export default function KineticHeading({ as: Tag = 'h2', mode, style, className, children }: KineticHeadingProps) {
  return (
    <Tag data-kinetic={mode} style={style} className={className}>
      {children}
    </Tag>
  )
}
