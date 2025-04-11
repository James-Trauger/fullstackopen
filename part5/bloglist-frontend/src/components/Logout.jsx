import { logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Logout = ({ userKey }) => {
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    // remove user from local storage
    window.localStorage.removeItem(userKey)
    dispatch(setNotification('successfully logged out', false, 5))
  }

  return (
    <button type="button" onClick={handleLogout}>
      logout
    </button>
  )
}

export default Logout
