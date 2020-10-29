const User = require("./user.service");

exports.insertUser = function (req, res) {
  //handles null error
  let user = req.body;
  if (!user.username || !user.username) {
    res.status(400).send({ error: true, message: "Please provide a username" });
  } else {
    let result = User.insertUser(user);
    result
      .then((data) => {
        return res.json(data);
      })
      .catch(() => {
        console.log("Insertion failed");
      });
  }
};
/*
const db = require("../../db/connect"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;
var User = require("../models/user");

module.exports = {
  insertUser: (req, res) => {
    let user = req.body;
    // var newUser = function (user) {
    //   this.email = user.email;
    //   this.username = user.username;
    //   this.password = user.password;
    //   this.usertype = user.usertype;
    // };
    // User.create(newUser)
    //   .then((user) => user)
    //   .catch((err) => {
    //     throw new Error("error finding user in database ", err).message;
    //   });
    sequelize
      .sync()
      .then(function () {
        return User.create(user);
      })
      .then(function (user) {
        res.send("YES");
      });
  },
};
*/
exports.invoice = function (req, res) {
  res.send("Welcome to invoice App");
};
