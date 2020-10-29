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

  //   players
  players: document.querySelectorAll('.player--0, .player--1'),
  player1: document.querySelector('.player--0'),
  player2: document.querySelector('.player--1'),
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
  switchPlayer(2);
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

  //   remove class
  elements[`player${currentPlayer}`].classList.remove('player--active');

  //   add class
  currentPlayer === 1
    ? elements.player2.classList.add('player--active')
    : elements.player1.classList.add('player--active');
}

// Event handlers
elements.rollDice.addEventListener('click', rollDice);
elements.holdScore.addEventListener('click', holdScore);
elements.newGame.addEventListener('click', newGame);
