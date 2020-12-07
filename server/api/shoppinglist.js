const router = require("express").Router();
const { Shopping } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const shopping = await Shopping.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.json(shopping);
  } catch (err) {
    next(err);
  }
});

router.get("/:shoppingId", async (req, res, next) => {
  try {
    const shopping = await Shopping.findOne({
      where: {
        userId: req.user.id,
      },
    });
    res.json(shopping);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const shopping = await Shopping.create({
      userId: req.user.id,
      name: req.body.name,
    });
    res.json(shopping);
  } catch (err) {
    next(err);
  }
});

//update /api/shoppinglist/:ShoppingId
router.put("/:shoppingId", async (req, res, next) => {
  try {
    await Shopping.update(
      {
        isBought: true,
      },
      {
        where: {
          id: req.params.shoppingId,
        },
      }
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/:shoppingId", async (req, res, next) => {
  try {
    await Shopping.destroy({
      where: {
        id: req.params.shoppingId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
