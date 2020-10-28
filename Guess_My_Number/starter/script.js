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

function test() {
  console.log('hi');
}

function evalGuess() {
  //
}

function win() {
  //
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
