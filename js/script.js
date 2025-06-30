// -------------------------------------- Imports ---------------------------------------
import {
    addCardEventListeners,
    handleSizeChange,
    startTimer, stopTimer,
    updateHighscoreDisplay
} from "./util.js";

// ----------------------------------- Initialization -----------------------------------
const game = document.getElementById('game');
const index = document.getElementById('index');
const newGameButton = document.getElementById('newGameButton');

// Hide the game board initially
game.style.display = 'none';

newGameButton.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Please enter your name before starting the game.');
        return;
    }
    game.style.display = '';
    index.style.display = 'none';

    const sizeSelect = document.getElementById('size');
    let size = sizeSelect.value;
    handleSizeChange(size);
    sizeSelect.addEventListener('change', (e) => {
        handleSizeChange(e.target.value);
        addCardEventListeners();
    });

    startTimer();

});

// ----------------------- Color settings -----------------------------------

document.getElementById('cardColor').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--card-default', e.target.value);
});

document.getElementById('open').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--card-open', e.target.value);
});

document.getElementById('found').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--card-found', e.target.value);
});

// --------------------------------- Highscore logic -----------------------------------

updateHighscoreDisplay();

// ------------------------------------- New game -------------------------------------
document.getElementById('newGame').addEventListener('click', () => {
    // Reset the game state
    document.getElementById('game').style.display = 'none';
    document.getElementById('index').style.display = '';
    document.getElementById('timer').textContent = 'Time: 0 seconds';

    stopTimer();
});
