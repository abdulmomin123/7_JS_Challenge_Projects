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
  players: document.querySelectorAll('.player'),
  player1: document.querySelector('.player--0'),
  player2: document.querySelector('.player--1'),
};

// Global scores
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;
let playerOneScore = 0;
let playerTwoScore = 0;

let activePlayer = 1;

const winningScore = 10;

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
    resetScore(activePlayer);
    switchPlayer(activePlayer);
  }

  //   Display current Score
  displayScore(activePlayer);
}

// For holding the score
function holdScore() {
  // increment total score
  activePlayer === 1
    ? (playerOneTotalScore += playerOneScore)
    : (playerTwoTotalScore += playerTwoScore);

  //   reset current score display total score
  resetScore(activePlayer);

  //   in case of winning
  if (
    playerOneTotalScore >= winningScore ||
    playerTwoTotalScore >= winningScore
  ) {
    if (activePlayer === 1) {
      playerOneTotalScore >= winningScore ? win(0) : null;
    } else if (activePlayer === 2) {
      playerTwoTotalScore >= winningScore ? win(1) : null;
    }

    return;
  }

  //   switch players
  switchPlayer(activePlayer);
}

// For a new game
function newGame(winningScore) {
  // remove winer class
  elements.players.forEach(pl => pl.classList.remove('player--winner'));

  switchPlayer(2);
}

function displayScore(activePlayer) {
  elements[`current${activePlayer}`].textContent =
    activePlayer === 1 ? playerOneScore : playerTwoScore;
  elements.score1.textContent = playerOneTotalScore;
  elements.score2.textContent = playerTwoTotalScore;
}

function resetScore(activePlayer, isNewGame) {
  if (activePlayer === 1) {
    playerOneScore = 0;
  } else {
    playerTwoScore = 0;
  }

  isNewGame ? ([playerOneTotalScore, playerTwoTotalScore] = [0, 0]) : null;

  //   display scores
  displayScore(activePlayer);
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

function win(player) {
  elements.players[player].classList.add('player--winner');
  toggleListeners('remove');
}

function toggleListeners(task) {
  elements.rollDice[`${task}EventListener`]('click', rollDice);
  elements.holdScore[`${task}EventListener`]('click', holdScore);
}

// Event handlers
elements.rollDice.addEventListener('click', rollDice);
elements.holdScore.addEventListener('click', holdScore);
elements.newGame.addEventListener('click', newGame);
