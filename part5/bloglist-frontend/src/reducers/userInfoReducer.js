import { createSlice, current } from '@reduxjs/toolkit'
import userService from '../services/user'

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: [],
  reducers: {
    setUserInfo(state, action) {
      return action.payload
    },
  },
})

const { setUserInfo } = userInfoSlice.actions
export const initializeUserInfo = () => {
  return async (dispatch) => {
    const users = await userService.getUsers()
    dispatch(setUserInfo(users))
  }
}

export default userInfoSlice.reducer
