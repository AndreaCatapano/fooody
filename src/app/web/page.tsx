import type { Metadata } from 'next'
import { buildMetadata, buildServiceSchema, buildFAQSchema } from '@/lib/seo'
import PageHero from '@/components/blocks/PageHero'
import CtaSection from '@/components/blocks/CtaSection'
import WebAnteprimaSection from '@/components/web/WebAnteprimaSection'
import WebCapabilitiesSection from '@/components/web/WebCapabilitiesSection'
import WebMetodoSection from '@/components/web/WebMetodoSection'
import WebFaq, { WEB_FAQS } from '@/components/web/WebFaq'

export const metadata: Metadata = buildMetadata('web')

const jsonLd = buildServiceSchema({
  name: 'Realizzazione siti web su misura',
  description:
    'Progettazione e sviluppo di siti web, e-commerce e web app partendo da un audit, non da un template. WordPress, Next.js, Shopify o WooCommerce in base al progetto.',
  serviceType: 'Realizzazione siti web',
  offers: ['Audit', 'Landing page', 'Sito corporate', 'E-commerce', 'Web app', 'SEO e GEO'],
})

const faqJsonLd = buildFAQSchema(WEB_FAQS.map((f) => ({ question: f.question, answer: f.answer })))

export default function WebPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow={<div className="eyebrow no-slash web-accent-fg">— web design · ux · sviluppo</div>}
        heading={<>Non un template.<br />Un sito su misura,<br />dall&apos;audit al lancio.</>}
        headingStyle={{ marginTop: 20, maxWidth: '16ch' }}
        lead="Landing, corporate, e-commerce o web app: prima l'audit, poi la tecnologia giusta. E dopo il lancio restiamo."
        leadStyle={{ maxWidth: '46ch' }}
        footerClass="web-hero-foot"
        ctaClass="web-hero-cta"
        ctaPrimary={{
          label: <>Parliamo del tuo progetto <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn web-btn lg',
          dataTransitionWord: 'Contatti',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="tlink" href="#metodo" style={{ color: 'rgba(247,244,238,.7)' }}>
            Scopri come lavoriamo <span className="arrow">↓</span>
          </a>
        }
      />

      <WebAnteprimaSection />
      <WebCapabilitiesSection />
      <WebMetodoSection />
      <WebFaq />

      <CtaSection
        eyebrow="— pronti a costruire?"
        eyebrowClass="web-accent-fg"
        heading={<>Raccontaci<br />il progetto</>}
        lead="Una call di mezz'ora, senza impegno. Ci racconti dove sei e dove vuoi arrivare; noi ti diciamo cosa serve davvero — e cosa no."
        ctaPrimary={{
          label: <>Prenota una call <span className="arrow">↗</span></>,
          href: '/contatti',
          className: 'btn web-btn lg',
          dataTransitionWord: 'Contatti',
          dataMagnetic: '0.3',
        }}
        ctaSecondary={
          <a className="btn on-ink ghost lg" href="mailto:ciao@fooody.it">
            <span className="btn-label">ciao@fooody.it</span>
          </a>
        }
      />
    </>
  )
}
