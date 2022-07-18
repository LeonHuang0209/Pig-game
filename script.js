'use strict';

//dice image
const diceImage = document.querySelector('.dice');
diceImage.classList.add('hidden');

//btns
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//players
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
let player = '0'; // Who's round

//values
let current = 0;
let scoreHad = 0;

//functions
const switchPlayer = function () {
  //clean current score
  current = 0;
  document.querySelector(`#current--${player}`).textContent = 0;

  //switch player
  player = player === '0' ? '1' : '0';

  //based on new active player to change scene
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

const rollDice = function () {
  //random dice
  let dice = Number((Math.random() * 5 + 1).toFixed());
  diceImage.src = `dice-0${dice}.png`;
  diceImage.classList.remove('hidden');

  //count dice number
  if (dice === 1) {
    switchPlayer();
  } else if (dice <= 6 && dice >= 2) {
    current += dice;
    document.querySelector(`#current--${player}`).textContent = current;
  } else {
    console.log(dice);
    console.log('Wrong dice number!');
  }
};

const holdScore = function () {
  //count score
  if (current !== 0) {
    scoreHad = document.querySelector(`#score--${player}`).textContent;
    document.querySelector(`#score--${player}`).textContent =
      Number(scoreHad) + current;

    //check if wins or keep play
    if (Number(scoreHad) + current >= 100) {
      //show winner scene and pause game
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      diceImage.classList.add('hidden');
      document.querySelector(`#current--${player}`).textContent = 0;
      btnRoll.removeEventListener('click', rollDice);
      btnHold.removeEventListener('click', holdScore);
    } else {
      diceImage.classList.add('hidden');
      switchPlayer();
    }
  }
};

const newGame = function () {
  //initial values
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--winner');
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;

  //initial scenes and buttons
  player = '0';
  current = 0;
  diceImage.classList.add('hidden');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  btnRoll.addEventListener('click', rollDice);
  btnHold.addEventListener('click', holdScore);
};

//prepare for game start
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', newGame);
