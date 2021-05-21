class UI {
  constructor(startNewGameFn, makeGuessCallback, isGameOverCallback) {
    const newGameForm = document.querySelector("#newGame");
    const randomGameForm = document.querySelector("#generateAutoGame");

    newGameForm.addEventListener("submit", this.newGameFormCallback.bind(this));
    randomGameForm.addEventListener(
      "submit",
      this.randomGameFormCallback.bind(this)
    );

    this.makeGuessCallback = makeGuessCallback;
    this.startNewGameFn = startNewGameFn;
    this.isGameOver = isGameOverCallback;
  }

  newGameFormCallback(e) {
    e.preventDefault();
    const gameWord = e.target.elements.gameWord.value;
    const numGuesses = e.target.elements.guessNum.value;

    this.startNewGameFn(gameWord, numGuesses);
    // e.target.elements.gameWord.value = ''
    // e.target.elements.guessNum.value = ''
    initializeElementValue(
      e.target.elements.gameWord,
      e.target.elements.guessNum
    );
  }

  randomGameFormCallback(e) {
    e.preventDefault();
    const difficulty = e.target.elements[0].value;
    this.startNewGameFn(null, null, difficulty);
  }

  renderNewGameToDom(gameState) {
    const hangmanInfoElem = document.querySelector("#hangmanInfo");
    hangmanInfoElem.className = "gameInfo";
    hangmanInfoElem.innerHTML = this.generateHTMLGameData(gameState);

    this.makeGuessInput = document.querySelector("#enterGuess");
    this.makeGuessInput.addEventListener("input", this.makeGuessEventListener);
  }

  separateLettersToSpanElements(word) {
    const div = document.createElement("div");
    //  div.innerHTML = '<p>asdasdasd</p>'

    word.split("").forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.className = "puzzleLetters";
      div.append(span);
    });

    return div.innerHTML;
  }

  generateHTMLGameData(gameState) {
    return `
            <h4 id="enterGuessTitle" class="subTitle">Enter Guess</h4>
                <input id="enterGuess"  placeholder="Enter Guess">

             <h4 id="lettersGuessed" class="subTitle">Letters Guessed So Far</h4>
                <div class="rendered-letters" id="lettersGuessedSoFar">${this.separateLettersToSpanElements(
                  " "
                )}</div>

             <h4 class="subTitle">Guessed Correctly</h4>
              <div class="rendered-letters" id="renderLetters">${this.separateLettersToSpanElements(
                this.upperCaseFirstLetter(gameState.wordSoFar)
              )}</div>

              <h4 class="subTitle">Remaining Guesses</h4>
                <span class="rendered-letters" id='guessesRemaining' class="puzzleLetters">${
                  gameState.remainingGuesses
                }</span>

             <h4 class="subTitle">Difficulty Level</h4>
                <p class="rendered-letters puzzleLetters"> ${
                  gameState.difficulty
                } </p>
             `;
  }

  makeGuessEventListener = (e) => {
    const userInput = e.target.value;
    this.makeGuessCallback(userInput);
    initializeElementValue(e.target);
  };

  updateDomGameRender(gameState) {
    const { wordSoFar, remainingGuesses, allLettersGuessed } = gameState;
    const renderLettersElement = document.querySelector("#renderLetters");
    renderLettersElement.innerHTML = this.separateLettersToSpanElements(
      this.upperCaseFirstLetter(gameState.wordSoFar)
    );
    document.querySelector("#guessesRemaining").textContent = remainingGuesses;
    document.querySelector("#lettersGuessedSoFar").innerHTML =
      this.separateLettersToSpanElements(
        allLettersGuessed ? allLettersGuessed : "*"
      );
  }

  updateDomGameFinishedRender(gameState, result) {
    const hangmanInfoElem = document.querySelector("#hangmanInfo");
    hangmanInfoElem.innerHTML = this.generateHTMLForFinishedGame(
      gameState,
      result
    );
  }

  generateHTMLForFinishedGame(gameState, result) {
    const { wordSoFar, remainingGuesses, gameWord, difficulty } = gameState;
    return `
          <h3 class="game__result">${result}</h3>
          
                <h4 id="Correct Word" class="subTitle">Correct Word</h4>
                  <div class="rendered-letters result__letters"> 
                    ${this.separateLettersToSpanElements(
                      this.upperCaseFirstLetter(gameWord)
                    )}
                      </div>
          <h4 id="renderLetters" class="subTitle">Guessed Correctly</h4>
              <div class="rendered-letters">${this.separateLettersToSpanElements(
                this.upperCaseFirstLetter(wordSoFar)
              )}</div>

          <h4 class="subTitle">Remaining Guesses</h4>
              <span id="guessesRemaining" class='rendered-letters puzzleLetters'>${remainingGuesses}</span>

          <h4 class="subTitle">Difficulty Level</h4>
            <span class='rendered-letters puzzleLetters'>${difficulty}</span>
          `;
  }

  alert(message) {
    alert(message);
  }

  handleInvalidGuess(errorMessage) {
    alert(errorMessage);
  }

  upperCaseFirstLetter(word) {
    let result = word[0].toUpperCase() || "";
    result += word.slice(1) || "";
    return result;
  }
}

function initializeElementValue(...elements) {
  elements.forEach((e) => {
    e.value = "";
  });
}

export { initializeElementValue, UI as default };
