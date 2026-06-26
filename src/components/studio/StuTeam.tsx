export default function StuTeam() {
  return (
    <section className="section" data-bg="paper" id="team">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow stu-eyebrow">il team</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Le persone<br />dietro i progetti.
            </h2>
          </div>
          <p className="small" style={{ maxWidth: '32ch' }}>
            Otto persone, un obiettivo. Ognuno con la propria specialità — tutti con lo stesso obiettivo.
          </p>
        </div>

        <div className="stu-team">
          <div className="stu-member" data-reveal="">
            <figure className="ph stu-member-ph on-ink"><span className="ph-label">ritratto · fondatore</span></figure>
            <div className="stu-member-info">
              <h3 className="h3">Nome Cognome</h3>
              <span className="mono-xs stu-accent-fg">Founder &amp; Strategist</span>
              <p className="body" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
                Cresce tra trattorie e spreadsheet. Prima il cibo, poi i dati — poi ha capito che
                si parlano la stessa lingua.
              </p>
            </div>
          </div>
          <div className="stu-member" data-reveal="" data-reveal-d="1">
            <figure className="ph stu-member-ph on-ink"><span className="ph-label">ritratto · creative director</span></figure>
            <div className="stu-member-info">
              <h3 className="h3">Nome Cognome</h3>
              <span className="mono-xs" style={{ color: 'var(--gold-deep)' }}>Creative Director</span>
              <p className="body" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
                Vent&apos;anni a fare brand per chi produce cose buone. Dice che il design è come una
                ricetta — sbaglia chi usa troppi ingredienti.
              </p>
            </div>
          </div>
          <div className="stu-member" data-reveal="" data-reveal-d="2">
            <figure className="ph stu-member-ph on-ink"><span className="ph-label">ritratto · head of content</span></figure>
            <div className="stu-member-info">
              <h3 className="h3">Nome Cognome</h3>
              <span className="mono-xs" style={{ color: 'var(--violet-deep)' }}>Head of Content</span>
              <p className="body" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
                Copy di giorno, golosa di notte. Scrive come si parla — e parla come si legge. Ha
                un talent nell&apos;individuare il tono esatto di ogni brand.
              </p>
            </div>
          </div>
          <div className="stu-member" data-reveal="" data-reveal-d="3">
            <figure className="ph stu-member-ph on-ink"><span className="ph-label">ritratto · video director</span></figure>
            <div className="stu-member-info">
              <h3 className="h3">Nome Cognome</h3>
              <span className="mono-xs stu-accent-fg">Video Director</span>
              <p className="body" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
                Occhio da cinematographer, testa da content creator. Sa quando serve un reel da 5M
                views e quando basta uno scatto spontaneo dietro al bancone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
