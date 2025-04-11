import { useState, useRef } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import TextField from './TextField'
import Togglable from './Togglable'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogHandler = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const blog = {
        title,
        author,
        url,
      }
      await dispatch(addBlog(blog))
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author}`, false, 5))
    } catch (exception) {
      console.log(`error body ${JSON.stringify(exception)}`)
      dispatch(setNotification(JSON.stringify(exception), true, 5))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel="create" ref={blogFormRef}>
      <form onSubmit={blogHandler}>
        <TextField testid={'title'} label="title" type="text" value={title} name="Title" handler={setTitle} />
        <TextField testid={'author'} label="author" type="text" value={author} name="Author" handler={setAuthor} />
        <TextField testid={'url'} label="url" type="text" value={url} name="Url" handler={setUrl} />
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
