const router = require("express").Router();

const {
  Task,
  User_Task,
  Group,
  User,
  Task_Group,
  Category,
} = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Group,
        },
        {
          model: Task,
          where: {
            isShopping: false,
          },
          required: false,
          include: {
            model: Category,
          },
        },
      ],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//GET Shopping list items
router.get("/shopping", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Group,
        },
        {
          model: Task,
          where: {
            isShopping: true,
          },
          required: false,
        },
      ],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.taskId,
      },
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const group = await Group.findByPk(
        req.body.groupId)
    const task = await Task.create({
      userId: req.user.id,
      name: req.body.name,
      description: req.body.description,
      points: req.body.points,
      shoppingId: null,
      categoryId: req.body.categoryId
    });

    await User_Task.create({
      userId: req.user.id,
      taskId: task.id,
    });
    await Task_Group.create({
      groupId: group.id,
      taskId: task.id,
    });

    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.post("/shopping", async (req, res, next) => {
  try {
    const group = await Group.findOne({
      where: {
        groupId: req.body.groupId,
      },
    });
    const task = await Task.create({
      userId: req.user.id,
      name: req.body.name,
      isShopping: true,
    });
    await User_Task.create({
      userId: req.user.id,
      taskId: task.id,
    });
    await Task_Group.create({
      groupId: group.id,
      taskId: task.id,
    });

    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.body.taskId);
    task.update(req.body);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

//PATCH task
router.patch("/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    const { updatedFields } = req.body;
    task.update({ ...updatedFields });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.delete("/:taskId", async (req, res, next) => {
  try {
    await Task.destroy({
      where: {
        id: req.params.taskId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
