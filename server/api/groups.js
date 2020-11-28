const router = require('express').Router();
const {Group, User_Group} = require('../db/models');

//GET all groups associated with a user
router.get('/', async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.send(groups);
  } catch (err) {
    next(err);
  }
});

//GET single group
router.get('/:groupId', async (req, res, next) => {
  try {
    const group = await Group.findOne({
      where: {
        userId: req.user.id,
        id: req.params.groupId
      },
      include: {
        model: User_Group,
      }
    });
    res.send(group);
  } catch (err) {
    next(err);
  }
});

//POST group
router.post('/', async (req, res, next) => {
  try {
    const group = await Group.create(req.body);
    res.json(group);
  } catch (err) {
    next(err);
  }
});

//PUT group
router.put('/:groupId', async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    group.update(req.body);
    res.json(group);
  } catch (err) {
    next(err);
  }
});

//DELETE group
router.delete('/:groupId', async (req, res, next) => {
  try {
    Group.destroy({
      where: {
        id: req.params.groupId,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
