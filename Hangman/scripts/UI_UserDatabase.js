import { loadObjectLocalStorage } from "./localStorage.js";
import { initializeElementValue } from "./UI.js";
class UserDatabaseUI {
  constructor(setUpNewUser, loadUserFromDatabaseFn) {
    const addNewUser = document.querySelector("#saveNewGameUser");
    addNewUser.addEventListener("submit", this.saveGameUserEventListener);

    const loadUserFromDatabase = document.querySelector("#userDatabase");
    loadUserFromDatabase.addEventListener("submit", this.loadUserFromDatabase);

    this.setUpNewUser = setUpNewUser;
    this.loadUserFromDatabaseFn = loadUserFromDatabaseFn;
  }

  saveGameUserEventListener = (e) => {
    e.preventDefault();

    let userName = e.target.elements.saveGameUserName.value;
    let userPass = e.target.elements.userPass.value;

    this.setUpNewUser(userName, userPass);

    initializeElementValue(
      e.target.elements.saveGameUserName,
      e.target.elements.userPass
    );
  };

  loadUserFromDatabase = (e) => {
    e.preventDefault();

    const userName = e.target.userName.value;
    const userPass = e.target.userPassword.value;

    this.loadUserFromDatabaseFn(userName, userPass);

    initializeElementValue(e.target.userPassword);
  };

  renderUserToDom(userName) {
    const userElement = document.querySelector("#currentUserPlaying");
    userElement.textContent = userName;
  }

  alertUserCredentialsIncorrect() {
    alert("Password is Incorrect");
  }

  alertUserAlreadyExists() {
    alert("User AlreadyExists");
  }
}

function renderUserDatabase() {
  let renderUserDatabase = document.querySelector("#userDatabase");
  renderUserDatabase.innerHTML = userDatabaseHTML();
  let selectElement = document.getElementById("userDatabaseOptions");
  appendOptionsForUserDatabase(selectElement);
}

function userDatabaseHTML() {
  return `  
  <h2 class="form__heading">Load User:</h2>
            <div class="form__select-container">
                <select id="userDatabaseOptions" class="dropdown" name="userName"> 
                <option value="">Select User:</option></select>
                <label for="userDatabaseOptions"></label>
            </div>
            <input type="password" name="userPassword" placeholder="password">
            <button class="button">Confirm</button>

            `;
}

function appendOptionsForUserDatabase(locationToAppend) {
  const userDatabase = loadObjectLocalStorage("gameUsers");
  const sortedUsers = Object.keys(userDatabase).sort();

  let optionDiv = document.createElement("div");

  if (sortedUsers.length > 0) {
    for (const prop of sortedUsers) {
      optionDiv.innerHTML = `<option value="${prop}">${prop}</option>`;
      let option = optionDiv.children[0];
      locationToAppend.append(option);
    }
  } else {
    optionDiv.innerHTML = `<option>no users</option>`;
    locationToAppend.append(optionDiv.children[0]);
  }
}

(function main() {
  renderUserDatabase();
})();

export { UserDatabaseUI as default, renderUserDatabase };
