var db = require("../../db/connect"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

var UserPermission = sequelize.define(
  "user_permission",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },

    title: Sequelize.STRING,
    code: Sequelize.STRING,
  },
  { tableName: "user_permission" }
);

module.exports = UserPermission;
