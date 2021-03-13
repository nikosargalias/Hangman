const _privateInstanceState = new WeakMap()

class HangmanLogic {
    constructor(gameWord, numGuesses, difficulty) {

        Object.defineProperty(this, 'difficulty', {
            value: difficulty
        })

        Object.defineProperty(this, 'gameWord', {
            value: gameWord
        })

        Object.defineProperty(this, 'numGuesses', {
            value: numGuesses
        }) 

        _privateInstanceState.set(this, {
            gameWord: gameWord.toLowerCase(),
            remainingGuesses: numGuesses,
            lettersGuessed: new Set(),
        })

    }

    makeGuess(guess) {
        const lowerCaseGuess = guess.toLowerCase()

        const {gameWord, lettersGuessed, remainingGuesses} = _privateInstanceState.get(this)
        const stateObject = _privateInstanceState.get(this)
        
        lettersGuessed.add(lowerCaseGuess)

        if (!gameWord.includes(lowerCaseGuess)) {
            decrementGuess(stateObject)
        }
    }

    get getState() {
        const {gameWord, lettersGuessed, remainingGuesses} = _privateInstanceState.get(this);
        const wordSoFar = lettersGuessedCorrectlyWord(gameWord, lettersGuessed)
        return {
            initialGuesses: this.numGuesses,
            user: this.user,
            gameWord: gameWord.toLowerCase(),
            wordSoFar: wordSoFar.toLowerCase(),
            allLettersGuessed: convertSetToString(_privateInstanceState.get(this).lettersGuessed),
            remainingGuesses: remainingGuesses,
            difficulty: this.difficulty,
            isGameOver: (this.gameWord.toLowerCase() === wordSoFar || remainingGuesses <= 0)
        }
    }


    isGuessValid(guess) {
        const lowerCaseGuess = guess.toLowerCase()
        const {lettersGuessed} = _privateInstanceState.get(this)  // this is the same as _privateInstanceState.get(this).lettersGuessed.has(guess)

        if (isLetterAlreadyGuessed(lettersGuessed, lowerCaseGuess)) {
            return {isValid: false, reason: "Letter has already been guessed"}
        }

        if (!isGuessSingleLetter(lowerCaseGuess)) {
            return {isValid: false, reason: "You can only submit one letter at a time"}
        }

        return {isValid: true}
    }
    
}

const convertSetToString = (set) => {
    let result = ''
    set.forEach(e => {
        result += e
    })
    return result
}

const decrementGuess = (stateObject) => stateObject.remainingGuesses--

const isLetterAlreadyGuessed = (lettersAlreadyGuessed, guess) => lettersAlreadyGuessed.has(guess);

const isGuessSingleLetter = guess => guess.length === 1;

const lettersGuessedCorrectlyWord = function(gameWord, lettersGuessed) {
    gameWord.toLowerCase()
    const returnVisibleLettersOrUndefined = letter => lettersGuessed.has(letter) || letter === " " ? letter : '*'
    const wordSoFar = Array.from(gameWord, returnVisibleLettersOrUndefined)
    return wordSoFar.join('')
}



export default HangmanLogic;
