import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, deleteHandler, likesHandler }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const changeVisibility = () => setShowDetails(!showDetails)

  const handleLikes = async () => {
    const newBlog = await likesHandler()
    setLikes(blog.likes + 1)
  }

  const blogDetails = () => {
    const style = {
      margin: 0,
      textIndent: 20
    }


    return (
      <div
        style={style}
        className='blogDetails'
      >
        <p style={style}>{blog.url}</p>
        <p style={style}>likes {likes} <button className='likeButton' onClick={handleLikes}>like</button></p>
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
    <div
      style={blogStyle}
      className='blog'
    >
      {blog.title} {blog.author}
      <button className='detailsButton' onClick={changeVisibility}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails
        ? blogDetails()
        : <></>
      }
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  likesHandler: PropTypes.func.isRequired,
}

export default Blog