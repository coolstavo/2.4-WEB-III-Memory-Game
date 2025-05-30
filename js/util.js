
// --- Logic for cards game ---
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
        // card.classList.add('open');
        card.textContent = letter;
        board.appendChild(card);
    });

    // Pas de CSS grid aan op basis van de grootte
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}