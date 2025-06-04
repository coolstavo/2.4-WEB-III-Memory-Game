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

    // console.log(cards);

    // Cards op het bord zetten
    const board = document.querySelector('div.board');
    board.innerHTML = ''; // Eerst voor de zekerheid de board leegmaken

    cards.forEach((letter) => {
        const card = document.createElement('button');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
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

function resetPairsFoundDisplay() {
    pairsFound = 0;
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
        alert('Congratulations! You found all pairs!');
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
        }, 1000);
    }
}

// ------------------------------------- Timer -------------------------------------
let timerElement = document.getElementById('timer');
let timer = 0;
let timerInterval;

export function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = `Time: ${timer} seconds`;
    }, 1000);
}

export function stopTimer() {
    clearInterval(timerInterval);
}

