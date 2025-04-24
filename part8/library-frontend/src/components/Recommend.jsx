import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from './queries'
import { Link } from 'react-router-dom'
import BookList from './BookList'

const Recommend = () => {
  const bookResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)

  if (bookResult.loading) {
    return <div>loading</div>
  }

  if (userResult.loading || !userResult.data.me) {
    return (
      <div>
        <p>please login first</p>
        <Link to="/login" />
      </div>
    )
  }
  const user = userResult.data.me
  const books = bookResult.data.allBooks.filter((b) => b.genres.includes(user.favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>showing books in your favorite genre {user.favoriteGenre}</p>
      <BookList books={books} />
    </div>
  )
}

export default Recommend
