const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')
const { tokenExtractor, userFinder } = require('../util/middleware')

router.post('/', tokenExtractor, userFinder, async (req, res, next) => {
  const userId = req.body.userId
  const blogId = req.body.blogId

  if (!blogId || !userId) {
    return res.status(400)
  }

  const user = await User.findByPk(userId)
  if (!user) {
    return res.status(400).json({ error: 'user does not exist' })
  }
  try {
    // a user can only add to their own reading list
    if (userId !== req.user.id) {
      return res.status(401)
    }

    const blog = await Blog.findByPk(blogId)
    if (!blog) {
      return res.status(400).json({ error: 'blog does not exist' })
    }
    await ReadingList.create({
      userId,
      blogId,
    })

    return res.status(201).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  const id = req.params.id

  const read = req.body.read

  if (read === null || (String(read) !== 'true' && String(read) !== 'false')) {
    return res.status(400).end()
  }

  const reading = await ReadingList.findByPk(id)
  if (!req.decodedToken || reading.userId != req.decodedToken.id) {
    return res.sendStatus(401)
  }

  await reading.update({ read })

  return res.status(204).end()
})

module.exports = router
