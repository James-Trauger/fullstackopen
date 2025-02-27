import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, deleteHandler }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const changeVisibility = () => setShowDetails(!showDetails)

  const handleLikes = async () => {
    const newBlog = await blogService.likeBlog({
      ...blog,
      likes: likes + 1,
    })

    setLikes(newBlog.likes)
  }

  const blogDetails = () => {
    const style = {
      margin: 0,
      textIndent: 20
    }


    return (
      <div style={style}>
        <p style={style}>{blog.url}</p>
        <p style={style}>likes {likes} <button onClick={handleLikes}>like</button></p>
        <p style={style}>added by {blog.user.name}</p>
        <button onClick={deleteHandler}>delete</button>
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={changeVisibility}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails
        ? blogDetails()
        : <></>
      }
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
}

export default Blog