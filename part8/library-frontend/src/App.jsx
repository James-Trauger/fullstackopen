import { Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS, BOOKS_BY_GENRE } from './components/queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (b) => {
    let seen = new Set()
    return b.filter((book) => {
      let title = book.title
      return seen.has(title) ? false : seen.add(title)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if (!token) {
      const token = localStorage.getItem('library-user-token')
      setToken(token)
    }
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert(`new book added ${JSON.stringify(addedBook)}`)
      updateCache(client.cache, { query: BOOKS_BY_GENRE }, addedBook)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <Link style={{ marginRight: 20 }} to="/">
          home
        </Link>
        <Link style={{ marginRight: 20 }} to="/authors">
          authors
        </Link>
        <Link style={{ marginRight: 20 }} to="/books">
          books
        </Link>
        <Link style={{ marginRight: 20 }} to="/add">
          add book
        </Link>
        {!token ? (
          <Link style={{ marginRight: 20 }} to="/login">
            login
          </Link>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/login" element={!token ? <LoginForm setToken={setToken} /> : <Navigate replace to="/" />} />
        <Route path="/" element={<Recommend />} />
      </Routes>
    </div>
  )
}

export default App
