const router = require("express").Router();
const { Task } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: {
        userId: req.user.id,
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
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     const task = await Task.create(req.body);
//     res.json(task);
//   } catch (err) {
//     next(err);
//   }
// });

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
        userId: req.user.id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
