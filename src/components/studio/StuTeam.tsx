import SectionHeader from '@/components/blocks/SectionHeader'

export default function StuTeam() {
  return (
    <section className="section" data-bg="paper" id="team">
      <div className="wrap">
        <SectionHeader
          cidPrefix="TD"
          eyebrow="il team"
          eyebrowClass="stu-eyebrow"
          heading={<>Le persone<br />dietro i progetti.</>}
          lead="Otto persone, un obiettivo. Ognuno con la propria specialità — tutti con lo stesso obiettivo."
        />

        <div className="stu-team">
          <div className="stu-member" data-reveal="">
            <figure className="ph stu-member-ph on-ink" data-cid="TD3" data-ctype="img"><span className="ph-label">ritratto · fondatore</span></figure>
            <div className="stu-member-info">
              <h3 className="h3" data-cid="TD4">Nome Cognome</h3>
              <span className="mono-xs stu-accent-fg" data-cid="TD5">Founder &amp; Strategist</span>
              <p className="body" data-cid="TD6" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
                Cresce tra trattorie e spreadsheet. Prima il cibo, poi i dati — poi ha capito che
                si parlano la stessa lingua.
              </p>
            </div>
          </div>
          <div className="stu-member" data-reveal="" data-reveal-d="1">
            <figure className="ph stu-member-ph on-ink" data-cid="TD7" data-ctype="img"><span className="ph-label">ritratto · creative director</span></figure>
            <div className="stu-member-info">
              <h3 className="h3" data-cid="TD8">Nome Cognome</h3>
              <span className="mono-xs" data-cid="TD9" style={{ color: 'var(--gold-deep)' }}>Creative Director</span>
              <p className="body" data-cid="TD10" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
                Vent&apos;anni a fare brand per chi produce cose buone. Dice che il design è come una
                ricetta — sbaglia chi usa troppi ingredienti.
              </p>
            </div>
          </div>
          <div className="stu-member" data-reveal="" data-reveal-d="2">
            <figure className="ph stu-member-ph on-ink" data-cid="TD11" data-ctype="img"><span className="ph-label">ritratto · head of content</span></figure>
            <div className="stu-member-info">
              <h3 className="h3" data-cid="TD12">Nome Cognome</h3>
              <span className="mono-xs" data-cid="TD13" style={{ color: 'var(--violet-deep)' }}>Head of Content</span>
              <p className="body" data-cid="TD14" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
                Copy di giorno, golosa di notte. Scrive come si parla — e parla come si legge. Ha
                un talent nell&apos;individuare il tono esatto di ogni brand.
              </p>
            </div>
          </div>
          <div className="stu-member" data-reveal="" data-reveal-d="3">
            <figure className="ph stu-member-ph on-ink" data-cid="TD15" data-ctype="img"><span className="ph-label">ritratto · video director</span></figure>
            <div className="stu-member-info">
              <h3 className="h3" data-cid="TD16">Nome Cognome</h3>
              <span className="mono-xs stu-accent-fg" data-cid="TD17">Video Director</span>
              <p className="body" data-cid="TD18" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
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
