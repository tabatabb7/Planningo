const Sequelize = require("sequelize");
const db = require("../db");

const Task = db.define("tasks", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Task;
