import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({ userKey }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(({ notification, blogs, user }) => user)

  // automatically log the user in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(userKey)
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(storedUser))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login(username, password))
      setUsername('')
      setPassword('')
      dispatch(setNotification('successfully logged in', false, 5))
    } catch (exception) {
      console.log(JSON.stringify(exception.response.data.error))
      dispatch(setNotification(exception.response.data.error, true, 5))
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            value={password}
            name="Password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
