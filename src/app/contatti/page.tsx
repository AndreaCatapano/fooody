import type { Metadata } from 'next'
import ContattiClient from './ContattiClient'

export const metadata: Metadata = {
  title: 'Lavoriamo insieme — Fooody',
  description: 'Raccontaci il tuo progetto. Prima call gratuita: guardiamo i numeri di oggi e da dove far partire la crescita.',
}

export default function ContattiPage() {
  return <ContattiClient />
}
