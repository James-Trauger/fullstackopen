import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from "./requests"

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { notify, useNotificationDispatch } from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(anec => anec.id === anecdote.id ? anecdote : anec)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }
  })

  const notificationDispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    const message = `anecdote ${anecdote.content} has ${anecdote.votes+1} votes`
    notify(message, 5, notificationDispatch)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  if (result.isLoading) {
    return <div>fetching anecdotes...</div>
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
