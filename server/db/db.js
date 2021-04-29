const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://jkxmqzvxxeqrbp:0c883cd510d62bc3e4dc90fec7914bee618528959ccae92ad8bc2d99e98f6afb@ec2-3-215-57-87.compute-1.amazonaws.com:5432/d4o54q5lovkv2q`,
  {
    logging: false,
  }
);
module.exports = db;
