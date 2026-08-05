import { test, expect, type Page, type Locator } from '@playwright/test'

// Covers src/components/web-mascot/ — position math (home corner, walking
// over to an interacted element) and the `point` pose's procedural arm
// rotation. Pose identity is read off the injected SVG's markup (each pose's
// distinguishing shape/transform), since there's no other hook into "which
// of the 13 poses is showing" from outside the component.
//
// Geometric assertions poll both sides (Nib's actual position/angle AND the
// "expected" value re-derived from the target element) rather than snapshot
// once and compare: the site scrolls via Lenis (SmoothScroll.tsx, animated
// over several frames) and reveals content via GSAP (data-reveal), so a
// single early read on either side can catch mid-animation numbers. Polling
// both sides converges once everything's actually settled, regardless of
// which side settles first.

const POSE_MARKERS = {
  idle: (html: string) => !html.includes('<g transform') && html.includes('cx="54" cy="75"'),
  build: (html: string) => html.includes('rect x="50" y="20"'),
  typing: (html: string) => html.includes('rotate(14 60 90)'),
  think: (html: string) => html.includes('rotate(-6 60 82)'),
  point: (html: string) => html.includes('rotate(6 60 82)') && !html.includes('rotate(-6 60 82)'),
} as const

async function waitForNib(page: Page) {
  await page.waitForSelector('svg[viewBox="0 0 120 160"]')
}

async function figureBox(page: Page) {
  return page.evaluate(() => {
    const svg = document.querySelector('svg[viewBox="0 0 120 160"]')!
    let el: Element | null = svg
    while (el && el !== document.body) {
      if (getComputedStyle(el).position === 'fixed') break
      el = el.parentElement
    }
    const r = (el as HTMLElement).getBoundingClientRect()
    return { top: r.top, left: r.left, width: r.width, height: r.height }
  })
}

async function poseHtml(page: Page) {
  return page.locator('svg[viewBox="0 0 120 160"]').evaluate((el) => el.outerHTML)
}

// The site scrolls via Lenis (src/components/SmoothScroll.tsx), which
// virtualizes/animates scroll position over several frames instead of
// jumping. Playwright's own "wait for stable element" check doesn't know
// about that animation, so click()'s implicit scroll-into-view can fire the
// click mid-scroll — scrollIntoViewIfNeeded() first, then poll window.scrollY
// until Lenis settles, so the click that follows needs no scroll of its own.
async function settleScroll(page: Page) {
  await page.waitForFunction(() => {
    const w = window as unknown as { __lastY?: number }
    const y = window.scrollY
    const same = w.__lastY === y
    w.__lastY = y
    return same
  })
}

/** The `point` pose's arm rotation, as an angle in degrees (null if unrotated). */
async function armAngle(page: Page) {
  return page.evaluate(() => {
    const svg = document.querySelector('svg[viewBox="0 0 120 160"]')!
    const arm = svg.querySelector('[data-nib-arm]') as SVGGElement | null
    const t = arm && getComputedStyle(arm).transform
    if (!t || t === 'none') return null
    const m = t.match(/matrix\(([^)]+)\)/)
    if (!m) return null
    const [a, b] = m[1].split(',').map(Number)
    return Math.atan2(b, a) * (180 / Math.PI)
  })
}

/** Angle (degrees) the arm *should* show to aim at `target`, given the pose's drawn direction. */
async function expectedArmAngle(page: Page, target: { x: number; y: number }) {
  const pivot = await page.evaluate(() => {
    const svg = document.querySelector('svg[viewBox="0 0 120 160"]') as SVGSVGElement
    const rect = svg.getBoundingClientRect()
    return { x: rect.left + (80 / 120) * rect.width, y: rect.top + (76 / 160) * rect.height }
  })
  const toDeg = 180 / Math.PI
  return Math.atan2(target.y - pivot.y, target.x - pivot.x) * toDeg - Math.atan2(-16, 28) * toDeg
}

function angleDiff(a: number, b: number) {
  const norm = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180
  return Math.abs(norm(a - b))
}

