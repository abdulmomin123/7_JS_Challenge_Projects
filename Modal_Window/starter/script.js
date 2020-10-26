'use strict';

const buttons = document.querySelectorAll('.show-modal');
const openingElements = document.querySelectorAll('.modal, .overlay');
const closingElements = document.querySelectorAll('.close-modal, .overlay');

const openModal = () => {
  openingElements.forEach(el => el.classList.remove('hidden'));
};

const closeModal = () => {
  openingElements.forEach(el => el.classList.add('hidden'));
};

buttons.forEach(btn => btn.addEventListener('click', openModal));
closingElements.forEach(el => el.addEventListener('click', closeModal));
