'use strict';

const elements = {
  // user actions
  rollDice: document.querySelector('.btn--roll'),
  holdScore: document.querySelector('.btn--hold'),
  newGame: document.querySelector('.btn--new'),

  //   UI elements
  score1: document.getElementById('score--0'),
  current1: document.getElementById('current--0'),
  score2: document.getElementById('score--1'),
  current2: document.getElementById('current--1'),

  //   Dice image
  dice: document.querySelector('.dice'),
};

// Global scores
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;
let playerOneScore = 0;
let playerTwoScore = 0;

let activePlayer = 1;

// For rolling the dice
function rollDice() {
  // Create a random number
  const dice = Math.trunc(Math.random() * 6 + 1);

  // Display the dice
  elements.dice.setAttribute('src', `dice-${dice}.png`);

  //   Update current score
  activePlayer === 1 ? (playerOneScore += dice) : (playerTwoScore += dice);

  //   if rolls a 1 : (
  if (dice === 1) {
    resetScores(activePlayer);
    displayScore(activePlayer);
    switchPlayer(activePlayer);
    return;
  }

  //   Display current Score
  displayScore(activePlayer);

  console.log(dice);
}

// For holding the score
function holdScore() {
  //
}

// For a new game
function newGame(winningScore) {
  //
}

function displayScore(activePlayer) {
  elements[`current${activePlayer}`].textContent =
    activePlayer === 1 ? playerOneScore : playerTwoScore;
}

function resetScores(activePlayer) {
  if (activePlayer === 1) {
    playerOneScore = 0;
    playerOneTotalScore = 0;
  } else {
    playerTwoScore = 0;
    playerTwoTotalScore = 0;
  }
}

function switchPlayer(currentPlayer) {
  activePlayer = currentPlayer === 1 ? 2 : 1;
}

// Event handlers
elements.rollDice.addEventListener('click', rollDice);
elements.holdScore.addEventListener('click', holdScore);
elements.newGame.addEventListener('click', newGame.bind(null, 100));
