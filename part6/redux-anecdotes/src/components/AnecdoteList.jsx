import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList= () => {
  const dispatch = useDispatch()
  
  const anecdotes = 
  useSelector(({ filter, anecdotes }) => {
      return [...anecdotes]
      .filter(anec => 
        anec.content
          .toLowerCase()
          .includes(filter)
      )
    })
  .sort((a, b) => b.votes - a.votes)
  .map(anecdote => 
    <Anecdote 
      key={anecdote.id}
      anecdote={anecdote}
      handleVote={() => {
        dispatch(voteAnecdote(anecdote))
        // notify an anecdote has been voted upon
        dispatch(setNotification(`anecdote '${anecdote.content}' has ${anecdote.votes+1} votes`, 5))
      }}
    />)

  return (
    <div>
      {anecdotes}
    </div>
  )
}

export default AnecdoteList