import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const userKey = 'loggedBlogUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((x, y) => y.likes - x.likes)
      setBlogs( sortedBlogs )
    })
  }, [])

  // automatically log the user in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(userKey)
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(storedUser.token)
      setUser(storedUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      setUsername('')
      setPassword('')
      setUser(user)
      blogService.setToken(user.token)
      // save the user in the browser
      window.localStorage.setItem(
        userKey, JSON.stringify(user)
      )

      setNotification({
        message: 'successfully logged in',
        isError: false
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      //console.log(JSON.stringify(exception))
      setNotification({
        message: exception.response.data.error,
        isError: true,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    // remove user from local storage
    window.localStorage.removeItem(userKey)
    setNotification({
      message: 'successfully logged out',
      isError: false
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleAddBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author}`,
        isError: false
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      //console.log(`error body ${JSON.stringify(exception.response.data.error)}`)
      setNotification({
        message: exception.response.data.error,
        isError: true,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleDelete = (blog) => async () => {
    if (!window.confirm(`remove blog ${blog.title}`)) {
      return
    }
    try {
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (exception) {
      setNotification({
        message: exception.response.data.error,
        isError: true,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const displayBlogs = () => {
    return (
      blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          deleteHandler={handleDelete(blog)}
          likesHandler={async () => { return blogService.likeBlog({
            ...blog,
            likes: blog.likes + 1
          })}}
        />
      )
    )
  }

  const blogFormRef = useRef()

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel="create" ref={blogFormRef}>
        <BlogForm createBlog={handleAddBlog}/>
      </Togglable>
    )
  }

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        changeUsername={setUsername}
        changePassword={setPassword}
        handleLogin={handleLogin}
      />
    )
  }

  const logoutForm = () => {
    return (
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
    )
  }

  return (
    <div>
      <Notification noti={notification}/>

      {user === null
        ? <>
          <h2>Login</h2>
          { loginForm() }
        </>
        :
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          {logoutForm()}
          {addBlogForm()}
          {displayBlogs()}
        </>
      }
    </div>
  )
}

export default App