import userReducer from './userReducer'
import deepFreeze from 'deep-freeze'

describe('userReducer', () => {
  test('set the user', () => {
    const user = 'username'
    const action = {
      type: 'users/setUser',
      payload: user,
    }
    const newState = userReducer(null, action)

    expect(newState).toEqual(user)
  })

  test('remove the user aka log them out', () => {
    const user = 'username'
    const action = {
      type: 'users/setUser',
      payload: user,
    }
    const newState = userReducer(null, action)

    expect(newState).toEqual(user)

    deepFreeze(newState)
    const removedState = userReducer(newState, {
      type: 'users/removeUser',
    })

    expect(removedState).toEqual(null)
  })
})
