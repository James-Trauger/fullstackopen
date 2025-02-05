const blogRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (exception) {
    console.log(exception)
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.userId) {
    return response.status(400).json({ error: 'must provide userId to create blog post' })
  }

  try {
    const user = await User.findById(body.userId)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    console.log(`exception -> ${JSON.stringify(exception)}`)
    /*
    if (exception instanceof mongoose.Error.ValidationError) {
      response.status(400).end()
    } else {
      response.status(404).end()
    }*/
    next(exception)
  }
})

module.exports = blogRouter