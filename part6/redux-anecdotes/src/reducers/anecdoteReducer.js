import { createSlice, current } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      incrementVote(state, action) {
        const id = action.payload
        return state.map(anec => 
          anec.id === id
          ? { ...anec, votes: anec.votes + 1 }
          : anec 
        )
      },
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdote(state, action) {
        return action.payload
      }
    }
  }
)

export const { 
  incrementVote,
  appendAnecdote, 
  setAnecdote, 
} = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    dispatch(incrementVote(anecdote.id))
    anecdoteService.voteFor(anecdote)
  }
}

export default anecdotesSlice.reducer