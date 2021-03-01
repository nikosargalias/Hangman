function setWord(difficulty) {
    switch(difficulty) {
        case 'Almost Impossible':
            return generateRandomWordWithLengthOf(10)
        case 'Very Hard':
            return generateRandomWordWithLengthOf(6, 9)
        case 'Challenging':
            return generateRandomWordWithLengthOf(5)
        case 'Easy':
            return generateRandomWordWithLengthOf(3, 4)
    }
}

function setNumberOfGuesses(difficulty) {
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

function generateRandomWordWithLengthOf(lowerLetterCount, upperLetterCount = 20) {
    let word = ''
    while(word.length < lowerLetterCount || word.length > upperLetterCount) {
        word = wordsArr[Math.floor(Math.random() * wordsArr.length)]
    }
    return word
}

function amountOfUniqueLetters (gameWord) {
    let uniqueLetters = ''
    for(let i = 0; i < gameWord.length; i++) {
        if (!uniqueLetters.includes(gameWord[i])) {
            uniqueLetters += gameWord[i]
        }
    }
    return uniqueLetters.length
}

// To Find the difficulty of a game that you generate manually
function getDifficulty (gameWord, setGuesses) {
    let difficulty = ''

    const uniqueLetters = amountOfUniqueLetters(gameWord)
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
