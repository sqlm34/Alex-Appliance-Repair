import { createIcons, Mic, MicOff, PhoneOff, Minus, X } from 'lucide'

export function mountVoiceBooking({ endpoint, siteKey, previewToken }) {
  const privatePreview = location.origin === 'http://127.0.0.1:5198'
    && ['https://alex-crm-receptionist-test.alexeasyrepair.workers.dev/__web-test/start',
      'https://alex-crm-api.alexeasyrepair.workers.dev/__web-release/start'].includes(endpoint)
    && typeof previewToken === 'string' && previewToken.length >= 40
  if (document.querySelector('.voice-booking')) return
  const root = document.createElement('section')
  root.className = 'voice-booking'
  root.innerHTML = `<button class="voice-launch" aria-label="Book by voice" title="Book by voice"><i data-lucide="mic"></i><span>Book by voice</span></button>
    <section class="voice-panel" aria-label="Voice booking" hidden>
      <header><h2>Book by voice</h2><button class="voice-minimize" aria-label="Minimize" title="Minimize"><i data-lucide="minus"></i></button></header>
      <p class="voice-status" role="status" aria-live="polite">Talk with Emily</p>
      <div class="voice-verification"></div>
      <button class="voice-start">Start conversation</button>
      <div class="voice-controls" hidden><button class="voice-mute" aria-label="Mute microphone" title="Mute microphone"><i data-lucide="mic"></i></button><button class="voice-end" aria-label="End conversation" title="End conversation"><i data-lucide="phone-off"></i><span>End</span></button></div>
      <footer><a href="https://aleksappliancerepair.com/booking">Book online</a><a href="tel:+14632488429">Call us</a></footer>
    </section>`
  document.body.append(root)
  const $ = selector => root.querySelector(selector)
  const panel = $('.voice-panel'), start = $('.voice-start'), status = $('.voice-status'), controls = $('.voice-controls')
  let call, sdk, challenge = '', widgetId, loading, muted = false, busy = false, terminal = false, generation = 0
  const icons = () => createIcons({ icons: { Mic, MicOff, PhoneOff, Minus, X }, root })
  icons()
  function setStatus(message) { status.textContent = message }
  function resetChallenge() {
    challenge = ''
    if (privatePreview) { challenge = 'private-preview'; start.disabled = false; return }
    if (widgetId !== undefined && window.turnstile) window.turnstile.reset(widgetId)
  }
  function finished(message) {
    busy = false
    controls.hidden = true
    start.hidden = false
    start.disabled = true
    root.classList.remove('voice-active')
    $('.voice-launch span').textContent = 'Book by voice'
    setStatus(message)
    resetChallenge()
  }
  async function end(message = 'Conversation ended') {
    terminal = true
    generation++
    const current = call
    call = undefined
    try { await current?.end() } finally { finished(message) }
  }
  async function prepare() {
    if (loading) return loading
    start.disabled = true
    loading = (async () => {
      sdk = await import('retell-client-js-sdk')
      if (privatePreview) { challenge = 'private-preview'; start.disabled = false; setStatus('Closed test with Emily'); return }
      if (!endpoint || !siteKey) { setStatus('Voice booking is not available yet.'); return }
      if (!window.turnstile) await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        script.onload = resolve
        script.onerror = reject
        document.head.append(script)
      })
      widgetId = window.turnstile.render($('.voice-verification'), {
        sitekey: siteKey, action: 'voice_booking',
        callback: token => { challenge = token; start.disabled = busy },
        'expired-callback': () => { challenge = ''; start.disabled = true },
        'error-callback': () => { challenge = ''; start.disabled = true; setStatus('Verification unavailable. Please use Book online.') },
      })
    })().catch(() => { setStatus('Unable to connect. Please use Book online.'); loading = undefined })
    return loading
  }
  $('.voice-launch').onclick = () => { panel.hidden = !panel.hidden; if (!panel.hidden) void prepare() }
  $('.voice-minimize').onclick = () => { panel.hidden = true; $('.voice-launch').focus() }
  root.addEventListener('keydown', event => { if (event.key === 'Escape') { panel.hidden = true; $('.voice-launch').focus() } })
  start.onclick = () => {
    if (busy || !sdk || !challenge) return
    busy = true; terminal = false; muted = false
    const currentGeneration = ++generation
    const current = () => currentGeneration === generation && !terminal
    $('.voice-mute').innerHTML = '<i data-lucide="mic"></i>'
    $('.voice-mute').setAttribute('aria-label', 'Mute microphone')
    $('.voice-mute').title = 'Mute microphone'
    icons()
    start.hidden = true; controls.hidden = false
    root.classList.add('voice-active')
    $('.voice-launch span').textContent = 'Connecting'
    setStatus('Connecting...')
    const token = challenge
    const client = new sdk.RetellClient({ key: 'server-authorized', fetch: (url, init) => {
      if (new URL(String(url)).pathname !== '/v3/create-web-call') return Promise.reject(new Error('Unsupported operation'))
      return fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json',
        ...(privatePreview ? { Authorization: `Bearer ${previewToken}` } : {}) },
        body: JSON.stringify({ challenge: token }), signal: init?.signal || AbortSignal.timeout(20000), credentials: 'omit' })
    } })
    // Called synchronously from the Start click so browser microphone permission is user initiated.
    try {
      call = client.createWebCall({ agent_id: 'server-selected', transcript: false, hooks: {
        onStatus: state => { if (state === 'live' && current()) { setStatus('Connected'); $('.voice-launch span').textContent = 'In conversation' } },
        onEnd: () => { if (current()) { terminal = true; call = undefined; finished('Conversation ended') } },
        onError: () => { if (current()) void end('Connection interrupted or microphone unavailable. Please use Book online.').catch(() => {}) },
      } })
      call.ready.catch(() => { if (current()) void end('Unable to connect. Check microphone access or use Book online.').catch(() => {}) })
    } catch { void end('Unable to start. Please use Book online.').catch(() => {}) }
  }
  $('.voice-mute').onclick = () => {
    if (!call) return
    muted = !muted
    if (muted) call.mute(); else call.unmute()
    const button = $('.voice-mute')
    button.setAttribute('aria-label', muted ? 'Unmute microphone' : 'Mute microphone')
    button.title = button.getAttribute('aria-label')
    button.innerHTML = `<i data-lucide="${muted ? 'mic-off' : 'mic'}"></i>`
    setStatus(muted ? 'Microphone muted' : 'Connected')
    icons()
  }
  $('.voice-end').onclick = () => { void end().catch(() => {}) }
  window.addEventListener('pagehide', () => { void call?.end().catch(() => {}) })
  window.addEventListener('offline', () => { if (busy) void end('Connection lost. Please use Book online when reconnected.').catch(() => {}) })
}
