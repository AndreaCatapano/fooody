import type { CSSProperties, ReactNode } from 'react'

interface KpiItem {
  value: string
  label: string
  color?: string
}

interface CaseStudyBlockProps {
  eyebrow: ReactNode
  eyebrowClass?: string
  coverLabel: string
  coverPlaceholder?: string
  heading: ReactNode
  lead: ReactNode
  kpis: KpiItem[]
  caseHref?: string
  dataBg?: string
  sectionStyle?: CSSProperties
  cidPrefix?: string
}

export default function CaseStudyBlock({
  eyebrow,
  eyebrowClass,
  coverLabel,
  coverPlaceholder,
  heading,
  lead,
  kpis,
  caseHref = '/lavori',
  dataBg = 'paper',
  sectionStyle,
  cidPrefix,
}: CaseStudyBlockProps) {
  const eyebrowCls = ['eyebrow', eyebrowClass].filter(Boolean).join(' ')

  return (
    <section className="section" data-bg={dataBg} style={sectionStyle} id="caso">
      <div className="wrap">
        <div className={eyebrowCls} data-reveal="">{eyebrow}</div>
        <div className="case-grid">
          <figure
            className="ph tall case-cover"
            data-reveal=""
            data-tilt="4"
            data-cursor="guarda"
            {...(coverPlaceholder ? { 'data-placeholder': coverPlaceholder } : {})}
            {...(cidPrefix ? { 'data-cid': cidPrefix + '1', 'data-ctype': 'img' } : {})}
          >
            <span className="ph-label">{coverLabel}</span>
          </figure>
          <div>
            <h2 className="h1 text-balance" data-kinetic="words" style={{ maxWidth: '16ch' }} {...(cidPrefix ? { 'data-cid': cidPrefix + '2' } : {})}>
              {heading}
            </h2>
            <p className="lead text-pretty" data-reveal="" style={{ marginTop: 20, maxWidth: '46ch' }} {...(cidPrefix ? { 'data-cid': cidPrefix + '3' } : {})}>
              {lead}
            </p>
            <div className="case-kpis" data-reveal="" data-reveal-d="2">
              {kpis.map((kpi, i) => (
                <div key={i} className="case-kpi" {...(cidPrefix ? { 'data-cid': cidPrefix + (i + 4) } : {})}>
                  <span className="numeral" style={kpi.color ? { color: kpi.color } : undefined}>
                    {kpi.value}
                  </span>
                  <span className="mono-xs">{kpi.label}</span>
                </div>
              ))}
            </div>
            <a className="tlink" href={caseHref} style={{ marginTop: 28, display: 'inline-flex' }}>
              leggi il caso completo <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
