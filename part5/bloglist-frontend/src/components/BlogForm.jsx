import { useState } from 'react'
import TextField from './TextField'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <TextField testid={'title'} label="title" type="text" value={title} name="Title" handler={setTitle} />
      <TextField testid={'author'} label="author" type="text" value={author} name="Author" handler={setAuthor} />
      <TextField testid={'url'} label="url" type="text" value={url} name="Url" handler={setUrl} />
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
