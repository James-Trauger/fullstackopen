import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { uniq, flatMap, map, flatten } from 'lodash'
import { ALL_GENRES, BOOKS_BY_GENRE } from './queries'
import BookList from './BookList'

const Books = () => {
  //const booksResult = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  const booksResult = useQuery(
    BOOKS_BY_GENRE,
    genre === ''
      ? undefined
      : {
          variables: { genre },
        }
  )
  const genresResult = useQuery(ALL_GENRES)

  if (booksResult.loading || genresResult.loading) {
    return <div>fetching books ...</div>
  }

  const allGenres = genresResult.data.allBooks
  const books = booksResult.data.allBooks
  //const filteredBooks = genre === '' ? books : books.filter((b) => b.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>
      filter genre
      <select name="selectGenre" value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value={''}>All</option>
        {map(uniq(flatMap(allGenres, (b) => b.genres)), (g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <h2>books</h2>
      <BookList books={books} />
    </div>
  )
}

export default Books
