'use strict';

// Modal window
const elements = {
  openingElements: document.querySelectorAll('.modal, .overlay'),
  closingElements: document.querySelectorAll('.close-modal, .overlay'),

  modal: document.querySelector('.modal'),
  overlay: document.querySelector('.overlay'),
  btnCloseModal: document.querySelector('.btn--close-modal'),
  btnsOpenModal: document.querySelectorAll('.btn--show-modal'),
};

const openModal = () => {
  openingElements.forEach(el => el.classList.remove('hidden'));
};

const closeModal = () => {
  openingElements.forEach(el => el.classList.add('hidden'));
};

buttons.forEach(btn => btn.addEventListener('click', openModal));
closingElements.forEach(el => el.addEventListener('click', closeModal));

// const openModal = function () {
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// };

// const closeModal = function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// };

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });
