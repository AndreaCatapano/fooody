/**
 * Controlla header HTTP delle risorse più lente — Cache-Control, x-vercel-cache, content-encoding
 */
import { chromium } from '@playwright/test'

const URL = 'https://fooody-red.vercel.app/'
const WATCH = ['0j444apvgy93f.js', '0q8x9wi9idlb6.js', '0z0eiinfwx5yc.js', 'woff2', '.css', 'motion.js']

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  const t0 = Date.now()

  page.on('response', async (res) => {
    const url = res.url()
    if (!WATCH.some(p => url.includes(p))) return

    const headers = res.headers()
    const ttfb = Date.now() - t0
    const size = res.headers()['content-length'] ?? '?'

    console.log(`\n── ${url.split('/').pop()}`)
    console.log(`   TTFB:             ${ttfb} ms`)
    console.log(`   content-length:   ${size}`)
    console.log(`   content-encoding: ${headers['content-encoding'] ?? 'none (no compression!)'}`)
    console.log(`   cache-control:    ${headers['cache-control'] ?? 'missing'}`)
    console.log(`   x-vercel-cache:   ${headers['x-vercel-cache'] ?? 'missing'}`)
    console.log(`   cf-cache-status:  ${headers['cf-cache-status'] ?? '-'}`)
  })

  await page.goto(URL, { waitUntil: 'load', timeout: 90000 })
  await browser.close()
}

main().catch(err => { console.error(err); process.exit(1) })
