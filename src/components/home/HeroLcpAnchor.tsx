// eslint-disable-next-line @next/next/no-img-element
export default function HeroLcpAnchor() {
  return (
    <img
      src="/hero-lcp.svg"
      alt=""
      aria-hidden="true"
      width={1440}
      height={900}
      fetchPriority="high"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
