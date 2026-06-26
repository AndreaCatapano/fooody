/**
 * Diagnosi: waterfall rete + timing del load event
 * Apriamo la homepage e logghiamo ogni risorsa con il suo tempo di risposta.
 */
import { chromium } from '@playwright/test'

const BASE_URL = 'https://fooody-red.vercel.app'
const ROUTE = '/'

interface ReqEntry {
  url: string
  method: string
  resourceType: string
  status: number | null
  startMs: number
  durationMs: number | null
  sizeBytes: number | null
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const page = await context.newPage()

  const entries: ReqEntry[] = []
  const t0 = Date.now()
  const pendingStart: Map<string, number> = new Map()

  page.on('request', (req) => {
    const key = req.url() + '|' + req.method()
    pendingStart.set(key, Date.now())
  })

  page.on('response', async (res) => {
    const req = res.request()
    const key = req.url() + '|' + req.method()
    const start = pendingStart.get(key) ?? Date.now()
    const dur = Date.now() - start

    let size: number | null = null
    try {
      const body = await res.body()
      size = body.length
    } catch {}

    entries.push({
      url:          res.url(),
      method:       req.method(),
      resourceType: req.resourceType(),
      status:       res.status(),
      startMs:      start - t0,
      durationMs:   dur,
      sizeBytes:    size,
    })
  })

  page.on('requestfailed', (req) => {
    const key = req.url() + '|' + req.method()
    const start = pendingStart.get(key) ?? Date.now()
    entries.push({
      url: req.url(), method: req.method(),
      resourceType: req.resourceType(),
      status: null, startMs: start - t0,
      durationMs: Date.now() - start, sizeBytes: null,
    })
  })

  console.log(`\nDiagnosi waterfall: ${BASE_URL}${ROUTE}\n`)

  let loadFiredAt: number | null = null
  page.on('load', () => { loadFiredAt = Date.now() - t0 })

  await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'load', timeout: 90000 })
  const totalMs = Date.now() - t0

  await browser.close()

  // sort by finish time (start + duration)
  entries.sort((a, b) => {
    const af = a.startMs + (a.durationMs ?? 0)
    const bf = b.startMs + (b.durationMs ?? 0)
    return af - bf
  })

  console.log(`── load event fired: ${loadFiredAt ?? '?'} ms`)
  console.log(`── total elapsed:    ${totalMs} ms`)
  console.log(`── requests total:   ${entries.length}\n`)

  // Top 20 slowest / last-finishing resources
  const top = [...entries]
    .sort((a, b) => (b.durationMs ?? 0) - (a.durationMs ?? 0))
    .slice(0, 20)

  console.log('TOP 20 risorse più lente (durée decrescente):')
  console.log('─'.repeat(120))
  const fmt = (n: number | null) => n !== null ? String(n).padStart(7) : '    n/a'
  console.log(`${'TYPE'.padEnd(14)} ${'STATUS'.padEnd(7)} ${'START(ms)'.padStart(9)} ${'DUR(ms)'.padStart(8)} ${'SIZE(B)'.padStart(9)}  URL`)
  console.log('─'.repeat(120))
  for (const e of top) {
    const shortUrl = e.url.length > 80 ? '…' + e.url.slice(-79) : e.url
    console.log(
      `${e.resourceType.padEnd(14)} ${String(e.status ?? '?').padEnd(7)} ${fmt(e.startMs)} ${fmt(e.durationMs)} ${fmt(e.sizeBytes)}  ${shortUrl}`
    )
  }

  // Last resource to finish
  const last = entries[entries.length - 1]
  console.log(`\n── ULTIMA risorsa a finire (a ${(last.startMs + (last.durationMs ?? 0)).toFixed(0)} ms):`)
  console.log(`   ${last.resourceType} · ${last.status} · ${last.url}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
