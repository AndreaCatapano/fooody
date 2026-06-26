import SectionHeader from '@/components/blocks/SectionHeader'

export default function MetodoPanoramica() {
  return (
    <section className="section" data-bg="paper" id="panoramica" data-sig="">
      <div className="wrap">
        <SectionHeader
          eyebrow="il sistema in un colpo d'occhio"
          eyebrowClass="met-eyebrow"
          heading={<>Cinque pilastri.<br />Un percorso solo.</>}
          lead="Funzionano separati, ma danno il meglio insieme. Sotto, ogni pilastro si compone mentre scorri."
        />

        <div className="pillars-map">
          <a className="pmap pmap-1" href="#pilastri" data-reveal="">
            <span className="pmap-idx idx">01</span>
            <h3 className="h3 pmap-title">Identità</h3>
            <p className="mono pmap-sub">chi sei, prima del menù</p>
            <span className="pmap-go arrow">↓</span>
          </a>
          <a className="pmap pmap-2" href="#pilastri" data-reveal="" data-reveal-d="1">
            <span className="pmap-idx idx">02</span>
            <h3 className="h3 pmap-title">Social</h3>
            <p className="mono pmap-sub">riempire i tavoli, non il feed</p>
            <span className="pmap-go arrow">↓</span>
          </a>
          <a className="pmap pmap-3" href="#pilastri" data-reveal="" data-reveal-d="2">
            <span className="pmap-idx idx">03</span>
            <h3 className="h3 pmap-title">Menu engineering</h3>
            <p className="mono pmap-sub">il menù che vende per te</p>
            <span className="pmap-go arrow">↓</span>
          </a>
          <a className="pmap pmap-4" href="#pilastri" data-reveal="" data-reveal-d="3">
            <span className="pmap-idx idx">04</span>
            <h3 className="h3 pmap-title">Esperienza</h3>
            <p className="mono pmap-sub">dal click all&apos;ultimo boccone</p>
            <span className="pmap-go arrow">↓</span>
          </a>
          <a className="pmap pmap-5" href="#pilastri" data-reveal="" data-reveal-d="4">
            <span className="pmap-idx idx">05</span>
            <h3 className="h3 pmap-title">Crescita</h3>
            <p className="mono pmap-sub">numeri da mangiare</p>
            <span className="pmap-go arrow">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
