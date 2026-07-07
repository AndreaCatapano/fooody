'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

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
        // qualcosa è andato storto
      </div>
      <h1 style={{ marginBottom: '1.5rem' }}>Ops, si è bruciato qualcosa in cucina.</h1>
      <p className="lead text-pretty" style={{ color: 'var(--ink-2)', marginBottom: '2.5rem' }}>
        Si è verificato un errore imprevisto. Riprova, oppure torna alla home.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn accent lg" onClick={() => reset()}>
          <span className="btn-label">Riprova <span className="arrow">↗</span></span>
        </button>
        <a className="btn ghost lg" href="/">
          <span className="btn-label">Torna alla home</span>
        </a>
      </div>
    </div>
  )
}
