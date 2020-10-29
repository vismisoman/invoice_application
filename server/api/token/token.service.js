const Token = require("../models/token");

module.exports = {
  getTokenInfo: (idToken) => {
    return new Promise((resolve, reject) => {
      Token.findOne({ idToken })
        .then((token) => token)
        .then((token) => {
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
