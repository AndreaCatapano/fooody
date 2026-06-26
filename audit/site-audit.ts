/**
 * Fooody Site Audit — Playwright Chromium
 * Covers: console errors, network failures, performance (LCP/CLS), SEO meta,
 *         layout overflow, accessibility (axe-core via CDN), screenshots
 */
import { chromium, Browser, Page } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

const BASE_URL = 'https://fooody-red.vercel.app'

const ROUTES = [
  { path: '/',          label: 'Homepage'  },
  { path: '/studio',   label: 'Studio'    },
  { path: '/metodo',   label: 'Metodo'    },
  { path: '/branding', label: 'Branding'  },
  { path: '/social',   label: 'Social'    },
  { path: '/web',      label: 'Web'       },
  { path: '/contatti', label: 'Contatti'  },
]

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile',  width: 390,  height: 844 },
]

interface RouteResult {
  route: string
  label: string
  viewport: string
  url: string
  httpStatus: number | null
  loadTimeMs: number
  consoleErrors: string[]
  consoleWarnings: string[]
  networkFailures: string[]
  network404s: string[]
  lcp: number | null
  cls: number | null
  hasHorizontalScroll: boolean
  metaTitle: string | null
  metaDescription: string | null
  canonicalUrl: string | null
  ogTitle: string | null
  ogImage: string | null
  h1Count: number
  h1Text: string[]
  imgMissingAlt: number
  screenshots: string[]
  axeViolations: AxeViolation[]
}

interface AxeViolation {
  id: string
  impact: string | null | undefined
  description: string
  nodes: number
}

const OUTPUT_DIR = path.join(__dirname, 'audit-results')
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots')

function ensureDirs() {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true })
}

async function injectAxe(page: Page): Promise<void> {
  // inject axe-core from CDN
  await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.1/axe.min.js' })
}

async function runAxe(page: Page): Promise<AxeViolation[]> {
  try {
    await injectAxe(page)
    const results = await page.evaluate(async () => {
      // @ts-ignore
      const r = await window.axe.run()
      return r.violations
    })
    return results.map((v: any) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.length,
    }))
  } catch {
    return []
  }
}

async function measureWebVitals(page: Page): Promise<{ lcp: number | null; cls: number | null }> {
  return page.evaluate(() => {
    return new Promise<{ lcp: number | null; cls: number | null }>((resolve) => {
      let lcp: number | null = null
      let cls = 0

      const lcpObs = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        if (entries.length) lcp = entries[entries.length - 1].startTime
      })
      try { lcpObs.observe({ type: 'largest-contentful-paint', buffered: true }) } catch {}

      const clsObs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const e = entry as any
          if (!e.hadRecentInput) cls += e.value
        }
      })
      try { clsObs.observe({ type: 'layout-shift', buffered: true }) } catch {}

      setTimeout(() => {
        lcpObs.disconnect()
        clsObs.disconnect()
        resolve({ lcp, cls: Math.round(cls * 1000) / 1000 })
      }, 4000)
    })
  })
}

async function auditRoute(
  browser: Browser,
  route: { path: string; label: string },
  viewport: { name: string; width: number; height: number }
): Promise<RouteResult> {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    userAgent: viewport.name === 'mobile'
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  })
  const page = await context.newPage()

  const consoleErrors: string[] = []
  const consoleWarnings: string[] = []
  const networkFailures: string[] = []
  const network404s: string[] = []
  let httpStatus: number | null = null

  page.on('console', (msg) => {
    if (msg.type() === 'error')   consoleErrors.push(msg.text())
    if (msg.type() === 'warning') consoleWarnings.push(msg.text())
  })

  page.on('requestfailed', (req) => {
    networkFailures.push(`${req.method()} ${req.url()} — ${req.failure()?.errorText}`)
  })

  page.on('response', (res) => {
    if (res.status() === 404) network404s.push(res.url())
  })

  const url = `${BASE_URL}${route.path}`
  const t0 = Date.now()

  const response = await page.goto(url, { waitUntil: 'load', timeout: 60000 })
  httpStatus = response?.status() ?? null

  // extra wait for animations/lazy elements
  await page.waitForTimeout(3000)

  const loadTimeMs = Date.now() - t0

  // web vitals (4s observation window embedded in page)
  const vitalsPromise = measureWebVitals(page)

  // meta / SEO
  const metaTitle       = await page.title()
  const metaDescription = await page.$eval('meta[name="description"]', (el: Element) => (el as HTMLMetaElement).content).catch(() => null)
  const canonicalUrl    = await page.$eval('link[rel="canonical"]', (el: Element) => (el as HTMLLinkElement).href).catch(() => null)
  const ogTitle         = await page.$eval('meta[property="og:title"]', (el: Element) => (el as HTMLMetaElement).content).catch(() => null)
  const ogImage         = await page.$eval('meta[property="og:image"]', (el: Element) => (el as HTMLMetaElement).content).catch(() => null)

  // h1
  const h1Text: string[] = await page.$$eval('h1', (els: Element[]) => els.map((e) => e.textContent?.trim() ?? ''))
  const h1Count = h1Text.length

  // images missing alt
  const imgMissingAlt: number = await page.$$eval('img', (imgs: Element[]) =>
    imgs.filter((img) => !(img as HTMLImageElement).alt).length
  )

  // horizontal scroll
  const hasHorizontalScroll: boolean = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)

  // axe accessibility
  const axeViolations = await runAxe(page)

  // screenshots
  const screenshots: string[] = []
  const slug = route.path.replace(/\//g, '_').replace(/^_/, '') || 'home'
  const shotName = `${slug}__${viewport.name}.png`
  const shotPath = path.join(SCREENSHOTS_DIR, shotName)
  await page.screenshot({ path: shotPath, fullPage: true })
  screenshots.push(shotName)

  const vitals = await vitalsPromise

  await context.close()

  return {
    route: route.path,
    label: route.label,
    viewport: viewport.name,
    url,
    httpStatus,
    loadTimeMs,
    consoleErrors,
    consoleWarnings,
    networkFailures,
    network404s,
    lcp: vitals.lcp,
    cls: vitals.cls,
    hasHorizontalScroll,
    metaTitle,
    metaDescription,
    canonicalUrl,
    ogTitle,
    ogImage,
    h1Count,
    h1Text,
    imgMissingAlt,
    screenshots,
    axeViolations,
  }
}

