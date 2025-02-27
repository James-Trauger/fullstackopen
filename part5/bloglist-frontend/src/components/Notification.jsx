import PropTypes from 'prop-types'

const Notification = ({ noti }) => {
  if (noti === null) {
    return null
  }

  const style = {
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }


  return (
    <div style={{ ...style, color: noti.isError ? 'red' : 'green' }}>
      {noti.message}
    </div>
  )
}

Notification.propTypes = {
  noti: PropTypes.exact({
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  }),
}

export default Notification