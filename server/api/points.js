const router = require("express").Router();
const { Point, User_Task, User, Task_Group, Task } = require("../db/models");
const Op = require("sequelize").Op;

// GET api/points
router.get("/:userId", async (req, res, next) => {
  try {
    console.log(req.params.userId, "req.params.userId inside api route");
    console.log(req.user.id, "req.user.id inside api routes");
    const points = await Point.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    console.log(points, "points inside apir outes");
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
