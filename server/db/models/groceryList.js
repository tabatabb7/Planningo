const Sequelize = require("sequelize");
const db = require("../db");

const GroceryList = db.define("groceryList", {
  name: {
    type: Sequelize.STRING,
    defaultValue: "Groceries",
  },
});

module.exports = GroceryList;
