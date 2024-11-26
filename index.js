const readline = require('readline-sync');
const crypto = require('node:crypto');

let selectedNumber = 0,
    guessLeft = 0,
    guessAttemps = 0,
    gameStartTime = 0;

const gameSettings = [
    {
        name: 'Easy',
        guesses: 10,
    },
    {
        name: 'Medium',
        guesses: 5,
    },
    {
        name: 'Hard',
        guesses: 3,
    },
];

function displayHeader() {
    console.log('Welcome to Number Guessing Game!');
    console.log("I'm thinking of a number between 1 and 100.");
    console.log('You have 10, 5, or 3 chances to guess the correct number.');

    displayDifficultyLevel();
}

function displayDifficultyLevel() {
    console.log('\nPlease select the difficulty level:');

    for (let i = 0; i < gameSettings.length; i++) {
        console.log(
            `${i + 1}. ${gameSettings[i].name} (${
                gameSettings[i].guesses
            } chances)`
        );
    }

    const choice = readline.questionInt('\nEnter your choice: ');
    if (!(choice >= 1 && choice <= 3)) {
        console.warn('You can only enter number from 1 to 3!');
        return displayDifficultyLevel();
    }

    const selected = gameSettings[choice - 1];
    selectedNumber = crypto.randomInt(1, 100);
    guessLeft = selected.guesses;
    guessAttemps = 0;

    console.log(
        `Great! You have selected the ${selected.name} difficulty level.`
    );
    console.log(`Let's start the game!`);
    gameStartTime = Date.now();

    enterGuess();
}

function enterGuess() {
    const guess = readline.questionInt('\nEnter your guess: ');

    if (guess < 1 || guess > 100) {
        console.warn('You can only enter number from 1 to 100!');
        return enterGuess();
    }
    guessAttemps++;

    if (guess != selectedNumber) {
        guessLeft--;

        if (guessLeft <= 0) {
            console.log(
                `You didn't guess the correct number. The correct number was ${selectedNumber}.`
            );
            return promptContinue();
        }

        console.log(
            `Incorrect! The number is ${
                guess > selectedNumber ? 'less' : 'greater'
            } than ${guess}.`
        );
        return enterGuess();
    }

    console.log(
        `Congratulations! You guessed the correct number in ${
            (Date.now() - gameStartTime) / 1000
        } seconds with ${guessAttemps} ${
            guessAttemps > 1 ? 'attempts' : 'attempt'
        }.`
    );

    promptContinue();
}

function promptContinue() {
    const continueGame = readline.keyInYNStrict(`\nDo you want to continue?`);

    if (continueGame) {
        return displayDifficultyLevel();
    }
    console.log(`Thank you for playing!`);
}

function main() {
    displayHeader();
}
main();
