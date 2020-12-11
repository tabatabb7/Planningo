const Sequelize = require("sequelize");
const db = require("../db");

const Point = db.define("points", {
  value: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
});

module.exports = Point;
