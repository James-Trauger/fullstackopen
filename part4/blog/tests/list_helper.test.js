const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
//const { title } = require('node:process')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('many blogs', () => {
    assert.strictEqual(listHelper.totalLikes(helper.blogs), 36)
  })

  test('single blog', () => {
    assert.strictEqual(listHelper.totalLikes([helper.singleBlog]), helper.singleBlog.likes)
  })
})

describe('favoirte blog', () => {
  test('favorite of many blogs', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(helper.blogs), helper.blogs[2])
  })

  test('favorite of single blogs', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([helper.singleBlog]), helper.singleBlog)
  })

  test('favorite of empty blogs', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), undefined)
  })
})

describe('most blogs', () => {

  test('many blogs', () => {
    const expected = {
      'author': 'Robert C. Martin',
      'blogs': 3
    }

    assert.deepStrictEqual(listHelper.mostBlogs(helper.blogs), expected)
  })

  test('single blog', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([helper.singleBlog]), {
      'author': helper.singleBlog.author,
      'blogs': 1,
    })
  })

  test('empty blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), undefined)
  })
})

describe('most liked blogs', () => {

  test('many blogs', () => {
    const expected = {
      'author': 'Edsger W. Dijkstra',
      'likes': 17
    }

    assert.deepStrictEqual(listHelper.mostLiked(helper.blogs), expected)
  })

  test('single blog', () => {
    assert.deepStrictEqual(listHelper.mostLiked([helper.singleBlog]), {
      'author': helper.singleBlog.author,
      'likes': helper.singleBlog.likes,
    })
  })

  test('empty helper.blogs', () => {
    assert.deepStrictEqual(listHelper.mostLiked([]), undefined)
  })
})
