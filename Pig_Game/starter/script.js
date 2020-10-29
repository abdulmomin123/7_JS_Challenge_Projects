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
let playerOneTotalScore = 0,
  playerTwoTotalScore = 0,
  playerOneScore = 0,
  playerTwoScore = 0,
  activePlayer = 1,
  winningScore = 10,
  isPlaying = true;

// For rolling the dice
function rollDice() {
  if (!isPlaying) return;

  // Create a random number
  const dice = Math.trunc(Math.random() * 6 + 1);

  // Display the dice
  elements.dice.setAttribute('src', `dice-${dice}.png`);

  //   Update current score
  activePlayer === 1 ? (playerOneScore += dice) : (playerTwoScore += dice);

  //   if rolls a 1 : (
  if (dice === 1) {
    resetScore();
    switchPlayer(activePlayer);
  }

  //   Display current Score
  displayScore();
}

// For holding the score
function holdScore() {
  if (!isPlaying) return;

  // increment total score
  activePlayer === 1
    ? (playerOneTotalScore += playerOneScore)
    : (playerTwoTotalScore += playerTwoScore);

  //   reset current score display total score
  resetScore();

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
  // Start playing
  isPlaying = true;

  // remove winer class
  elements.players.forEach(pl => pl.classList.remove('player--winner'));

  //   reset all scores
  resetScore(true);

  //   switch player back to one
  switchPlayer(2);
}

function displayScore() {
  elements.current1.textContent = playerOneScore;
  elements.current2.textContent = playerTwoScore;
  elements.score1.textContent = playerOneTotalScore;
  elements.score2.textContent = playerTwoTotalScore;
}

function resetScore(isNewGame) {
  playerOneScore = 0;
  playerTwoScore = 0;

  isNewGame
    ? ([
        playerOneTotalScore,
        playerTwoTotalScore,
        playerOneScore,
        playerTwoScore,
      ] = [0, 0, 0, 0])
    : null;

  //   display scores
  displayScore();
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
  isPlaying = false;
}

// Event handlers
elements.rollDice.addEventListener('click', rollDice);
elements.holdScore.addEventListener('click', holdScore);
elements.newGame.addEventListener('click', newGame);
