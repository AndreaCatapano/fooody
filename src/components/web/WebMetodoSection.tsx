const STEPS = [
  {
    idx: '01',
    title: 'Audit',
    body: [
      'Prima di progettare qualsiasi cosa, capiamo. Quali sono gli obiettivi del business, chi sono i tuoi clienti, come il tuo brand comunica con loro oggi — e con quali materiali: contenuti, foto, identità visiva, dati di traffico se un sito esiste già.',
      "L'audit serve anche se parti da zero: in quel caso analizziamo il mercato, i competitor e quello che i tuoi clienti cercano davvero. Tu non devi preparare nulla di tecnico — bastano una call e l'accesso a quello che hai.",
      'Alla fine ricevi un documento chiaro: cosa serve, cosa non serve, con quali priorità e con quale tecnologia. È qui che scegliamo lo stack — alla fine dell’audit, mai prima. Se ti proponiamo WordPress invece di una web app custom (o viceversa), sai esattamente perché.',
    ],
  },
  {
    idx: '02',
    title: 'Design',
    body: [
      "Il design parte da quello che l'audit ci ha detto: il tono del brand, i contenuti reali, gli obiettivi di ogni pagina. Niente lorem ipsum, niente layout riempiti a caso: progettiamo sull'esistente, e dove i contenuti mancano ti aiutiamo a crearli.",
      'Prima di scrivere una riga di codice vedi un prototipo navigabile: struttura, gerarchie, interazioni. Si discute, si rivede, si approva. I cambi di rotta costano poco in questa fase — è esattamente il momento in cui devono avvenire.',
    ],
  },
  {
    idx: '03',
    title: 'Sviluppo',
    body: [
      "Sviluppiamo sul design approvato, con la tecnologia scelta durante l'audit. WordPress quando il tuo team deve gestire i contenuti in autonomia; Next.js quando servono prestazioni, integrazioni e logiche su misura; Shopify o WooCommerce quando si vende online.",
      "Qualunque sia lo stack, gli standard non cambiano: Core Web Vitals in verde, accessibilità WCAG, codice pulito e documentato che un domani potrebbe toccare anche qualcun altro — perché il sito è tuo, non nostro. Prima del lancio, test su dispositivi e browser reali.",
    ],
  },
  {
    idx: '04',
    title: 'Ottimizzazione e assistenza',
    body: [
      'Il sito nasce già ottimizzato: SEO tecnica, struttura semantica, dati strutturati, performance non sono un extra da aggiungere dopo, sono dentro dal primo commit. In più lavoriamo sulla GEO — Generative Engine Optimization: fare in modo che il tuo sito venga trovato e citato anche quando i tuoi clienti chiedono a ChatGPT o a Google AI, non solo quando cercano su Google.',
      "Sempre più persone non cercano: chiedono. A ChatGPT, a Gemini, alle AI Overviews di Google. Se il tuo sito non è strutturato per essere letto e citato da questi sistemi, per una fetta crescente di clienti semplicemente non esisti.",
      "La GEO è l'insieme di pratiche che rendono i tuoi contenuti comprensibili e citabili dalle intelligenze artificiali: struttura semantica, risposte esplicite alle domande del tuo pubblico, dati strutturati, autorevolezza verificabile. La integriamo in ogni progetto, perché ottimizzare solo per Google, oggi, significa ottimizzare per metà del pubblico di domani.",
      'E poi il lancio. Che per noi apre una fase, non la chiude: monitoraggio, aggiornamenti di sicurezza, piccole evoluzioni, dati alla mano per capire cosa funziona e cosa migliorare. Concordiamo insieme un piano di assistenza proporzionato al progetto — così sai sempre chi chiamare, e quanto costa.',
    ],
  },
]

export default function WebMetodoSection() {
  return (
    <section className="section" data-bg="paper-2" style={{ background: 'var(--paper-2)' }} id="metodo">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow web-eyebrow">il metodo</div>
            <h2 className="hero-type" data-kinetic="lines" style={{ marginTop: 16 }}>
              Come lavoriamo
            </h2>
          </div>
          <p className="small" style={{ maxWidth: '42ch' }}>
            Il processo è sempre lo stesso, in quattro passaggi. Quello che cambia è dove ci porta:
            ogni fase produce le risposte che servono alla successiva. Per questo il risultato è
            su misura — non perché lo scriviamo qui, ma perché non potrebbe essere altrimenti.
          </p>
        </div>

        <div className="web-metodo-list">
          {STEPS.map((s) => (
            <details className="web-metodo-step" key={s.idx}>
              <summary className="web-metodo-q">
                <span className="numeral web-metodo-idx">{s.idx}</span>
                <h3 className="h3 web-metodo-title">{s.title}</h3>
                <span className="web-metodo-icon" aria-hidden="true">+</span>
              </summary>
              <div className="web-metodo-body">
                {s.body.map((p, i) => (
                  <p className="body text-pretty" key={i}>{p}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
