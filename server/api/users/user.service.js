var User = require("../models/user");

module.exports = {
  insertUser: (user) => {
    return User.create(user);
  },
};
