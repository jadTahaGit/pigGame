'use strict';
/* For any Question write me an Email at: codeWithJad@gmail.com */

//Selecting elemnts:
let winMode = false;
const winMessage = document.getElementById('win-message');
const winAudio = document.getElementById('win-audio');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let diceValue, scores, activePlayer, currentScore;

const intialiser = function () {
  resetScore();
  activePlayer = 0;
  currentScore = 0;
};

const generateDiceValue = function () {
  diceValue = Math.trunc(Math.random() * 6) + 1;
  //diceEl.setAttribute('src', `dice-${diceValue}.png`);
};

const hideTheDice = function () {
  diceEl.classList.add('hidden');
};

const showTheDice = function () {
  diceEl.classList.remove('hidden');
  diceEl.src = `img/dice-${diceValue}.png`;
};

const restart = function () {
  if (winMode === true) afterWin();
  resetScore();
  hideTheDice();
  resetCurrent();
  switchPlayer();
  resetCurrent();
  if (activePlayer === 1) switchPlayer();
};

const resetScore = function () {
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
};

const saveScore = function () {
  scores[activePlayer] += currentScore;
  activePlayer === 0
    ? (score0El.textContent = scores[activePlayer])
    : (score1El.textContent = scores[activePlayer]);
};

//Reset the Current:
const resetCurrent = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  //Alternative:
  // activePlayer === 0 ? (current0El.textContent = 0): (current1El.textContent = 0);
};

const colorTheWinner = function (reset) {
  //Without Value:
  if (!reset) {
    activePlayer === 0
      ? player0.classList.add('player--winner')
      : player1.classList.add('player--winner');
  } else {
    activePlayer === 0
      ? player0.classList.remove('player--winner')
      : player1.classList.remove('player--winner');
  }
};

//switchPlayer function:
const switchPlayer = function () {
  //   Change the Color
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active'); //toggle: isItThere? yes-> remove : no -> add
  player1.classList.toggle('player--active');

  //Alternative:
  // if (activePlayer === 0) { player0.classList.remove('player--active'); activePlayer = 1; player1.classList.add('player--active'); } else { player1.classList.remove('player--active'); activePlayer = 0; player0.classList.add('player--active'); }
};

//roller function:
const roller = function () {
  if (!winMode) {
    //1. Generate a random dice value:
    generateDiceValue();
    //2. Display dice:
    showTheDice();

    //3. Check for rolled 1:
    if (diceValue !== 1) {
      // Add dice to the current score
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      resetCurrent();
      switchPlayer();
    }
  }
};

//holder function:
const holder = function () {
  if (winMode === false) {
    saveScore();
    //You should roll first
    if (scores[activePlayer] != 0)
      if (scores[activePlayer] >= 10) {
        //Winner
        win();
        // winMessage.classList.remove('hidden');
      } else {
        hideTheDice();
        resetCurrent();
        switchPlayer();
      }
  }
};

const win = function () {
  winMode = true;
  colorTheWinner();
  winMessage.classList.remove('hidden');
  winMessage.textContent = `🎉Congratulations Player ${
    activePlayer + 1
  }, You have Won!🎉`;
  winAudio.play();
  //   btnRoll.classList.add('hidden');
  //   btnHold.classList.add('hidden');
};

const afterWin = function () {
  winMode = false;
  colorTheWinner('reset');
  winMessage.classList.add('hidden');
  winMessage.textContent = '';
  winAudio.pause();
  //   btnRoll.classList.remove('hidden');
  //   btnHold.classList.remove('hidden');
};

intialiser();
btnNew.addEventListener('click', restart);
btnRoll.addEventListener('click', roller);
btnHold.addEventListener('click', holder);
