'use strict';

// DOM Elements
const elements = {
  modalElements: document.querySelectorAll('.modal, .overlay'),
  btnsOpenModal: document.querySelectorAll('.btn--show-modal'),
  btnsCloseModal: document.querySelectorAll('.btn--close-modal, .overlay'),

  btnsSmoothScr: document.querySelectorAll(
    '.btn--scroll-to, .nav__links :not(:last-child)'
  ),

  sections: [...document.querySelectorAll('.section')],
};

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
const smoothScroll = element => {
  element.scrollIntoView({ behavior: 'smooth' });
};

// Modal window opening & closing handlers
elements.btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
elements.btnsCloseModal.forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', closeModal);

// Smooth scroll handlers
elements.btnsSmoothScr.forEach(btn =>
  btn.addEventListener('click', smoothScroll.bind(null, elements.sections[0]))
);
