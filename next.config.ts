import type { NextConfig } from 'next'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'

// Nonce-based CSP richiederebbe rendering dinamico su tutte le pagine (niente
// più export statico/cache CDN) — inaccettabile per un sito vetrina che punta
// alle massime performance. Si usa quindi una policy statica con allowlist
// esplicita dei domini di terze parti (GA4, Iubenda) invece di 'unsafe-eval'
// sempre attivo. 'unsafe-inline' resta necessario per gli script inline
// (JSON-LD, page-theme, consent mode) finché non si passa a nonce/SRI.
const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://cs.iubenda.com https://cdn.iubenda.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.iubenda.com",
  "frame-src https://*.iubenda.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
]

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: cspDirectives.join('; '),
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: false, /* dev-only: disables double-render, halves React overhead in dev */
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        // script pubblici senza hash nel nome → cache 1 settimana + rinnovo silenzioso
        source: '/:file(motion|hero-cine|hero-effects)\\.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
