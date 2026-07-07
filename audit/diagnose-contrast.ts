/**
 * Fooody — Color Contrast Diagnostic
 * Estrae coppie fg/bg problematiche con ratio e selector per ogni pagina.
 */
import { chromium } from '@playwright/test'

const BASE_URL = 'https://fooody-red.vercel.app'

const ROUTES = [
  { path: '/',          label: 'Homepage'  },
  { path: '/studio',    label: 'Studio'    },
  { path: '/metodo',    label: 'Metodo'    },
  { path: '/branding',  label: 'Branding'  },
  { path: '/social',    label: 'Social'    },
  { path: '/web',       label: 'Web'       },
  { path: '/contatti',  label: 'Contatti'  },
]

interface ColorPair {
  fg: string
  bg: string
  ratio: number
  required: number
  tag: string
  text: string
  selector: string
  count: number
}

async function diagnose() {
  const browser = await chromium.launch({ headless: true })
  const allPairs: Map<string, ColorPair> = new Map()

  for (const route of ROUTES) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
    })
    await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'load', timeout: 60000 })
    await page.waitForTimeout(2000)

    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.1/axe.min.js' })

    const pairs: ColorPair[] = await page.evaluate(() => {
      return new Promise<ColorPair[]>(resolve => {
        // @ts-ignore
        window.axe.run({ runOnly: ['color-contrast'] }).then((results: any) => {
          const out: ColorPair[] = []
          for (const violation of results.violations) {
            for (const node of violation.nodes) {
              for (const check of [...(node.any || []), ...(node.all || [])]) {
                if (check.id !== 'color-contrast') continue
                const d = check.data || {}
                if (!d.fgColor || !d.bgColor) continue
                out.push({
                  fg:       d.fgColor,
                  bg:       d.bgColor,
                  ratio:    Math.round((d.contrastRatio || 0) * 100) / 100,
                  required: d.expectedContrastRatio || 4.5,
                  tag:      node.html?.match(/^<(\w+)/)?.[1] ?? '?',
                  text:     (node.target?.[0] ?? '').slice(0, 60),
                  selector: (node.target?.[0] ?? '').slice(0, 80),
                  count:    1,
                })
              }
            }
          }
          resolve(out)
        })
      })
    })

    for (const p of pairs) {
      const key = `${p.fg}|${p.bg}`
      const existing = allPairs.get(key)
      if (existing) {
        existing.count++
      } else {
        allPairs.set(key, { ...p })
      }
    }

    console.log(`  ✓ ${route.label}: ${pairs.length} violazioni`)
    await page.close()
  }

  await browser.close()

  // Raggruppa e ordina per occorrenze
  const sorted = [...allPairs.values()].sort((a, b) => b.count - a.count)

  console.log('\n══════════════════════════════════════════════════')
  console.log('  COPPIE COLORE PROBLEMATICHE (dedup cross-page)')
  console.log('══════════════════════════════════════════════════\n')

  for (const p of sorted) {
    const gap = (p.required - p.ratio).toFixed(2)
    console.log(`  FG: ${p.fg.padEnd(10)}  BG: ${p.bg.padEnd(10)}  ratio: ${p.ratio}:1  (serve ${p.required}:1, manca +${gap})  × ${p.count} nodi`)
    console.log(`  elemento: <${p.tag}>  selector: ${p.selector}`)
    console.log()
  }

  console.log(`Totale coppie uniche: ${sorted.length}`)
}

diagnose().catch(e => { console.error(e); process.exit(1) })
