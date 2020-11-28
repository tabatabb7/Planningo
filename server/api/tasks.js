const router = require('express').Router();
const { Task } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll()
    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

router.get('/:taskId', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.taskId)
    res.json(task)
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    if (req.user) {
      await Task.create({
        taskName: req.body.taskName,
        userId: req.user.id
      })
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.put('/:taskId', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.taskId)
    await Task.update(req.body);
    res.json(task)
  } catch (err) {
    next(err)
  }
})

router.delete('/:taskId', async (req, res, next) => {
  try {
    await Task.destroy({
      where: {
        id: req.params.taskId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router