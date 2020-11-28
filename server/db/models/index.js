const db = require("../db");
const User = require("./user");
const Task = require("./task");
const Group = require("./group");
const GroceryList = require("./groceryList");
const GroceryItem = require("./groceryItem");

//ASSOCIATIONS

//User and Group --- many-to-many association w/ through table
User.belongsToMany(Group, {through: 'User_Group'});
Group.belongsToMany(User, {through: 'User_Group'})
//Task and Group --- one-to-many with through table
// Task.belongsToMany(Group, {through: 'Task_Group'});
// Group.hasMany(Task, {through: 'Task_Group'})


GroceryList.belongsTo(Group);
GroceryItem.belongsTo(GroceryList);

//user and task. We might need through table once we put groups in? not sure
User.hasMany(Task);
Task.belongsTo(User);


//export modules
module.exports = {
  db,
  User,
  Task,
  Group,
  GroceryList,
  GroceryItem,
};