/** Polls until Nib's position matches a spot next to `target` (both sides re-read each try). */
async function pollNearTarget(page: Page, target: Locator) {
  await expect
    .poll(async () => {
      const [near, box] = await Promise.all([figureBox(page), target.boundingBox()])
      if (!box) return null
      return near.top - (box.y - 96 - 16)
    })
    .toBeCloseTo(0, 0)
  await expect
    .poll(async () => {
      const [near, box] = await Promise.all([figureBox(page), target.boundingBox()])
      if (!box) return null
      return near.left - (box.x + box.width / 2 - 42)
    })
    .toBeCloseTo(0, 0)
}

// .nav's own padding transitions over 0.45s (globals.css) between its normal
// and `.scrolled` state, so the home spot (nav height + offset) drifts for a
// beat after any scroll that crosses the threshold — poll the current nav
// height fresh each time rather than trust a value read before/during that.
async function currentHome(page: Page) {
  return page.evaluate(() => {
    const navHeight = document.querySelector('.nav')?.getBoundingClientRect().height ?? 0
    const paddingRight = Math.min(48, Math.max(16, window.innerWidth * 0.04))
    return { top: navHeight + 24, left: window.innerWidth - paddingRight - 84 }
  })
}

async function pollAtHome(page: Page) {
  await expect.poll(async () => (await figureBox(page)).top - (await currentHome(page)).top).toBeCloseTo(0, 0)
  await expect.poll(async () => (await figureBox(page)).left - (await currentHome(page)).left).toBeCloseTo(0, 0)
}

/** Polls until the arm's rotation matches "aim at `target`" (both sides re-read each try). */
async function pollPointsAt(page: Page, target: Locator) {
  await expect
    .poll(async () => {
      const [angle, box] = await Promise.all([armAngle(page), target.boundingBox()])
      if (angle === null || !box) return null
      const center = { x: box.x + box.width / 2, y: box.y + box.height / 2 }
      return angleDiff(angle, await expectedArmAngle(page, center))
    })
    .toBeLessThan(2) // degrees; sub-pixel noise between two independent pivot estimates
}

test.beforeEach(async ({ page }) => {
  await page.goto('/web')
  await waitForNib(page)
})

test('sits at the home corner below the nav', async ({ page }) => {
  await pollAtHome(page)
})

test('walks over to a costruiamo tab on click, then returns home', async ({ page }) => {
  const tab = page.locator('.web-cap-tab').nth(2)
  await tab.scrollIntoViewIfNeeded()
  await settleScroll(page) // so click()'s own actionability scroll is a no-op
  await tab.click()

  await expect.poll(async () => poseHtml(page).then(POSE_MARKERS.build)).toBe(true)
  await pollNearTarget(page, tab)

  // build -> typing -> idle, ~700ms per step; give it real margin.
  await expect.poll(async () => poseHtml(page).then(POSE_MARKERS.idle), { timeout: 3000 }).toBe(true)
  await pollAtHome(page)
})

test('points precisely at the metodo step it reacted to', async ({ page }) => {
  const step = page.locator('.web-tl-node').nth(2)
  await step.scrollIntoViewIfNeeded()
  await settleScroll(page)
  await step.click()

  await expect.poll(async () => poseHtml(page).then(POSE_MARKERS.point), { timeout: 2000 }).toBe(true)
  await pollPointsAt(page, step)
})

test('points precisely at the contact CTA on hover', async ({ page }) => {
  const cta = page.locator('#contatti .web-btn')
  await cta.scrollIntoViewIfNeeded()
  await settleScroll(page)
  await cta.hover()

  await expect.poll(async () => poseHtml(page).then(POSE_MARKERS.point)).toBe(true)
  await pollPointsAt(page, cta)

  await page.mouse.move(0, 0)
  await pollAtHome(page)
})

test('reduced motion: no intro compile frame, no hover reaction', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/web')
  await waitForNib(page)
  expect(await poseHtml(page).then(POSE_MARKERS.idle)).toBe(true)

  const figure = page.locator('svg[viewBox="0 0 120 160"]')
  await figure.hover()
  await page.waitForTimeout(200)
  expect(await poseHtml(page).then((h) => h.includes('rotate(4 60 82)'))).toBe(false) // no wink
})
