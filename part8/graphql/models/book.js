const mongoose = require('mongoose')

/*
  GraphQL scheme: 
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
*/

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  published: {
    type: Number,
    required: true,
    min: 0,
    // current year
    max: new Date().getFullYear(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [
    {
      type: String,
      required: true,
      minLength: 3,
    },
  ],
})

module.exports = mongoose.model('Book', schema)
