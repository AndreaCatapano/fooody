import { redirect } from 'next/navigation'

// Catch-all per i singoli case study non ancora pubblicati.
// Reindirizza con 301 alla pagina lavori principale.
export default function LavoriSlugPage() {
  redirect('/lavori')
}
