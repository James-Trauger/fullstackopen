import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

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
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  
  return (
    <div>
      {state
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => 
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => dispatch(voteAnecdote(anecdote.id))}
          />)}
    </div>
  )
}

export default AnecdoteList