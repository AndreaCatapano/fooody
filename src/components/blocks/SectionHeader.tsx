import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow: ReactNode
  eyebrowClass?: string
  heading: ReactNode
  lead: ReactNode
  leadMaxWidth?: string
}

export default function SectionHeader({
  eyebrow,
  eyebrowClass,
  heading,
  lead,
  leadMaxWidth = '32ch',
}: SectionHeaderProps) {
  return (
    <div className="sec-head">
      <div>
        <div className={['eyebrow', eyebrowClass].filter(Boolean).join(' ')}>{eyebrow}</div>
        <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
          {heading}
        </h2>
      </div>
      <p className="small" style={{ maxWidth: leadMaxWidth }}>
        {lead}
      </p>
    </div>
  )
}
