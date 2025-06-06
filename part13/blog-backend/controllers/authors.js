const router = require('express').Router()
const { Sequelize } = require('sequelize')
const { Blog } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      group: 'author',
      attributes: [
        'author',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'articles'],
        [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes'],
      ],
      order: [['likes', 'DESC']],
    })
    res.json(authors)
  } catch (error) {
    next(error)
  }
})

module.exports = router
