var db = require("../../db/connect"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

var Permission = sequelize.define(
  "permission",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },

    title: Sequelize.STRING,
    code: Sequelize.STRING,
  },
  { tableName: "permission" }
);

module.exports = Permission;
