var db = require("../../db/connect"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

var Token = sequelize.define(
  "token",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },

    user_id: Sequelize.STRING,
    idToken: Sequelize.STRING,
    created_time: Sequelize.DATE,
  },
  { tableName: "token" }
);

module.exports = Token;
