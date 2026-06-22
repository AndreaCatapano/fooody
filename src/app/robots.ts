import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fooody.it'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Consenti tutto a Google Search (Googlebot) e Bing
      { userAgent: '*', allow: '/' },
      // Blocca i crawler di training AI (non influenza ranking Google/ChatGPT browsing)
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
