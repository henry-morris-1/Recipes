const db = require("../DBConnection");
const User = require("../models/User");

/**
 * Validates and gets a filtered user object from a username and password
 * @param {String} username Username to validate
 * @param {String} password Password to validate
 * @returns Filtered user object for the matching user
 */
function getUserByCredentials(username, password) {
    return db.query("SELECT * FROM users WHERE username = ?", [username]).then(({results}) => {
        const user = new User(results[0]);
        if (user) {
            return user.validatePassword(password);
        } else {
            throw new Error("No such user");
        }
    });
}

module.exports = {
    getUserByCredentials: getUserByCredentials
};