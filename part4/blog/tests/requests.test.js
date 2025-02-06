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
  await helper.deleteAllUsers()

  // add a user to create every blog
  const userResponse = await helper.insertSingleUser()

  // add userId to insert blog request
  helper.singleBlog.userId = userResponse._id.toString()

  const blogObjects = helper.blogs
    .map(blog => {
      blog.user = helper.singleUser._id
      return new Blog(blog)
    })
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
    .set('Authorization', `Bearer ${helper.getToken(helper.singleUser)}`)
    .send(helper.singleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsFromDb = await helper.blogsInDb()

  assert.strictEqual(blogsFromDb.length, helper.blogs.length + 1)

  const urls = blogsFromDb.map(b => b.url)
  assert(urls.includes(helper.singleBlog.url))
})
/*
test('blogs have an \'id\' field', async () => {
  // retrieve a blog
  const blogsFromDb = await helper.blogsInDb()
  assert(blogsFromDb[0].id)
})*/

test('default value of likes is 0', async () => {

  delete helper.singleBlog.likes
  const response = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${helper.getToken(helper.singleUser)}`)
    .send(helper.singleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('title field is required', async () => {
  const blog =
  {
    author: 'James',
    url: 'localhost.com',
    likes: 2,
    userId: helper.singleUser._id
  }

  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${helper.getToken(helper.singleUser)}`)
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
    likes: 3,
    userId: helper.singleUser._id
  }

  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${helper.getToken(helper.singleUser)}`)
    .send(blog)
    .expect(400)

  const blogsFromDb = await helper.blogsInDb()
  assert.strictEqual(blogsFromDb.length, helper.blogs.length)
})

test('blogs have a user field', async () => {
  // get all blogs
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const user = {
    username: helper.singleUser.username,
    name: helper.singleUser.name,
    id: helper.singleUser._id,
  }
  const userString = JSON.stringify(user)
  assert(response.body.reduce(
    (acc, blog) => acc && JSON.stringify(blog.user) === userString,
    true
  ))
})

test('blogs without token are blocked', async () => {

  await api.post('/api/blogs')
    .send(helper.singleBlog)
    .expect(401)
})

test('unsigned tokens are blocked', async () => {
  // use example token from jwt.io
  await api.post('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
    .send(helper.singleBlog)
    .expect(401)
})

test('delete a blog post', async () => {

  // insert a blog
  const blogResponse = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${helper.getToken(helper.singleUser)}`)
    .send(helper.singleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blog = blogResponse.body
  await api.delete(`/api/blogs/${blog.id}`)
    .set('Authorization', `Bearer ${helper.getToken(helper.singleUser)}`)
    .expect(204)

  const blogsFromDb = await helper.blogsInDb()
  const exists = blogsFromDb.reduce(
    (acc, blog) => acc || blog._id === blog.id,
    false
  )
  assert(!exists)
})