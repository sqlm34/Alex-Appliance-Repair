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
			slideDown(subMenu, 300);
			subMenu.classList.add('is-active');
			menuLi.classList.add('is-active');
			const menuLabel = menuLi.querySelector(':scope > a')?.childNodes[0]?.textContent.trim();
			if (menuLabel === 'Locations') {
				menuLi.querySelectorAll(':scope > .sub-menu > .menu-has-children').forEach(cityLi => {
					const citySubMenu = cityLi.querySelector(':scope > .sub-menu');
					cityLi.classList.add('is-active');
					if (citySubMenu) {
						citySubMenu.style.display = 'block';
						citySubMenu.style.height = '';
					}
				});
			}
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

	// Header END

	// Counter START //
	let nums = document.querySelectorAll('.about-num-title');
	let container = document.querySelector('.about-num-title');

	let test = false;

	window.onscroll = () => {
		if (window.screenY = container.offsetTop) {
			if (!test) {
				nums.forEach((e) => {
					let start = 0;
					let end = e.dataset.value;

					let count = setInterval(() => {
						start++;
						e.textContent = start;
						if (start == end) {
							clearInterval(count);
						}
					}, 5000 / end)
				})
			}
			test = true;
		}
	}
	// Counter END //

	//Progress bar START//
	const progressSection = document.querySelector('.progress-item');
	const progressBars = document.querySelectorAll('.progress-drag');
	const numbers = document.querySelectorAll('.progress-percent');
	let start = false;

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
				let end = e.dataset.percent;

				let count = setInterval(() => {
					start++;
					e.textContent = start + '%';
					if (start == end) {
						clearInterval(count);
					}
				}, 100 / end)
			});
			test2 = true;
		}
	}

	window.addEventListener('scroll', () => {
		const sectionPos = progressSection.getBoundingClientRect().top;
		const screenPos = window.innerHeight / 2;

		if (sectionPos < screenPos) {
			showProgress();
			showPercent();
		} else {
			// hideProgress();
		}
	});

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

	//Swiper Testimonials START//
	const swiperTestimonials = new Swiper('.swiper-testimonials', {

		// Optional parameters
		speed: 1000,
		direction: 'horizontal',
		loop: true,
		effect: 'cube',
		cubeEffect: {
			shadow: false
		},

		// If we need pagination
		pagination: {
			el: '.swiper-testimonials .swiper-pagination',
			clickable: true
		},
	});
	//Swiper Testimonials END//

	//Swiper Testimonials V2 START//
	const swiperTestimonialsV2 = new Swiper('.swiper-testimonials-v2', {
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
	//Swiper Testimonials V2 END//


	//Magnific-popup VIDEO START//
	$('.magnific-iframe').magnificPopup({
		type: 'iframe',
	});
	//Magnific-popup Video END//


	//Magnific-popup Gallery START//
	$('.magnific-image').magnificPopup({
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
	//Magnific-popup Gallery END//

	//Swiper Gallery START//
	const swiperGallery = new Swiper('.swiper-gallery', {
		speed: 1000,
		loop: true,
		scrollbar: {
			el: '.swiper-gallery .swiper-scrollbar',
			draggable: true,
			dragSize: 56
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
			575: {
				slidesPerView: 2,
				spaceBetween: 0,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 0,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 0,
			},
		}
	});
	//Swiper Gallery END//

	//Swiper Blog START//
	const swiperBlog = new Swiper('.swiper-blog', {
		speed: 1000,
		slidesPerView: 1,
		spaceBetween: 24,
		watchOverflow: true,
		centerInsufficientSlides: true,

		pagination: {
			el: '.swiper-blog .swiper-pagination',
			clickable: true
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			575: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
		}
	});
	//Swiper Blog END//

	//Swiper Partners START//
	const swiperPartners = new Swiper('.swiper-partners', {
		speed: 1000,
		slidesPerView: 6,
		spaceBetween: 18,
	});
	//Swiper Partners END//

	//Swiper Services V2 START//
	const swiperServices = new Swiper('.swiper-services', {
		speed: 1000,
		slidesPerView: 'auto',
		watchSlidesProgress: true,
		pagination: {
			el: '.swiper-services .swiper-pagination',
			clickable: true
		},
	});
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
