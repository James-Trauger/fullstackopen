import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { commentBlog } from '../reducers/blogReducer'

const Comment = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const submitComment = (event) => {
    event.preventDefault()

    try {
      dispatch(commentBlog(blog.id, comment))
      setComment('')
      dispatch(setNotification(`comment ${comment} was added to ${blog.title}`, false, 5))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, true, 5))
    }
  }

  const changeCommentField = ({ target }) => setComment(target.value)

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={submitComment}>
        <input data-testid={'comment'} type={'text'} name={'comment'} value={comment} onChange={changeCommentField} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={blog.id + index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comment
