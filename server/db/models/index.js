const db = require("../db");
const User = require("./user");
const Task = require("./task");
const Group = require("./group");
const Grocery = require("./grocery");
const Sequelize = require("sequelize");

//ASSOCIATIONS
//**********USER AND GROUP --- USER_GROUP THROUGH TABLE ***********
const User_Group = db.define('User_Group', {
  role: {
    type: Sequelize.ENUM('owner', 'admin', 'member'),
    defaultValue: 'member'
  }
})
User.belongsToMany(Group, { through: "User_Group" });
Group.belongsToMany(User, { through: "User_Group" });
//***************************************************************** */
//Task and Group --- one-to-many with through table
// Task.belongsToMany(Group, {through: 'Task_Group'});
// Group.hasMany(Task, {through: 'Task_Group'})

//Single user's grocery list
User.hasMany(Grocery);
Grocery.belongsTo(User);

//user and task. We might need through table once we put groups in? not sure
User.hasMany(Task);
Task.belongsTo(User);

//export modules
module.exports = {
  db,
  User,
  Task,
  Group,
  Grocery,
  User_Group,
};
