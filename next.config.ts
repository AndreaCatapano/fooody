import type { NextConfig } from 'next'
import path from 'path'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
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
