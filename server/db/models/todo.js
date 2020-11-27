const Sequelize = require("sequelize");
const db = require("../db");

const Todo = db.define("todos", {
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
    allowNull: false
  },
  tasksCompleted: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Todo;
