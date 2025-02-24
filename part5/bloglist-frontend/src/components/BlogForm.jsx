import { useState } from "react";
import TextField from "./TextField";

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

const addBlog = (event) => {
  event.preventDefault()
  createBlog({
    title,
    author,
    url
  })
  setTitle('')
  setAuthor('')
  setUrl('')
}

  return (
    <form onSubmit={addBlog}>
        <TextField 
          label="title"
          type="text"
          value={title}
          name="Title"
          handler={setTitle}
        />
        <TextField 
          label="author"
          type="text"
          value={author}
          name="Author"
          handler={setAuthor}
        />
        <TextField 
          label="url"
          type="text"
          value={url}
          name="Url"
          handler={setUrl}
        />
        <button type="submit">create</button>
      </form>
  )
}

export default BlogForm