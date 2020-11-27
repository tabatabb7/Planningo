const Sequelize = require("sequelize");
const db = require("../db");

const GroceryItem = db.define("groceryItem", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = GroceryItem;
