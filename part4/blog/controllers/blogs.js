const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

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

  const token = request.token
  if (!token) {
    return response.status(401).json({ error: 'token not provided' })
  }
  try {

    if (!body.userId) {
      return response.status(400).json({ error: 'must provide userId to create blog post' })
    }
    const user = await User.findById(request.decodedToken.id)
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
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  // must have valid token
  if (!(request.token && request.decodedToken)) {
    return response.status(401).json({ error: 'invalid token' })
  }

  try {
    // fetch the user
    const user = await User
      .findById(request.decodedToken.id)
      .populate('blogs', { name: 1 })

    const blogId = user
      .blogs.map(blog => blog.id.toString())
      .find(b => b === request.params.id)
    // find blog in user's created blogs
    // username associated with token must match with username who created the blog
    if (!blogId) {
      logger.error('cannot delete a blog post you did not create')
      return response.status(401).json({ error: 'cannot delete a blog post you did not create' })
    }

    // delete the blog
    await Blog.findByIdAndDelete(blogId)
    // remove blogs from user collection
    user.blogs = user.blogs.filter(blog => blog.id !== blogId)
    await user.save()

    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter