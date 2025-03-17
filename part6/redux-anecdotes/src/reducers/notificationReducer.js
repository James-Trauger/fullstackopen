import { createSlice, current } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      //console.log(current(state))
      const message = action.payload
      return message
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

const { notify, removeNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds*1000)
  }
}

export default notificationSlice.reducer