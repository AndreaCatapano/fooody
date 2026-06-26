import SectionHeader from '@/components/blocks/SectionHeader'
import StatsGrid from '@/components/blocks/StatsGrid'

export default function MetodoRisultati() {
  return (
    <section className="section" data-bg="paper" id="risultati">
      <div className="wrap">
        <SectionHeader
          eyebrow="cosa succede dopo"
          eyebrowClass="met-eyebrow"
          heading={<>I conti tornano.<br />Anche quelli belli.</>}
          lead="Medie sui ristoranti seguiti con il Metodo completo nei primi sei mesi. Niente magie, solo metodo."
        />

        {/* TODO: sostituire con dati reali */}
        <StatsGrid
          gridClass="results-grid"
          itemClass="result"
          staggerItems
          items={[
            { count: 340, prefix: '+', suffix: '%', label: 'engagement medio', numeralClass: 'result-num met-result-num', placeholder: 'KPI engagement' },
            { count: 180, prefix: '+', suffix: '%', label: 'prenotazioni online', numeralClass: 'result-num met-result-num-ink', placeholder: 'KPI prenotazioni' },
            { count: 2.4, suffix: 'x', label: 'copertura nel weekend', numeralClass: 'result-num met-result-num', placeholder: 'KPI copertura' },
            { count: 18, suffix: '%', label: 'scontrino medio', numeralClass: 'result-num met-result-num-ink', placeholder: 'KPI scontrino' },
          ]}
        />
      </div>
    </section>
  )
}
