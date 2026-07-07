import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'

// TODO: sostituire favicon.ico con icone reali 192×192 e 512×512 (PNG)
// quando arriva il logo dal cliente — vedi CLAUDE.md "OG image (TODO cliente)".
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Agenzia creativa food`,
    short_name: SITE.name,
    description: SITE.descriptionShort,
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f4ee',
    theme_color: '#17130f',
    lang: 'it',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
