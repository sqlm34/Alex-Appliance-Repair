import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const root = fileURLToPath(new URL('../', import.meta.url))

test('live draft, corrections, confirmed calendar, auto-close and unconfirmed call', async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true })
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
    let result = { confirmed: false, draft: { appliance: 'Washer', brand: 'Bosch' } }
    await page.route('https://widget.test/**', async route => {
      const path = new URL(route.request().url()).pathname
      if (path === '/') return route.fulfill({ contentType: 'text/html', body: `<link rel="stylesheet" href="/css/voice-booking.css"><script type="module">import {mountVoiceBooking} from '/js/voice-booking/widget.js';window.turnstile={render:(e,c)=>{window.cb=c.callback;c.callback('test');return 1},reset:()=>window.cb('test')};mountVoiceBooking({endpoint:'https://widget.test/start',siteKey:'test'});</script>` })
      if (path === '/start') return route.fulfill({ json: { result_token: '00000000-0000-4000-8000-000000000001' } })
      if (path === '/result') return route.fulfill({ json: result })
      if (path.includes('index.m-')) return route.fulfill({ contentType: 'text/javascript', body: `export class RetellClient{constructor(o){this.o=o}createWebCall(o){window.hooks=o.hooks;return{ready:this.o.fetch('https://api.retellai.com/v3/create-web-call').then(()=>o.hooks.onStatus('live')),end:async()=>o.hooks.onEnd(),mute(){},unmute(){}}}}` })
      return route.fulfill({ path: root + path.slice(1) })
    })
    await page.goto('https://widget.test')
    await page.locator('.voice-launch').click()
    await page.locator('.voice-start').click()
    await page.waitForFunction(() => document.querySelector('[data-field="brand"] p').textContent === 'Bosch')
    assert.equal(await page.locator('.voice-order').isVisible(), true)
    assert.equal(await page.locator('.voice-order-fields').evaluate(e => e.scrollHeight <= e.clientHeight), true)
    await page.locator('.voice-typing-sound').click()
    assert.equal(await page.locator('.voice-typing-sound').getAttribute('aria-pressed'), 'false')
    assert.equal(await page.evaluate(() => localStorage.getItem('voice-typing-sound')), 'off')
    assert.equal(await page.locator('.voice-confirmation').isHidden(), true)
    result.draft.brand = 'Samsung'
    await page.waitForFunction(() => document.querySelector('[data-field="brand"] p').textContent === 'Samsung')
    result = { ...result, confirmed: true, date: '2026-10-19', window: '9 AM - 11 AM', message: 'We will text before arrival.', calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE', calendarFile: 'BEGIN:VCALENDAR\r\nEND:VCALENDAR' }
    await page.waitForFunction(() => document.querySelector('.voice-order-state').textContent === 'Appointment confirmed')
    assert.equal(await page.locator('.voice-confirmation').isHidden(), true)
    await page.evaluate(() => window.hooks.onEnd())
    assert.equal(await page.locator('.voice-order').isHidden(), true)
    assert.equal(await page.locator('.voice-confirmation').isVisible(), true)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
    await page.waitForTimeout(15500)
    assert.equal(await page.locator('.voice-confirmation').isHidden(), true)
    result = { confirmed: false, callbackRecorded: true, draft: {} }
    await page.locator('.voice-launch').click()
    await page.locator('.voice-start').click()
    await page.waitForTimeout(500)
    await page.locator('.voice-end').click()
    await page.waitForTimeout(500)
    assert.equal(await page.locator('.voice-confirmation').isHidden(), true)
    assert.equal(await page.locator('.voice-order').isHidden(), true)
  } finally { await browser.close() }
})
