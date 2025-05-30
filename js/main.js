// --- Imports ---
import {initializeBoard} from "./util.js";

// --- Initialization ---

let gameStarted = false;

if (!gameStarted) {
    document.getElementById('game').style.display = 'none';
}

document.getElementById('newGameButton').addEventListener('click', () => {
    gameStarted = true;
    document.getElementById('game').style.display = '';
    document.getElementById('index').style.display = 'none';
});

// --- Game has started ---
// --- Logic for cards in game board ---
let sizeSelect = document.getElementById('size');
let size = sizeSelect.options[sizeSelect.selectedIndex].value;
sizeSelect.addEventListener('change', (e) => {
    size = e.target.value ?? 4; // Default to 4 if no value is selected

    // TODO: the gameboard doesnt load when the size is greater than 7, fix this!!!
    initializeBoard(size);
});