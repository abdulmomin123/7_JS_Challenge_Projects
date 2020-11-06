'use strict';

// DOM Elements
const elements = {
  modalElements: document.querySelectorAll('.modal, .overlay'),
  btnsOpenModal: document.querySelectorAll('.btn--show-modal'),
  btnsCloseModal: document.querySelectorAll('.btn--close-modal, .overlay'),
  btnsSmoothScr: [
    ...document.querySelectorAll(
      '.btn--scroll-to, .nav__links :not(:last-child)'
    ),
  ],
  navLinks: document.querySelectorAll('.nav__link'),

  nav: document.querySelector('.nav'),
  header: document.querySelector('.header__title'),

  tabsContainer: document.querySelector('.operations__tab-container'),
  tabs: document.querySelectorAll('.operations__tab'),
  operationsContent: document.querySelectorAll('.operations__content'),

  sections: [...document.querySelectorAll('.section')],

  secImages: document.querySelectorAll('.features__img'),

  slider: document.querySelector('.slider'),

  slides: document.querySelectorAll('.slide'),
};
let slidesPos = [200, 100, 0];

//////////////////////// Functions \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Opens modal window
const openModal = e => {
  e.preventDefault();
  elements.modalElements.forEach(el => el.classList.remove('hidden'));
};

// Closes modal window
const closeModal = e => {
  if (!e.key || e.key === 'Escape')
    elements.modalElements.forEach(el => el.classList.add('hidden'));
};

// Smooth scroll
const smoothScroll = e => {
  e.preventDefault();
  elements.sections[Number(e.target.dataset.scrollTo) - 1].scrollIntoView({
    behavior: 'smooth',
  });
};

// Hide other nav links on hover
const navHoverEffect = (e, mouseLeave) => {
  if (mouseLeave) {
    elements.navLinks.forEach(link => link.classList.remove('hide-nav-link'));
    return;
  }

  elements.navLinks.forEach(link => link.classList.add('hide-nav-link'));
  e.target.classList.remove('hide-nav-link');
};

// Modal window opening & closing handlers
elements.btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
elements.btnsCloseModal.forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', closeModal);

// Smooth scroll handlers
elements.btnsSmoothScr.forEach(btn =>
  btn.addEventListener('click', smoothScroll)
);

// Operation tabs switcher
const switchTab = e => {
  if (e.target !== elements.tabsContainer) {
    const target = e.target.closest('.operations__tab');

    // hide previous active tab & content
    elements.tabs.forEach(tab =>
      tab.classList.remove('operations__tab--active')
    );
    elements.operationsContent.forEach(con =>
      con.classList.remove('operations__content--active')
    );

    // make the clicked tab & content active
    target.classList.add('operations__tab--active');
    target.parentNode.parentNode
      .querySelector(`.operations__content--${target.dataset.tab}`)
      .classList.add('operations__content--active');
  }
};

// Makes the navigation sticky after scrolling
const stickyNav = entries => {
  const [entry] = entries;

  if (entry.intersectionRatio <= 0.8) {
    elements.nav.classList.add('sticky');
    setTimeout(() => {
      elements.nav.classList.add('animate-sticky-nav');
    }, 20);
    elements.header.classList.add('sticky-active');
  } else {
    elements.nav.classList.remove('sticky', 'animate-sticky-nav');
    elements.header.classList.remove('sticky-active');
  }
};

// Animate sections & make them visible on scroll
const revealSections = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }
  });
};

// Lazy load images on scroll
const loadImage = (entries, observer) => {
  entries.forEach(entry => {
    const target = entry.target;

    if (entry.isIntersecting) {
      target.setAttribute('src', target.dataset.src);

      target.addEventListener('load', () =>
        target.classList.remove('lazy-img')
      );

      observer.unobserve(target);
    }
  });
};

// Testimonials slider
const slideElement = e => {
  const target = e.target;

  if (
    target !== elements.slider.querySelector('.slider__btn--left') &&
    target !== elements.slider.querySelector('.slider__btn--right')
  )
    return;

  if (target.classList.contains('slider__btn--left')) {
    elements.slides.forEach((slide, i) => {
      slidesPos[i] += 100;
      slide.style.transform = `translateX(${slidesPos[i]}%)`;
    });
  } else {
    elements.slides.forEach((slide, i) => {
      slidesPos[i] -= 100;
      slide.style.transform = `translateX(${slidesPos[i]}%)`;
    });
  }
};

//////////////////////// Event Listeners \\\\\\\\\\\\\\\\\\\\\\\\\
// Navigation links on hover handlers
elements.navLinks.forEach(link =>
  link.addEventListener('mouseenter', navHoverEffect)
);
elements.navLinks.forEach(link =>
  link.addEventListener('mouseleave', navHoverEffect.bind(null, true))
);

// Operations tab switch handlers
elements.tabsContainer.addEventListener('click', switchTab);

// Sticky navigation handler
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.8,
});
observer.observe(elements.header);

// Reaviling Sections on scroll handler
const sectionsObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.2,
});
elements.sections.forEach(section => sectionsObserver.observe(section));

// Lazy loading of images handler
const imagesObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '150px',
});
elements.secImages.forEach(img => imagesObserver.observe(img));

// Testimonials slider handler
elements.slider.addEventListener('click', slideElement);
