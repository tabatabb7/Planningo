const router = require("express").Router();
const {
  Group,
  User_Group,
  User,
  Task,
  User_Task,
  Task_Group,
  Category,
  Point,
} = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const group = await req.user.getGroups({
      include: [
        {
          model: Category
        } 
      ]
    })
    console.log(group)
    res.json(group);
  } catch (err) {
    next(err);
  }
});

//GET single group
router.get("/:groupId", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: [
        {
          model: User,
        },
        {
          model: Task,
        },
        {
          model: Category,
        },
      ],
    });
    res.json(group);
  } catch (err) {
    next(err);
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
      role: "admin",
    });

    await Category.bulkCreate([
      {
        name: "Home",
        color: "#FFBF00",
        groupId: group.id,
        isShopping: false,
        imageUrl: "/assets/icons/misc/041-family.png",
      },
      {
        name: "Work",
        color: "#FF7F50",
        groupId: group.id,
        isShopping: false,
        imageUrl: "/assets/icons/misc/002-folders.png",
      },
      {
        name: "Finance",
        color: "#DE3163",
        groupId: group.id,
        isShopping: false,
        imageUrl: "/assets/icons/misc/026-business and finance.png",
      },
      {
        name: "School",
        color: "#CCCCFF",
        groupId: group.id,
        isShopping: false,
        imageUrl: "/assets/icons/misc/003-book.png",
      },
      {
        name: "Family",
        color: "#40E0D0",
        groupId: group.id,
        isShopping: false,
        imageUrl: "/assets/icons/misc/012-avatar.png",
      },

      {
        name: "Grocery",
        color: "#FFBF00",
        groupId: group.id,
        isShopping: true,
        imageUrl: "/assets/icons/misc/004-commerceshop.png",
      },
      {
        name: "Home",
        color: "#FF7F50",
        groupId: group.id,
        isShopping: true,
        imageUrl: "/assets/icons/misc/003-sofa.png",
      },
    ]);
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

// GET /api/groups/:groupId/tasks
router.get("/:groupId/tasks", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: [
        {
          model: User,
        },
        {
          model: Task,
          where: {
            isShopping: false,
          },
          required: false,
        },
        {
          model: Category,
          where: {
            isShopping: false,
          },
          required: false,
        },
      ],
    });
    res.json(group);
  } catch (err) {
    next(err);
  }
});


// POST /api/groups/:groupId/tasks
router.post("/:groupId/tasks", async (req, res, next) => {
  try {
    const selected = req.body.selected;
    const selectedNames = selected.split(" ");

    const user = await User.findOne({
      where: {
        firstName: selectedNames[0],
        lastName: selectedNames[1],
      },
    });

    const userGroup = await User_Group.findOne({
      where: {
        groupId: req.body.groupId,
      },
    });

    const task = await Task.create({
      userId: user.id,
      name: req.body.name,
      points: req.body.points,
      isShopping: false,
    });
    await User_Task.create({
      userId: user.id,
      taskId: task.id,
    });
    await Task_Group.create({
      taskId: task.id,
      groupId: userGroup.groupId,
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// POST /api/groups/:groupId/tasks
router.put("/:groupId/tasks", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.body.taskId);
    task.update(req.body);
    res.json(task);
    // console.log(task)
  } catch (err) {
    next(err);
  }
});

// router.post("/:groupId/shopping", async (req, res, next) => {
//   try {
//     const userGroup = await User_Group.findOne({
//       where: {
//         groupId: req.body.groupId,
//       },
//     });
//     const task = await Task.create({
//       name: req.body.name,
//       isShopping: true
//     });
//     await Task_Group.create({
//       taskId: task.id,
//       groupId: userGroup.groupId,
//     });
//     res.json(task);
//   }catch(error){
//     next(error)
//   }
// })

router.get("/:groupId/shopping", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: [
        {
          model: User,
        },
        {
          model: Task,
          where: {
            isShopping: true,
          },
          required: false,
        },
        {
          model: Category,
          where: {
            isShopping: true,
          },
          required: false,
        },
      ],
    });
    res.json(group);
  } catch (err) {
    next(err);
  }
});

//GET api/groups/:groupId/rewards
router.get("/:groupId/rewards", async (req, res, next) => {
  try {
    const groupPoints = await Point.findAll({
      where: {
        groupId: req.params.groupId,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.send(groupPoints);
  } catch (err) {
    next(err);
  }
});

//GET /api/groups/:groupId/rewards
router.get("/:groupId/rewards", async (req, res, next) => {
  try {
    const group = await Point.findOne({
      where: {
        groupId: req.params.groupId
      },
      include: [
        {
          model: User
        },
      ]
    })
    res.json(group)
  } catch (err) {
    next (err) 
  }
})

//GET api/groups/:groupId/:userId/rewards
router.get("/:groupId/:userId/rewards", async (req, res, next) => {
  try {
    const userGroupPoints = await Point.findAll({
      where: {
        userId: req.params.userId,
        groupId: req.params.groupId,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.send(userGroupPoints);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
