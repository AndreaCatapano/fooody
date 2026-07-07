import SectionHeader from '@/components/blocks/SectionHeader'
import StatsGrid from '@/components/blocks/StatsGrid'

export default function MetodoRisultati() {
  return (
    <section className="section" data-bg="paper" id="risultati">
      <div className="wrap">
        <SectionHeader
          eyebrow="E I RISULTATI?"
          eyebrowClass="met-eyebrow"
          heading={<>Non basta dire “sta andando bene”.<br />Bisogna capire quanto, dove e perché.</>}
          lead="Medie rilevate sui progetti seguiti con il Metodo Fooody completo nei primi 6 mesi. Niente magie, fatti misurati e dati alla mano."
        />

        <StatsGrid
          gridClass="results-grid"
          itemClass="result"
          staggerItems
          items={[
            { count: 110, prefix: '+', suffix: '%', label: 'Engagement medio', numeralClass: 'result-num met-result-num', placeholder: 'KPI engagement' },
            { count: 19, prefix: '+', suffix: '%', label: 'Scontrino medio', numeralClass: 'result-num met-result-num-ink', placeholder: 'KPI prenotazioni' },
            { count: 460, from: 30, prefix: '+', suffix: '%', label: 'Crescita community', numeralClass: 'result-num met-result-num', placeholder: 'KPI copertura' },
            { count: 18, suffix: '%', label: 'scontrino medio', numeralClass: 'result-num met-result-num-ink', placeholder: 'KPI scontrino' },
          ]}
        />
      </div>
    </section>
  )
}
