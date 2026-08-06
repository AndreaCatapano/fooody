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
  peek: (html: string) => html.includes('M40,95 L40,70'),
  build: (html: string) => html.includes('rect x="50" y="20"'),
  typing: (html: string) => html.includes('rotate(14 60 90)'),
  think: (html: string) => html.includes('rotate(-6 60 82)'),
  point: (html: string) => html.includes('rotate(6 60 82)') && !html.includes('rotate(-6 60 82)'),
  excited: (html: string) => html.includes('x1="46" y1="38"'),
} as const

async function waitForNib(page: Page) {
  await page.waitForSelector('svg[viewBox="0 0 120 160"]')
}

// .figure carries the click/hover handlers and stays geometrically stable
// (idleSway lives on the inner poseBox — see webMascot.module.css); the svg
// itself wobbles while idle, which fails Playwright's own "element is
// stable" actionability check. aria-hidden="true" sits directly on .figure,
// so it's a selector that survives CSS Modules hashing the class name.
function figureLocator(page: Page) {
  return page.locator('div[aria-hidden="true"]:has(svg[viewBox="0 0 120 160"])')
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

/** Text of the quip/label span next to Nib (whichever is currently showing), or null if neither is. */
async function quipOrLabelText(page: Page) {
  return page.evaluate(() => {
    const svg = document.querySelector('svg[viewBox="0 0 120 160"]')
    const figure = svg?.closest('div[aria-hidden="true"]')
    const span = figure?.querySelector(':scope > span')
    return span?.textContent ?? null
  })
}

/** Whether the poseBox currently has a running CSS animation (the idle sway). */
async function isSwaying(page: Page) {
  return page.evaluate(() => {
    const svg = document.querySelector('svg[viewBox="0 0 120 160"]')
    const poseBox = svg?.parentElement as HTMLElement | null
    return !!poseBox && getComputedStyle(poseBox).animationName !== 'none'
  })
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

// Everything (pose + position, both sides of the position check) is read
// together in one poll iteration and required to hold simultaneously, rather
// than as separate sequential expect.poll calls: a reaction with a bounded
// on-screen window (e.g. FAQ's single-beat 1400ms) can close between two
// separate polls' round trips even though the mechanism itself is correct —
// checking it all atomically each try removes that gap entirely.
//
// The expected position mirrors positionNear()'s own clamp (never above the
// nav, never off either horizontal edge) — a naive unclamped formula looks
// right for costruiamo/metodo (their targets sit well clear of the nav) but
// is simply wrong for a FAQ question that scrollIntoViewIfNeeded() happens
// to land close to the top: production correctly clamps there, so the test's
// expectation has to, or it's asserting a formula the app never promised.
async function pollNearTarget(page: Page, target: Locator, posePredicate?: (html: string) => boolean) {
  await expect
    .poll(async () => {
      const [near, box, html, env] = await Promise.all([
        figureBox(page),
        target.boundingBox(),
        poseHtml(page),
        page.evaluate(() => ({
          navHeight: document.querySelector('.nav')?.getBoundingClientRect().height ?? 0,
          innerWidth: window.innerWidth,
        })),
      ])
      if (!box) return null
      if (posePredicate && !posePredicate(html)) return null
      const expectedTop = Math.max(env.navHeight + 12, box.y - 96 - 16)
      const expectedLeft = Math.max(12, Math.min(env.innerWidth - 84 - 12, box.x + box.width / 2 - 42))
      return Math.max(Math.abs(near.top - expectedTop), Math.abs(near.left - expectedLeft))
    })
    .toBeLessThan(0.6)
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

  await pollNearTarget(page, tab, POSE_MARKERS.build)

  // build -> typing -> idle, ~700ms per step; give it real margin.
  await expect.poll(async () => poseHtml(page).then(POSE_MARKERS.idle), { timeout: 3000 }).toBe(true)
  await pollAtHome(page)
})

test('points precisely at the metodo step it reacted to', async ({ page }) => {
  const step = page.locator('.web-tl-node').nth(2)
  await step.scrollIntoViewIfNeeded()
  await settleScroll(page)
  await step.click()

  // pollPointsAt already implies the `point` pose: armAngle() is null until
  // then, so this alone atomically covers both pose and rotation.
  await pollPointsAt(page, step)
})

test('points precisely at the contact CTA on hover', async ({ page }) => {
  const cta = page.locator('#contatti .web-btn')
  await cta.scrollIntoViewIfNeeded()
  await settleScroll(page)
  await cta.hover()

  await pollPointsAt(page, cta)

  await page.mouse.move(0, 0)
  await pollAtHome(page)
})

test('shows a one-time quip when Nib is born', async ({ page }) => {
  // beforeEach's waitForNib already implies introStage is 'done' (the intro
  // frame only renders once it settles), so the birth quip should be up.
  await expect.poll(() => quipOrLabelText(page)).toBe('Sono Nib.')
})

test('shows a quip when clicked (excited)', async ({ page }) => {
  await figureLocator(page).click()
  await expect.poll(() => poseHtml(page).then(POSE_MARKERS.excited)).toBe(true)
  expect(await quipOrLabelText(page)).toMatch(/^(Ehi!|Presente\.|Ci sono!)$/)
})

test('reacts to opening a FAQ question', async ({ page }) => {
  const q = page.locator('.web-faq-q').first()
  await q.scrollIntoViewIfNeeded()
  await settleScroll(page)
  // .web-faq-list has data-reveal (globals.css: translateY(26px) -> none,
  // ~1.06s including its stagger delay) — clicking before it settles means
  // the app measures the question's rect mid-transition while this test
  // would measure it post-transition, a real (if identical-looking-once-
  // stable) 26px mismatch that has nothing to do with position math being
  // wrong. A real visitor only ever clicks it once it's actually visible.
  await page.waitForFunction(() => {
    const list = document.querySelector('.web-faq-list')
    return !!list && getComputedStyle(list).opacity === '1'
  })
  await q.click()

  await pollNearTarget(page, q, POSE_MARKERS.think)
  expect(await quipOrLabelText(page)).toMatch(/^(Bella domanda\.|Fammi pensare\.|Giusto\.)$/)
})

test('acknowledges reaching the bottom of the page, once per session', async ({ page }) => {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await settleScroll(page)

  await expect.poll(async () => poseHtml(page).then(POSE_MARKERS.excited)).toBe(true)
  expect(await quipOrLabelText(page)).toMatch(/^(Sei arrivato in fondo\.|Tutto letto\.)$/)

  // Scroll away and back — shouldn't repeat within the same session.
  await page.evaluate(() => window.scrollTo(0, 0))
  await settleScroll(page)
  await expect.poll(async () => poseHtml(page).then(POSE_MARKERS.idle)).toBe(true)
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await settleScroll(page)
  await page.waitForTimeout(300)
  expect(await poseHtml(page).then(POSE_MARKERS.excited)).toBe(false)
})

test('idle sway runs at rest and pauses during a reaction', async ({ page }) => {
  await expect.poll(() => isSwaying(page)).toBe(true)
  await figureLocator(page).click()
  await expect.poll(() => isSwaying(page)).toBe(false)
})

test('reduced motion: no intro compile frame, no hover reaction', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/web')
  await waitForNib(page)
  expect(await poseHtml(page).then(POSE_MARKERS.idle)).toBe(true)

  await figureLocator(page).hover()
  await page.waitForTimeout(200)
  expect(await poseHtml(page).then((h) => h.includes('rotate(4 60 82)'))).toBe(false) // no wink
  expect(await isSwaying(page)).toBe(false)
  expect(await quipOrLabelText(page)).toBeNull() // no birth quip either
})

