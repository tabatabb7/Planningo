const router = require("express").Router();
const { Item } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get("/:itemId", async (req, res, next) => {
  try {
    const Item = await Item.findOne({
      where: {
        userId: req.user.id,
      },
    });
    res.json(Item);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const Item = await Item.create({
      userId: req.user.id,
      name: req.body.name,
    });
    res.json(Item);
  } catch (err) {
    next(err);
  }
});

//update /api/items/:itemId
router.put("/:itemId", async (req, res, next) => {
  try {
    await Item.update(
      {
        isBought: true,
      },
      {
        where: {
          id: req.params.itemId,
        },
      }
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/:itemId", async (req, res, next) => {
  try {
    await Item.destroy({
      where: {
        id: req.params.itemId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
