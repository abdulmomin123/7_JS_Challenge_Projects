'use strict';

const elements = {
  userInput: document.querySelector('.guess'),
  check: document.querySelector('.check'),
  hint: document.querySelector('.message'),
  score: document.querySelector('.score'),
  highScore: document.querySelector('.highscore'),
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
    wrongGuess('high');
  } else if (userGuess < secretNum) {
    wrongGuess('low');
  } else {
    correctGuess();
  }

  console.log(userGuess);
}

function wrongGuess(numState) {
  if (numState === 'low') {
    elements.hint.textContent = '📉 Too low!';
    score--;
  } else {
    elements.hint.textContent = '📈 Too high!';
    score--;
  }
}

function correctGuess() {
  elements.hint.textContent = '🎉 Correct Number!';
  elements.number.textContent = secretNum;
  document.body.classList.add('win');
}

function updateUI(isWin) {
  elements.score.textContent = score;

  if (isWin) {
    elements.highScore.textContent = score;
    elements.number.textContent = secretNum;
  }
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
