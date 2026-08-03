import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  style?: CSSProperties
  /** Set only for a chip that is a real link/button (filter, removable tag, etc.) — renders as <a>/<button> and re-enables the border + hover affordance via [data-interactive]. Not used anywhere yet: today every chip in the app is a decorative <span>. */
  interactive?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
}

export default function Chip({ children, style, interactive, href, onClick }: ChipProps) {
  if (interactive && href) {
    return (
      <a className="chip" data-interactive href={href} style={style} onClick={onClick}>
        {children}
      </a>
    )
  }
  if (interactive) {
    return (
      <button type="button" className="chip" data-interactive style={style} onClick={onClick}>
        {children}
      </button>
    )
  }
  return <span className="chip" style={style}>{children}</span>
}
