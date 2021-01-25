// Game settings
const choices = ["rock", "paper", "scissors"];
const roundsLimit = 5;
let rounds;
const scores = { "user": 0, "computer": 0 };

const startBtn = document.querySelector('.startBtn');
startBtn.addEventListener('click', () => {
    game();
});

let userChoice;
const choiceBtns = document.querySelectorAll('.choiceBtn');
choiceBtns.forEach((button) => {
    button.setAttribute("disabled", true);
    button.addEventListener('click', () => {
        userChoice = button.innerHTML;
        rules(userPlay(), computerPlay());
    });
});

// HMI
const container = document.querySelector('#container');
let roundDiv;
let scoreDiv;
let resultDiv;
function addGameHMI() {
    roundDiv = document.createElement('div');
    roundDiv.classList.add('round');
    roundDiv.textContent = 'Round #0';
    container.appendChild(roundDiv);

    scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score');
    scoreDiv.textContent = "Total score: 0 vs 0";
    container.appendChild(scoreDiv);

    resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    resultDiv.textContent = "Make your choice";
    container.appendChild(resultDiv);
}
function updateGameHMI(round, score, result) {
    roundDiv.textContent = "Round #" + round;
    scoreDiv.textContent = "Total score: " + score;
    resultDiv.textContent = "Round result: " + result;

}
function removeGameHMI() {
    container.removeChild(roundDiv);
    container.removeChild(scoreDiv);
    container.removeChild(resultDiv);

}

// Game rules
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function computerPlay() {
    return choices[getRandomInt(3)];
}

function userPlay() {
    return userChoice;
}

function rules(playerSelection, computerSelection) {
    rounds++;
    let result = playerSelection + " vs " + computerSelection + " : ";
    if (playerSelection.toLowerCase() === computerSelection) {
        result += "It's a tie !";
    } else if (
        (playerSelection.toLowerCase() == "rock" && computerSelection == "scissors") ||
        (playerSelection.toLowerCase() == "scissors" && computerSelection == "paper") ||
        (playerSelection.toLowerCase() == "paper" && computerSelection == "rock")
    ) {
        scores.user++;
        result += "You win !";
    } else {
        scores.computer++;
        result += "You lose !";
    }
    let score = scores.user + " vs " + scores.computer;
    updateGameHMI(rounds, score, result);

    while (rounds < roundsLimit) {
        return;
    }
    if (scores.user > scores.computer) {
        result = "Congrats ! You have won the game !";
    } else if (scores.user < scores.computer) {
        result = "Sorry ! You have lost the game !";
    } else {
        result = "The game has ended on a tie !";
    }
    updateGameHMI(rounds, score, result);
    choiceBtns.forEach((button) => {
        button.setAttribute("disabled", true);
    });
}

function game() {
    if (rounds === 0) {
        return;
    }
    if (rounds > 0) {
        removeGameHMI();
    }
    rounds = 0;
    scores.user = 0;
    scores.computer = 0;
    addGameHMI();
    choiceBtns.forEach((button) => {
        button.removeAttribute("disabled");
    });
}

