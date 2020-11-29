const router = require("express").Router();
const { Group, User_Group, User } = require("../db/models");

//GET /api/groups
router.get("/", async (req, res, next) => {
  try {
    console.log("inside api routes");
    //find all group ids on user group where userId matches
    //return groups from group table where groupid matches
    const group = await User_Group.findAll({
      userId: req.user.id,
    });
    const allGroups = await Group.findAll({
      groupId: group.id,
    });

    // User.getGroup();
    //     const groups = await Group.findAll({
    //       where: {
    //         userId: req.user.id,
    //       },
    //       include: {
    //         userId:
    //       },
    //     });

    console.log("groups inside api routes", groups);
    // const groups = await Group.findAll({
    //   where: {
    //     userId: req.user.id,
    //   },
    // });
    res.json(allGroups);
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
    const group = await User_Group.create({
      userId: req.user.id,
      name: req.body.name,
    });

    res.json(group);
  } catch (err) {
    next(err);
  }
});

router.put("/:groupId", async (req, res, next) => {
  try {
    const group = await Group.findOne({
      where: {
        userId: req.user.id,
      },
    });
    await Group.update(req.body);
    res.json(group);
  } catch (err) {
    next(err);
  }
});

router.delete("/:groupId", async (req, res, next) => {
  try {
    await Group.destroy({
      where: {
        id: req.params.groupId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
