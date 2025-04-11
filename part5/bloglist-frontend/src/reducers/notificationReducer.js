import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  isError: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      //console.log(current(state))
      const noti = action.payload
      return noti
    },
    removeNotification(state, action) {
      return { message: '', isError: false }
    },
  },
})

const { notify, removeNotification } = notificationSlice.actions

export const setNotification = (message, isError = false, seconds = 0) => {
  return async (dispatch) => {
    dispatch(notify({ message, isError }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
