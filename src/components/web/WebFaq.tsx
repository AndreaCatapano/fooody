export const WEB_FAQS = [
  {
    question: 'Quale tecnologia usate per realizzare i siti web?',
    answer:
      'Dipende dal progetto — ed è una risposta precisa, non evasiva. Lavoriamo con WordPress, Next.js, React, Shopify e WooCommerce. La scelta arriva alla fine dell’audit, in base a chi gestirà i contenuti, a cosa il sito deve integrare e a come dovrà crescere. Nel documento di audit trovi la proposta di stack con le motivazioni.',
  },
  {
    question: 'Quanto costa realizzare un sito web su misura?',
    answer:
      'Non pubblichiamo un listino perché sarebbe una finzione: una landing page e un e-commerce con gestionale integrato sono progetti incomparabili. Quello che garantiamo è un preventivo chiaro dopo l’audit, con voci leggibili e senza sorprese in corso d’opera. Se il budget non regge il progetto ideale, te lo diciamo e definiamo insieme da dove partire.',
  },
  {
    question: 'Cosa succede dopo il lancio del sito?',
    answer:
      'Non spariamo. Ogni progetto include un periodo di garanzia sul lavoro svolto, e prima del lancio concordiamo un piano di assistenza: aggiornamenti, sicurezza, monitoraggio delle performance, piccole evoluzioni. Il sito resta tuo — codice e accessi inclusi — ma sai sempre chi chiamare.',
  },
  {
    question: 'Ho già un sito: potete migliorarlo senza rifarlo da zero?',
    answer:
      'Sì, ed è proprio a questo che serve l’audit. A volte il problema è la velocità, a volte la struttura, a volte i contenuti — e rifare tutto non è sempre la risposta giusta. Analizziamo quello che hai e ti diciamo onestamente se conviene intervenire o ripartire.',
  },
]

export default function WebFaq() {
  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="faq">
      <div className="wrap">
        <div className="eyebrow web-eyebrow">domande frequenti</div>
        <h2 className="h1 text-balance" data-kinetic="words" style={{ marginTop: 16, maxWidth: '18ch' }}>
          Domande frequenti
        </h2>

        <div className="web-faq-list" data-reveal="" data-reveal-d="2">
          {WEB_FAQS.map((f) => (
            <details className="web-faq-item" key={f.question}>
              <summary className="web-faq-q">
                <span>{f.question}</span>
                <span className="web-faq-icon" aria-hidden="true">+</span>
              </summary>
              <p className="body text-pretty web-faq-a">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
