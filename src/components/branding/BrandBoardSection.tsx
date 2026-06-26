import BrandBoard from '@/components/branding/BrandBoard'

export default function BrandBoardSection() {
  return (
    <section className="section" data-bg="paper" id="board" data-sig="">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow brand-eyebrow">il sistema, assemblato</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Un&apos;identità non è<br />un logo. È un sistema.
            </h2>
          </div>
          <p className="small" style={{ maxWidth: '32ch' }}>
            Nome, colori, tipografia, packaging: tutto parla la stessa lingua. Premi{' '}
            <em className="italic-serif">rigenera</em> per vederlo cambiare.
          </p>
        </div>
        <BrandBoard />
      </div>
    </section>
  )
}
