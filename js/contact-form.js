(function () {
  const form = document.querySelector('[data-request-service-form]');
  if (!form) return;

  const fields = {
    name: form.querySelector('#service-name'),
    phone: form.querySelector('#service-phone'),
    email: form.querySelector('#service-email'),
    address: form.querySelector('#service-address'),
    service: form.querySelector('#service-type'),
    message: form.querySelector('#service-message'),
    photo: form.querySelector('#model-photo')
  };

  const status = form.querySelector('[data-form-status]');
  const fileName = form.querySelector('[data-file-name]');
  const submitButton = form.querySelector('button[type="submit"]');
  const modal = document.querySelector('#request-service-modal');
  const modalCloseButtons = modal ? modal.querySelectorAll('[data-modal-close]') : [];
  let previousScrollY = 0;
  const apiBase = (form.dataset.verificationApi || 'https://alex-crm-api.alexeasyrepair.workers.dev').replace(/\/$/, '');
  const verificationStartedAt = Date.now();
  const verificationState = {
    sessionId: '',
    challengeId: '',
    maskedPhone: '',
    challengedPhone: '',
    verifiedPhone: '',
    smsAbortController: null
  };
  const maxFileBytes = 8 * 1024 * 1024;
  const allowedImageTypes = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif'
  ]);
  const otpPanel = document.createElement('div');
  otpPanel.className = 'contact-otp-panel';
  otpPanel.hidden = true;
  otpPanel.innerHTML = `
    <div class="contact-otp-panel-head">
      <strong>Verify phone number</strong>
      <span data-contact-otp-copy>Enter the 6 digit code sent by SMS.</span>
    </div>
    <div class="contact-otp-inputs" aria-label="SMS verification code">
      ${Array.from({ length: 6 }, (_, index) => `<input type="text" inputmode="numeric" autocomplete="${index === 0 ? 'one-time-code' : 'off'}" name="${index === 0 ? 'one-time-code' : `contact-code-${index + 1}`}" pattern="[0-9]*" maxlength="1" aria-label="SMS code digit ${index + 1}">`).join('')}
    </div>
    <div class="contact-otp-actions">
      <button type="button" class="contact-otp-resend">Resend code</button>
    </div>
  `;
  if (status && status.parentNode) {
    status.parentNode.insertBefore(otpPanel, status);
  }
  const otpInputs = Array.from(otpPanel.querySelectorAll('.contact-otp-inputs input'));
  const otpCopy = otpPanel.querySelector('[data-contact-otp-copy]');
  const otpResendButton = otpPanel.querySelector('.contact-otp-resend');

  function getErrorNode(key) {
    return form.querySelector(`[data-error-for="${key}"]`);
  }

  function setError(key, message) {
    const node = getErrorNode(key);
    const field = fields[key];
    if (node) node.textContent = message || '';
    if (field) field.classList.toggle('is-invalid', Boolean(message));
  }

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message || '';
    status.classList.toggle('is-error', Boolean(isError));
  }

  function setSubmitText(text) {
    if (submitButton) submitButton.textContent = text;
  }

  function currentOtpCode() {
    return otpInputs.map((input) => input.value.replace(/\D/g, '')).join('').slice(0, 6);
  }

  function updateOtpCode(value, focusIndex) {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    otpInputs.forEach((input, index) => {
      input.value = digits[index] || '';
    });
    if (typeof focusIndex === 'number') {
      window.requestAnimationFrame(() => {
        const target = otpInputs[Math.max(0, Math.min(focusIndex, otpInputs.length - 1))];
        if (target) target.focus();
      });
    }
  }

  function showOtpPanel(maskedPhone) {
    otpPanel.hidden = false;
    if (otpCopy) {
      otpCopy.textContent = `Enter the 6 digit code sent to ${maskedPhone || 'your phone'}.`;
    }
    setSubmitText('Verify & Send Request');
    updateOtpCode('', 0);
  }

  function resetVerification(clearCode) {
    if (verificationState.smsAbortController) {
      verificationState.smsAbortController.abort();
    }
    verificationState.sessionId = '';
    verificationState.challengeId = '';
    verificationState.maskedPhone = '';
    verificationState.challengedPhone = '';
    verificationState.verifiedPhone = '';
    verificationState.smsAbortController = null;
    otpPanel.hidden = true;
    if (clearCode) updateOtpCode('');
    setSubmitText('Send Request');
  }

  function getVerificationDeviceId() {
    const key = 'alex-repair-contact-device';
    let deviceId = localStorage.getItem(key);
    if (!deviceId) {
      deviceId = `contact-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
      localStorage.setItem(key, deviceId);
    }
    return deviceId;
  }

  async function postVerificationJson(path, payload) {
    const response = await fetch(`${apiBase}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    let data = {};
    try {
      data = await response.json();
    } catch (error) {
      data = {};
    }
    if (!response.ok) {
      throw new Error(data.error || data.message || 'SMS verification failed');
    }
    return data;
  }

  function listenForIncomingSmsCode() {
    if (!('credentials' in navigator) || !window.isSecureContext) return;
    if (verificationState.smsAbortController) verificationState.smsAbortController.abort();
    const controller = new AbortController();
    verificationState.smsAbortController = controller;
    navigator.credentials.get({
      otp: { transport: ['sms'] },
      signal: controller.signal
    }).then((credential) => {
      const code = credential && credential.code ? String(credential.code) : '';
      if (/^\d{6}$/.test(code)) updateOtpCode(code, 5);
    }).catch(() => undefined);
  }

  async function beginPhoneVerification() {
    const session = await postVerificationJson('/api/public/booking/start', {
      device_id: getVerificationDeviceId(),
      started_at: verificationStartedAt,
      website: '',
      referrer: document.referrer,
      source: 'alex-repair-contact-form'
    });
    const challenge = await postVerificationJson('/api/public/booking/send-otp', {
      sessionId: session.sessionId,
      phone: normalizedPhone(),
      sms_domain: 'alex-repair.com'
    });
    verificationState.sessionId = session.sessionId;
    verificationState.challengeId = challenge.challengeId;
    verificationState.maskedPhone = challenge.maskedPhone || '';
    verificationState.challengedPhone = normalizedPhone();
    showOtpPanel(verificationState.maskedPhone);
    listenForIncomingSmsCode();
    setStatus(`SMS code sent to ${verificationState.maskedPhone || 'your phone'}.`, false);
  }

  async function resendPhoneVerification() {
    if (!verificationState.sessionId) {
      await beginPhoneVerification();
      return;
    }
    const challenge = await postVerificationJson('/api/public/booking/send-otp', {
      sessionId: verificationState.sessionId,
      phone: normalizedPhone(),
      sms_domain: 'alex-repair.com'
    });
    verificationState.challengeId = challenge.challengeId;
    verificationState.maskedPhone = challenge.maskedPhone || verificationState.maskedPhone;
    verificationState.challengedPhone = normalizedPhone();
    showOtpPanel(verificationState.maskedPhone);
    listenForIncomingSmsCode();
    setStatus(`New SMS code sent to ${verificationState.maskedPhone || 'your phone'}.`, false);
  }

  async function ensurePhoneVerified() {
    const phone = normalizedPhone();
    if (verificationState.verifiedPhone === phone) return true;
    if (verificationState.challengeId && verificationState.challengedPhone !== phone) {
      resetVerification(true);
      await beginPhoneVerification();
      return false;
    }
    if (!verificationState.challengeId) {
      await beginPhoneVerification();
      return false;
    }

    const code = currentOtpCode();
    if (!/^\d{6}$/.test(code)) {
      setStatus('Enter the 6 digit SMS code to send your request.', true);
      otpInputs[0].focus();
      return false;
    }

    await postVerificationJson('/api/public/booking/verify-otp', {
      sessionId: verificationState.sessionId,
      challengeId: verificationState.challengeId,
      code
    });
    verificationState.verifiedPhone = phone;
    if (verificationState.smsAbortController) verificationState.smsAbortController.abort();
    setStatus('Phone verified. Sending your request...', false);
    return true;
  }

  function trimSpaces(value) {
    return value.replace(/\s+/g, ' ').trim();
  }

  function cleanName(value) {
    return value.replace(/[0-9]/g, '').replace(/[^A-Za-z\s'.-]/g, '');
  }

  function cleanAddress(value) {
    return value.replace(/[^A-Za-z0-9\s.,#'/-]/g, '');
  }

  function getLocalPhoneDigits(value) {
    const digits = value.replace(/\D/g, '');
    return digits.startsWith('1') ? digits.slice(1, 11) : digits.slice(0, 10);
  }

  function formatPhone(value) {
    const digits = getLocalPhoneDigits(value);
    return digits ? `+1 ${digits}` : '';
  }

  function normalizedPhone() {
    const digits = getLocalPhoneDigits(fields.phone.value);
    return digits.length === 10 ? `+1${digits}` : '';
  }

  function shortenFileName(name) {
    if (!name || name.length <= 48) return name;
    const dotIndex = name.lastIndexOf('.');
    const extension = dotIndex > 0 ? name.slice(dotIndex) : '';
    const base = dotIndex > 0 ? name.slice(0, dotIndex) : name;
    return `${base.slice(0, 34)}...${extension}`;
  }

  function showModal() {
    if (!modal) return;
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }
    previousScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('request-modal-open');
    document.body.classList.add('request-modal-open');
    document.body.style.top = `-${previousScrollY}px`;
    const closeButton = modal.querySelector('[data-modal-close]');
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function hideModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('request-modal-open');
    document.body.classList.remove('request-modal-open');
    document.body.style.top = '';
    window.scrollTo(0, previousScrollY);
  }

  function validate() {
    let isValid = true;
    setStatus('', false);
    Object.keys(fields).forEach((key) => setError(key, ''));

    fields.name.value = trimSpaces(cleanName(fields.name.value));
    fields.address.value = trimSpaces(cleanAddress(fields.address.value));
    fields.phone.value = formatPhone(fields.phone.value);

    if (!/^[A-Za-z][A-Za-z\s'.-]{1,59}$/.test(fields.name.value)) {
      setError('name', 'Please enter a real name using letters only.');
      isValid = false;
    }

    const phone = normalizedPhone();
    if (!phone) {
      setError('phone', 'Enter a valid 10-digit U.S. phone number.');
      isValid = false;
    }

    if (!fields.email.value.trim() || !fields.email.checkValidity()) {
      setError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    if (fields.address.value.length < 8 || fields.address.value.length > 160) {
      setError('address', 'Please enter the service street address.');
      isValid = false;
    }

    if (!fields.service.value) {
      setError('service', 'Please select a service.');
      isValid = false;
    }

    if (fields.message.value.trim().length < 8) {
      setError('message', 'Please add a short description of the appliance problem.');
      isValid = false;
    }

    const file = fields.photo.files && fields.photo.files[0];
    if (!file) {
      setError('photo', 'Please attach a photo of the model number sticker.');
      isValid = false;
    } else {
      const normalizedType = file.type || '';
      const extension = file.name.split('.').pop().toLowerCase();
      const allowedExtension = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'].includes(extension);
      if ((!allowedImageTypes.has(normalizedType) && !allowedExtension) || file.size > maxFileBytes) {
        setError('photo', 'Please attach a JPG, PNG, WEBP, or HEIC image up to 8 MB.');
        isValid = false;
      }
    }

    return isValid;
  }

  function buildPayload() {
    const payload = new FormData(form);
    const file = fields.photo.files && fields.photo.files[0];
    payload.set('Name', fields.name.value);
    payload.set('Phone', normalizedPhone());
    payload.set('Email', fields.email.value.trim());
    payload.set('_replyto', fields.email.value.trim());
    payload.set('Address', fields.address.value);
    payload.set('Message', fields.message.value.trim());
    payload.delete('Model_Number_Photo');
    if (file) {
      payload.append('Model_Number_Photo', file, shortenFileName(file.name));
    }
    return payload;
  }

  function applyServerErrors(errors) {
    if (!errors || typeof errors !== 'object') return false;
    Object.entries(errors).forEach(([key, message]) => setError(key, String(message || '')));
    return Object.keys(errors).length > 0;
  }

  async function sendPayload(endpoint, payload) {
    if (!endpoint) {
      throw new Error('Missing endpoint');
    }
    const response = await fetch(endpoint, {
      method: 'POST',
      body: payload,
      headers: { Accept: 'application/json' }
    });
    let data = {};
    try {
      data = await response.json();
    } catch (error) {
      data = {};
    }
    if (!response.ok) {
      const failed = new Error(data.message || 'Request failed');
      failed.status = response.status;
      failed.errors = data.errors;
      throw failed;
    }
    if (String(data.success).toLowerCase() === 'false') {
      const failed = new Error(data.message || 'Request failed');
      failed.status = response.status;
      failed.errors = data.errors;
      throw failed;
    }
    return data;
  }

  async function sendRequest() {
    const hasAttachment = Boolean(fields.photo.files && fields.photo.files[0]);
    const formSubmitEndpoint = form.dataset.endpoint;
    const serverEndpoint = form.dataset.backupEndpoint || form.dataset.fallbackEndpoint;
    const primaryEndpoint = hasAttachment ? serverEndpoint : formSubmitEndpoint;
    const backupEndpoint = hasAttachment ? formSubmitEndpoint : serverEndpoint;
    let primaryError = null;

    try {
      await sendPayload(primaryEndpoint, buildPayload());
      return;
    } catch (error) {
      primaryError = error;
      if (error.status === 422) {
        throw error;
      }
    }

    if (!backupEndpoint || backupEndpoint === primaryEndpoint) {
      throw primaryError;
    }

    try {
      await sendPayload(backupEndpoint, buildPayload());
    } catch (backupError) {
      if (backupError.status === 422) {
        throw backupError;
      }
      throw primaryError || backupError;
    }
  }

  fields.name.addEventListener('input', () => {
    const cleaned = cleanName(fields.name.value);
    if (fields.name.value !== cleaned) fields.name.value = cleaned;
  });

  fields.address.addEventListener('input', () => {
    const cleaned = cleanAddress(fields.address.value);
    if (fields.address.value !== cleaned) fields.address.value = cleaned;
  });

  fields.phone.addEventListener('input', () => {
    const before = verificationState.verifiedPhone || verificationState.challengedPhone || '';
    fields.phone.value = formatPhone(fields.phone.value);
    if (before && before !== normalizedPhone()) resetVerification(true);
  });

  fields.phone.addEventListener('focus', () => {
    if (!fields.phone.value) fields.phone.value = '+1 ';
  });

  fields.phone.addEventListener('blur', () => {
    if (!getLocalPhoneDigits(fields.phone.value)) fields.phone.value = '';
  });

  fields.photo.addEventListener('change', () => {
    const file = fields.photo.files && fields.photo.files[0];
    if (fileName) fileName.textContent = file ? shortenFileName(file.name) : 'No file selected';
    setError('photo', '');
  });

  otpInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      const value = input.value.replace(/\D/g, '');
      if (value.length > 1) {
        updateOtpCode(value, value.length >= 6 ? 5 : value.length);
        return;
      }
      input.value = value;
      if (value && otpInputs[index + 1]) otpInputs[index + 1].focus();
    });
    input.addEventListener('paste', (event) => {
      event.preventDefault();
      const text = (event.clipboardData || window.clipboardData).getData('text');
      updateOtpCode(text, 5);
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && !input.value && otpInputs[index - 1]) {
        otpInputs[index - 1].focus();
      }
    });
  });

  if (otpResendButton) {
    otpResendButton.addEventListener('click', async () => {
      if (!validate()) return;
      otpResendButton.disabled = true;
      submitButton.disabled = true;
      setStatus('Sending a new SMS code...', false);
      try {
        await resendPhoneVerification();
      } catch (error) {
        setStatus(error.message || 'Unable to send SMS code. Please call us at (463) 248-8429.', true);
      } finally {
        otpResendButton.disabled = false;
        submitButton.disabled = false;
      }
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validate()) {
      setStatus('Please correct the highlighted fields and send again.', true);
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = verificationState.challengeId && verificationState.verifiedPhone !== normalizedPhone()
      ? 'Verifying...'
      : 'Sending...';
    setStatus(verificationState.challengeId ? 'Checking SMS code...' : 'Sending SMS code...', false);

    try {
      const verified = await ensurePhoneVerified();
      if (!verified) return;

      await sendRequest();

      form.reset();
      if (fileName) fileName.textContent = 'No file selected';
      resetVerification(true);
      setStatus('', false);
      showModal();
    } catch (error) {
      if (error.status === 422 && applyServerErrors(error.errors)) {
        setStatus('Please correct the highlighted fields and send again.', true);
      } else {
        setStatus(error.message || 'We could not send the request automatically. Please call us at (463) 248-8429 or try again.', true);
      }
    } finally {
      submitButton.disabled = false;
      setSubmitText(verificationState.challengeId && verificationState.verifiedPhone !== normalizedPhone()
        ? 'Verify & Send Request'
        : 'Send Request');
    }
  });

  modalCloseButtons.forEach((button) => button.addEventListener('click', hideModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hideModal();
  });

  if (new URLSearchParams(window.location.search).get('request') === 'sent') {
    showModal();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
})();
