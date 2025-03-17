import reducer, { incrementVote, setAnecdote, appendAnecdote } from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {

  test('increments an anecdote\'s vote by 1', () => {
    
    const state = [
      {
        content: 'a deep anecdote',
        votes: 0,
        id: 0
      }
    ]

    deepFreeze(state)

    const newState = reducer(state, incrementVote(state[0].id))

    expect(newState[0].votes).toEqual(1)
  })

  test('adds a new anecdote', () => {
    const anecdote = {
      content: 'to be or not to be',
      votes: 0,
      id: 0,
    }
    
    const state = []
    deepFreeze(state)
    const newState = reducer(state, appendAnecdote(anecdote))

    expect(newState).toHaveLength(1)
    expect(newState[0].content).toEqual(anecdote.content)
    expect(newState[0].votes).toEqual(0)
  })

  test('sets the state to an empty list', () => {
    const state = []
    const one = reducer(state, appendAnecdote('first anecdote'))
    const two = reducer(one, appendAnecdote('first anecdote'))

    deepFreeze(two)
    const newState = reducer(two, setAnecdote([]))

    expect(newState).toHaveLength(0)
    expect(newState).toEqual([])
  })

  test('appendAnecdote', () => {
    const anecdote = 'a cool anecdote'
    
    const state = []
    deepFreeze(state)
    const newState = reducer(state, appendAnecdote(anecdote))

    expect(newState).toHaveLength(1)
    expect(newState[0]).toEqual(anecdote)
  })
})