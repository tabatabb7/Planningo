const router = require("express").Router();
const { Group, User_Group } = require("../db/models");

//GET /api/groups
router.get("/", async (req, res, next) => {
  try {
    const groups = await req.user.getGroups()
    // const group = await Group.findAll()
    // await User_Group.findAll({
    //   where: {
    //     userId: req.user.id
    //   }
    // })
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

router.get("/:groupId", async (req, res, next) => {
  try {
    const group = await User_Group.findOne({
      where: {
        userId: req.user.id,
        groupId: req.params.groupId,
      },
    });
    res.json(group);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const group = await Group.create({
          name: req.body.name,
        })
      await User_Group.create({
        userId: req.user.id,
        groupId: group.id
      })
res.json(group);
  } catch (err) {
    next(err);
  }
});

//PUT group
router.put("/:groupId", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    group.update(req.body);
    res.json(group);
  } catch (err) {
    next(err);
  }
});

//DELETE group
router.delete("/:groupId", async (req, res, next) => {
  try {
    await Group.destroy({
      where: { id: req.params.groupId },
    });
    res.sendStatus(204);

  } catch (err) {
    next(err);
  }
});

//DELETE USER from group
// router.delete("/:groupId", async (req, res, next) => {
//   try {
//     const group = await Group.findOne({
//       where: { id: req.params.id },
//     });
//     console.log(group, "group inside delete route");
//     await User_Group.destroy({
//       where: {
//         groupId: group.id,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// });


module.exports = router;
