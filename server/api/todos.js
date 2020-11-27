const router = require('express').Router();
const {Todo} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const todos =  await Todo.findAll()
    res.json(todos)
  } catch (err) {
    next(err) 
  }
})

router.get('/:todoId', async (req, res, next) => {
  try {
    const todo =  await Todo.findByPK(req.params.todoId)
    res.json(todo)
  } catch (err) {
    next(err) 
  }
})

router.post('/', async (req, res, next) => {
  try {
    const todo =  await Todo.create(req.body)
    res.status(201).send(todo)
  } catch (err) {
    next(err) 
  }
})

router.put('/:todoId', async (req, res, next) => {
  try {
    const todo =  await Todo.findByPk(req.params.todoId)
    await Todo.update(req.body);
    res.json(todo)
  } catch (err) {
    next(err) 
  }
})

router.delete('/:todoId', async (req, res, next) => {
  try {
    await Todo.destroy({
      where: {
        id: req.params.todoId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router