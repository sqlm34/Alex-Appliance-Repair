import { createIcons, Mic, MicOff, PhoneOff, Minus, X, CalendarPlus, Download } from 'lucide'

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
  const confirmation = document.createElement('dialog')
  confirmation.className = 'voice-confirmation'
  confirmation.setAttribute('aria-labelledby', 'voice-confirmation-title')
  confirmation.innerHTML = `<button class="voice-confirm-close" aria-label="Close confirmation" title="Close"><i data-lucide="x"></i></button>
    <h2 id="voice-confirmation-title">Thank you for your appointment</h2><p class="voice-confirm-time"></p><p class="voice-confirm-message"></p>
    <div class="voice-confirm-actions"><a class="voice-calendar" target="_blank" rel="noopener noreferrer"><i data-lucide="calendar-plus"></i>Save to Google Calendar</a>
    <a class="voice-calendar-file" download="appointment.ics"><i data-lucide="download"></i>Download Calendar Event</a></div>
    <p class="voice-confirm-note">A saved calendar copy does not update automatically if your appointment changes.</p>`
  document.body.append(confirmation)
  let resultToken = '', confirmationTimer, calendarBlob
  function closeConfirmation() {
    clearTimeout(confirmationTimer)
    confirmation.close()
    if (calendarBlob) URL.revokeObjectURL(calendarBlob)
    calendarBlob = undefined
  }
  confirmation.querySelector('.voice-confirm-close').onclick = closeConfirmation
  confirmation.addEventListener('cancel', event => { event.preventDefault(); closeConfirmation() })
  async function showBookingResult(token, finishedGeneration) {
    if (!token || privatePreview) return
    for (let attempt = 0; attempt < 3; attempt++) {
      if (generation !== finishedGeneration || busy) return
      try {
        const response = await fetch(endpoint.replace(/\/start$/, '/result'), { method: 'POST', credentials: 'omit',
          headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }), signal: AbortSignal.timeout(5000) })
        if (!response.ok) return
        const result = await response.json()
        if (generation !== finishedGeneration || busy) return
        if (result.confirmed === true) {
          const calendarUrl = new URL(result.calendarUrl)
          if (calendarUrl.origin !== 'https://calendar.google.com') return
          closeConfirmation()
          confirmation.querySelector('.voice-confirm-time').textContent = `${result.date} · ${result.window}`
          confirmation.querySelector('.voice-confirm-message').textContent = result.message
          confirmation.querySelector('.voice-calendar').href = calendarUrl.href
          calendarBlob = URL.createObjectURL(new Blob([result.calendarFile], { type: 'text/calendar;charset=utf-8' }))
          confirmation.querySelector('.voice-calendar-file').href = calendarBlob
          confirmation.showModal()
          confirmationTimer = setTimeout(closeConfirmation, 15000)
          return
        }
      } catch { return }
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  const scrollTop = document.querySelector('.scroll-top-button')
  if (scrollTop) {
    const syncPosition = () => root.classList.toggle('voice-above-scroll', scrollTop.classList.contains('is-visible'))
    new MutationObserver(syncPosition).observe(scrollTop, { attributes: true, attributeFilter: ['class'] })
    syncPosition()
  }
  const $ = selector => root.querySelector(selector)
  const panel = $('.voice-panel'), start = $('.voice-start'), status = $('.voice-status'), controls = $('.voice-controls')
  let call, sdk, challenge = '', widgetId, loading, muted = false, busy = false, terminal = false, generation = 0
  const icons = () => {
    const icons = { Mic, MicOff, PhoneOff, Minus, X, CalendarPlus, Download }
    createIcons({ icons, root }); createIcons({ icons, root: confirmation })
  }
  icons()
  function setStatus(message) { status.textContent = message }
  function resetChallenge() {
    challenge = ''
    if (privatePreview) { challenge = 'private-preview'; start.disabled = false; return }
    if (widgetId !== undefined && window.turnstile) window.turnstile.reset(widgetId)
  }
  function finished(message, failed = false) {
    const token = resultToken
    resultToken = ''
    busy = false
    panel.hidden = !failed
    $('.voice-end').disabled = true
    $('.voice-mute').disabled = true
    controls.hidden = true
    start.hidden = false
    start.disabled = true
    root.classList.remove('voice-active')
    $('.voice-launch span').textContent = 'Book by voice'
    setStatus(message)
    resetChallenge()
    if (!failed) void showBookingResult(token, generation)
  }
  function failureMessage(error) {
    if (error?.name === 'NotAllowedError') return 'Microphone access was denied. Allow microphone access in your browser, then try again.'
    if (error?.name === 'NotFoundError') return 'No microphone was found. Connect a microphone, then try again.'
    if (error?.status === 429) return String(error.message).includes('limit')
      ? 'The daily voice-call limit has been reached. Please use Book online or call us.'
      : 'Emily is currently busy. Please try again shortly or use Book online.'
    if (error?.status === 403) return 'Verification expired or failed. Please complete the verification again.'
    if (error?.status === 503) return 'Voice booking is temporarily unavailable. Please use Book online or call us.'
    return 'Unable to connect. Check microphone access and your connection, then try again or use Book online.'
  }
  async function end(message = 'Conversation ended', failed = false) {
    terminal = true
    generation++
    const current = call
    call = undefined
    try { await current?.end() } finally { finished(message, failed) }
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
    closeConfirmation()
    resultToken = ''
    busy = true; terminal = false; muted = false
    $('.voice-end').disabled = false
    $('.voice-mute').disabled = false
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
        body: JSON.stringify({ challenge: token }), signal: init?.signal || AbortSignal.timeout(20000), credentials: 'omit' }).then(async response => {
          if (response.ok && current()) {
            const data = await response.clone().json()
            if (current()) resultToken = typeof data.result_token === 'string' ? data.result_token : ''
          }
          return response
        })
    } })
    // Called synchronously from the Start click so browser microphone permission is user initiated.
    try {
      call = client.createWebCall({ agent_id: 'server-selected', transcript: false, hooks: {
        onStatus: state => {
          if (!current()) return
          if (state === 'ended') { terminal = true; call = undefined; finished('Conversation ended') }
          else if (state === 'live') { setStatus('Connected'); $('.voice-launch span').textContent = 'In conversation' }
        },
        onEnd: () => { if (current()) { terminal = true; call = undefined; finished('Conversation ended') } },
        onError: error => { if (current()) void end(failureMessage(error), true).catch(() => {}) },
      } })
      call.ready.catch(error => { if (current()) void end(failureMessage(error), true).catch(() => {}) })
    } catch (error) { void end(failureMessage(error), true).catch(() => {}) }
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
  window.addEventListener('offline', () => { if (busy) void end('Connection lost. Please reconnect and try again.', true).catch(() => {}) })
}
