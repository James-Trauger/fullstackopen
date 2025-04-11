import { createSlice, current } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

const { setUser, removeUser } = blogSlice.actions

export const initializeUser = (user) => {
  return (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password)
    initializeUser(user)(dispatch)
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(removeUser())
  }
}

export default blogSlice.reducer
