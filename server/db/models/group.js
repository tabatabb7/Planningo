const Sequelize = require("sequelize");
const db = require("../db");
// const uuid = require('uuidv4');

const Group = db.define("group", {
  // id: {
  //   primaryKey: true,
  //   type: Sequelize.UUID,
  //   allowNull: false,
  // },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT
  },
});

// Group.beforeCreate(group => group.id = uuid())

module.exports = Group;
