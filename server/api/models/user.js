var db = require("../../db/connect"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

var User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },

    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    usertype: Sequelize.INTEGER,
    active: Sequelize.BOOLEAN,
    activated_date: Sequelize.DATE,
    last_login_time: Sequelize.DATE,
    last_logout_time: Sequelize.DATE,
  },
  { tableName: "users" }
);

module.exports = User;
