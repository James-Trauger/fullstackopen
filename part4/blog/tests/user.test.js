const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const User = require('../models/user')

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

