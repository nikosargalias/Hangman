import UI from './UI.js';
// import {getDifficulty, amountOfUniqueLetters, generateRandomWordWithLengthOf, setNumberOfGuesses, setWord} from './gameDifficulty.js'
import HangmanLogic from './Hangman.js';
import {wordsArr} from './wordLibrary.js'

class GameManager {
    constructor(updateUserGameDataFN) {
        this.ui = new UI(this.startNewGame.bind(this), this.makeGuess.bind(this), this.isGameOver.bind(this));

        this.hangmanLogic
        this.updateUserGameData = updateUserGameDataFN
    }

    startNewGame(word, numGuesses, difficulty) {
        const gameWord = word ? word : this.setWord(difficulty)
        const numOfGuesses = numGuesses ? numGuesses : this.setNumberOfGuesses(difficulty)
        const gameDifficulty = difficulty ? difficulty : this.getDifficulty(gameWord, numGuesses)

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






    //-------


    setWord(difficulty) {
        switch(difficulty) {
            case 'Almost Impossible':
                return this.generateRandomWordWithLengthOf(10)
            case 'Very Hard':
                return this.generateRandomWordWithLengthOf(6, 9)
            case 'Challenging':
                return this.generateRandomWordWithLengthOf(5)
            case 'Easy':
                return this.generateRandomWordWithLengthOf(3, 4)
        }
    }
    
    setNumberOfGuesses(difficulty) {
        switch(difficulty) {
            case 'Almost Impossible':
                return 2;
            case 'Very Hard':
                return 3;
            case 'Challenging':
                return 4;
            case 'Easy':
                return 5;
        }
    }
    
    generateRandomWordWithLengthOf(lowerLetterCount, upperLetterCount = 20) {
        let word = ''
        while(word.length < lowerLetterCount || word.length > upperLetterCount) {
            word = wordsArr[Math.floor(Math.random() * wordsArr.length)]
        }
        return word
    }
    
    amountOfUniqueLetters (gameWord) {
        let uniqueLetters = ''
        for(let i = 0; i < gameWord.length; i++) {
            if (!uniqueLetters.includes(gameWord[i])) {
                uniqueLetters += gameWord[i]
            }
        }
        return uniqueLetters.length
    }
    
    // To Find the difficulty of a game that you generate manually
    getDifficulty (gameWord, setGuesses) {
        let difficulty = ''
    
        const uniqueLetters = this.amountOfUniqueLetters(gameWord)
        const almostImpossible = (uniqueLetters >= 8 && setGuesses <= 2) || (uniqueLetters >= 6 && setGuesses === 1)
        const veryDifficult = (uniqueLetters >= 4 && setGuesses === 2) || (uniqueLetters >= 5 && setGuesses <= 3)
        const quiteDifficult = (uniqueLetters >= 4 && setGuesses <= 3) || (uniqueLetters >= 2 && setGuesses === 1)
    
        // fix difficulty setting when manually creating game--
        // const easy = (uniqueLetters >= 4 && setGuesses >= 3) || (uniqueLetters <= 4 && setGuesses <= 3)
    
        console.log(almostImpossible)
        if (almostImpossible) {
            difficulty = 'Almost Impossible'
        } else if (veryDifficult) {
            difficulty = "Very Difficult"
        } else if (quiteDifficult) {
            difficulty = 'Fairly Difficult'
        } else {
            difficulty = 'Easy'
        }
    
        return difficulty
    }


    //-------

}

export default GameManager
// new GameManager()

