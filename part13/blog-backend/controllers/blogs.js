const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const { blogFinder, tokenExtractor, userFinder } = require('../util/middleware')

router.get('/', async (req, res, next) => {
  const where = {}
  if (req.query.search) {
    const search = req.query.search.toLowerCase()
    where[Op.or] = {
      title: { [Op.iLike]: `%${search}%` },
      author: { [Op.iLike]: `%${search}%` },
    }
  }

  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name'],
      },
      where,
      order: [['likes', 'DESC']],
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', tokenExtractor, userFinder, async (req, res, next) => {
  try {
    const user = req.user
    console.log(JSON.stringify(user))
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
  const blog = req.blog
  if (!blog) {
    return res.sendStatus(404)
  }
  const token = req.decodedToken
  if (!token || blog.userId != token.id) {
    return res.sendStatus(401)
  }

  try {
    await blog.destroy()
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = router
