(function () {
  'use strict';

  const repairCards = Array.from(document.querySelectorAll('[data-home-gallery]'));
  const repairsViewport = document.querySelector('.home-repairs-viewport');
  const previousRepairsButton = document.querySelector('.home-carousel-prev');
  const nextRepairsButton = document.querySelector('.home-carousel-next');
  const galleryModal = document.querySelector('.home-gallery-modal');

  if (!repairCards.length || !repairsViewport || !galleryModal) return;

  let carouselIndex = 0;
  let galleryImages = [];
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

  function scrollToCard(index) {
    carouselIndex = (index + repairCards.length) % repairCards.length;
    repairCards[carouselIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function updateCarouselIndex() {
    const viewportCenter = repairsViewport.getBoundingClientRect().left + repairsViewport.clientWidth / 2;
    let closestDistance = Infinity;

    repairCards.forEach((card, index) => {
      const bounds = card.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        carouselIndex = index;
      }
    });
  }

  previousRepairsButton?.addEventListener('click', function () {
    updateCarouselIndex();
    scrollToCard(carouselIndex - 1);
  });

  nextRepairsButton?.addEventListener('click', function () {
    updateCarouselIndex();
    scrollToCard(carouselIndex + 1);
  });

  repairsViewport.addEventListener('scroll', function () {
    window.requestAnimationFrame(updateCarouselIndex);
  }, { passive: true });

  function showGalleryImage(index) {
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    galleryImage.src = galleryImages[galleryIndex];
    galleryImage.alt = galleryTitle + ', photo ' + (galleryIndex + 1) + ' of ' + galleryImages.length;
    galleryTitleElement.textContent = galleryTitle;
    galleryCounter.textContent = (galleryIndex + 1) + ' of ' + galleryImages.length;

    const nextImage = new Image();
    nextImage.src = galleryImages[(galleryIndex + 1) % galleryImages.length];
  }

  function openGallery(card) {
    try {
      galleryImages = JSON.parse(card.dataset.gallery || '[]');
    } catch (error) {
      galleryImages = [];
    }

    if (!galleryImages.length) return;

    galleryTitle = card.dataset.title || 'Completed appliance repair';
    returnFocus = card;
    galleryModal.hidden = false;
    document.body.classList.add('home-gallery-open');
    showGalleryImage(0);

    window.requestAnimationFrame(function () {
      galleryModal.classList.add('is-open');
      closeGalleryButton.focus();
    });
  }

  function closeGallery() {
    galleryModal.classList.remove('is-open');
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