function clsRating(cls: number | null): string {
  if (cls === null) return '⚪ n/a'
  if (cls <= 0.1) return '🟢 good'
  if (cls <= 0.25) return '🟡 needs improvement'
  return '🔴 poor'
}

function lcpRating(lcp: number | null): string {
  if (lcp === null) return '⚪ n/a'
  if (lcp <= 2500) return '🟢 good'
  if (lcp <= 4000) return '🟡 needs improvement'
  return '🔴 poor'
}

function generateReport(results: RouteResult[]): string {
  const ts = new Date().toISOString()
  let md = `# Fooody Site Audit\n**Date:** ${ts}\n**Base URL:** ${BASE_URL}\n\n---\n\n`

  // summary table
  md += `## Summary\n\n`
  md += `| Route | Viewport | HTTP | Load (ms) | LCP (ms) | CLS | H.Scroll | Console Errors | Axe Violations |\n`
  md += `|-------|----------|------|-----------|----------|-----|----------|----------------|----------------|\n`

  for (const r of results) {
    const lcpMs = r.lcp !== null ? Math.round(r.lcp) : 'n/a'
    const clsVal = r.cls !== null ? r.cls.toFixed(3) : 'n/a'
    md += `| ${r.route} | ${r.viewport} | ${r.httpStatus ?? '?'} | ${r.loadTimeMs} | ${lcpMs} | ${clsVal} | ${r.hasHorizontalScroll ? '🔴 YES' : '✅ no'} | ${r.consoleErrors.length} | ${r.axeViolations.length} |\n`
  }

  md += `\n---\n\n`

  // per-route details
  for (const r of results) {
    md += `## ${r.label} — \`${r.route}\` (${r.viewport})\n\n`

    md += `### Performance\n`
    md += `- **Load time:** ${r.loadTimeMs} ms\n`
    md += `- **LCP:** ${r.lcp !== null ? Math.round(r.lcp) + ' ms' : 'n/a'} ${lcpRating(r.lcp)}\n`
    md += `- **CLS:** ${r.cls !== null ? r.cls.toFixed(3) : 'n/a'} ${clsRating(r.cls)}\n`
    md += `- **Horizontal scroll:** ${r.hasHorizontalScroll ? '🔴 YES — layout overflow!' : '✅ none'}\n\n`

    md += `### SEO & Meta\n`
    md += `- **Title:** ${r.metaTitle || '⚠️ missing'}\n`
    md += `- **Description:** ${r.metaDescription || '⚠️ missing'}\n`
    md += `- **Canonical:** ${r.canonicalUrl || '⚠️ missing'}\n`
    md += `- **OG Title:** ${r.ogTitle || '⚠️ missing'}\n`
    md += `- **OG Image:** ${r.ogImage || '⚠️ missing'}\n`
    md += `- **H1 count:** ${r.h1Count} ${r.h1Count !== 1 ? '⚠️ should be exactly 1' : '✅'}\n`
    if (r.h1Text.length) md += `- **H1 text:** ${r.h1Text.map(t => `"${t}"`).join(', ')}\n`
    md += `- **Img missing alt:** ${r.imgMissingAlt > 0 ? `🔴 ${r.imgMissingAlt}` : '✅ 0'}\n\n`

    md += `### Console\n`
    if (r.consoleErrors.length === 0 && r.consoleWarnings.length === 0) {
      md += `✅ No errors or warnings\n\n`
    } else {
      if (r.consoleErrors.length) {
        md += `**Errors (${r.consoleErrors.length}):**\n`
        r.consoleErrors.forEach(e => { md += `- \`${e}\`\n` })
        md += `\n`
      }
      if (r.consoleWarnings.length) {
        md += `**Warnings (${r.consoleWarnings.length}):**\n`
        r.consoleWarnings.forEach(w => { md += `- \`${w}\`\n` })
        md += `\n`
      }
    }

    md += `### Network\n`
    if (r.network404s.length === 0 && r.networkFailures.length === 0) {
      md += `✅ No failures or 404s\n\n`
    } else {
      if (r.network404s.length) {
        md += `**404s (${r.network404s.length}):**\n`
        r.network404s.forEach(u => { md += `- ${u}\n` })
        md += `\n`
      }
      if (r.networkFailures.length) {
        md += `**Failures (${r.networkFailures.length}):**\n`
        r.networkFailures.forEach(f => { md += `- ${f}\n` })
        md += `\n`
      }
    }

    if (r.axeViolations.length > 0) {
      md += `### Accessibility (axe-core)\n`
      md += `**${r.axeViolations.length} violation(s):**\n`
      r.axeViolations.forEach(v => {
        md += `- **[${v.impact?.toUpperCase() ?? 'unknown'}]** \`${v.id}\` — ${v.description} (${v.nodes} node${v.nodes !== 1 ? 's' : ''})\n`
      })
      md += `\n`
    } else {
      md += `### Accessibility\n✅ No axe violations\n\n`
    }

    md += `### Screenshot\n\`audit/audit-results/screenshots/${r.screenshots[0]}\`\n\n`
    md += `---\n\n`
  }

  return md
}

