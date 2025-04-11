import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Logout from './components/Logout'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import { Routes, Route, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeUserInfo } from './reducers/userInfoReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Blog from './components/Blog'
import Navbar from './components/Navbar'

const userKey = 'loggedBlogUser'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ notification, blogs, user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

  useEffect(() => {
    if (user) {
      // save the user in the browser
      window.localStorage.setItem(userKey, JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    dispatch(initializeUserInfo())
    dispatch(initializeBlogs())
  }, [])

  const blogPage = () => (
    <>
      <BlogForm />
      <BlogList />
    </>
  )

  const style = {
    container: {
      maxWidth: 'fit-content',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
    },
  }

  return (
    <div style={style.container}>
      <Notification />

      {user === null ? (
        <>
          <h2>Login</h2>
          <LoginForm userKey={userKey} />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <div></div>
          <Navbar user={user} userKey={userKey} />
          <Routes>
            <Route path="/" element={blogPage()} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserInfo />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
