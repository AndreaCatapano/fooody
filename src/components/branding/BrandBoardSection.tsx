import BrandBoard from '@/components/branding/BrandBoard'
import SectionHeader from '@/components/blocks/SectionHeader'

export default function BrandBoardSection() {
  return (
    <section className="section" data-bg="paper" id="board" data-sig="">
      <div className="wrap">
        <SectionHeader
          eyebrow="il sistema, assemblato"
          eyebrowClass="brand-eyebrow"
          heading={<>Un&apos;identità non è<br />un logo. È un sistema.</>}
          lead={<>Nome, colori, tipografia, packaging: tutto parla la stessa lingua. Premi{' '}<em className="italic-serif">rigenera</em> per vederlo cambiare.</>}
        />
        <BrandBoard />
      </div>
    </section>
  )
}
