const router = require('express').Router()

const { User, Blog } = require('../models')
const { tokenExtractor, userFinder } = require('../util/middleware')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['author', 'url', 'title', 'likes'],
    },
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', tokenExtractor, async (req, res, next) => {
  const username = req.params.username
  const token = req.decodedToken
  if (token.username !== username) {
    return res.status(401).end()
  }
  const newUsername = req.body.username
  const userExists = await User.findOne({
    where: {
      username: newUsername,
    },
  })
  // username already exists
  if (userExists) {
    return res.status(404).json({ error: 'username already exists' })
  }

  const user = await User.findByPk(token.id)
  const updatedUser = await user.update({ username: newUsername })

  return res.json({ updatedUser })
})

module.exports = router
