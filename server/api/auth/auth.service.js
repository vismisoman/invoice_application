const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");

module.exports = {
  /* Method to Id jwt token */
  generateIdToken: (email, username) => {
    return jwt.sign(
      {
        email,
        username,
      },
      process.env.JWT_KEY,
      { expiresIn: 3600 }
    );
  },

  // Method to update user login details in db
  updateUserLogin: (user) => {
    user.last_login_time = Date.now();
    user.save();
    // user.save().then((rec) => rec);
  },
  saveIdToken: (idToken, userId) => {
    let token = new Token({ idToken, userId });
    token.user_id = userId;
    token.idToken = idToken;
    token.created_time = Date.now();
    token.save();
    //Token.create(token);
  },

  // To find the user by using username
  findByUsername: (username) => {
    return User.findOne({ where: { username: username } })
      .then((user) => user)
      .catch((err) => {
        throw new Error("error finding user in database ", err).message;
      });
  },
  // To find the user by using email
  findByEmail: (email) => {
    return User.findOne({ email })
      .then((user) => user)
      .catch((err) => {
        throw new Error("error finding user in database ", err).message;
      });
  },
  // Method to update user login details in db
  updateUserLogin: (user) => {
    user.last_login_time = Date.now();
    user.save();
  },
};
