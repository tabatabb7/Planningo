const Sequelize = require("sequelize");
const db = require("../db");

const Shopping = db.define("shopping", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.FLOAT
  }
});

module.exports = Shopping;
