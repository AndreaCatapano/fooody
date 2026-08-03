export interface Testimonianza {
  quote: string
  name: string
  attivita: string
  kpis?: { value: string; label: string; color: string }[]
}

// TODO cliente: recensioni aggiuntive da fornire. Finché l'array ha 1 sola
// voce il carosello resta disattivato (vedi StuTestimonianza.tsx).
export const TESTIMONIANZE: Testimonianza[] = [
  {
    quote:
      'I ragazzi mi hanno fatto letteralmente volare sui social! Inizialmente ero scettico, poi con loro ho capito la vera opportunità di guadagno che ti danno i social se gestiti bene come fanno loro.',
    name: 'Alessio Ippolis',
    attivita: 'Paninoteca Il Mastone',
    kpis: [
      { value: '5M', label: 'views', color: 'var(--tomato-deep)' },
      { value: '+28k', label: 'community', color: 'var(--gold-deep)' },
      { value: '4', label: 'mesi', color: 'var(--violet-deep)' },
    ],
  },
]
