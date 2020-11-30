const { blue, cyan, green, red } = require("chalk");
const { User } = require("../server/db/models");
const seedUsers = require('./users.json')
// const seedGroups = require('./groups.json')
const db = require("../server/db")

const seed = async () => {
  try {
  console.log(cyan('📡 Connecting to the database...'));
   await db.sync({ force: true });
//connect to the database
await Promise.all(seedUsers.map((user) => User.create(user)));
// await Promise.all(seedGroups.map((group) => Group.create(group)));

  console.log(blue('🌱 Seeding the database...'));
    // seed your database here!
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
