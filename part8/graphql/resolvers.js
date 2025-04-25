const { GraphQLError, subscribe } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const authorObject = await Author.findOne({ name: args.author })
        if (!authorObject) {
          return null
        }
        filter.author = authorObject._id
      }
      if (args.genre) {
        filter.genres = args.genre
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => Book.collection.countDocuments({ author: root._id }),
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Unauthorized: please login first', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        })
      }
      const authorName = args.author
      let author = await Author.findOne({ name: authorName })
      if (!author) {
        try {
          author = new Author({ name: authorName })
          await author.validate()
        } catch (error) {
          throw new GraphQLError('invalid author name', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: authorName,
              error,
            },
          })
        }
      }
      try {
        const book = new Book({ ...args, author: author._id })
        await author.save()
        const addedBook = await (await book.save()).populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        await author.updateOne({ $push: { booksWritten: book._id } })
        return addedBook
      } catch (error) {
        const invalidPath = Object.keys(error.errors)[0]
        if (error.name === 'ValidationError') {
          throw new GraphQLError('invalid book arguments', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: invalidPath,
              error,
            },
          })
        }
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Unauthorized: please login first', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        })
      }
      return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        return await user.save()
      } catch (error) {
        const invalidPath = Object.keys(error.errors)[0]
        if (error.name === 'ValidationError') {
          throw new GraphQLError('invalid book arguments', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: invalidPath,
              error,
            },
          })
        }
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
