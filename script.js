const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('btn-play');
const popupContainer = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const notification = document.getElementById('notifcation-container');

const figureParts = document.querySelectorAll('.figure-part');

// Words
const words = ['apple', 'elephant', 'mother', 'father', 'banana'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show the hidden word
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
                `
                ).join('')
            }
    `;

    const innerWord = wordEl.innerText.replace(/\s/g, '');

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 🥳';
        popupContainer.style.display = 'flex';
    }
}

// Update wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>': ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display the figure
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = `You lost... 😕`;
        popupContainer.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    
    setTimeout(() => { 
        // Remove the show class so the notification disapperas automatically
        notification.classList.remove('show')
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    // Get the key character, transform to uppercase and get its ASCII code
    // e.keyCode is deprecated
    const charNum = e.key.toUpperCase().charCodeAt();

    if(charNum >= 65 && charNum <= 90) {
        const letter = e.key;

        // Check that the letter is in the selected word
        if(selectedWord.includes(letter)) {
            // Check that the letter is not already included in the correct letters to avoid duplicates
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
})

// Restart game
playAgainBtn.addEventListener('click', () => {
    // Empty the arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    // Select a new random wordk
    selectedWord = words[Math.floor(Math.random() * words.length)];
    // Display the word 
    displayWord();
    // Clean the wrong letters
    updateWrongLettersEl();
    // Hide the popupp
    popupContainer.style.display = 'none';

})

displayWord();