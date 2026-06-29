import type { CSSProperties, ReactNode } from 'react'

interface CtaButton {
  label: ReactNode
  href: string
  className: string
  dataTransitionWord?: string
  dataMagnetic?: string
}

interface PageHeroProps {
  paddingBottom?: string
  eyebrow: ReactNode
  heading: ReactNode
  headingStyle?: CSSProperties
  extra?: ReactNode
  lead: ReactNode
  leadStyle?: CSSProperties
  ctaPrimary: CtaButton
  ctaSecondary?: ReactNode
  // footer layout (web, branding, metodo)
  footerClass?: string
  ctaClass?: string
  // 2-column layout (social, studio)
  innerClass?: string
  textClass?: string
  strip?: ReactNode
  belowWrap?: ReactNode
  cidPrefix?: string
}

function PrimaryBtn({ btn }: { btn: CtaButton }) {
  return (
    <a
      className={btn.className}
      href={btn.href}
      {...(btn.dataTransitionWord ? { 'data-transition': '', 'data-transition-word': btn.dataTransitionWord } : {})}
      {...(btn.dataMagnetic ? { 'data-magnetic': btn.dataMagnetic } : {})}
    >
      <span className="btn-label">{btn.label}</span>
    </a>
  )
}

export default function PageHero({
  paddingBottom = 'clamp(48px,7vw,96px)',
  eyebrow,
  heading,
  headingStyle,
  extra,
  lead,
  leadStyle,
  ctaPrimary,
  ctaSecondary,
  footerClass,
  ctaClass,
  innerClass,
  textClass,
  strip,
  belowWrap,
  cidPrefix,
}: PageHeroProps) {
  if (innerClass) {
    const ctaWrap = (
      <div
        data-reveal=""
        data-reveal-d="3"
        style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}
      >
        <PrimaryBtn btn={ctaPrimary} />
        {ctaSecondary}
      </div>
    )

    const text = (
      <>
        {eyebrow}
        <h1 className="mega" data-kinetic="lines" style={headingStyle}>{heading}</h1>
        <p className="lead text-pretty" data-reveal="" data-reveal-d="2" style={leadStyle}>{lead}</p>
        {ctaWrap}
      </>
    )

    return (
      <header
        className="section ink-region"
        data-bg="ink"
        style={{ paddingTop: 'clamp(130px,18vh,220px)', paddingBottom }}
      >
        <div className="wrap">
          <div className={innerClass}>
            {textClass ? <div className={textClass}>{text}</div> : text}
            {strip}
          </div>
          {belowWrap}
        </div>
      </header>
    )
  }

  // footer layout
  const ctaBlockWithCid = (
    <>
      <p className="lead text-pretty" data-reveal="" data-reveal-d="2" style={leadStyle} {...(cidPrefix ? { 'data-cid': cidPrefix + '3' } : {})}>{lead}</p>
      {ctaClass ? (
        <div className={ctaClass} data-reveal="" data-reveal-d="3">
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
      ) : (
        <div data-reveal="" data-reveal-d="3" style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
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
      )}
    </>
  )

  return (
    <header
      className="section ink-region"
      data-bg="ink"
      style={{ paddingTop: 'clamp(130px,18vh,220px)', paddingBottom }}
    >
      <div className="wrap">
        {eyebrow}
        <h1 className="mega" data-kinetic="lines" style={headingStyle} {...(cidPrefix ? { 'data-cid': cidPrefix + '2' } : {})}>{heading}</h1>
        {extra}
        {footerClass ? (
          <div className={footerClass}>{ctaBlockWithCid}</div>
        ) : ctaBlockWithCid}
      </div>
    </header>
  )
}
