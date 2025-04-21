const mongoose = require('mongoose')

/* 
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
*/

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
    minLength: 3,
  },
})

module.exports = mongoose.model('User', schema)
