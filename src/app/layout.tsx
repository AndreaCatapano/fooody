import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import TweaksPanel from '@/components/TweaksPanel'
import { MaskWord } from '@/components/MaskWord'

const mont = localFont({
  src: [
    { path: './fonts/Mont-Regular.otf',  weight: '400', style: 'normal' },
    { path: './fonts/Mont-SemiBold.otf', weight: '600', style: 'normal' },
    { path: './fonts/Mont-Bold.otf',     weight: '700', style: 'normal' },
  ],
  variable: '--font-mont',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fooody.it'),
  title: {
    default: 'Fooody — Agenzia creativa food',
    template: '%s · Fooody',
  },
  description:
    'Strategia, social, branding e web per chi ha qualcosa di buono da dire. Agenzia creativa specializzata nel food.',
  authors: [{ name: 'Fooody' }],
  creator: 'Fooody',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Fooody',
    title: 'Fooody — Agenzia creativa food',
    description:
      'Strategia, social, branding e web per chi ha qualcosa di buono da dire.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fooody — Agenzia creativa food' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fooody — Agenzia creativa food',
    description: 'Strategia, social, branding e web per chi ha qualcosa di buono da dire.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: { icon: '/favicon.ico' },
  alternates: { canonical: '/' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${mont.variable} ${cormorant.variable} ${mono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Vai al contenuto principale
        </a>

        <div className="page-mask" aria-hidden="true">
          <div className="panel" />
          <div className="panel" />
          <div className="panel">
            <MaskWord />
          </div>
          <div className="panel" />
          <div className="panel" />
        </div>
        <div className="scroll-progress" />

        <Nav />

        <main id="main-content">{children}</main>

        <Footer />

        <TweaksPanel />

        <Script id="tweaks-init" strategy="beforeInteractive">{`
          var _def = { intro:true, workHover:'tilt', particleCount:80, particleDir:'sparpaglia', particleSize:100, assemblySpeed:'normale', scrollSensitivity:'normale', particleColor:'ink', glow:false, exitMode:'radiale', exitCurve:'lineare', exitFade:'normale' };
          try {
            var s = localStorage.getItem('fooody_tweaks');
            window.FOOODY_TWEAKS = s ? Object.assign({}, _def, JSON.parse(s)) : _def;
          } catch(e) {
            window.FOOODY_TWEAKS = _def;
          }
        `}</Script>

        <Script src="/motion.js" strategy="afterInteractive" />
        <Script src="/hero-effects.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
