// ----------------------------------- Logic for cards game -------------------------------------

export function initializeBoard(size) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numCards = size * size;
    const numPairs = numCards / 2;
    let letters = [];

    // Letters genereren
    while (letters.length < numPairs) {
        let indexLetter = Math.floor(Math.random() * alphabet.length);
        const letter = alphabet[indexLetter];
        if (!letters.includes(letter)) { //Checkt of de letter al bestaat in de array
            letters.push(letter);
        }
    }

    let cards = [...letters, ...letters]; // duplicate letters to create pairs
    cards = cards.sort(() => Math.random() - 0.5);

    // Decoratie toevoegen
    // Haal de decoratie op uit de input
    let deco = document.getElementById('decoration').value;
    document.getElementById('decoration').addEventListener('change', (e) => {
        deco = e.target.value;
    });

    // Cards op het bord zetten
    const board = document.querySelector('div.board');
    board.innerHTML = ''; // Eerst voor de zekerheid de board leegmaken

    cards.forEach((letter) => {
        const card = document.createElement('button');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${deco}</div>
                <div class="card-back">${letter}</div>
            </div>
        `;
        board.appendChild(card);
    });

    // Pas de CSS grid aan op basis van de grootte
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

// ------------------------------------- Logic board -------------------------------------
export function handleSizeChange(newSize) {
    initializeBoard(newSize);
    addCardEventListeners();
}

// ------------------------------------- Card click logic -------------------------------------
export function addCardEventListeners() {
    resetPairsFoundDisplay();
    document.querySelectorAll('.card').forEach(card => {
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        newCard.addEventListener('click', handleCardClick);
    });
}

let flippedCards = [];
let pairsFound = 0;
let scoreSaved = false; // Add a flag to prevent multiple saves

// Modal logic
let endGameModal, modalMessage, saveScoreModalBtn, newGameModalBtn, closeModalBtn;
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        endGameModal = document.getElementById('endGameModal');
        modalMessage = document.getElementById('modalMessage');
        saveScoreModalBtn = document.getElementById('saveScoreModalBtn');
        newGameModalBtn = document.getElementById('newGameModalBtn');
        closeModalBtn = document.getElementById('closeModal');

        if (closeModalBtn) closeModalBtn.onclick = hideEndGameModal;
        if (saveScoreModalBtn) {
            saveScoreModalBtn.onclick = saveScoreFromModal;
        }
        if (newGameModalBtn) {
            newGameModalBtn.onclick = function() {
                hideEndGameModal();
                // Reset the game state (show index, hide game, reset timer)
                document.getElementById('game').style.display = 'none';
                document.getElementById('index').style.display = '';
                document.getElementById('timer').textContent = 'Time: 0 seconds';
                if (typeof stopTimer === 'function') stopTimer();
            };
        }
        // Forfeit button logic
        const forfeitBtn = document.getElementById('forfeitButton');
        if (forfeitBtn) {
            forfeitBtn.onclick = function() {
                if (endGameModal) endGameModal.style.display = 'none';
                document.getElementById('game').style.display = 'none';
                document.getElementById('index').style.display = '';
                document.getElementById('timer').textContent = 'Time: 0 seconds';
                if (typeof stopTimer === 'function') stopTimer();
            };
        }
    });
}

function showEndGameModal(time, size) {
    if (!endGameModal || !modalMessage) return;
    modalMessage.textContent = `Time: ${time} seconds | Board size: ${size}x${size}\nDo you want to save your score?`;
    endGameModal.style.display = 'block';
}

function hideEndGameModal() {
    if (endGameModal) endGameModal.style.display = 'none';
}

function saveScoreFromModal() {
    if (scoreSaved) {
        alert('You already saved your score for this game.');
        return;
    }
    const username = document.getElementById('username').value;
    let time = document.getElementById('timer').textContent;
    time = time.replace('Time: ', '').replace('seconds', '').trim();
    const size = document.getElementById('size').value;
    if (username && time && size) {
        let highscores = getHighscores();
        // Remove any existing highscore for this username and size
        highscores = highscores.filter(score => !(score.username === username && score.size === size));
        // Add the new score
        highscores.push({ username, time: parseInt(time), size });
        // Sort and keep top 5
        highscores = highscores.sort((a, b) => a.time - b.time).slice(0, 5);
        setHighscores(highscores);
        updateHighscoreDisplay();
        scoreSaved = true;
        hideEndGameModal();
        // Return to main page after saving
        document.getElementById('game').style.display = 'none';
        document.getElementById('index').style.display = '';
        document.getElementById('timer').textContent = 'Time: 0 seconds';
        if (typeof stopTimer === 'function') stopTimer();
    } else {
        alert('Please enter your name and ensure the game is completed.');
    }
}

function resetPairsFoundDisplay() {
    pairsFound = 0;
    scoreSaved = false; // Reset flag on new game
    if (endGameModal) endGameModal.style.display = 'none'; // Hide modal on new game
    const totalPairs = document.querySelectorAll('.card').length / 2;
    const pairsFoundElement = document.getElementById('pairsFound');
    if (pairsFoundElement) pairsFoundElement.textContent = `Pairs found: 0/${totalPairs}`;
}

function handleCardClick(event) {
    const card = event.currentTarget;
    if (
        !card.classList.contains('found') &&
        !card.classList.contains('flipped') &&
        flippedCards.length < 2
    ) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    if (pairsFound === document.querySelectorAll('.card').length / 2) {
        stopTimer();
        // Get time and size
        let time = document.getElementById('timer').textContent;
        time = time.replace('Time: ', '').replace('seconds', '').trim();
        const size = document.getElementById('size').value;
        // Show custom modal instead of confirm
        showEndGameModal(time, size);
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const letter1 = card1.querySelector('.card-back').textContent;
    const letter2 = card2.querySelector('.card-back').textContent;
    const pairsFoundElement = document.getElementById('pairsFound');
    const totalPairs = document.querySelectorAll('.card').length / 2;

    if (letter1 === letter2) {
        card1.classList.add('found');
        card2.classList.add('found');
        card1.disabled = true;
        card2.disabled = true;
        pairsFound++;
        if (pairsFoundElement) pairsFoundElement.textContent = `Pairs found: ${pairsFound}/${totalPairs}`;
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 500);
    }
}

// ------------------------------------- Timer -------------------------------------
let timerInterval;

export function startTimer() {
    let time = 0;
    document.getElementById('timer').textContent = `Time: ${time} seconds`;

    timerInterval = setInterval(() => {
        time++;
        document.getElementById('timer').textContent = `Time: ${time} seconds`;
    }, 1000);
}

export function stopTimer() {
    clearInterval(timerInterval);
}

// -------------------------------- Highscore logic -------------------------------------

function getHighscores() {
    return JSON.parse(localStorage.getItem('highscores') || '[]');
}

function setHighscores(highscores) {
    localStorage.setItem('highscores', JSON.stringify(highscores));
}

function resetHighscores() {
    localStorage.removeItem('highscores');
}

export function updateHighscoreDisplay() {
    const highscores = getHighscores();
    const ol = document.querySelector('.top5 ol');
    ol.innerHTML = '';
    highscores.forEach((score, i) => {
        const li = document.createElement('li');
        li.textContent = `${score.username.toUpperCase()} - ${score.time} SEC - ${score.size}x${score.size}`;
        ol.appendChild(li);
    });
}