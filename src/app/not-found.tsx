import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina non trovata',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div
      style={{
        padding: 'var(--s10, 128px) var(--wrap-pad, 24px)',
        maxWidth: 720,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div className="eyebrow no-slash" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
        // errore 404
      </div>
      <h1 style={{ marginBottom: '1.5rem' }}>Questa pagina si è persa tra i fornelli.</h1>
      <p className="lead text-pretty" style={{ color: 'var(--ink-2)', marginBottom: '2.5rem' }}>
        Il link che hai seguito non esiste o è stato spostato. Torniamo in cucina.
      </p>
      <a className="btn accent lg" href="/" data-transition="">
        <span className="btn-label">Torna alla home <span className="arrow">↗</span></span>
      </a>
    </div>
  )
}
