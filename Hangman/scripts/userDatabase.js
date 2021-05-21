// import bcrypt from '.../node_modules/bcryptjs';
import bcrypt from'bcryptjs';
const saltRounds = 10;
class GameUser {
    constructor(userName, userPassword) {
        this.playerName = userName
        this.gamesPlayed = 0,
        this.gamesWon = 0,
        this.gamesLost = 0,
        this.wordsPlayed = [],
        this.password = bcrypt.hashSync(userPassword, saltRounds);
        this.created = new Date()
    }

    checkPassword(userPassword) {
        return bcrypt.compareSync(userPassword, this.password)
    }
}
export {GameUser as default} 
