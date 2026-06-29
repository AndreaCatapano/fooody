import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow: ReactNode
  eyebrowClass?: string
  heading: ReactNode
  lead: ReactNode
  leadMaxWidth?: string
  cidPrefix?: string
}

export default function SectionHeader({
  eyebrow,
  eyebrowClass,
  heading,
  lead,
  leadMaxWidth = '32ch',
  cidPrefix,
}: SectionHeaderProps) {
  return (
    <div className="sec-head">
      <div>
        <div className={['eyebrow', eyebrowClass].filter(Boolean).join(' ')} {...(cidPrefix ? { 'data-cid': cidPrefix + '1' } : {})}>{eyebrow}</div>
        <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }} {...(cidPrefix ? { 'data-cid': cidPrefix + '2' } : {})}>
          {heading}
        </h2>
      </div>
      <p className="small" style={{ maxWidth: leadMaxWidth }} {...(cidPrefix ? { 'data-cid': cidPrefix + '3' } : {})}>
        {lead}
      </p>
    </div>
  )
}
