import {saveToLocalStorage, loadObjectLocalStorage, loadWeakMapFromLocalStorage} from './localStorage.js'
import GameUser from './userDatabase.js'
import UserDatabaseUI from './UI_UserDatabase.js'
import GameManager from './GameManager.js'
import {renderUserDatabase} from './UI_UserDatabase.js'

const userDatabase = loadObjectLocalStorage('gameUsers')

const _currentUser = new WeakMap()

const currentUser = {
    set(value) {
        _currentUser.set(this, value)
    },

    get() {
        return _currentUser.get(this)
    }
}

class UserDatabaseFunctionality {
    constructor() {

        this.newGame = new GameManager(this.updateUserGameData.bind(this))

        this.userDatabaseUI = new UserDatabaseUI(this.setUpNewUser.bind(this), this.loadUserFromDatabase.bind(this))

    }

    setUpNewUser(userName, userPass) {
        if (!this.userAlreadyExists(userName)) {
            this.createNewUser(userName, userPass)
            this.updateCurrentUser(userName)
            saveToLocalStorage('gameUsers', userDatabase)
            this.userDatabaseUI.renderUserToDom(userName)
            renderUserDatabase();
        } else {
            this.userDatabaseUI.alertUserAlreadyExists()
        }
    }

    createNewUser(userName, userPassword) {  
        userDatabase[userName] = new GameUser(userName, userPassword);
    }

    updateCurrentUser = (userName) => {
            currentUser.set(userName)
    }

    loadUserFromDatabase = (userName, userPass) => {
        if(this.isUserInDatabase(userName) && this.isUserPasswordCorrect(userName, userPass)) {
            currentUser.set(userName)
            this.userDatabaseUI.renderUserToDom(userName)
        } else {
            this.userDatabaseUI.alertUserCredentialsIncorrect()
        }
    }
    
    userAlreadyExists(user) {
        if (userDatabase.hasOwnProperty(user)) {
            return true
        } 
        return false
    }
    
    updateUserGameData = () => {
        const user = currentUser.get()

        if (user) {
            const {gameWord} = this.newGame.returnStateOfGame()
            const isGameWon = this.newGame.isGameWon() 
        
            if (isGameWon) {
                userDatabase[user].gamesWon++
            } else {
                userDatabase[user].gamesLost++
            }
    
            userDatabase[user].gamesPlayed++
            userDatabase[user].wordsPlayed.push({[gameWord]: this.newGame.getResult()})
        }
        saveToLocalStorage('gameUsers', userDatabase)
    }
    
    isUserInDatabase = (userName) => (userDatabase[userName]) ? true : false
    
    isUserPasswordCorrect = (userName, userPass) => GameUser.prototype.checkPassword.call(userDatabase[userName], userPass)
    
}

new UserDatabaseFunctionality()

