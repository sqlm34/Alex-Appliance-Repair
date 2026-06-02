document.addEventListener('DOMContentLoaded', () => {

	// Header START
	let headerLinks = document.querySelectorAll('.menu-item.menu-has-children > a');
	headerLinks.forEach(function (link) {
		let span = document.createElement('span');
		span.className = 'menu-item-plus';
		span.textContent = '+';
		link.appendChild(span);
	});

	function toggleMobileSubMenu(menuLi) {
		const subMenu = menuLi ? menuLi.querySelector(':scope > .sub-menu') : null;
		if (!subMenu) {
			return;
		}
		if (subMenu.style.display === 'block' || subMenu.style.height !== '') {
			slideUp(subMenu, 300);
			subMenu.classList.remove('is-active');
			menuLi.classList.remove('is-active');
		} else {
			const parentMenu = menuLi.parentElement;
			if (parentMenu && parentMenu.closest('.mobile-menu-nav')) {
				parentMenu.querySelectorAll(':scope > .menu-has-children').forEach(siblingLi => {
					if (siblingLi === menuLi) {
						return;
					}
					const siblingSubMenu = siblingLi.querySelector(':scope > .sub-menu');
					siblingLi.classList.remove('is-active');
					if (siblingSubMenu) {
						slideUp(siblingSubMenu, 300);
						siblingSubMenu.classList.remove('is-active');
					}
				});
			}
			slideDown(subMenu, 300);
			subMenu.classList.add('is-active');
			menuLi.classList.add('is-active');
			let parentLi = menuLi.parentElement.closest('.mobile-menu-nav .menu-has-children');
			while (parentLi) {
				const parentSubMenu = parentLi.querySelector(':scope > .sub-menu');
				parentLi.classList.add('is-active');
				if (parentSubMenu) {
					parentSubMenu.style.display = 'block';
					parentSubMenu.style.height = '';
				}
				parentLi = parentLi.parentElement.closest('.mobile-menu-nav .menu-has-children');
			}
		}
	}

	// Mobile Sub Menu OPEN
	const mobileMenuLinks = document.querySelectorAll('.mobile-menu-nav .menu-has-children > a');
	mobileMenuLinks.forEach(link => {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			toggleMobileSubMenu(link.closest('.menu-has-children'));
		});
	});
	// Mobile Sub Menu CLOSE
	
	//Slide mobile menu open START

	let hamburgerBtn = document.querySelector('.hamburger');
	let closeBtn = document.querySelector('.header-mobile-close');
	let mobileMenu = document.querySelector('.header-mobile-wrap');

	hamburgerBtn.addEventListener('click', (e) => {
		mobileMenu.classList.add('is-active');
	});
	closeBtn.addEventListener('click', (e) => {
		mobileMenu.classList.remove('is-active');
	});

	//Slide mobile menu open END

	const scrollTopButton = document.createElement('button');
	scrollTopButton.className = 'scroll-top-button';
	scrollTopButton.type = 'button';
	scrollTopButton.setAttribute('aria-label', 'Back to top');
	scrollTopButton.innerHTML = '<span aria-hidden="true"></span>';
	document.body.appendChild(scrollTopButton);

	window.addEventListener('scroll', () => {
		scrollTopButton.classList.toggle('is-visible', window.scrollY > 500);
	}, { passive: true });

	scrollTopButton.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	const bookingNoticeText = '$89. Waived if repair is needed.';
	const bookingLinks = document.querySelectorAll('a[href*="online-booking"]');
	bookingLinks.forEach((link) => {
		if (link.closest('.header, .header-mobile-wrap, .mobile-menu-nav, .offer-wrap')) {
			return;
		}
		if (link.nextElementSibling && link.nextElementSibling.classList.contains('booking-service-note')) {
			return;
		}
		const note = document.createElement('div');
		note.className = 'booking-service-note';
		note.innerHTML = `<span class="booking-service-note-label">Service call</span> <span>${bookingNoticeText}</span>`;
		link.insertAdjacentElement('afterend', note);
	});

	const shineButtons = document.querySelectorAll('a.button-v1[href*="online-booking"], a.booking-button[href*="online-booking"], .button-v1-banner[href*="online-booking"], .offer-btn-button .button-v1');
	shineButtons.forEach((button) => {
		if (button.classList.contains('button-text-shine')) {
			return;
		}
		let wrapped = false;
		Array.from(button.childNodes).forEach((node) => {
			if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) {
				return;
			}
			const shineText = document.createElement('span');
			shineText.className = 'button-shine-text';
			shineText.textContent = node.textContent.trim();
			node.replaceWith(shineText);
			wrapped = true;
		});
		if (wrapped) {
			button.classList.add('button-text-shine');
		}
	});

	const recentPostContainers = document.querySelectorAll('.alex-blog-recent, .alex-article-recent');
	if (recentPostContainers.length) {
		const normalizePath = (url) => {
			try {
				return new URL(url, window.location.origin).pathname.replace(/\/$/, '');
			} catch (error) {
				return url;
			}
		};
		const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;'
		}[char]));
		const shufflePosts = (items) => items
			.map((item) => ({ item, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ item }) => item);

		async function collectBlogArchivePosts() {
			const visited = new Set();
			const queued = new Set();
			const queue = [new URL('/blog.html', window.location.origin).href];
			const posts = new Map();
			queued.add(queue[0]);

			while (queue.length && visited.size < 14) {
				const archiveUrl = queue.shift();
				if (visited.has(archiveUrl)) {
					continue;
				}
				visited.add(archiveUrl);

				let html = '';
				try {
					const response = await fetch(archiveUrl, { cache: 'no-store' });
					if (!response.ok) {
						continue;
					}
					html = await response.text();
				} catch (error) {
					continue;
				}

				const doc = new DOMParser().parseFromString(html, 'text/html');
				doc.querySelectorAll('.alex-blog-card').forEach((card) => {
					const imageLink = card.querySelector('.alex-blog-image[href]');
					const titleLink = card.querySelector('h1 a[href], h2 a[href], h3 a[href], .alex-blog-link[href]') || imageLink;
					const image = card.querySelector('.alex-blog-image img, img');
					if (!titleLink || !imageLink || !image) {
						return;
					}
					const href = new URL(titleLink.getAttribute('href'), window.location.origin).href;
					const title = titleLink.textContent.trim();
					const src = new URL(image.getAttribute('src'), archiveUrl).href;
					if (href && title && src && !posts.has(href)) {
						posts.set(href, { href, title, src });
					}
				});

				doc.querySelectorAll('.alex-blog-pagination a[href]').forEach((link) => {
					const nextUrl = new URL(link.getAttribute('href'), window.location.origin);
					if (!/^\/blog(?:-page-\d+)?\.html$/.test(nextUrl.pathname)) {
						return;
					}
					const href = nextUrl.href;
					if (!visited.has(href) && !queued.has(href)) {
						queued.add(href);
						queue.push(href);
					}
				});
			}

			return Array.from(posts.values());
		}

		collectBlogArchivePosts().then((posts) => {
			const currentPath = normalizePath(window.location.href);
			const selectedPosts = shufflePosts(posts.filter((post) => normalizePath(post.href) !== currentPath)).slice(0, 3);
			if (!selectedPosts.length) {
				return;
			}
			const html = selectedPosts.map((post) => `
				<a href="${escapeHtml(post.href)}">
					<img src="${escapeHtml(post.src)}" alt="${escapeHtml(post.title)}">
					<span>${escapeHtml(post.title)}</span>
				</a>
			`).join('');
			recentPostContainers.forEach((container) => {
				container.innerHTML = html;
			});
		});
	}

	// Header END

	// Counter START //
	const nums = document.querySelectorAll('.about-num-title');
	const runCounters = () => {
		nums.forEach((num) => {
			const end = Number(num.dataset.value || num.textContent || 0);
			if (!end || num.dataset.counted === 'true') {
				return;
			}
			num.dataset.counted = 'true';
			let start = 0;
			const step = Math.max(1, Math.ceil(end / 80));
			const count = setInterval(() => {
				start = Math.min(end, start + step);
				num.textContent = start;
				if (start >= end) {
					clearInterval(count);
				}
			}, 24);
		});
	};

	if (nums.length) {
		if ('IntersectionObserver' in window) {
			const observer = new IntersectionObserver((entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					runCounters();
					observer.disconnect();
				}
			}, { threshold: 0.25 });
			observer.observe(nums[0]);
		} else {
			runCounters();
		}
	}
	// Counter END //

	//Progress bar START//
	const progressSection = document.querySelector('.progress-wrap');
	const progressBars = document.querySelectorAll('.progress-drag');
	const numbers = document.querySelectorAll('.progress-percent');
	let progressStarted = false;

	function showProgress() {
		progressBars.forEach(progressBar => {
			const value = progressBar.dataset.progress;
			progressBar.style.opacity = 1;
			progressBar.style.width = `${value}`;
		});
	}

	let test2 = false;

	function showPercent() {
		if (!test2) {
			numbers.forEach(e => {

				let start = 0;
				let end = Number(e.dataset.percent || 0);
				if (!end) {
					return;
				}

				let count = setInterval(() => {
					start++;
					e.textContent = start + '%';
					if (start >= end) {
						clearInterval(count);
					}
				}, 100 / end)
			});
			test2 = true;
		}
	}

	const runProgress = () => {
		if (progressStarted) {
			return;
		}
		progressStarted = true;
		showProgress();
		showPercent();
	};

	if (progressSection && progressBars.length) {
		if ('IntersectionObserver' in window) {
			const progressObserver = new IntersectionObserver((entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					runProgress();
					progressObserver.disconnect();
				}
			}, { threshold: 0.25 });
			progressObserver.observe(progressSection);
		} else {
			window.addEventListener('scroll', () => {
				const sectionPos = progressSection.getBoundingClientRect().top;
				const screenPos = window.innerHeight / 2;

				if (sectionPos < screenPos) {
					runProgress();
				}
			}, { passive: true });

			if (progressSection.getBoundingClientRect().top < window.innerHeight) {
				runProgress();
			}
		}
	}

	//Progress bar END//

	//--------------------------------------------------------//

	//Accordeon FAQ Answer START//
	// Slide Down Function START
	function slideDown(element, duration) {
		element.style.display = 'block';
		let height = element.offsetHeight;
		element.style.height = 0;
		element.style.overflow = 'hidden';

		let start = null;
		function step(timestamp) {
			if (!start) start = timestamp;
			let progress = timestamp - start;
			let currentHeight = Math.min(progress / duration * height, height);
			element.style.height = currentHeight + 'px';
			if (progress < duration) {
				window.requestAnimationFrame(step);
			} else {
				element.style.height = '';
			}
		}
		window.requestAnimationFrame(step);
	}
	// Slide Down Function END

	// Sub Menu Slide Up Function START
	function slideUp(element, duration) {
		let height = element.offsetHeight;
		element.style.height = height + 'px';
		element.style.overflow = 'hidden';

		let start = null;
		function step(timestamp) {
			if (!start) start = timestamp;
			let progress = timestamp - start;
			let currentHeight = Math.max(height - (progress / duration * height), 0);
			element.style.height = currentHeight + 'px';
			if (progress < duration) {
				window.requestAnimationFrame(step);
			} else {
				element.style.display = 'none';
				element.style.height = '';
			}
		}
		window.requestAnimationFrame(step);
	}
	// Sub Menu Slide Up Function END

	// FAQ ACCORDIONS START
	const faqQuestion = document.querySelectorAll('.faq-item');
	faqQuestion.forEach(button => {
		button.addEventListener('click', function (event) {
			event.preventDefault();
			const answer = button.querySelector('.faq-answer');
			if (answer.style.display === 'block' || answer.style.height !== '') {
				slideUp(answer, 300);
				answer.classList.remove('is-active');
				button.classList.remove('is-active');
			} else {
				slideDown(answer, 300);
				answer.classList.add('is-active');
				button.classList.add('is-active');
			}
		});
	});
	// FAQ ACCORDIONS END
	//Accordeon FAQ Answer END//

	// Home sliders START//
	function getSliderSettings(settings) {
		const points = (settings.breakpoints || []).slice().sort((a, b) => a.width - b.width);
		return points.reduce((current, point) => {
			const matches = !point.width || window.matchMedia(`(min-width: ${point.width}px)`).matches;
			return matches ? { ...current, ...point } : current;
		}, { ...settings });
	}

	function setupNativeSlider(selector, settings) {
		const slider = document.querySelector(selector);
		if (!slider) return;

		const wrapper = slider.querySelector('.swiper-wrapper');
		const pagination = slider.querySelector('.swiper-pagination');
		const scrollbar = slider.querySelector('.swiper-scrollbar');
		if (!wrapper) return;

		let index = 0;
		let timer = null;
		let buildFrame = null;

		slider.classList.add('native-slider');

		function slides() {
			return Array.from(wrapper.children).filter(slide => slide.classList.contains('swiper-slide'));
		}

		function maxIndex(perView) {
			return Math.max(slides().length - perView, 0);
		}

		function moveTo(nextIndex, animate = true) {
			const options = getSliderSettings(settings);
			const perView = Math.min(options.perView || 1, Math.max(slides().length, 1));
			const gap = options.gap || 0;
			const max = maxIndex(perView);
			index = Math.max(0, Math.min(nextIndex, max));
			wrapper.style.transition = animate ? 'transform 500ms ease' : 'none';
			wrapper.style.transform = `translate3d(calc(-${index} * ((100% + ${gap}px) / ${perView})), 0, 0)`;

			if (pagination) {
				pagination.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, bulletIndex) => {
					bullet.classList.toggle('swiper-pagination-bullet-active', bulletIndex === index);
				});
			}

			if (scrollbar) {
				const drag = scrollbar.querySelector('.native-scrollbar-drag');
				if (drag) {
					const steps = Math.max(max, 1);
					const width = Math.max(100 / (max + 1), 18);
					drag.style.width = `${width}%`;
					drag.style.transform = `translateX(${(100 - width) * (index / steps)}%)`;
				}
			}
		}

		function build() {
			const options = getSliderSettings(settings);
			const currentSlides = slides();
			const perView = Math.min(options.perView || 1, Math.max(currentSlides.length, 1));
			const gap = options.gap || 0;

			wrapper.style.display = 'flex';
			wrapper.style.gap = `${gap}px`;
			wrapper.style.alignItems = 'stretch';

			currentSlides.forEach(slide => {
				slide.style.flex = `0 0 calc((100% - ${gap * (perView - 1)}px) / ${perView})`;
				slide.style.maxWidth = `calc((100% - ${gap * (perView - 1)}px) / ${perView})`;
				slide.style.marginRight = '0';
			});

			const max = maxIndex(perView);
			if (pagination) {
				pagination.innerHTML = '';
				for (let i = 0; i <= max; i += 1) {
					const bullet = document.createElement('button');
					bullet.type = 'button';
					bullet.className = 'swiper-pagination-bullet';
					bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);
					bullet.addEventListener('click', () => {
						stop();
						moveTo(i);
						start();
					});
					pagination.appendChild(bullet);
				}
			}

			if (scrollbar) {
				scrollbar.innerHTML = '<span class="native-scrollbar-drag"></span>';
			}

			moveTo(Math.min(index, max), false);
		}

		function next() {
			const options = getSliderSettings(settings);
			const max = maxIndex(Math.min(options.perView || 1, Math.max(slides().length, 1)));
			moveTo(index >= max ? 0 : index + 1);
		}

		function start() {
			if (!settings.autoplay || slides().length <= (getSliderSettings(settings).perView || 1)) return;
			stop();
			timer = window.setInterval(next, settings.autoplay);
		}

		function stop() {
			if (timer) window.clearInterval(timer);
			timer = null;
		}

		let resizeTimer = null;
		window.addEventListener('resize', () => {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(() => {
				scheduleBuild();
			}, 150);
		});

		slider.addEventListener('mouseenter', stop);
		slider.addEventListener('mouseleave', start);

		let startX = 0;
		let currentX = 0;
		slider.addEventListener('touchstart', event => {
			startX = event.touches[0].clientX;
			currentX = startX;
			stop();
		}, { passive: true });
		slider.addEventListener('touchmove', event => {
			currentX = event.touches[0].clientX;
		}, { passive: true });
		slider.addEventListener('touchend', () => {
			if (Math.abs(startX - currentX) > 45) {
				moveTo(startX > currentX ? index + 1 : index - 1);
			}
			start();
		});

		function scheduleBuild() {
			if (buildFrame) {
				window.cancelAnimationFrame(buildFrame);
			}
			buildFrame = window.requestAnimationFrame(() => {
				buildFrame = null;
				build();
			});
		}

		const observer = new MutationObserver(scheduleBuild);
		observer.observe(wrapper, { childList: true });

		build();
		start();
	}

	setupNativeSlider('.swiper-testimonials', {
		perView: 1,
		gap: 0,
		autoplay: 6500
	});

	setupNativeSlider('.swiper-gallery', {
		perView: 4,
		gap: 0,
		autoplay: 4500,
		breakpoints: [
			{ width: 0, perView: 1 },
			{ width: 575, perView: 2 },
			{ width: 992, perView: 3 },
			{ width: 1200, perView: 4 }
		]
	});

	setupNativeSlider('.swiper-blog', {
		perView: 2,
		gap: 24,
		autoplay: 5500,
		breakpoints: [
			{ width: 0, perView: 1, gap: 20 },
			{ width: 575, perView: 2, gap: 20 },
			{ width: 992, perView: 2, gap: 24 },
			{ width: 1200, perView: 2, gap: 24 }
		]
	});
	// Home sliders END//

	// Native gallery lightbox START//
	const galleryLinks = Array.from(document.querySelectorAll('.gallery-item[href]'));
	if (galleryLinks.length > 0) {
		const lightboxPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
		const lightbox = document.createElement('div');
		lightbox.className = 'native-lightbox';
		lightbox.setAttribute('role', 'dialog');
		lightbox.setAttribute('aria-modal', 'true');
		lightbox.setAttribute('aria-label', 'Gallery image preview');
		lightbox.innerHTML = `
			<button type="button" class="native-lightbox-close" aria-label="Close gallery image">&times;</button>
			<button type="button" class="native-lightbox-prev" aria-label="Previous gallery image">&#8249;</button>
			<img src="${lightboxPlaceholder}" alt="Gallery image">
			<button type="button" class="native-lightbox-next" aria-label="Next gallery image">&#8250;</button>
		`;
		document.body.appendChild(lightbox);

		const preview = lightbox.querySelector('img');
		const closeButton = lightbox.querySelector('.native-lightbox-close');
		const previousButton = lightbox.querySelector('.native-lightbox-prev');
		const nextButton = lightbox.querySelector('.native-lightbox-next');
		let activeIndex = 0;

		function showImage(index) {
			activeIndex = (index + galleryLinks.length) % galleryLinks.length;
			const link = galleryLinks[activeIndex];
			const image = link.querySelector('img');
			preview.src = link.getAttribute('href');
			preview.alt = image ? image.alt : 'Gallery image';
			lightbox.classList.add('is-open');
			document.body.style.overflow = 'hidden';
		}

		function closeLightbox() {
			lightbox.classList.remove('is-open');
			document.body.style.overflow = '';
			preview.src = lightboxPlaceholder;
			preview.alt = 'Gallery image';
		}

		galleryLinks.forEach((link, index) => {
			link.addEventListener('click', event => {
				event.preventDefault();
				event.stopImmediatePropagation();
				showImage(index);
			}, true);
		});

		closeButton.addEventListener('click', closeLightbox);
		previousButton.addEventListener('click', () => showImage(activeIndex - 1));
		nextButton.addEventListener('click', () => showImage(activeIndex + 1));
		lightbox.addEventListener('click', event => {
			if (event.target === lightbox) {
				closeLightbox();
			}
		});
		document.addEventListener('keydown', event => {
			if (!lightbox.classList.contains('is-open')) {
				return;
			}
			if (event.key === 'Escape') closeLightbox();
			if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
			if (event.key === 'ArrowRight') showImage(activeIndex + 1);
		});
	}
	// Native gallery lightbox END//

	//Swiper Testimonials V2 START//
	if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-testimonials-v2')) {
		new Swiper('.swiper-testimonials-v2', {
			speed: 1000,
			slidesPerView: 3,
			spaceBetween: 30,
			watchSlidesProgress: true,
			pagination: {
				el: '.swiper-testimonials-v2 .swiper-pagination-v2',
				clickable: true
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				870: {
					slidesPerView: 2,
					spaceBetween: 0,
				},
				1198: {
					slidesPerView: 3,
					spaceBetween: 0,
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 0,
				},
			}
		});
	}
	//Swiper Testimonials V2 END//


	//Magnific-popup START//
	if (typeof window.jQuery !== 'undefined' && typeof window.jQuery.fn.magnificPopup !== 'undefined') {
		window.jQuery('.magnific-iframe').magnificPopup({
			type: 'iframe',
		});

		window.jQuery('.magnific-image').magnificPopup({
			type: 'image',
			mainClass: 'mfp-with-zoom',
			zoom: {
				enabled: true,
				duration: 600,
				easing: 'ease-in-out',
				opener: function (openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	}
	//Magnific-popup END//

	//Swiper Partners START//
	if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-partners')) {
		new Swiper('.swiper-partners', {
			speed: 1000,
			slidesPerView: 6,
			spaceBetween: 18,
		});
	}
	//Swiper Partners END//

	//Swiper Services V2 START//
	if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-services')) {
		new Swiper('.swiper-services', {
			speed: 1000,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			pagination: {
				el: '.swiper-services .swiper-pagination',
				clickable: true
			},
		});
	}
	//Swiper Services V2 END//

	//TIMER START
	function startTimer(duration, display) {
		let timer = duration, hours, minutes, seconds;
		setInterval(function () {
			hours = Math.floor(timer / 3600);
			minutes = Math.floor((timer % 3600) / 60);
			seconds = timer % 60;

			hours = hours < 10 ? '0' + hours : hours;
			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			display.textContent = hours + ":" + minutes + ":" + seconds;

			if (--timer < 0) {
				timer = 0;
			}
		}, 1000);
	}
	window.onload = function () {
		const duration = 5 * 3600 + 4 * 60 + 2;
		const display = document.querySelector('#countdown');
		if (display !== null) {
			startTimer(duration, display);
		}
	}
	//TIMER END

});
