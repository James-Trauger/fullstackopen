const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.blogs
    .map(blog => new Blog(blog))
  await Blog.insertMany(blogObjects)
})

after(async () => {
  await mongoose.connection.close()
})

////////// Tests //////////

test('blogs are actually added in the initialization phase', async () => {
  // retrieve all blogs in the db
  const blogsFromDb = await helper.blogsInDb()

  assert.strictEqual(blogsFromDb.length, helper.blogs.length)
})

test('insert a single blog', async () => {

  await api.post('/api/blogs')
    .send(helper.singleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsFromDb = await helper.blogsInDb()

  assert.strictEqual(blogsFromDb.length, helper.blogs.length + 1)

  const urls = blogsFromDb.map(b => b.url)
  assert(urls.includes(helper.singleBlog.url))
})

test('blogs have an \'id\' field', async () => {
  // retrieve a blog
  const blogsFromDb = await helper.blogsInDb()
  assert(blogsFromDb[0].id)
})

test('default value of likes is 0', async () => {
  const blog =
  {
    title: 'Title',
    author: 'James',
    url: 'localhost.com',
  }

  const response = await api.post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('title field is required', async () => {
  const blog =
  {
    author: 'James',
    url: 'localhost.com',
  }

  await api.post('/api/blogs')
    .send(blog)
    .expect(400)

  const blogsFromDb = await helper.blogsInDb()
  assert.strictEqual(blogsFromDb.length, helper.blogs.length)
})

test('url field is required', async () => {
  const blog =
  {
    title: 'Blog',
    author: 'James',
    likes: 3
  }

  await api.post('/api/blogs')
    .send(blog)
    .expect(400)

  const blogsFromDb = await helper.blogsInDb()
  assert.strictEqual(blogsFromDb.length, helper.blogs.length)
})