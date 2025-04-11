import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('set notification', () => {
    const state = {
      message: '',
      isError: false,
    }
    const action = {
      type: 'notification/notify',
      payload: {
        message: 'test notification message',
        isError: true,
      },
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual(action.payload)
  })

  describe('after a notification has been set', () => {
    const initialNotification = {
      message: '',
      isError: false,
    }

    beforeEach(() => {
      notificationReducer(initialNotification, {
        type: 'notification/notify',
        payload: {
          message: 'default notification',
          isError: true,
        },
      })
    })

    test('removes notification', () => {
      const initialState = {
        message: '',
        isError: false,
      }
      const action = {
        type: 'notification/removeNotification',
      }

      deepFreeze(initialNotification)
      const newState = notificationReducer(null, action)

      expect(newState).toEqual(initialState)
    })
  })
})
