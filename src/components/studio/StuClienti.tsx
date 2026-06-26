import SectionHeader from '@/components/blocks/SectionHeader'

export default function StuClienti() {
  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="clienti">
      <div className="wrap">
        <SectionHeader
          eyebrow="con chi lavoriamo"
          eyebrowClass="stu-eyebrow"
          heading={<>Hanno mangiato<br />con noi.</>}
          lead="Ristoranti, brand food e aziende che hanno qualcosa di buono da raccontare."
        />
        <div className="stu-clients">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="stu-client-logo ph" data-reveal="" data-reveal-d={String(i)}>
              <span className="ph-label">logo cliente</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
