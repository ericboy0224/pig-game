'use strict';

//BINDING
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const diceEl = document.querySelector('.dice');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

let currentScore = 0;
let score0 = 0;
let score1 = 0;
let score, activePlayer, playing;
//FUNCTION
const init = function () {
    score = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    current0El.textContent = '0';
    current1El.textContent = '0';
    score0El.textContent = '0';
    score1El.textContent = '0';
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    playing = true;
}
init();

const switchPlayer = function () {
    currentScore = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}




//BTN FUNCTION
btnRoll.addEventListener('click', function () {
    if (playing) {
        diceEl.classList.remove('hidden');
        const dice = Math.trunc((Math.random() * 6) + 1);
        console.log(dice);
        diceEl.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //switching
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    if(score[activePlayer] >= 100){
        
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        diceEl.classList.add('hidden');
        playing = false;
        
    }else{
        switchPlayer();
    }

});

btnNew.addEventListener('click', init);