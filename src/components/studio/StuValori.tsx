import SectionHeader from '@/components/blocks/SectionHeader'

export default function StuValori() {
  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="valori">
      <div className="wrap">
        <SectionHeader
          eyebrow="come lavoriamo"
          eyebrowClass="stu-eyebrow"
          heading={<>Tre principi.<br />Nessuna scusa.</>}
          lead="Non sono valori appesi al muro. Sono il modo in cui prendiamo le decisioni ogni giorno."
        />

        <div className="stu-vals-grid">
          <div className="stu-val" data-reveal="">
            <div className="stu-val-n">01</div>
            <div className="stu-val-main">
              <h3 className="h3">Gusto prima di tutto</h3>
              <p className="body text-pretty" style={{ marginTop: 14, maxWidth: '44ch', color: 'var(--ink-2)' }}>
                Ogni scelta estetica è una scelta strategica. Un&apos;immagine brutta vende meno, un copy
                piatto non convince, un sito lento perde clienti. La qualità non è un lusso — è la
                baseline da cui partiamo.
              </p>
            </div>
          </div>
          <div className="stu-val" data-reveal="" data-reveal-d="1">
            <div className="stu-val-n" style={{ color: 'var(--gold-deep)' }}>02</div>
            <div className="stu-val-main">
              <h3 className="h3">Dati senza fuffa</h3>
              <p className="body text-pretty" style={{ marginTop: 14, maxWidth: '44ch', color: 'var(--ink-2)' }}>
                Crediamo nei numeri e nel buon senso. Misuriamo tutto quello che conta, ignoriamo
                le metriche di vanità e riportiamo solo quello che serve per decidere bene. Report
                onesti, anche quando fanno un po&apos; male.
              </p>
            </div>
          </div>
          <div className="stu-val" data-reveal="" data-reveal-d="2">
            <div className="stu-val-n" style={{ color: 'var(--violet-deep)' }}>03</div>
            <div className="stu-val-main">
              <h3 className="h3">Mani in pasta</h3>
              <p className="body text-pretty" style={{ marginTop: 14, maxWidth: '44ch', color: 'var(--ink-2)' }}>
                Siamo un team operativo, non consulenti. Scriviamo i copy, giriamo i video,
                costruiamo i siti. Chi presenta il lavoro è chi lo fa. Zero passaggi di consegne
                telefono, massimo controllo su quello che esce.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
