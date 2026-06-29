import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata('lavori')

const CASE_STUDIES = [
  { slug: 'trattoria-tale', label: 'Trattoria Tale' },
]

export default function LavoriPage() {
  return (
    <main
      id="main-content"
      style={{ padding: 'var(--s10, 80px) var(--wrap-pad, 24px)', maxWidth: 960, margin: '0 auto' }}
    >
      <div className="eyebrow no-slash" style={{ marginBottom: '1rem' }}>
        — portfolio · lavori
      </div>

      <h1 style={{ marginBottom: '1.5rem' }}>I nostri casi studio arriveranno presto.</h1>

      <p style={{ maxWidth: '52ch', marginBottom: '2.5rem' }}>
        Stiamo raccogliendo i dati di progetto e scrivendo i case study in dettaglio.
        Nel frattempo puoi scoprire il nostro approccio nella pagina{' '}
        <a href="/metodo" data-transition="" data-transition-word="Metodo">Metodo Fooody</a>.
      </p>

      {CASE_STUDIES.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {CASE_STUDIES.map(({ slug, label }) => (
            <li key={slug} style={{ marginBottom: '0.75rem' }}>
              <span style={{ opacity: 0.5 }}>{label} — case study in arrivo</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
