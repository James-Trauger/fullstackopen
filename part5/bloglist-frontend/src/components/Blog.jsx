import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import Comment from './Comment'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(({ notification, blogs }) => blogs.find((blog) => blog.id === id))
  //const [likes, setLikes] = useState(0)
  const dispatch = useDispatch()
  const userLoggedIn = useSelector(({ notification, blogs, user }) => user.username)

  if (!blog) {
    return null
  }

  const handleLikes = async () => {
    try {
      dispatch(likeBlog(blog))
      //setLikes(blog.likes + 1)
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, true, 5))
    }
  }

  const handleDelete = async () => {
    try {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`blog ${blog.title} by ${blog.author} was deleted`, false, 5))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, true, 5))
    }
  }

  const blogDetails = () => {
    const style = {
      margin: 0,
      textIndent: 20,
    }

    return (
      <div style={style} className="blogDetails">
        <p style={style}>{blog.url}</p>
        <p style={style}>
          likes {blog.likes}{' '}
          <button className="likeButton" onClick={handleLikes}>
            like
          </button>
        </p>
        <p style={style}>added by {blog.user.name}</p>
        {blog.user.username === userLoggedIn ? <button onClick={handleDelete}>delete</button> : <></>}
        <Comment blog={blog} />
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      {blogDetails()}
    </div>
  )
}

export default Blog
