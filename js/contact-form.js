(function () {
  const form = document.querySelector('[data-request-service-form]');
  if (!form) return;

  const fields = {
    name: form.querySelector('#service-name'),
    phone: form.querySelector('#service-phone'),
    email: form.querySelector('#service-email'),
    city: form.querySelector('#service-city'),
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
  const maxFileBytes = 8 * 1024 * 1024;
  const allowedImageTypes = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif'
  ]);

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

  function trimSpaces(value) {
    return value.replace(/\s+/g, ' ').trim();
  }

  function cleanName(value) {
    return value.replace(/[0-9]/g, '').replace(/[^A-Za-z\s'.-]/g, '');
  }

  function cleanCity(value) {
    return value.replace(/[0-9]/g, '').replace(/[^A-Za-z\s'.-]/g, '');
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
    fields.city.value = trimSpaces(cleanCity(fields.city.value));
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

    if (!/^[A-Za-z][A-Za-z\s'.-]{1,59}$/.test(fields.city.value)) {
      setError('city', 'Please enter a city name using letters only.');
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
    if (file) {
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
    payload.set('City', fields.city.value);
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
    return data;
  }

  async function sendRequest() {
    const primaryEndpoint = form.dataset.endpoint;
    const backupEndpoint = form.dataset.backupEndpoint || form.dataset.fallbackEndpoint;
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

  fields.city.addEventListener('input', () => {
    const cleaned = cleanCity(fields.city.value);
    if (fields.city.value !== cleaned) fields.city.value = cleaned;
  });

  fields.phone.addEventListener('input', () => {
    fields.phone.value = formatPhone(fields.phone.value);
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

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validate()) {
      setStatus('Please correct the highlighted fields and send again.', true);
      return;
    }

    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    setStatus('Sending your request...', false);

    try {
      await sendRequest();

      form.reset();
      if (fileName) fileName.textContent = 'No file selected';
      setStatus('', false);
      showModal();
    } catch (error) {
      if (error.status === 422 && applyServerErrors(error.errors)) {
        setStatus('Please correct the highlighted fields and send again.', true);
      } else {
        setStatus('We could not send the request automatically. Please call us at (463) 248-8429 or try again.', true);
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
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
