import BrandBoard from '@/components/branding/BrandBoard'
import SectionHeader from '@/components/blocks/SectionHeader'

export default function BrandBoardSection() {
  return (
    <section className="section" data-bg="paper" id="board" data-sig="">
      {/* Google Fonts per i 9 typeface del generatore — display=block elimina FOUT */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Bricolage+Grotesque:wght@700&family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Instrument+Serif&family=Playfair+Display:wght@600;700;800&family=Space+Grotesk:wght@400;500;700&family=Spectral:wght@500;600;700&family=Syne:wght@600;700;800&family=Unbounded:wght@500;600;700&display=block"
      />
      <div className="wrap">
        <SectionHeader
          cidPrefix="BB"
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
