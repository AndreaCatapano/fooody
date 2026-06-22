import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import PageHero from '@/components/blocks/PageHero'
import CtaSection from '@/components/blocks/CtaSection'

export const metadata: Metadata = buildMetadata('studio')

export default function StudioPage() {
  return (
    <>
      <PageHero
        innerClass="stu-hero"
        textClass="stu-hero-text"
        eyebrow={<div className="eyebrow no-slash stu-accent-fg">— chi siamo · studio</div>}
        heading={<>Testa,<br />cuore<br />e <span className="stu-accent-fg">metodo.</span></>}
        headingStyle={{ marginTop: 20 }}
        lead="Strategist, designer, video-maker e copy che si prendono sul serio solo quando serve. Siamo nel food perché ci piace — e lavoriamo con qualsiasi brand abbia qualcosa di vero da dire."
        leadStyle={{ marginTop: 26, maxWidth: '46ch' }}
        ctaPrimary={{
          label: <>Lavoriamo insieme <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn stu-btn lg',
          dataTransitionWord: 'Parliamo.',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="btn on-ink ghost lg" href="#numeri">
            <span className="btn-label">Chi siamo <span className="arrow">↓</span></span>
          </a>
        }
        strip={
          <figure className="ph tall stu-hero-photo on-ink" data-reveal="" data-tilt="3">
            <span className="ph-label">foto · studio / team</span>
          </figure>
        }
        belowWrap={
          <div className="stu-hero-foot" data-reveal="" data-reveal-d="2">
            <span className="mono-xs">fondato nel 2020 · Milano</span>
            <span className="mono-xs stu-accent-fg">↓ la nostra storia</span>
          </div>
        }
      />

      {/* ============================================================
          NUMERI (paper)
          ============================================================ */}
      <section className="section" data-bg="paper" id="numeri">
        <div className="wrap">
          <div className="stu-nums">
            <div className="stu-num-item" data-reveal="">
              <span className="numeral stu-n" data-count="5" data-suf=" anni">0</span>
              <span className="mono-xs">nel settore food</span>
            </div>
            <div className="stu-num-item" data-reveal="" data-reveal-d="1">
              <span className="numeral stu-n" data-count="40" data-pre="+">0</span>
              <span className="mono-xs">clienti serviti</span>
            </div>
            <div className="stu-num-item" data-reveal="" data-reveal-d="2">
              <span className="numeral stu-n" data-count="8">0</span>
              <span className="mono-xs">persone nel team</span>
            </div>
            <div className="stu-num-item" data-reveal="" data-reveal-d="3">
              <span className="numeral stu-n" data-count="340" data-pre="+" data-suf="%">0</span>
              <span className="mono-xs">engagement medio · 6 mesi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MANIFESTO (ink)
          ============================================================ */}
      <section className="section ink-region" data-bg="ink" id="manifesto">
        <div className="wrap">
          <div className="eyebrow no-slash stu-accent-fg" data-reveal="">— manifesto</div>
          <h2 className="h1 text-balance" data-kinetic="words"
            style={{ marginTop: 16, maxWidth: '18ch', color: 'var(--paper)' }}>
            Il food non si vende. Si fa desiderare.
          </h2>
          <div className="stu-manifesto-body" data-reveal="" data-reveal-d="2">
            <p className="lead text-pretty" style={{ maxWidth: '54ch', color: 'rgba(247,244,238,.82)' }}>
              Crediamo che dietro ogni piatto, ogni brand e ogni scroll ci sia una persona affamata di
              qualcosa di buono. Il nostro lavoro è apparecchiare la tavola giusta — con metodo, gusto
              e un pizzico di sfacciatosta.
            </p>
            <p className="lead text-pretty" style={{ maxWidth: '54ch', color: 'rgba(247,244,238,.82)', marginTop: 22 }}>
              Non facciamo contenuti per riempire un calendario. Facciamo contenuti per riempire una
              sala. C&apos;è differenza — e si vede nei numeri.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          TEAM (paper)
          ============================================================ */}
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

      {/* ============================================================
          VALORI (paper-2)
          ============================================================ */}
      <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="valori">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow stu-eyebrow">come lavoriamo</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                Tre principi.<br />Nessuna scusa.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '32ch' }}>
              Non sono valori appesi al muro. Sono il modo in cui prendiamo le decisioni ogni giorno.
            </p>
          </div>

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

      {/* ============================================================
          PROCESSO (ink)
          ============================================================ */}
      <section className="section ink-region" data-bg="ink" id="processo">
        <div className="wrap">
          <div className="eyebrow no-slash stu-accent-fg" data-reveal="">— il processo</div>
          <h2 className="h1 text-balance" data-kinetic="words"
            style={{ marginTop: 16, maxWidth: '18ch', color: 'var(--paper)' }}>
            Prima si prepara il terreno. Poi si esegue.
          </h2>
          <div className="stu-processo">
            <div className="stu-step" data-reveal="">
              <div className="stu-step-n">01</div>
              <div className="stu-step-main">
                <h3 className="h3" style={{ color: 'var(--paper)' }}>Ascolto</h3>
                <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '40ch' }}>
                  Prima call gratuita. Capiamo il brand, i numeri di oggi, i prossimi obiettivi.
                  Niente brief infiniti — una conversazione.
                </p>
              </div>
            </div>
            <div className="stu-step" data-reveal="" data-reveal-d="1">
              <div className="stu-step-n" style={{ color: 'var(--gold)' }}>02</div>
              <div className="stu-step-main">
                <h3 className="h3" style={{ color: 'var(--paper)' }}>Diagnosi</h3>
                <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '40ch' }}>
                  Analizziamo canali, competitor, posizionamento. Tiriamo fuori i dati che contano
                  e presentiamo una lettura onesta della situazione.
                </p>
              </div>
            </div>
            <div className="stu-step" data-reveal="" data-reveal-d="2">
              <div className="stu-step-n" style={{ color: 'var(--violet)' }}>03</div>
              <div className="stu-step-main">
                <h3 className="h3" style={{ color: 'var(--paper)' }}>Strategia</h3>
                <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '40ch' }}>
                  Piano operativo su misura: obiettivi chiari, KPI condivisi, calendario di lavoro.
                  Nessuna promessa vaga — solo passi concreti.
                </p>
              </div>
            </div>
            <div className="stu-step" data-reveal="" data-reveal-d="3">
              <div className="stu-step-n" style={{ color: 'var(--tomato)' }}>04</div>
              <div className="stu-step-main">
                <h3 className="h3" style={{ color: 'var(--paper)' }}>Esecuzione</h3>
                <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '40ch' }}>
                  Produciamo, pubblichiamo, ottimizziamo. Cadenza settimanale di allineamento
                  e report mensile che mostra esattamente dove siamo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIANZA (paper)
          ============================================================ */}
      <section className="section" data-bg="paper" id="quote">
        <div className="wrap">
          <blockquote className="stu-quote" data-reveal="">
            <span className="stu-quote-mark" aria-hidden="true">&ldquo;</span>
            <p className="stu-quote-text">
              Avevamo un buon prodotto, ma sui social eravamo invisibili. In quattro mesi siamo
              diventati il brand di riferimento nella nostra categoria.
            </p>
            <footer className="stu-quote-foot">
              <div className="stu-quote-meta">
                <span className="h3 stu-quote-name">Nome Cliente</span>
                <span className="mono-xs" style={{ color: 'var(--ink-3)', marginTop: 4 }}>
                  Marketing Director · Brand · Milano
                </span>
              </div>
              <div className="stu-quote-kpis">
                <div className="stu-quote-kpi">
                  <span className="numeral" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--tomato-deep)' }}>5M</span>
                  <span className="mono-xs">views</span>
                </div>
                <div className="stu-quote-kpi">
                  <span className="numeral" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--gold-deep)' }}>+28k</span>
                  <span className="mono-xs">community</span>
                </div>
                <div className="stu-quote-kpi">
                  <span className="numeral" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--violet-deep)' }}>4</span>
                  <span className="mono-xs">mesi</span>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ============================================================
          CLIENTI (paper-2)
          ============================================================ */}
      <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="clienti">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow stu-eyebrow">con chi lavoriamo</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                Hanno mangiato<br />con noi.
              </h2>
            </div>
            <p className="small" style={{ maxWidth: '32ch' }}>
              Ristoranti, brand food e aziende che hanno qualcosa di buono da raccontare.
            </p>
          </div>
          <div className="stu-clients">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="stu-client-logo ph" data-reveal="" data-reveal-d={String(i)}>
                <span className="ph-label">logo cliente</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          LAVORA CON NOI (paper)
          ============================================================ */}
      <section className="section" data-bg="paper" id="lavora-con-noi">
        <div className="wrap">
          <div className="stu-lavora">
            <div>
              <div className="eyebrow stu-eyebrow">entra nel team</div>
              <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
                Cerchi un posto<br />dove contare?
              </h2>
              <p className="lead text-pretty" data-reveal="" style={{ marginTop: 20, maxWidth: '44ch' }}>
                Non assumiamo ruoli, assumiamo persone. Mandaci portfolio, profilo LinkedIn o due
                righe su cosa sai fare — anche se non c&apos;è una posizione aperta in questo momento.
              </p>
              <ul className="stu-job-hints" data-reveal="" data-reveal-d="1">
                <li>Designer · Strategist · Videomaker · Copywriter</li>
                <li>Risposta garantita entro 5 giorni lavorativi</li>
              </ul>
            </div>
            <div data-reveal="" data-reveal-d="2" style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
              <a className="btn stu-btn lg" href="mailto:lavora@fooody.it" data-magnetic="0.3">
                <span className="btn-label">Manda la candidatura <span className="arrow">↗</span></span>
              </a>
              <a className="btn ghost lg" href="mailto:ciao@fooody.it">
                <span className="btn-label">ciao@fooody.it</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="— prima call"
        eyebrowClass="stu-accent-fg"
        heading={<>30 minuti.<br />Gratis.</>}
        lead="Ti ascoltiamo, analizziamo la situazione attuale e ti diciamo se — e come — possiamo aiutarti. Nessun obbligo, nessuna vendita: solo una valutazione onesta."
        leadStyle={{ maxWidth: '44ch' }}
        ctaPrimary={{
          label: <>Prenota la call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn stu-btn lg',
          dataTransitionWord: 'Parliamo.',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="btn on-ink ghost lg" href="mailto:ciao@fooody.it">
            <span className="btn-label">ciao@fooody.it</span>
          </a>
        }
        extra={
          <div className="stu-call-punti" data-reveal="" data-reveal-d="1">
            <span>✓ Audit gratuito del tuo canale</span>
            <span>✓ Stima budget e tempi</span>
            <span>✓ Piano d&apos;azione su misura</span>
          </div>
        }
      />
    </>
  )
}
