'use strict';

const elements = {
  // user actions
  rollDice: document.querySelector('.btn--roll'),
  holdScore: document.querySelector('.btn--hold'),
  newGame: document.querySelector('.btn--new'),

  //   UI elements
  score0: document.getElementById('score--0'),
  current0: document.getElementById('current--0'),
  score1: document.getElementById('score--1'),
  current1: document.getElementById('current--1'),
};

// Global scores
let playerOneScore = 0;
let playerTwoScore = 0;

// For rolling the dice
function rollDice() {
  const dice = Math.trunc(Math.random() * 6 + 1);

  console.log(dice);
}

// For holding the score
function holdScore() {
  //
}

// For a new game
function newGame() {
  //
}

// Event handlers
elements.rollDice.addEventListener('click', rollDice);
elements.holdScore.addEventListener('click', holdScore);
elements.newGame.addEventListener('click', newGame);
