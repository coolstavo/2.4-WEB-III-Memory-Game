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

// ------------------------------------- Card click logic -------------------------------------
export function addCardEventListeners() {
    document.querySelectorAll('.card').forEach(card => {
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        newCard.addEventListener('click', function () {
            if (!newCard.classList.contains('found')) {
                newCard.classList.toggle('flipped');
            }
        });
    });
}

// ------------------------------------- Logic board -------------------------------------

export function handleSizeChange(newSize) {
    size = newSize;
    initializeBoard(size);
    addCardEventListeners();
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