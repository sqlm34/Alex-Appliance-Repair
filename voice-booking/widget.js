import { createIcons, Mic, MicOff, PhoneOff, Minus, X, CalendarPlus, Download, Volume2, VolumeX, FileText, WashingMachine, Tag, Calendar, MapPin, User, Phone, House, Wrench, Clock, ArrowRight, ArrowLeft } from 'lucide'

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
    <svg class="voice-success" viewBox="0 0 160 160" aria-hidden="true"><circle class="voice-success-ring" cx="80" cy="80" r="66"/><circle class="voice-success-disc" cx="80" cy="80" r="66"/><path class="voice-success-base" d="M44 80 L69 103 L118 55"/><path class="voice-success-tick" d="M44 80 L69 103 L118 55"/></svg>
    <h2 id="voice-confirmation-title"><span class="voice-confirm-typing">Booking Confirmed</span></h2><p class="voice-confirm-time"></p><p class="voice-confirm-message"></p>
    <div class="voice-confirm-actions"><a class="voice-calendar" target="_blank" rel="noopener noreferrer"><i data-lucide="calendar-plus"></i>Save to Google Calendar</a>
    <a class="voice-calendar-file" download="appointment.ics"><i data-lucide="download"></i>Download Calendar Event</a></div>
    <p class="voice-confirm-note">A saved calendar copy does not update automatically if your appointment changes.</p>`
  document.body.append(confirmation)
  const order = document.createElement('dialog')
  order.className = 'voice-order'
  order.setAttribute('aria-labelledby', 'voice-order-title')
  const fields = { appliance: 'Appliance', brand: 'Brand', age: 'Approximate age', zip: 'ZIP code', customer: 'Name', phone: 'Phone', address: 'Address', issue: 'Problem', date: 'Date', window: 'Arrival window' }
  const fieldIcons = { appliance: 'washing-machine', brand: 'tag', age: 'calendar', zip: 'map-pin', customer: 'user', phone: 'phone', address: 'house', issue: 'wrench', date: 'calendar', window: 'clock' }
  order.innerHTML = `<header><span class="voice-document-icon"><i data-lucide="file-text"></i></span><div class="voice-order-heading"><h2 id="voice-order-title">Booking Order</h2><p class="voice-order-state" role="status">Draft · Not booked yet</p></div><div class="voice-order-tools"><button class="voice-typing-sound" aria-label="Typing sound" aria-pressed="true" title="Turn typing sound off"><i data-lucide="volume-2"></i></button><button class="voice-order-minimize" aria-label="Minimize booking order" title="Minimize"><i data-lucide="minus"></i></button></div></header><div class="voice-order-fields">${Object.entries(fields).map(([key, label]) => `<section data-field="${key}"><span class="voice-field-icon"><i data-lucide="${fieldIcons[key]}"></i></span><div class="voice-field-value"><h3>${label}</h3><p>—</p></div></section>`).join('')}</div><footer class="voice-order-controls"><button class="voice-review" aria-pressed="false"><span>Review Details</span><i data-lucide="arrow-right"></i></button></footer>`
  root.append(order)
  const minimizeOrder = () => { order.close(); $('.voice-launch').focus() }
  order.querySelector('.voice-order-minimize').onclick = minimizeOrder
  order.addEventListener('cancel', event => { event.preventDefault(); minimizeOrder() })
  function setReview(review) {
    order.classList.toggle('voice-reviewing', review)
    const button = order.querySelector('.voice-review')
    button.setAttribute('aria-pressed', String(review))
    button.innerHTML = `<span>${review ? 'Back' : 'Review Details'}</span><i data-lucide="${review ? 'arrow-left' : 'arrow-right'}"></i>`
    order.querySelector('h2').textContent = review ? 'Review Details' : 'Booking Order'
    order.querySelector('.voice-order-fields').scrollTop = 0
    icons()
  }
  order.querySelector('.voice-review').onclick = () => setReview(!order.classList.contains('voice-reviewing'))
  let resultToken = '', confirmationTimer, calendarBlob, pollTimer, confirmedResult, shownGeneration = -1
  let draftValues = {}, typingTimers = [], pollSequence = 0
  let typingSound = true, audioContext, keyBuffer, lastKeyTime = 0
  try { typingSound = localStorage.getItem('voice-typing-sound') !== 'off' } catch { /* Storage is optional. */ }
  function prepareTypingAudio() {
    if (!typingSound) return
    try {
      if (!audioContext) {
        const Audio = window.AudioContext || window.webkitAudioContext
        if (!Audio) return
        audioContext = new Audio()
        keyBuffer = audioContext.createBuffer(1, Math.ceil(audioContext.sampleRate * 0.085), audioContext.sampleRate)
        const samples = keyBuffer.getChannelData(0)
        // Key bottom-out, muted body resonance, then a softer release tap.
        let noise = 0
        for (let i = 0; i < samples.length; i++) {
          const t = i / audioContext.sampleRate
          noise = noise * 0.72 + (Math.random() * 2 - 1) * 0.28
          const release = Math.max(0, t - 0.033)
          samples[i] = 0.65 * noise * Math.exp(-t * 160)
            + 0.25 * Math.sin(2 * Math.PI * 240 * t) * Math.exp(-t * 95)
            + (t > 0.033 ? 0.32 * noise * Math.exp(-release * 200) : 0)
        }
      }
      void audioContext.resume().catch(() => {})
    } catch { /* Audio must not prevent a voice call. */ }
  }
  function keyClick() {
    if (!typingSound || !busy || !order.open || document.hidden || audioContext?.state !== 'running') return
    const now = audioContext.currentTime
    if (now - lastKeyTime < 0.075) return
    lastKeyTime = now
    const source = audioContext.createBufferSource(), gain = audioContext.createGain(), filter = audioContext.createBiquadFilter()
    source.buffer = keyBuffer
    source.playbackRate.value = 0.9 + Math.random() * 0.2
    filter.type = 'lowpass'; filter.frequency.value = 1300; filter.Q.value = 0.5
    gain.gain.value = 0.24 + Math.random() * 0.06
    source.connect(filter).connect(gain).connect(audioContext.destination)
    source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect() }
    source.start()
  }
  function soundButton() {
    const button = order.querySelector('.voice-typing-sound')
    button.setAttribute('aria-pressed', String(typingSound))
    button.title = typingSound ? 'Turn typing sound off' : 'Turn typing sound on'
    button.innerHTML = `<i data-lucide="${typingSound ? 'volume-2' : 'volume-x'}"></i>`
  }
  soundButton()
  order.querySelector('.voice-typing-sound').onclick = () => {
    typingSound = !typingSound
    try { localStorage.setItem('voice-typing-sound', typingSound ? 'on' : 'off') } catch { /* Optional preference. */ }
    prepareTypingAudio(); soundButton(); icons()
  }
  function updateDraft(draft = {}) {
    for (const key of Object.keys(fields)) {
      if (typeof draft[key] !== 'string' || draftValues[key] === draft[key]) continue
      draftValues[key] = draft[key]
      const element = order.querySelector(`[data-field="${key}"] p`)
      clearInterval(element.typingTimer)
      const value = draft[key] || '—'
      let length = 0
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { element.textContent = value; continue }
      element.textContent = ''
      element.typingTimer = setInterval(() => {
        length += Math.max(1, Math.ceil(value.length / 24))
        element.textContent = value.slice(0, length)
        keyClick()
        if (length >= value.length) clearInterval(element.typingTimer)
      }, 25)
      typingTimers.push(element.typingTimer)
    }
  }
  function closeConfirmation() {
    clearTimeout(confirmationTimer)
    confirmation.classList.remove('voice-confirm-animate')
    confirmation.close()
    if (calendarBlob) URL.revokeObjectURL(calendarBlob)
    calendarBlob = undefined
  }
  confirmation.querySelector('.voice-confirm-close').onclick = closeConfirmation
  confirmation.addEventListener('cancel', event => { event.preventDefault(); closeConfirmation() })
  function displayConfirmation(result, finishedGeneration) {
    if (shownGeneration === finishedGeneration) return
    const calendarUrl = new URL(result.calendarUrl)
    if (calendarUrl.origin !== 'https://calendar.google.com') return
    shownGeneration = finishedGeneration
    closeConfirmation()
    order.close()
    const date = new Date(`${result.date}T12:00:00`)
    confirmation.querySelector('.voice-confirm-time').textContent = `${Number.isNaN(date.getTime()) ? result.date : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · ${result.window}`
    confirmation.querySelector('.voice-confirm-message').textContent = result.message
    confirmation.querySelector('.voice-calendar').href = calendarUrl.href
    calendarBlob = URL.createObjectURL(new Blob([result.calendarFile], { type: 'text/calendar;charset=utf-8' }))
    confirmation.querySelector('.voice-calendar-file').href = calendarBlob
    confirmation.showModal()
    void confirmation.offsetWidth
    confirmation.classList.add('voice-confirm-animate')
    confirmationTimer = setTimeout(closeConfirmation, 15000)
  }
  async function pollResult(token, expectedGeneration, until = Infinity, sequence = pollSequence) {
    if (!token || privatePreview || generation !== expectedGeneration || sequence !== pollSequence) return
      try {
        const response = await fetch(endpoint.replace(/\/start$/, '/result'), { method: 'POST', credentials: 'omit',
          headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }), signal: AbortSignal.timeout(5000) })
        if (!response.ok) throw new Error('Status unavailable')
        const result = await response.json()
        if (generation !== expectedGeneration || sequence !== pollSequence) return
        updateDraft(result.draft)
        if (result.confirmed === true) {
          confirmedResult = result
          order.querySelector('.voice-order-state').textContent = 'Appointment confirmed'
          if (!busy) { displayConfirmation(result, expectedGeneration); return }
        } else if (result.callbackRecorded) {
          order.querySelector('.voice-order-state').textContent = 'Callback requested · Appointment not confirmed'
        }
      } catch { /* A network delay must never turn a draft into a confirmation. */ }
    if (generation === expectedGeneration && sequence === pollSequence && (busy || Date.now() < until)) pollTimer = setTimeout(() => void pollResult(token, expectedGeneration, until, sequence), 2000)
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
    const icons = { Mic, MicOff, PhoneOff, Minus, X, CalendarPlus, Download, Volume2, VolumeX, FileText, WashingMachine, Tag, Calendar, MapPin, User, Phone, House, Wrench, Clock, ArrowRight, ArrowLeft }
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
    clearTimeout(pollTimer)
    pollSequence++
    order.close()
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
    if (confirmedResult) displayConfirmation(confirmedResult, generation)
    else void pollResult(token, generation, Date.now() + 30000)
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
  $('.voice-launch').onclick = () => { if (busy) { order.showModal(); return }; panel.hidden = !panel.hidden; if (!panel.hidden) void prepare() }
  $('.voice-minimize').onclick = () => { panel.hidden = true; $('.voice-launch').focus() }
  root.addEventListener('keydown', event => { if (event.key === 'Escape') { panel.hidden = true; $('.voice-launch').focus() } })
  start.onclick = () => {
    if (busy || !sdk || !challenge) return
    prepareTypingAudio()
    setReview(false)
    closeConfirmation()
    clearTimeout(pollTimer)
    pollSequence++
    typingTimers.forEach(clearInterval); typingTimers = []; draftValues = {}; confirmedResult = undefined
    order.querySelectorAll('.voice-order-fields p').forEach(element => { element.textContent = '—' })
    order.querySelector('.voice-order-state').textContent = 'Draft · Not booked yet'
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
    order.querySelector('.voice-order-controls').prepend(controls)
    panel.hidden = true
    order.showModal()
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
            if (current()) {
              resultToken = typeof data.result_token === 'string' ? data.result_token : ''
              void pollResult(resultToken, currentGeneration)
            }
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
  window.addEventListener('pagehide', () => { void call?.end().catch(() => {}); void audioContext?.close().catch(() => {}); audioContext = undefined })
  window.addEventListener('offline', () => { if (busy) void end('Connection lost. Please reconnect and try again.', true).catch(() => {}) })
}
