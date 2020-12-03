const router = require("express").Router();
const { Group, User_Group, User, Grocery, Task, User_Task, Task_Group } = require("../db/models");

//GET groups for a member
// router.get("/", async (req, res, next) => {
//   try {
//     const group = await Group.findAll({
//       include: [
//         {
//           model: User,
//           where: {
//             id: req.user.id,
//           },
//         },
//       ],
//     });
//     res.json(group);
//   } catch (err) {
//     next(err);
//   }
// });



router.get("/", async (req, res, next) => {
  try {
    const group = await req.user.getGroups()
    res.json(group);
  } catch (err) {
    next(err);
  }
});



//GET single group
router.get("/:groupId", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: [{
        model: User,
      }, 
      {
        model: Task
      }]
    });
    res.json(group);
  } catch (err) {
    next(err);
  }
});

//GET /api/groups/:groupId/grocery
router.get("/:groupId/grocery", async (req, res, next) => {
  try {
    console.log("is api route working for fetch groceries");
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

//POST /api/groups/:groupId/grocery
router.post("/:groupId/grocery", async (req, res, next) => {
  try {
    console.log("inside the post route for group groceries");
    const grocery = await Grocery.create({
      groupId: req.params.groupId,
      name: req.body.name,
    });
    res.json(grocery);
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

//DELETE /api/groups/:groupId/grocery/:groceryId
router.delete("/:groupId/grocery/:groceryId", async (req, res, next) => {
  try {
    await Grocery.destroy({
      where: {
        groupId: req.params.groupId,
        id: req.params.groceryId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// GET /api/groups/:groupId/tasks
router.get("/:groupId/tasks", async (req, res, next) => {
    try {
      const group = await Group.findByPk(req.params.groupId, {
        include: [{
          model: User,
        }, 
        {
          model: Task
        }]
      });
      res.json(group);
    } catch (err) {
      next(err);
    }
  });

// POST /api/groups/:groupId/tasks
router.post("/:groupId/tasks", async (req, res, next) => {
  try {
    const selected = req.body.selected
    const selectedNames = selected.split(' ')

    const user = await User.findOne({
      where: {
        firstName: selectedNames[0],
        lastName: selectedNames[1]
      }
    })

    const userGroup = await User_Group.findOne({
      where: {
        groupId: req.params.groupId
      }
    })

    const task = await Task.create({
      userId: user.id,
      name: req.body.name,
    });
    await User_Task.create({
      userId: user.id,
      taskId: task.id,
    });
    await Task_Group.create({
      taskId: task.id,
      groupId: userGroup.groupId
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
