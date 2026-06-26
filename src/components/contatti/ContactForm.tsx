'use client'
import { useEffect, useRef } from 'react'

export default function ContactForm() {
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