async function main() {
  ensureDirs()

  console.log(`🚀 Starting audit of ${BASE_URL}`)
  console.log(`   Routes: ${ROUTES.length} × Viewports: ${VIEWPORTS.length} = ${ROUTES.length * VIEWPORTS.length} pages\n`)

  const browser = await chromium.launch({ headless: true })
  const results: RouteResult[] = []

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      process.stdout.write(`  → ${route.label} (${viewport.name})... `)
      try {
        const result = await auditRoute(browser, route, viewport)
        results.push(result)
        const issues = result.consoleErrors.length + result.axeViolations.length + result.network404s.length
        const flag = issues > 0 ? `⚠️  ${issues} issue(s)` : '✅'
        console.log(`${flag} [${result.loadTimeMs}ms, LCP:${result.lcp !== null ? Math.round(result.lcp) : 'n/a'}ms, CLS:${result.cls?.toFixed(3) ?? 'n/a'}]`)
      } catch (err: any) {
        console.log(`❌ ERROR: ${err.message}`)
        results.push({
          route: route.path, label: route.label, viewport: viewport.name,
          url: `${BASE_URL}${route.path}`, httpStatus: null, loadTimeMs: 0,
          consoleErrors: [`AUDIT ERROR: ${err.message}`], consoleWarnings: [],
          networkFailures: [], network404s: [], lcp: null, cls: null,
          hasHorizontalScroll: false, metaTitle: null, metaDescription: null,
          canonicalUrl: null, ogTitle: null, ogImage: null,
          h1Count: 0, h1Text: [], imgMissingAlt: 0, screenshots: [], axeViolations: [],
        })
      }
    }
  }

  await browser.close()

  const report = generateReport(results)
  const reportPath = path.join(OUTPUT_DIR, 'report.md')
  const jsonPath   = path.join(OUTPUT_DIR, 'report.json')
  fs.writeFileSync(reportPath, report, 'utf-8')
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), 'utf-8')

  console.log(`\n✅ Audit complete!`)
  console.log(`   Report: ${reportPath}`)
  console.log(`   JSON:   ${jsonPath}`)
  console.log(`   Screenshots: ${SCREENSHOTS_DIR}`)

  // quick summary to stdout
  const totalErrors = results.reduce((s, r) => s + r.consoleErrors.length, 0)
  const totalAxe    = results.reduce((s, r) => s + r.axeViolations.length, 0)
  const total404    = results.reduce((s, r) => s + r.network404s.length, 0)
  const withHScroll = results.filter(r => r.hasHorizontalScroll).length
  console.log(`\n📊 Totals:`)
  console.log(`   Console errors:     ${totalErrors}`)
  console.log(`   Axe violations:     ${totalAxe}`)
  console.log(`   404s:               ${total404}`)
  console.log(`   Horizontal scroll:  ${withHScroll} page(s)`)
}

main().catch((err) => { console.error(err); process.exit(1) })
