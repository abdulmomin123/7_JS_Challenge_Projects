'use strict';

const buttons = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

buttons.forEach(button => button.addEventListener('click', openModal));
overlay.addEventListener('click', closeModal);

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  this.classList.add('hidden');
}
