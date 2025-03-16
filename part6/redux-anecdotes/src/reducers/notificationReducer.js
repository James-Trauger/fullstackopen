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
export const { notify, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer