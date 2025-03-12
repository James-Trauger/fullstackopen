import reducer, { asObject, createAnecdote, voteAnecdote } from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {

  test('increments an anecdote\'s vote by 1', () => {
    
    const state = [
      'a deep anecdote'
    ].map(asObject)

    deepFreeze(state)

    const newState = reducer(state, voteAnecdote(state[0].id))

    expect(newState[0].votes).toEqual(1)
  })

  test('adds a new anecdote', () => {
    const anecdote = 'to be or not to be'
    
    const state = []
    deepFreeze(state)
    const newState = reducer(state, createAnecdote(anecdote))

    expect(newState).toHaveLength(1)
    expect(newState[0].content).toEqual(anecdote)
    expect(newState[0].votes).toEqual(0)
  })
})