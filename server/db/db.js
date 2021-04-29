const Sequelize = require("sequelize");
const pkg = require("../../package.json");
const dbURL = require("../../secrets");
const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://znncnmtnyxergd:bbe0dd5655788416de5a3336264ce726ac042fce862129b80be4d4fc84d5f425@ec2-34-225-167-77.compute-1.amazonaws.com:5432/d6b7n50tns7hms",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
    // sequelize: {
    //   uri:
    //     "postgres://znncnmtnyxergd:bbe0dd5655788416de5a3336264ce726ac042fce862129b80be4d4fc84d5f425@ec2-34-225-167-77.compute-1.amazonaws.com:5432/d6b7n50tns7hms",
    //   options: {
    //     native: true,
    //     ssl: true,
    //   },
    // },
  }
);
module.exports = db;
