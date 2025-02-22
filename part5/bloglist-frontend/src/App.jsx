import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import TextField from './components/TextField'
import blogService from './services/blogs'
import loginService from './services/login'

const userKey = 'loggedBlogUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [notification, setNotification] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const changeTextField = (setter) => ({target}) => setter(target.value)

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

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try { 
      const newBlog = await blogService.create(title, author, url)
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

  const displayBlogs = () => {
    return (
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    )
  }

  const addBlogForm = () => {
    return (
      <form onSubmit={handleAddBlog}>
        <TextField 
          label="title"
          type="text"
          value={title}
          name="Title"
          handler={changeTextField(setTitle)}
        />
        <TextField 
          label="author"
          type="text"
          value={author}
          name="Author"
          handler={changeTextField(setAuthor)}
        />
        <TextField 
          label="url"
          type="text"
          value={url}
          name="Url"
          handler={changeTextField(setUrl)}
        />
        <button type="submit">create</button>
      </form>
    )
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <TextField 
            label="username"
            type="text"
            value={username}
            name="Username"
            handler={changeTextField(setUsername)}
        />
        <TextField 
          label="password"
          type="password"
          value={password}
          name="Password"
          handler={changeTextField(setPassword)}
        />
        <button type="submit">login</button>
        </form>
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