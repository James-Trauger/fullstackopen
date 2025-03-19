import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload 
    case 'REMOVE_NOTIFICATION':
      return ''
    default: return state
  }
}

const setNotification = message => {
  return {
    type: 'SET_NOTIFICATION',
    payload: message
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notifcationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={ [notification, notifcationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationMessage = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const notify = (message, seconds, dispatch) => {
  // display notification
  dispatch(setNotification(message))
  // remove after 5 seconds
  setTimeout(() => {
    dispatch(removeNotification())
  }, seconds*1000)
}

export default NotificationContext