test('compact viewport: hides while idle mid-section, stays visible in the hero', async ({ page }) => {
  // Nib sitting fixed in the corner used to drift over real body copy as the
  // page scrolled on narrow viewports (found by hand-testing at 375px). Now
  // it should only ever be visible in the hero or mid-reaction there.
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/web')
  await waitForNib(page)

  await expect(figureLocator(page)).toHaveClass(/visible/)

  await page.locator('.web-faq-q').first().scrollIntoViewIfNeeded()
  await settleScroll(page)
  // Let any boundary peek from crossing into #faq finish and settle to idle.
  await expect.poll(() => poseHtml(page).then(POSE_MARKERS.idle), { timeout: 3000 }).toBe(true)
  await expect(figureLocator(page)).not.toHaveClass(/visible/)
})

test('compact viewport: peeks at a section boundary while crossing it, then hides again', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/web')
  await waitForNib(page)

  await page.locator('#metodo').scrollIntoViewIfNeeded()
  await expect.poll(() => poseHtml(page).then(POSE_MARKERS.peek), { timeout: 1500 }).toBe(true)
  await expect(figureLocator(page)).toHaveClass(/visible/)

  await expect.poll(() => poseHtml(page).then(POSE_MARKERS.idle), { timeout: 3000 }).toBe(true)
  await expect(figureLocator(page)).not.toHaveClass(/visible/)
})

test('label/quip has an opaque backing on a narrow (mobile) viewport', async ({ page }) => {
  // Mobile columns are narrow enough that the costruiamo/metodo label almost
  // always lands on top of real body copy — small mono text directly over a
  // paragraph of similar size is unreadable without something behind it to
  // separate the two (found by hand-testing at 375px: "LANDING PAGE" was
  // interleaved with "...conosciamo a fondo" underneath it).
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/web')
  await waitForNib(page)

  // .web-cap-tabs (desktop pills) is display:none at this width; the visible
  // control is .web-cap-dots — matching what a real visitor would tap here.
  const tab = page.locator('.web-cap-dot').first()
  await tab.scrollIntoViewIfNeeded()
  await tab.click()

  await expect
    .poll(() =>
      page.evaluate(() => {
        const svg = document.querySelector('svg[viewBox="0 0 120 160"]')
        const figure = svg?.closest('div[aria-hidden="true"]')
        const span = figure?.querySelector(':scope > span')
        if (!span) return null
        const { backgroundColor } = getComputedStyle(span)
        // "rgba(r, g, b, 0)" (fully transparent) is the no-backing case this guards against.
        return backgroundColor
      })
    )
    .not.toMatch(/rgba?\([^)]*,\s*0\)$/)
})
