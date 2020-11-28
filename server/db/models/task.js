const Sequelize = require("sequelize");
const db = require("../db");

const Task = db.define("tasks", {
  taskName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
  },
  tasksCompleted: {
    type: Sequelize.INTEGER,
  }
});

module.exports = Task;
