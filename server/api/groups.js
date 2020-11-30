const router = require("express").Router();
const { Group, User_Group, User } = require("../db/models");

//GET groups for a member
router.get("/", async (req, res, next) => {
  try {
    const group = await Group.findAll({
      include: [
        {
          model: User,
          where: {
            id: req.user.id,
          },
        },
      ],
    });
    res.json(group);
  } catch (err) {
    next(err);
  }
});

//GET single group
router.get("/:groupId", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: {
        model: User,
      },
    });
    res.json(group);
  } catch (err) {
    next(err);
  }
});
//GET /api/groups/:groupId/grocery
router.get("/:groupId/grocery", async (req, res, next) => {
  try {
    const grocery = await Grocery.findAll({
      where: {
        groupId: req.params.groupId,
      },
    });
    res.json(grocery);
  } catch (error) {
    next(error);
  }
});

//POST - create group
router.post("/", async (req, res, next) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      description: req.body.description,
    });
    await User_Group.create({
      userId: req.user.id,
      groupId: group.id,
      role: "owner",
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
    await Group.destroy({
      where: { id: req.params.groupId },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//POST USER to group
router.post("/:groupId", async (req, res, next) => {
  try {
    const newUser = await User_Group.findOrCreate({
      where: {
        groupId: req.params.groupId,
        userId: req.body.userId,
      },
    });
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

//DELETE USER from group
router.delete("/:groupId/:userId", async (req, res, next) => {
  try {
    await User_Group.destroy({
      where: {
        groupId: req.params.groupId,
        userId: req.params.userId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
