import SectionHeader from '@/components/blocks/SectionHeader'

export default function StuValori() {
  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="valori">
      <div className="wrap">
        <SectionHeader
          eyebrow="come lavoriamo"
          eyebrowClass="stu-eyebrow"
          heading={<>Tre principi<br />su cui ci basiamo.</>}
        />

        <div className="stu-vals-grid">
          <div className="stu-val" data-reveal="">
            <div className="stu-val-n">01</div>
            <div className="stu-val-main">
              <h3 className="h3">Buon gusto prima di tutto</h3>
              <p className="body text-pretty" style={{ marginTop: 14, maxWidth: '44ch', color: 'var(--ink-2)' }}>
                Ogni scelta estetica è una scelta strategica. Una foto brutta vende meno. Un copy
                debole non convince. Un sito lento fa scappare clienti. La qualità non è un lusso,
                è la base da cui partiamo.
              </p>
            </div>
          </div>
          <div className="stu-val" data-reveal="" data-reveal-d="1">
            <div className="stu-val-n" style={{ color: 'var(--gold-deep)' }}>02</div>
            <div className="stu-val-main">
              <h3 className="h3">Numeri veri</h3>
              <p className="body text-pretty" style={{ marginTop: 14, maxWidth: '44ch', color: 'var(--ink-2)' }}>
                Misuriamo quello che conta davvero, leggiamo i dati con buon senso. I report devono
                essere chiari, utili e onesti, anche quando raccontano qualcosa che non funziona.
              </p>
            </div>
          </div>
          <div className="stu-val" data-reveal="" data-reveal-d="2">
            <div className="stu-val-n" style={{ color: 'var(--violet-deep)' }}>03</div>
            <div className="stu-val-main">
              <h3 className="h3">Mani in pasta</h3>
              <p className="body text-pretty" style={{ marginTop: 14, maxWidth: '44ch', color: 'var(--ink-2)' }}>
                Giriamo video, montiamo, progettiamo e sviluppiamo. Chi presenta il lavoro sa cosa
                c&apos;è dentro, perché lo ha seguito davvero.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
