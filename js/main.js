// -------------------------------------- Imports ---------------------------------------
import {addCardEventListeners, handleSizeChange, startTimer, stopTimer, initializeBoard} from "./util.js";

// ----------------------------------- Initialization -----------------------------------
let index = document.getElementById('index');
let game = document.getElementById('game');

game.style.display = 'none';

let newGameButton = document.getElementById('newGameButton');
newGameButton.addEventListener('click', () => {
    game.style.display = '';
    index.style.display = 'none';
    startTimer();
});

// ------------------------------------- Logic board ------------------------------------
const sizeSelect = document.getElementById('size');
let size = sizeSelect.value;

// TODO: the gameboard doesnt load when the size is greater than 7, fix this!!!
handleSizeChange(size);

// Update board when size changes
sizeSelect.addEventListener('change', (e) => {
    handleSizeChange(e.target.value);
    addCardEventListeners();
});

// ----------------------- Color settings -----------------------------------

let cardColor = document.getElementById('cardColor');
cardColor.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--card-default', e.target.value);
});

let open = document.getElementById('open')
open.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--card-open', e.target.value);
});

let closed = document.getElementById('closed');
closed.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--card-found', e.target.value);
});

// ----------------------- Card click logic -----------------------------------
addCardEventListeners();
