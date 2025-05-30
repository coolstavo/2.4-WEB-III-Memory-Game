// -------------------- Imports --------------------
import {initializeBoard} from "./util.js";

// ----------------- Initialization ----------------

let gameStarted = false;

if (!gameStarted) {
    document.getElementById('game').style.display = 'none';
}

let newGameButton = document.getElementById('newGameButton');
newGameButton.addEventListener('click', () => {
    gameStarted = true;
    document.getElementById('game').style.display = '';
    document.getElementById('index').style.display = 'none';
    startTimer();
});

// --------------- Game = started -----------------
// ----------------- Logic board ------------------
const sizeSelect = document.getElementById('size');
let size = sizeSelect.value;

function handleSizeChange(newSize) {
    size = newSize;
    initializeBoard(size);
}

// TODO: the gameboard doesnt load when the size is greater than 7, fix this!!!
handleSizeChange(size);

// Update board when size changes
sizeSelect.addEventListener('change', (e) => {
    handleSizeChange(e.target.value);
});

// ----------------- Timer ------------------------
let timerElement = document.getElementById('timer');
let timer = 0;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = `Time: ${timer} seconds`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}
