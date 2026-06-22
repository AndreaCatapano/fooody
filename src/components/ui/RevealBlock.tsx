import type { ElementType, ReactNode } from 'react'

interface RevealBlockProps {
  children: ReactNode
  delay?: number
  tag?: ElementType
}

export default function RevealBlock({ children, delay, tag: Tag = 'div' }: RevealBlockProps) {
  const extra = delay !== undefined ? { 'data-reveal-d': String(delay) } : {}
  return (
    <Tag data-reveal="" {...extra}>
      {children}
    </Tag>
  )
}
