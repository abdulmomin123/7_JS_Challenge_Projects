'use strict';

const elements = {
  userInput: document.querySelector('.guess'),
  check: document.querySelector('.check'),
  hint: document.querySelector('.message'),
  score: document.querySelector('.label-score'),
  highScore: document.querySelector('.label-highscore'),
  number: document.querySelector('.number'),
  again: document.querySelector('.again'),
};

let secretNum = Math.floor(Math.random() * 20 + 1);
let score = 20;
let highScore = 0;

function evalGuess() {
  const userGuess = parseInt(elements.userInput.value);

  if (!userGuess && userGuess !== 0) {
    elements.hint.textContent = '⛔️ No number!';
    return;
  }

  if (userGuess > secretNum) {
    elements.hint.textContent = '📈 Too high!';
    return;
  } else if (userGuess < secretNum) {
    elements.hint.textContent = '📉 Too low!';
    return;
  } else {
    win();
  }

  console.log(userGuess);
}

function win() {
  elements.hint.textContent = '🎉 Correct Number!';
  elements.number.textContent = secretNum;
  document.body.classList.add('win');
}

function lost() {
  //
}

function again() {
  //
}

elements.check.addEventListener('click', evalGuess);
elements.again.addEventListener('click', again);

console.log(secretNum);
