const audioSequence = [];
let userSequence = [];
let isUserTurn = false;

const audioFiles = [
    'audio/sound1.mp3',
    'audio/sound2.mp3',
    'audio/sound3.mp3',
    // Add more audio files here for sequence extension
];

// Preload audio files
const audioElements = audioFiles.map(audioFile => new Audio(audioFile));

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

function startGame() {
    startButton.disabled = true;
    generateRandomAudio();
    playAudioSequence();
}

function generateRandomAudio() {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    audioSequence.push(audioFiles[randomIndex]);
}

function playAudioSequence() {
    let i = 0;
    isUserTurn = false;

    function playNextSound() {
        if (i < audioSequence.length) {
            const audio = audioElements[i];

            audio.addEventListener('ended', () => {
                i++;
                setTimeout(playNextSound, 500); // Adjust the delay as needed
            });

            audio.play();
        } else {
            setTimeout(() => {
                isUserTurn = true;
            }, 500);
        }
    }

    playNextSound();
}

function playAudio(audioSrc) {
    const audio = new Audio(audioSrc);
    audio.play();
}

function checkUserInput() {
    if (isUserTurn) {
        const userInput = this.dataset.sound;
        playAudio(userInput);
        userSequence.push(userInput);

        if (!compareArrays()) {
            alert('Wrong sequence! Game over.');
            resetGame();
        } else if (userSequence.length === audioSequence.length) {
            alert('Correct sequence! Next round.');
            userSequence = [];
            generateRandomAudio();
            setTimeout(playAudioSequence, 1000);
        }
    }
}

function compareArrays() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== audioSequence[i]) {
            return false;
        }
    }
    return true;
}

function resetGame() {
    audioSequence.length = 0;
    userSequence.length = 0;
    startButton.disabled = false;
}

// Adăugați evenimente de click pentru fiecare buton audio
audioFiles.forEach((audioFile, index) => {
    const button = document.createElement('button');
    button.textContent = `Sound ${index + 1}`;
    button.dataset.sound = audioFile;
    button.addEventListener('click', checkUserInput);
    document.body.appendChild(button);
});