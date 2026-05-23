(function () {
	const config = window.ALEX_GOOGLE_REVIEWS_CONFIG || {};

	function ready(fn) {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', fn);
		} else {
			fn();
		}
	}

	function hasReviewSlider() {
		return document.querySelector('.swiper-testimonials, .swiper-testimonials-v2');
	}

	function loadGoogleMaps() {
		if (window.google && window.google.maps && window.google.maps.places) {
			return Promise.resolve();
		}
		return new Promise((resolve, reject) => {
			const existingScript = document.querySelector('script[data-google-reviews-api]');
			if (existingScript) {
				existingScript.addEventListener('load', resolve, { once: true });
				existingScript.addEventListener('error', reject, { once: true });
				return;
			}
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(config.apiKey)}&libraries=places&language=${encodeURIComponent(config.language || 'en')}&v=weekly`;
			script.async = true;
			script.defer = true;
			script.dataset.googleReviewsApi = 'true';
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	function placesService() {
		const node = document.createElement('div');
		node.style.display = 'none';
		document.body.appendChild(node);
		return new google.maps.places.PlacesService(node);
	}

	function findPlace(service) {
		if (config.placeId) {
			return Promise.resolve(config.placeId);
		}
		return new Promise((resolve, reject) => {
			service.findPlaceFromQuery({
				query: config.placeQuery,
				fields: ['place_id']
			}, (results, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0] && results[0].place_id) {
					resolve(results[0].place_id);
					return;
				}
				reject(new Error(`Google place was not found: ${status}`));
			});
		});
	}

	function getDetails(service, placeId) {
		return new Promise((resolve, reject) => {
			service.getDetails({
				placeId,
				fields: ['name', 'rating', 'user_ratings_total', 'reviews', 'url']
			}, (place, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK && place) {
					resolve(place);
					return;
				}
				reject(new Error(`Google reviews were not loaded: ${status}`));
			});
		});
	}

	function escapeHtml(value) {
		return String(value || '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function stars(rating) {
		const count = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));
		return Array.from({ length: count }, () => '<span><img loading="lazy" src="/images/star.svg" alt="Google review star"></span>').join('');
	}

	function reviewSlide(review, place) {
		const avatar = review.profile_photo_url || '/images/avatar.webp';
		const authorUrl = review.author_url || place.url || config.reviewUrl || '#';
		const text = escapeHtml(review.text || '');
		const time = escapeHtml(review.relative_time_description || 'Google review');
		return `
			<div class="swiper-slide">
				<div class="review-item google-review-item">
					<div class="review-top">
						<div class="review-quote">
							<img loading="lazy" src="/images/quote.webp" alt="Quote icon">
						</div>
						<div class="review-stars">${stars(review.rating)}</div>
					</div>
					<div class="review-body">
						<div class="review-text">
							<p>${text}</p>
						</div>
					</div>
					<div class="review-footer">
						<div class="review-avatar google-review-avatar">
							<img loading="lazy" src="${escapeHtml(avatar)}" alt="${escapeHtml(review.author_name)} Google review avatar">
						</div>
						<div class="review-info">
							<div class="review-name">${escapeHtml(review.author_name)}</div>
							<div class="review-spec">GOOGLE REVIEW</div>
							<a class="google-review-link" href="${escapeHtml(authorUrl)}" target="_blank" rel="noopener">View on Google</a>
							<div class="google-review-time">${time}</div>
						</div>
					</div>
				</div>
			</div>`;
	}

	function updateSwiper(swiperEl) {
		if (!swiperEl || !swiperEl.swiper) {
			return;
		}
		const swiper = swiperEl.swiper;
		if (typeof swiper.update === 'function') {
			swiper.update();
		}
		if (typeof swiper.slideTo === 'function') {
			swiper.slideTo(0, 0);
		}
	}

	function renderReviews(place) {
		const reviews = (place.reviews || [])
			.filter(review => review && review.text && review.author_name)
			.slice(0, Number(config.maxReviews) || 5);
		if (!reviews.length) {
			return;
		}
		const slides = reviews.map(review => reviewSlide(review, place)).join('');
		document.querySelectorAll('.swiper-testimonials .swiper-wrapper, .swiper-testimonials-v2 .swiper-wrapper').forEach(wrapper => {
			wrapper.innerHTML = slides;
			updateSwiper(wrapper.closest('.swiper'));
		});
		document.querySelectorAll('.testimonials-wrap .title-left .desc p, .testimonials-v2-wrap .title-left .desc p').forEach(desc => {
			desc.textContent = `${place.name || 'Alex Appliance Repair'} is rated ${place.rating || '5.0'} on Google from ${place.user_ratings_total || ''} customer reviews.`;
		});
	}

	ready(() => {
		if (!hasReviewSlider()) {
			return;
		}
		if (!config.apiKey) {
			renderReviews({
				name: config.businessName || 'Aksenov LLC',
				rating: config.rating || '5.0',
				user_ratings_total: config.reviewCount || '',
				url: config.reviewUrl,
				reviews: config.fallbackReviews || []
			});
			return;
		}
		loadGoogleMaps()
			.then(() => {
				const service = placesService();
				return findPlace(service).then(placeId => getDetails(service, placeId));
			})
			.then(renderReviews)
			.catch(error => {
				console.warn(error.message);
			});
	});
})();
