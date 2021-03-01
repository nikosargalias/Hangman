// import ui from 'ui';
// import HangmanLogic from 'HangmanLogic';

class GameManager {
    constructor(updateUserGameDataFN) {
        this.ui = new UI(this.startNewGame.bind(this), this.makeGuess.bind(this), this.isGameOver.bind(this));

        this.hangmanLogic
        this.updateUserGameData = updateUserGameDataFN
    }

    startNewGame(word, numGuesses, difficulty) {
        const gameWord = word ? word : setWord(difficulty)
        const numOfGuesses = numGuesses ? numGuesses : setNumberOfGuesses(difficulty)
        const gameDifficulty = difficulty ? difficulty : getDifficulty(gameWord, numGuesses)

        this.hangmanLogic = new HangmanLogic(gameWord, numOfGuesses, gameDifficulty);
        const gameState = this.hangmanLogic.getState;
        this.ui.renderNewGameToDom(gameState);
    }

    makeGuess(userInput) {
        const isGuessValidObject = this.hangmanLogic.isGuessValid(userInput)
        if(!isGuessValidObject.isValid) {
            return this.ui.handleInvalidGuess(isGuessValidObject.reason);
        }
        this.hangmanLogic.makeGuess(userInput)

        const newState = this.hangmanLogic.getState;
        this.ui.updateDomGameRender(newState);

        if (this.isGameOver()) {
            this.finishGame()
            this.updateUserGameData()
        };
    }

    isGameOver() {
        const state = this.hangmanLogic.getState
        return (state.isGameOver) ? true : false 
    };

    finishGame() {
        const result = this.getResult()
        this.ui.alert(result)
        const newState = this.hangmanLogic.getState;
        this.ui.updateDomGameFinishedRender(newState, result)
    }

    isGameWon() {
        const {initialGuesses, remainingGuesses, allLettersGuessed, gameWord, wordSoFar} = this.hangmanLogic.getState
        if (gameWord === wordSoFar) {
            return true
        }
        return false
    }

    getResult() {
        const {initialGuesses, remainingGuesses, allLettersGuessed, gameWord, wordSoFar} = this.hangmanLogic.getState
        const isGameWon = wordSoFar === gameWord
        let grade = ''

        if (!isGameWon) {
            return `Sorry, you lost!`
        } else if (remainingGuesses === initialGuesses) {
            grade = "Amazing! Grade: S"
        } else if (remainingGuesses === initialGuesses - 1) {
            grade = "Well Done! Grade: A"
        } else if (remainingGuesses === initialGuesses - 2) {
            grade = "Well Done! Grade: B"
        } else if (remainingGuesses === initialGuesses - 3) {
            grade = "Well Done! Grade: C"
        } else if (remainingGuesses === initialGuesses - 4) {
            grade = "Well Done! Grade: D"
        } else {
            grade = "You Pass!"
        }
        return grade
    }

    returnStateOfGame() {
        return this.hangmanLogic.getState
    }

}

// new GameManager()

