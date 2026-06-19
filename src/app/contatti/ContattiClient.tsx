'use client'
import { useEffect, useRef } from 'react'

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const confirmRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const form = formRef.current
    const confirm = confirmRef.current
    if (!form || !confirm) return

    function showErr(field: Element, msg: string) {
      const inp = field.querySelector<HTMLElement>('.lav-input')
      const err = field.querySelector<HTMLElement>('.lav-err')
      if (inp) inp.classList.add('is-err')
      if (err) err.textContent = msg
    }
    function clearErr(field: Element) {
      const inp = field.querySelector<HTMLElement>('.lav-input')
      const err = field.querySelector<HTMLElement>('.lav-err')
      if (inp) inp.classList.remove('is-err')
      if (err) err.textContent = ''
    }

    form.querySelectorAll<HTMLInputElement>('.lav-input').forEach(inp => {
      inp.addEventListener('input', () => {
        const field = inp.closest('.lav-field')
        if (field) clearErr(field)
      })
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const hp = (form.elements as HTMLFormControlsCollection & { website?: HTMLInputElement })['website']
      if (hp?.value) return

      let ok = true
      const fields = [
        { id: 'f-nome',    msg: 'Inserisci il tuo nome.' },
        { id: 'f-cognome', msg: 'Inserisci il tuo cognome.' },
        { id: 'f-email',   msg: "Inserisci un'indirizzo email valido." },
        { id: 'f-msg',     msg: 'Scrivici almeno due parole sul tuo progetto.' },
      ]

      fields.forEach(f => {
        const inp = document.getElementById(f.id) as HTMLInputElement | null
        if (!inp) return
        const field = inp.closest('.lav-field')
        if (field) clearErr(field)
        if (!inp.value.trim() || (inp.type === 'email' && !inp.value.includes('@'))) {
          if (field) showErr(field, f.msg)
          ok = false
        }
      })

      if (!ok) {
        const firstErr = form.querySelector<HTMLElement>('.lav-input.is-err')
        firstErr?.focus()
        return
      }

      form.style.transition = 'opacity .4s ease'
      form.style.opacity = '0'
      setTimeout(() => {
        form.hidden = true
        confirm.hidden = false
        confirm.style.opacity = '0'
        confirm.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(0.22,1,0.36,1)'
        confirm.style.transform = 'translateY(16px)'
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            confirm.style.opacity = '1'
            confirm.style.transform = 'translateY(0)'
          })
        })
      }, 320)
    })
  }, [])

  return (
    <div className="lav-form-col">
      <div className="eyebrow lav-eyebrow" style={{ marginBottom: 'clamp(28px,4vw,44px)' }}>scrivi qui</div>

      <form className="lav-form" id="lav-form" noValidate ref={formRef}>
        {/* honeypot */}
        <input
          type="text" name="website" tabIndex={-1} aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          autoComplete="off"
        />

        <div className="lav-row lav-row-2">
          <div className="lav-field">
            <label className="lav-label" htmlFor="f-nome">Nome *</label>
            <input className="lav-input" type="text" id="f-nome" name="nome"
              placeholder="Mario" autoComplete="given-name" required />
            <span className="lav-err" aria-live="polite"></span>
          </div>
          <div className="lav-field">
            <label className="lav-label" htmlFor="f-cognome">Cognome *</label>
            <input className="lav-input" type="text" id="f-cognome" name="cognome"
              placeholder="Rossi" autoComplete="family-name" required />
            <span className="lav-err" aria-live="polite"></span>
          </div>
        </div>

        <div className="lav-row lav-row-2">
          <div className="lav-field">
            <label className="lav-label" htmlFor="f-email">Email *</label>
            <input className="lav-input" type="email" id="f-email" name="email"
              placeholder="mario@esempio.it" autoComplete="email" required />
            <span className="lav-err" aria-live="polite"></span>
          </div>
          <div className="lav-field">
            <label className="lav-label" htmlFor="f-tel">Telefono</label>
            <input className="lav-input" type="tel" id="f-tel" name="telefono"
              placeholder="+39 320 000 0000" autoComplete="tel" />
          </div>
        </div>

        <div className="lav-row">
          <div className="lav-field">
            <label className="lav-label" htmlFor="f-servizio">Cosa ti interessa?</label>
            <div className="lav-select-wrap">
              <select className="lav-input lav-select" id="f-servizio" name="servizio">
                <option value="">— scegli un servizio</option>
                <option value="metodo">Metodo Fooody · per la ristorazione</option>
                <option value="social">Social Media</option>
                <option value="web">Web Design</option>
                <option value="branding">Branding &amp; Identità</option>
                <option value="tutto">Tutto — parliamo di persona</option>
              </select>
              <span className="lav-select-arrow" aria-hidden="true">↓</span>
            </div>
          </div>
        </div>

        <div className="lav-row">
          <div className="lav-field">
            <label className="lav-label" htmlFor="f-msg">Il tuo progetto *</label>
            <textarea className="lav-input lav-textarea" id="f-msg" name="messaggio"
              placeholder="Dimmi chi sei, cosa fai e cosa vorresti migliorare. Anche solo due righe vanno bene."
              rows={5} required></textarea>
            <span className="lav-err" aria-live="polite"></span>
          </div>
        </div>

        <div className="lav-row">
          <div className="lav-field">
            <label className="lav-label" htmlFor="f-come">Come ci hai conosciuto?</label>
            <div className="lav-select-wrap">
              <select className="lav-input lav-select" id="f-come" name="come_conosciuto">
                <option value="">— seleziona</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="linkedin">LinkedIn</option>
                <option value="google">Google / ricerca web</option>
                <option value="passaparola">Passaparola</option>
                <option value="cliente">Eravamo già clienti</option>
                <option value="altro">Altro</option>
              </select>
              <span className="lav-select-arrow" aria-hidden="true">↓</span>
            </div>
          </div>
        </div>

        <div className="lav-row lav-row-submit">
          <button className="btn accent lg lav-submit" type="submit" data-magnetic="0.3">
            <span className="btn-label">Invia il messaggio <span className="arrow">↗</span></span>
          </button>
          <p className="mono-xs lav-note">Nessuna newsletter, nessun dato ceduto a terzi.
            Ti rispondo personalmente entro 24 ore.</p>
        </div>
      </form>

      <div className="lav-confirm" id="lav-confirm" aria-live="assertive" hidden ref={confirmRef}>
        <div className="lav-confirm-inner">
          <div className="lav-confirm-check">✓</div>
          <h2 className="h2" style={{ marginTop: 16 }}>Messaggio ricevuto.</h2>
          <p className="lead text-pretty" style={{ marginTop: 12, color: 'var(--ink-2)', maxWidth: '38ch' }}>
            Ti rispondo entro 24 ore. Nel frattempo puoi dare un&apos;occhiata ai nostri lavori.
          </p>
          <a className="btn accent" href="/lavori" data-transition=""
            style={{ marginTop: 28, display: 'inline-flex' }}>
            <span className="btn-label">Guarda i lavori <span className="arrow">↗</span></span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ContattiClient() {
  return (
    <>
      {/* ============================================================
          HERO (ink)
          ============================================================ */}
      <header
        className="section ink-region"
        data-bg="ink"
        style={{ paddingTop: 'clamp(130px,18vh,210px)', paddingBottom: 'clamp(36px,5vw,72px)' }}
      >
        <div className="wrap">
          <div className="lav-hero">
            <div>
              <div className="eyebrow no-slash" style={{ color: 'var(--tomato)' }}>— prima call gratuita</div>
              <h1 className="mega" data-kinetic="lines" style={{ marginTop: 18 }}>
                Parliamo<br /><span style={{ color: 'var(--tomato)' }}>di cibo.</span>
              </h1>
            </div>
            <div className="lav-hero-desc" data-reveal="" data-reveal-d="1">
              <p className="lead text-pretty" style={{ color: 'rgba(247,244,238,.78)', maxWidth: '44ch' }}>
                Raccontaci il brand, il progetto, l&apos;obiettivo. Il primo confronto è offerto dalla casa —
                nessun impegno, solo una conversazione onesta su dove sei e dove puoi arrivare.
              </p>
              <div className="lav-hero-pills" data-reveal="" data-reveal-d="2">
                <span className="lav-pill">↓ 30 minuti</span>
                <span className="lav-pill">↓ nessun obbligo</span>
                <span className="lav-pill">↓ risposta in 24h</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          COME FUNZIONA (ink)
          ============================================================ */}
      <section className="section ink-region" data-bg="ink" id="come">
        <div className="wrap">
          <div className="eyebrow no-slash" style={{ color: 'var(--tomato)' }} data-reveal="">— come funziona</div>
          <h2 className="h1 text-balance" data-kinetic="words"
            style={{ marginTop: 16, maxWidth: '16ch', color: 'var(--paper)' }}>
            Tre passi. Nessun impegno.
          </h2>
          <div className="lav-steps">
            <div className="lav-step" data-reveal="">
              <div className="lav-step-n">01</div>
              <div className="lav-step-body">
                <h3 className="h3" style={{ color: 'var(--paper)' }}>Ci scrivi</h3>
                <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '36ch' }}>
                  Due righe sul tuo brand e su cosa vorresti migliorare. Puoi usare il form qui sotto
                  o scrivere direttamente a ciao@fooody.it — come preferisci.
                </p>
              </div>
            </div>
            <div className="lav-step" data-reveal="" data-reveal-d="1">
              <div className="lav-step-n" style={{ color: 'var(--gold)' }}>02</div>
              <div className="lav-step-body">
                <h3 className="h3" style={{ color: 'var(--paper)' }}>Prima call · gratuita</h3>
                <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '36ch' }}>
                  Fissiamo 30 minuti per sentirci. Guardiamo i numeri di oggi, capiamo dove sei
                  e dove vuoi arrivare. Nessun obbligo, nessun preventivo automatico.
                </p>
              </div>
            </div>
            <div className="lav-step" data-reveal="" data-reveal-d="2">
              <div className="lav-step-n" style={{ color: 'var(--violet)' }}>03</div>
              <div className="lav-step-body">
                <h3 className="h3" style={{ color: 'var(--paper)' }}>Ti facciamo una proposta</h3>
                <p className="body" style={{ marginTop: 10, color: 'rgba(247,244,238,.72)', maxWidth: '36ch' }}>
                  Se c&apos;è la sintonia giusta, prepariamo una proposta su misura: obiettivi, servizi,
                  tempistiche e budget. Chiara, non quella standard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FORM + INFO (paper)
          ============================================================ */}
      <section className="section" data-bg="paper" id="form">
        <div className="wrap">
          <div className="lav-grid">
            <ContactForm />

            <aside className="lav-info" data-reveal="" data-reveal-d="2">
              <div className="lav-info-block">
                <span className="mono-xs lav-info-label">// email diretta</span>
                <a className="lav-info-link" href="mailto:ciao@fooody.it">ciao@fooody.it</a>
              </div>

              <div className="lav-info-block">
                <span className="mono-xs lav-info-label">// social</span>
                <div className="lav-socials">
                  <a className="lav-social-link" href="#" target="_blank" rel="noopener">
                    Instagram <span className="arrow">↗</span>
                  </a>
                  <a className="lav-social-link" href="#" target="_blank" rel="noopener">
                    TikTok <span className="arrow">↗</span>
                  </a>
                  <a className="lav-social-link" href="#" target="_blank" rel="noopener">
                    LinkedIn <span className="arrow">↗</span>
                  </a>
                </div>
              </div>

              <div className="lav-info-block">
                <span className="mono-xs lav-info-label">// dove siamo</span>
                <p className="body" style={{ color: 'var(--ink-2)', marginTop: 6 }}>
                  Milano<br />
                  <span style={{ color: 'var(--ink-3)' }}>Lavoriamo su tutto il territorio italiano.</span>
                </p>
              </div>

              <div className="lav-info-block lav-info-callout">
                <div className="lav-callout-n">0€</div>
                <p className="body" style={{ color: 'var(--ink-2)', marginTop: 8, maxWidth: '26ch' }}>
                  La prima call è sempre gratuita. Nessun obbligo, nessun preventivo automatico.
                </p>
              </div>

              <div className="lav-info-block">
                <span className="mono-xs lav-info-label">// di cosa ci occupiamo</span>
                <div className="lav-services-list">
                  <a className="lav-svc" href="/metodo" data-transition="" data-transition-word="Metodo">
                    <span className="lav-svc-idx" style={{ color: 'var(--gold-deep)' }}>01</span>
                    <span>Metodo Fooody</span>
                    <span className="arrow">↗</span>
                  </a>
                  <a className="lav-svc" href="/social" data-transition="" data-transition-word="Social">
                    <span className="lav-svc-idx" style={{ color: 'var(--tomato-deep)' }}>02</span>
                    <span>Social Media</span>
                    <span className="arrow">↗</span>
                  </a>
                  <a className="lav-svc" href="/web" data-transition="" data-transition-word="Web">
                    <span className="lav-svc-idx" style={{ color: 'var(--violet-deep)' }}>03</span>
                    <span>Web Design</span>
                    <span className="arrow">↗</span>
                  </a>
                  <a className="lav-svc" href="/branding" data-transition="" data-transition-word="Branding">
                    <span className="lav-svc-idx" style={{ color: 'var(--tomato-deep)' }}>04</span>
                    <span>Branding</span>
                    <span className="arrow">↗</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
