import SectionHeader from '@/components/blocks/SectionHeader'

export default function StuTeam() {
  return (
    <section className="section" data-bg="paper" id="team">
      <div className="wrap">
        <SectionHeader
          eyebrow="il team"
          eyebrowClass="stu-eyebrow"
          heading={<>Le persone<br />dietro i progetti.</>}
          lead="Otto persone, un obiettivo. Ognuno con le sue skills — tutti con lo stesso obiettivo."
        />

        <div className="stu-team">
          <div className="stu-member" data-reveal="">
            <figure className="ph stu-member-ph on-ink"><span className="ph-label">ritratto · fondatore</span></figure>
            <div className="stu-member-info">
              <h3 className="h3">Demetrio Di Gennaro</h3>
              <span className="mono-xs stu-accent-fg">Business Consultant</span>
              <p className="body" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
                Ha vissuto la ristorazione sul campo in Pret A Manger a Londra e La Masardona a
                Napoli, prima di affiancare startup innovative e lavorare per multinazionali a
                supporto di aziende come Esselunga e Autogrill. Con una doppia laurea in Marketing
                e Business, oggi guida la consulenza dell&apos;agenzia unendo strategia e conoscenza
                diretta del food.
              </p>
            </div>
          </div>
          <div className="stu-member" data-reveal="" data-reveal-d="1">
            <figure className="ph stu-member-ph on-ink"><span className="ph-label">ritratto · creative director</span></figure>
            <div className="stu-member-info">
              <h3 className="h3">Salvatore Oppio</h3>
              <span className="mono-xs" style={{ color: 'var(--gold-deep)' }}>Social Media Strategist</span>
              <p className="body" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
                Laureato in Business Management, ha lavorato come Business Analyst per Retina
                Holding in collaborazione con McKinsey. Inoltre ha creato una community online sul
                calcio da oltre 50.000 follower, dimostrando talento nei contenuti e nelle
                strategie social. Oggi guida le strategie digitali dell&apos;agenzia con approccio
                creativo e analitico.
              </p>
            </div>
          </div>
          <div className="stu-member" data-reveal="" data-reveal-d="2">
            <figure className="ph stu-member-ph on-ink"><span className="ph-label">ritratto · head of content</span></figure>
            <div className="stu-member-info">
              <h3 className="h3">Riccardo Romano</h3>
              <span className="mono-xs" style={{ color: 'var(--violet-deep)' }}>Head of Content</span>
              <p className="body" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
                Ha oltre 20 anni di esperienza nel graphic design e una profonda conoscenza del
                settore food. Ha collaborato con più di 50 clienti, tra cui La Fiammante e Lamb
                Weston, seguendo progetti di brand identity, packaging e comunicazione visiva. La
                sua creatività unisce competenza tecnica e sensibilità estetica.
              </p>
            </div>
          </div>
        </div>

        <div className="stu-team-more">
          <div className="stu-team-mini" data-reveal="" data-reveal-d="3">
            <figure className="ph stu-team-mini-ph on-ink"><span className="ph-label">ritratto</span></figure>
            <div className="stu-member-info">
              <h3 className="h3">Giulia Scognamiglio</h3>
              <span className="mono-xs stu-accent-fg">Social Media Manager</span>
              <p className="small" style={{ marginTop: 6, color: 'var(--ink-2)' }}>
                Laureata in Culture Digitali della Comunicazione, dalla passione per il graphic
                design al mondo dei social media: creatività, ricerca e attenzione ai dettagli
                nella cura della comunicazione digitale dei brand.
              </p>
            </div>
          </div>
          <div className="stu-team-mini" data-reveal="" data-reveal-d="4">
            <figure className="ph stu-team-mini-ph on-ink"><span className="ph-label">ritratto</span></figure>
            <div className="stu-member-info">
              <h3 className="h3">Guia Di Carluccio</h3>
              <span className="mono-xs" style={{ color: 'var(--gold-deep)' }}>Art Director</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
