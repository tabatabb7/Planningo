const db = require("../db");
const User = require("./user");
const Group = require("./group");
const GroceryList = require("./groceryList");
const GroceryItem = require("./groceryItem");

//ASSOCIATIONS

//User and Group --- many-to-many association w/ through table
User.belongsToMany(Group, {through: 'User_Group'});
Group.belongsToMany(User, {through: 'User_Group'})

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
