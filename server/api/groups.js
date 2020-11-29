const router = require("express").Router();
const { Group, User_Group } = require("../db/models");

//GET all groups associated with a user
router.get("/", async (req, res, next) => {
  try {
    const groups = await User_Group.findAll({
      where: {
        userId: req.user.id,
      },
    });
    console.log(groups, "groups from get route");
    // const userGroups = await Group.findAll({
    //   where: {
    //     groupId: groups.groupId,
    //   },
    // });
    res.send(groups);
  } catch (err) {
    next(err);
  }
});

//GET single group
router.get("/:groupId", async (req, res, next) => {
  try {
    const group = await Group.findOne({
      where: {
        userId: req.user.id,
        id: req.params.groupId,
      },
      include: {
        model: User_Group,
      },
    });
    res.send(group);
  } catch (err) {
    next(err);
  }
});

//POST group
router.post("/", async (req, res, next) => {
  try {
    const group = await Group.create({ name: req.body.name });
    //check User Group table
    //findorcreate where userId: req.user.id, groupId: group.id

    const newGroup = await User_Group.findOrCreate({
      where: {
        userId: req.user.id,
        groupId: group.id,
      },
      defaults: {
        isActive: true,
        name: group.name,
      },
    });
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
    const group = await Group.findOne({
      where: { id: req.params.groupId },
    });
    console.log(group, "group inside delete route");
    await User_Group.destroy({
      where: {
        groupId: group.id,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
