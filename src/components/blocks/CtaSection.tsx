import type { CSSProperties, ReactNode } from 'react'

interface CtaButton {
  label: ReactNode
  href: string
  className: string
  dataTransitionWord?: string
  dataMagnetic?: string
}

interface CtaSectionProps {
  eyebrow: string
  eyebrowClass?: string
  eyebrowStyle?: CSSProperties
  heading: ReactNode
  lead: ReactNode
  leadStyle?: CSSProperties
  ctaPrimary: CtaButton
  ctaSecondary?: ReactNode
  extra?: ReactNode
  cidPrefix?: string
}

export default function CtaSection({
  eyebrow,
  eyebrowClass,
  eyebrowStyle,
  heading,
  lead,
  leadStyle,
  ctaPrimary,
  ctaSecondary,
  extra,
  cidPrefix,
}: CtaSectionProps) {
  const eyebrowCls = ['eyebrow no-slash', eyebrowClass].filter(Boolean).join(' ')
  const eyebrowSt: CSSProperties = { justifyContent: 'center', ...eyebrowStyle }

  return (
    <section className="section ink-region" data-bg="ink" id="contatti">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <div className={eyebrowCls} style={eyebrowSt} {...(cidPrefix ? { 'data-cid': cidPrefix + '1' } : {})}>{eyebrow}</div>
        <h2
          className="mega"
          data-kinetic="lines"
          style={{ margin: '22px auto 0', maxWidth: '15ch' }}
          {...(cidPrefix ? { 'data-cid': cidPrefix + '2' } : {})}
        >
          {heading}
        </h2>
        <p
          className="lead text-pretty"
          data-reveal=""
          style={{ margin: '26px auto 0', maxWidth: '42ch', ...leadStyle }}
          {...(cidPrefix ? { 'data-cid': cidPrefix + '3' } : {})}
        >
          {lead}
        </p>
        {extra}
        <div
          data-reveal=""
          data-reveal-d="2"
          style={{ marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            className={ctaPrimary.className}
            href={ctaPrimary.href}
            {...(ctaPrimary.dataTransitionWord ? { 'data-transition': '', 'data-transition-word': ctaPrimary.dataTransitionWord } : {})}
            {...(ctaPrimary.dataMagnetic ? { 'data-magnetic': ctaPrimary.dataMagnetic } : {})}
            {...(cidPrefix ? { 'data-cid': cidPrefix + '4' } : {})}
          >
            <span className="btn-label">{ctaPrimary.label}</span>
          </a>
          {ctaSecondary}
        </div>
      </div>
    </section>
  )
}
