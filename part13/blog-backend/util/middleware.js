const { Blog, User } = require('../models')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

// find blog middleware
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.errors[0].message })
  }
  console.log(error)
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      next(error)
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.decodedToken.id)
  next()
}

module.exports = {
  blogFinder,
  errorHandler,
  tokenExtractor,
  userFinder,
}
