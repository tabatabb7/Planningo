const Sequelize = require("sequelize");
const db = require("../db");

const User_Group = db.define("User_Group", {
  isActive: {
    type: Sequelize.BOOLEAN,
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = User_Group;
