'use strict';

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const elements = {
  modalElements: document.querySelectorAll('.modal, .overlay'),
  btnsOpenModal: document.querySelectorAll('.btn--show-modal'),
  btnsCloseModal: document.querySelectorAll('.btn--close-modal, .overlay'),
};

const openModal = e => {
  e.preventDefault();
  elements.modalElements.forEach(el => el.classList.remove('hidden'));
};

const closeModal = () => {
  elements.modalElements.forEach(el => el.classList.add('hidden'));
};

elements.btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
elements.btnsCloseModal.forEach(el => el.addEventListener('click', closeModal));
