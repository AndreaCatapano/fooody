import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata('privacy')

export default function PrivacyPage() {
  return (
    <main
      id="main-content"
      style={{ padding: 'var(--s10, 80px) var(--wrap-pad, 24px)', maxWidth: 720, margin: '0 auto' }}
    >
      <h1 style={{ marginBottom: '1.5rem' }}>Privacy Policy</h1>

      <p>
        <strong>Titolare del trattamento:</strong> Fooody — ciao@fooody.it
      </p>

      <h2 id="cookie" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>
        Dati raccolti e finalità
      </h2>
      <p>
        Questa pagina è in fase di aggiornamento. Per informazioni complete sul trattamento dei tuoi dati
        personali o sulla nostra policy cookie, scrivi a{' '}
        <a href="mailto:ciao@fooody.it">ciao@fooody.it</a>.
      </p>

      <h2 style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Cookie</h2>
      <p>
        Il sito utilizza esclusivamente cookie tecnici necessari al funzionamento delle pagine. Non
        utilizziamo cookie di profilazione o di terze parti senza previo consenso.
      </p>

      <h2 style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>I tuoi diritti (GDPR)</h2>
      <p>
        Ai sensi del Regolamento UE 2016/679 (GDPR), hai diritto di accedere ai tuoi dati, rettificarli,
        cancellarli, limitarne il trattamento e opporti al loro utilizzo. Per esercitare questi diritti
        contattaci a <a href="mailto:ciao@fooody.it">ciao@fooody.it</a>.
      </p>

      <p style={{ marginTop: '3rem', fontSize: '0.85rem', opacity: 0.6 }}>
        Ultimo aggiornamento: 2026 — documento in fase di completamento.
      </p>
    </main>
  )
}
