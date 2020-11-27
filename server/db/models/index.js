const db = require("../db");
const User = require("./user");
const Group = require("./group");
const GroceryList = require("./groceryList");
const GroceryItem = require("./groceryItem");
//Associations

GroceryList.belongsTo(Group);
GroceryItem.belongsTo(GroceryList);

//export modules
module.exports = {
  db,
  User,
  Group,
  GroceryList,
  GroceryItem,
};
