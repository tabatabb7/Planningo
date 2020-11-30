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

const User_Task = db.define("User_Task", {
  assignedTo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});



module.exports = Task, User_Task
