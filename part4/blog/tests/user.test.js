const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const User = require('../models/user')

const bcrypt = require('bcrypt')

beforeEach(async () => {
  await helper.deleteAllUsers()
})

after(async () => {
  await mongoose.connection.close()
})

test('inserting a single user', async () => {
  // add user in db
  const response = await api.post('/api/users')
    .send(helper.singleUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.username, helper.singleUser.username)
  assert.strictEqual(response.body.name, helper.singleUser.name)
  // password should not be returned
  assert(!response.body.password)

  // ensure the user was added to the db
  const userInDb = await User.findById(response.body.id)
  assert.strictEqual(userInDb._id.toString(), response.body.id)
  assert.strictEqual(userInDb.username, helper.singleUser.username)
  assert.strictEqual(userInDb.name, helper.singleUser.name)
  const correctPass = bcrypt.compare(helper.singleUser.password, userInDb.passwordHash)
  assert(correctPass)
})

test('getting all users', async () => {
  // insert 2 users
  const users = [
    {
      username: 'test1',
      name: 'name 1',
      password: 123,
    },
    {
      username: 'test2',
      name: 'name 2',
      password: 321,
    }
  ]

  const userObjects = users.map(user => new User(user))
  const promises = userObjects.map(user => user.save())
  await Promise.all(promises)

  // retrieve all users
  const response = await api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, users.length)

})

test('username with less than 3 characters fails', async () => {
  const failedUser = {
    username: 'ja',
    name: 'name',
    password: '12345'
  }

  await api.post('/api/users')
    .send(failedUser)
    .expect(400)
  // check db ensuring the user wasn't added
  const users = await helper.usersInDb()
  assert.strictEqual(users.length, 0)
})

test('password is less than 3 characters long', async () => {
  const failedUser = {
    username: 'james',
    name: 'name',
    password: '12'
  }

  await api.post('/api/users')
    .send(failedUser)
    .expect(400)

  const users = await helper.usersInDb()
  assert.strictEqual(users.length, 0)
})

test('blog is added to user document', async () => {
  // insert user
  const userResponse = await api.post('/api/users')
    .send(helper.singleUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const user = userResponse.body
  // add userId to blog post
  helper.singleBlog.userId = user.id

  // insert blog
  const blogResponse = await api.post('/api/blogs')
    .send(helper.singleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // get all users with blogs included
  const allUsersResponse = await api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const allUsers = allUsersResponse.body
  // should only be 1 user
  const foundUser = allUsers[0]

  assert(foundUser.blogs)
  assert.strictEqual(foundUser.blogs.length, 1)
  // should only be 1 user
  const blog = foundUser.blogs[0]
  assert.strictEqual(blog.id, blogResponse.body.id)
})