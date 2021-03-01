class UserDatabaseUI {
    constructor(setUpNewUser, loadUserFromDatabaseFn) {
        const addNewUser = document.querySelector('#saveNewGameUser')
        addNewUser.addEventListener('submit', this.saveGameUserEventListener)


        const loadUserFromDatabase = document.querySelector('#userDatabase')
        loadUserFromDatabase.addEventListener('submit', this.loadUserFromDatabase) 
    
        this.setUpNewUser = setUpNewUser
        this.loadUserFromDatabaseFn = loadUserFromDatabaseFn
    }

    saveGameUserEventListener = (e) => {
        e.preventDefault()
    
        let userName = e.target.elements.saveGameUserName.value
        let userPass = e.target.elements.userPass.value
    
        this.setUpNewUser(userName, userPass)
    
        initializeElementValue(e.target.elements.saveGameUserName.value, e.target.elements.userPass.value)
    }

    loadUserFromDatabase = (e) => {
        e.preventDefault()
        // console.log(this)
    
        const userName = e.target.userName.value
        const userPass = e.target.userPassword.value
    
        this.loadUserFromDatabaseFn(userName, userPass)
    
        initializeElementValue(e.target.userName.value, e.target.userPassword.value)
    }

    renderUserToDom(userName) {
        const userElement = document.querySelector('#currentUserPlaying')
        userElement.textContent = userName
    }

    alertUserCredentialsIncorrect() {
        alert('Password is Incorrect')
    }

    alertUserAlreadyExists() {
        alert('User AlreadyExists')
    }
}



function renderUserDatabase() {
    let renderUserDatabase = document.querySelector('#userDatabase')
    renderUserDatabase.innerHTML = userDatabaseHTML()
    let selectElement = renderUserDatabase.children[1]
    
    appendOptionsForUserDatabase(selectElement)
}

function userDatabaseHTML() {
    return `
            <label>Load User:</label>
            <select id="userDatabaseOptions" name="userName"> </select>
            <input type="password" name="userPassword" placeholder="password">
            <button class="button">Confirm</button>
            `
}

function appendOptionsForUserDatabase(locationToAppend) {
    const userDatabase = loadObjectLocalStorage('gameUsers')
    
    let optionDiv = document.createElement('div')
    
    if(Object.keys(userDatabase).length > 0) {
        for (prop in userDatabase) {
            optionDiv.innerHTML = `<option value="${prop}">${prop}</option>`
            let option = optionDiv.children[0]
            locationToAppend.append(option)
        }
    } 
    else {
            optionDiv.innerHTML = `<option>no users</option>`
            locationToAppend.append(optionDiv.children[0])
    }
}


(function main() {
    renderUserDatabase()
})();