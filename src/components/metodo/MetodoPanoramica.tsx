import SectionHeader from '@/components/blocks/SectionHeader'

export default function MetodoPanoramica() {
  return (
    <section className="section" data-bg="paper" id="panoramica" data-sig="">
      <div className="wrap">
        <SectionHeader
          eyebrow="DENTRO IL METODO"
          eyebrowClass="met-eyebrow"
          heading={<>Cinque pilastri.<br />Un unico percorso.</>}
        />

        <div className="pillars-map">
          <a className="pmap pmap-1" href="#pilastri" data-reveal="">
            <span className="pmap-idx idx">01</span>
            <h3 className="h3 pmap-title">Identità</h3>
            <p className="mono pmap-sub">Chi sei, prima ancora del menù</p>
            <span className="pmap-go arrow">↓</span>
          </a>
          <a className="pmap pmap-2" href="#pilastri" data-reveal="" data-reveal-d="1">
            <span className="pmap-idx idx">02</span>
            <h3 className="h3 pmap-title">Social</h3>
            <p className="mono pmap-sub">Non contenuti per riempire il feed, ma strategie per riempire il locale</p>
            <span className="pmap-go arrow">↓</span>
          </a>
          <a className="pmap pmap-3" href="#pilastri" data-reveal="" data-reveal-d="2">
            <span className="pmap-idx idx">03</span>
            <h3 className="h3 pmap-title">Menu Engineering</h3>
            <p className="mono pmap-sub">Il menù non è una lista: è il tuo primo venditore</p>
            <span className="pmap-go arrow">↓</span>
          </a>
          <a className="pmap pmap-4" href="#pilastri" data-reveal="" data-reveal-d="3">
            <span className="pmap-idx idx">04</span>
            <h3 className="h3 pmap-title">Esperienza</h3>
            <p className="mono pmap-sub">Dal primo click all&apos;ultimo boccone</p>
            <span className="pmap-go arrow">↓</span>
          </a>
          <a className="pmap pmap-5" href="#pilastri" data-reveal="" data-reveal-d="4">
            <span className="pmap-idx idx">05</span>
            <h3 className="h3 pmap-title">Crescita</h3>
            <p className="mono pmap-sub">Performance, dati e decisioni migliori</p>
            <span className="pmap-go arrow">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
