import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  if (!notification.message) {
    return null
  }

  const style = {
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div style={{ ...style, color: notification.isError ? 'red' : '#279c27' }}>{notification.message}</div>
  //return <div style={style}>{notification.message}</div>
}

export default Notification
