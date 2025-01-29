const ld = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (total, blog) => total + blog.likes,
    0
  )
}

// returns undefined if the blogs array is empty
const favoriteBlog = (blogs) => {
  return blogs === undefined
    ? undefined
    : blogs.reduce(
      (favorite, blog) => blog.likes > favorite.likes ? blog : favorite,
      blogs[0]
    )
}

const mostBlogs = (blogs) => {
  return ld.chain(blogs)
    .groupBy('author')
    .map((authorsBlogs, author) => {return {
      'author': author,
      'blogs': authorsBlogs.length
    }})
    .reduce((mostAuth, currAuth) => currAuth.blogs > mostAuth.blogs ? currAuth : mostAuth
    )
    .value()

}

const mostLiked = (blogs) => {
  return ld.chain(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => { return {
      'author': author,
      'likes': totalLikes(authorBlogs)
    }})
    .reduce((mostAuth, currAuth) => currAuth.likes > mostAuth.likes ? currAuth : mostAuth)
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLiked
}