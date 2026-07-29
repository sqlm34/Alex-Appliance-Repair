(function () {
  'use strict';

  const repairSections = Array.from(document.querySelectorAll('.home-repairs-section'));
  const repairCards = Array.from(document.querySelectorAll('[data-home-gallery]'));

  if (!repairSections.length || !repairCards.length) return;

  let galleryModal = document.querySelector('.home-gallery-modal');

  if (!galleryModal) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="home-gallery-modal" hidden role="dialog" aria-modal="true" aria-labelledby="shared-repair-gallery-title">
        <button class="home-gallery-close" type="button" aria-label="Close repair gallery" title="Close gallery">&times;</button>
        <button class="home-gallery-prev" type="button" aria-label="Previous repair photo" title="Previous photo">&#8249;</button>
        <figure class="home-gallery-frame">
          <img class="home-gallery-image" alt="">
          <figcaption>
            <strong id="shared-repair-gallery-title" class="home-gallery-title"></strong>
            <span class="home-gallery-counter" aria-live="polite"></span>
          </figcaption>
        </figure>
        <button class="home-gallery-next" type="button" aria-label="Next repair photo" title="Next photo">&#8250;</button>
      </div>
    `);
    galleryModal = document.querySelector('.home-gallery-modal');
  }

  repairSections.forEach(function (section) {
    const viewport = section.querySelector('.home-repairs-viewport');
    const cards = Array.from(section.querySelectorAll('[data-home-gallery]'));
    const previousButton = section.querySelector('.home-carousel-prev');
    const nextButton = section.querySelector('.home-carousel-next');

    if (!viewport || !cards.length) return;

    let carouselIndex = 0;

    function scrollToCard(index) {
      carouselIndex = (index + cards.length) % cards.length;
      cards[carouselIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }

    function updateCarouselIndex() {
      const viewportCenter = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
      let closestDistance = Infinity;

      cards.forEach(function (card, index) {
        const bounds = card.getBoundingClientRect();
        const distance = Math.abs(bounds.left + bounds.width / 2 - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          carouselIndex = index;
        }
      });
    }

    previousButton?.addEventListener('click', function () {
      updateCarouselIndex();
      scrollToCard(carouselIndex - 1);
    });

    nextButton?.addEventListener('click', function () {
      updateCarouselIndex();
      scrollToCard(carouselIndex + 1);
    });

    viewport.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateCarouselIndex);
    }, { passive: true });
  });

  let galleryImages = [];
  let galleryTitles = [];
  let galleryIndex = 0;
  let galleryTitle = '';
  let returnFocus = null;
  let swipeStartX = null;

  const galleryImage = galleryModal.querySelector('.home-gallery-image');
  const galleryTitleElement = galleryModal.querySelector('.home-gallery-title');
  const galleryCounter = galleryModal.querySelector('.home-gallery-counter');
  const closeGalleryButton = galleryModal.querySelector('.home-gallery-close');
  const previousGalleryButton = galleryModal.querySelector('.home-gallery-prev');
  const nextGalleryButton = galleryModal.querySelector('.home-gallery-next');

  function parseArray(value) {
    try {
      const parsed = JSON.parse(value || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function showGalleryImage(index) {
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    const currentTitle = galleryTitles[galleryIndex] || galleryTitle;

    galleryImage.src = galleryImages[galleryIndex];
    galleryImage.alt = currentTitle + ', photo ' + (galleryIndex + 1) + ' of ' + galleryImages.length;
    galleryTitleElement.textContent = currentTitle;
    galleryCounter.textContent = (galleryIndex + 1) + ' of ' + galleryImages.length;

    const nextImage = new Image();
    nextImage.src = galleryImages[(galleryIndex + 1) % galleryImages.length];
  }

  function openGallery(card) {
    const gallerySource = card.dataset.gallery ? card : card.closest('[data-repair-gallery]');

    galleryImages = parseArray(gallerySource?.dataset.gallery);
    galleryTitles = parseArray(gallerySource?.dataset.galleryTitles);

    if (!galleryImages.length) return;

    galleryTitle = card.dataset.title || 'Completed appliance repair';
    galleryIndex = Number.parseInt(card.dataset.startIndex || '0', 10);
    returnFocus = card;
    galleryModal.hidden = false;
    document.documentElement.classList.add('home-gallery-open');
    document.body.classList.add('home-gallery-open');
    showGalleryImage(Number.isFinite(galleryIndex) ? galleryIndex : 0);

    window.requestAnimationFrame(function () {
      galleryModal.classList.add('is-open');
      closeGalleryButton.focus();
    });
  }

  function closeGallery() {
    galleryModal.classList.remove('is-open');
    document.documentElement.classList.remove('home-gallery-open');
    document.body.classList.remove('home-gallery-open');

    window.setTimeout(function () {
      galleryModal.hidden = true;
      galleryImage.removeAttribute('src');
      if (returnFocus) returnFocus.focus();
    }, 180);
  }

  repairCards.forEach(function (card) {
    card.addEventListener('click', function () {
      openGallery(card);
    });
  });

  closeGalleryButton.addEventListener('click', closeGallery);
  previousGalleryButton.addEventListener('click', function () {
    showGalleryImage(galleryIndex - 1);
  });
  nextGalleryButton.addEventListener('click', function () {
    showGalleryImage(galleryIndex + 1);
  });

  galleryModal.addEventListener('click', function (event) {
    if (event.target === galleryModal) closeGallery();
  });

  galleryImage.addEventListener('pointerdown', function (event) {
    swipeStartX = event.clientX;
  });

  galleryImage.addEventListener('pointerup', function (event) {
    if (swipeStartX === null) return;

    const distance = event.clientX - swipeStartX;
    swipeStartX = null;

    if (Math.abs(distance) < 48) return;
    showGalleryImage(galleryIndex + (distance < 0 ? 1 : -1));
  });

  document.addEventListener('keydown', function (event) {
    if (galleryModal.hidden) return;

    if (event.key === 'Escape') closeGallery();
    if (event.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
    if (event.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
  });
}());
