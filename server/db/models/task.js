const Sequelize = require("sequelize");
const db = require("../db");

const Task = db.define("tasks", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  imageUrl:{
    type: Sequelize.TEXT,
  },
  points: {
    type: Sequelize.INTEGER,
  },
});


module.exports = Task
