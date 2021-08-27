'use strict';

//selecting elements
//                                players
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//                                scores
const scoreP0 = document.querySelector('#score--0');
const scoreP1 = document.querySelector('#score--1');
const currentP0 = document.querySelector('#current--0');
const currentP1 = document.querySelector('#current--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const winner0 = document.querySelector('.win--0');
const winner1 = document.querySelector('.win--1');
//                                dice & buttons
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let masterScore, currentScore, activePlayer, playing

//hiding buttons function
const hide = function(){
    diceImg.classList.add('hidden');
    winner0.classList.add('hidden');
    winner1.classList.add('hidden');
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
}
//applying start values
const init = function(){
    hide();
    // score reset 
    masterScore = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    scoreP0.textContent = 0;
    scoreP1.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    // reset display 
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    btnRoll.classList.remove('hidden')
    btnHold.classList.remove('hidden')  
    // reset player turn 
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}
init();

const switchPlayer = function (){
    document.getElementById(`current--${activePlayer}`).textContent = currentScore = 0;
        activePlayer = activePlayer === 0 ? 1:0;
        player0.classList.toggle('player--active')
        player1.classList.toggle('player--active')
}

// rolling button

btnRoll.addEventListener('click', function(){
    if (playing){
    //  rolling dice
    const roll = Math.trunc(Math.random()*6)+1;
    //  diplay
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${roll}.png`;
    // conditionals points
    if (roll !== 1){
        currentScore += roll;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
    }

});

// holding button
btnHold.addEventListener('click', function(){
    if (playing){
    // player's master score count
        masterScore[activePlayer] += currentScore
      document.getElementById(`score--${activePlayer}`).textContent = masterScore[activePlayer];
    // winning panel
    if (masterScore[activePlayer] >= 10){
       
        playing = false;
        hide();
    // showing winning colors
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    // changing start
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
    // showing winning text
    document
    .querySelector(`.win--${activePlayer}`)
    .classList.remove('hidden');

        

    } else {
    // changing start
        switchPlayer();
        }
    }    
});

// restart button
btnNew.addEventListener('click',init);