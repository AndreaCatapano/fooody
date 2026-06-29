import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { PageTransition } from '@/components/PageTransition'
import SmoothScroll from '@/components/SmoothScroll'
import { SITE, buildOrganizationSchema } from '@/lib/seo'

const mont = localFont({
  src: [
    { path: './fonts/Mont-Regular.woff2',  weight: '400', style: 'normal' },
    { path: './fonts/Mont-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Mont-Bold.woff2',     weight: '700', style: 'normal' },
  ],
  variable: '--font-mont',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Agenzia creativa food`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.name,
    title: `${SITE.name} — Agenzia creativa food`,
    description: SITE.descriptionShort,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: `${SITE.name} — Agenzia creativa food` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Agenzia creativa food`,
    description: SITE.descriptionShort,
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: { icon: '/favicon.ico' },
  alternates: { canonical: '/', languages: { 'it': 'https://fooody.it' } },
}

const orgSchema = JSON.stringify(buildOrganizationSchema())

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={mont.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgSchema }}
        />
        <a href="#main-content" className="skip-link">
          Vai al contenuto principale
        </a>

        <PageTransition />
        <div className="scroll-progress" />

        <Nav />

        <main id="main-content">{children}</main>

        <Footer />

        <Script id="page-theme" strategy="beforeInteractive">{`
          document.documentElement.dataset.page=(location.pathname.replace(/^\//,'').split('/')[0]||'home');
        `}</Script>

        <Script src="/motion.js" strategy="afterInteractive" />
        <SmoothScroll />
      </body>
    </html>
  )
}
