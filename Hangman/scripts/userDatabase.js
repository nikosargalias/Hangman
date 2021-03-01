class GameUser {
    constructor(userName, userPassword) {
        this.playerName = userName
        this.gamesPlayed = 0,
        this.gamesWon = 0,
        this.gamesLost = 0,
        this.wordsPlayed = [],
        this.password = window.dcodeIO.bcrypt.hashSync(userPassword, 10)
    }
    checkPassword(userPassword) {
        return window.dcodeIO.bcrypt.compareSync(userPassword, this.password)
    }
}
