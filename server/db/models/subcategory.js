const Sequelize = require("sequelize");
const db = require("../db");

const SubCategory = db.define("subcategory", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  }
});

module.exports = SubCategory;
