const mongoose = require('mongoose')

/*
  GraphQL scheme

   type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
*/

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  born: {
    type: Number,
    min: 0,
    // current year
    max: new Date().getFullYear(),
  },
})

module.exports = mongoose.model('Author', schema)
