const router = require("express").Router();
const { User } = require("../db/models");

// function isAdmin(req, res, next) {
//   if (req.user && req.user.role === 'admin') {
//     next(); // allow the next route to run
//   } else {
//     res.status(403).send("You don't have permission to view this page.");
//   }
// }

//POST
router.post("/", async (req, res, next) => {
  try {
    console.log("server received signup request");
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    next(err);
  }
});

//GET

// router.get('/', isAdmin, async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
//     });
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ["firstName", "lastName", "email"],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//PUT

// router.put('/:userId', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.userId);
//     await User.update(req.body);
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });

//DELETE

module.exports = router;
