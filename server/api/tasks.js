const router = require("express").Router();
const { Task, User_Task } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const tasks = await req.user.getTasks()
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: {
        taskId: req.params.taskId
      },
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});


router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create({
      userId: req.user.id,
      name: req.body.name,
    });
    await User_Task.create({
      userId: req.user.id,
      taskId: task.id,
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});


router.put("/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: {
        userId: req.user.id,
      },
    });
    await Task.update(req.body);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.delete("/:taskId", async (req, res, next) => {
  try {
    await Task.destroy({
      where: {
        id: req.params.taskId
      }
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
