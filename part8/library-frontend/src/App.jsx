import { Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <div>
      <div>
        <Link style={{ marginRight: 20 }} to="/">
          authors
        </Link>
        <Link style={{ marginRight: 20 }} to="/books">
          books
        </Link>
        <Link style={{ marginRight: 20 }} to="/add">
          add book
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
