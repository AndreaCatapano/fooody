import { defineConfig, devices } from '@playwright/test'

// Real-browser tests, kept deliberately small: this project has no test
// culture yet, so this config exists specifically for src/components/
// web-mascot/ — its behavior (procedural position/rotation math driven by
// mousemove, click, hover) isn't something a snapshot or unit test can cover,
// and needs actual layout/CTM computation that only a real browser gives you.
export default defineConfig({
  testDir: './tests',
  // Serial on purpose: these tests share one dev server (webServer below),
  // and under parallel workers the resulting resource contention shows up as
  // real timing flakiness (Lenis/GSAP animations settling slower under load)
  // — not worth chasing for 5 tests where parallel saves ~15s.
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
