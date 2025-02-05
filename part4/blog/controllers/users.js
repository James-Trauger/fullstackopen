const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// validates a password meets the minimum requirements
const validPassword = (pass) => {
  return pass.length >= 3
}

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (!(username && password)) {
    return response.status(400).json({ error: 'must provide username and password' })
  }

  if (!validPassword(password)) {
    return response.status(400).json({ error: 'password must be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, name: 1, likes: 1 })
  response.json(users)
})

module.exports = usersRouter