import StatsGrid from '@/components/blocks/StatsGrid'

export default function StuNumeri() {
  return (
    <section className="section section-paper-fixed" data-bg="paper" id="numeri">
      <div className="wrap">
        <StatsGrid
          gridClass="stu-nums"
          itemClass="stu-num-item"
          defaultNumeralClass="stu-n"
          noMotion
          items={[
            { count: 5, suffix: ' anni', label: 'nel settore food' },
            { count: 40, prefix: '+', label: 'clienti serviti' },
            { count: 8, label: 'persone nel team' },
            { count: 340, prefix: '+', suffix: '%', label: 'engagement medio · 6 mesi' },
          ]}
        />
      </div>
    </section>
  )
}
