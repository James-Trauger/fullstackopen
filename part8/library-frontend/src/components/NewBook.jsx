import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { updateCache } from '../App'
import { ALL_AUTHORS, ALL_GENRES, BOOKS_BY_GENRE, CREATE_BOOK } from './queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(CREATE_BOOK, {
    //refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_GENRES }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      console.log(messages)
    },
    update: (cache, response) => {
      updateCache(cache, { query: BOOKS_BY_GENRE }, response.data.addBook)
    },
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published: parseInt(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
