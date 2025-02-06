const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const api = supertest(app)

const User = require('../models/user')

const user = {
  username: 'test',
  name: 'name',
  password: 'secret'
}

beforeEach(async () => {
  // remove all users
  await helper.deleteAllUsers()
  // hash the user's password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(user.password, saltRounds)

  // add the user to the db
  const userObject = new User({
    username: user.username,
    name: user.name,
    passwordHash: passwordHash
  })

  await userObject.save()
})

after(async () => {
  mongoose.connection.close()
})


test('correct login receives token', async () => {
  const login = {
    username: user.username,
    password: user.password
  }

  const response = await api.post('/api/login')
    .send(login)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = response.body

  assert.strictEqual(token.username, user.username)
  assert.strictEqual(token.name, user.name)

  const verified = await jwt.verify(token.token, process.env.SECRET)
  assert(verified)
})