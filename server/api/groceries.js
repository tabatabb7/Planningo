const router = require("express").Router();
const { Grocery } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const groceries = await Grocery.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.json(groceries);
  } catch (err) {
    next(err);
  }
});

router.get("/:groceryId", async (req, res, next) => {
  try {
    const grocery = await Grocery.findOne({
      where: {
        userId: req.user.id,
      },
    });
    res.json(grocery);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const grocery = await Grocery.create({
      userId: req.user.id,
      name: req.body.name,
    });
    res.json(grocery);
  } catch (err) {
    next(err);
  }
});

//update /api/groceries/:groceryId
router.put("/:groceryId", async (req, res, next) => {
  try {
    await Grocery.update(
      {
        isBought: true,
      },
      {
        where: {
          id: req.params.groceryId,
        },
      }
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/:groceryId", async (req, res, next) => {
  try {
    await Grocery.destroy({
      where: {
        id: req.params.groceryId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
