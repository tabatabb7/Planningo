const router = require("express").Router();
const {
  Point,
  User_Task,
  User,
  Task_Group,
  Task,
  Category,
} = require("../db/models");
const Op = require("sequelize").Op;

// GET api/points
router.get("/:userId", async (req, res, next) => {
  try {
    const points = await Point.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.send(points);
  } catch (err) {
    next(err);
  }
});

// POST api/points
router.post("/", async (req, res, next) => {
  try {
    const taskNum = Object.keys(req.body);
    const taskId = taskNum[0];

    const task = await Task.findByPk(taskId);

    const taskCat = await Category.findOne({
      where: {
        id: task.categoryId,
      },
    });

    const groupTask = await Task_Group.findOne({
      where: {
        taskId: taskId,
      },
    });

    const userTask = await User_Task.findOne({
      where: {
        taskId: taskId,
      },
    });

    const user = await User.findOne({
      where: {
        id: userTask.userId,
      },
    });

    const pointEntry = await Point.findOrCreate({
      where: {
        value: task.points,
        taskId: taskId,
        userId: user.id,
        groupId: groupTask.groupId,
        firstName: user.firstName,
        categoryName: taskCat.categoryName,
      },
    });

    res.send(pointEntry);
  } catch (err) {
    next(err);
  }
});

router.delete("/:taskId", async (req, res, next) => {
  try {
    await Point.destroy({
      where: {
        taskId: req.params.taskId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
