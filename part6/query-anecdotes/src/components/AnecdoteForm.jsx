import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { notify, useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
    },
    onError: (error) => {
      /*dispatch(setNotification(error.response.data.error))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)*/
      notify(error.response.data.error, 5, notificationDispatch)
    }

  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notify(`new anecdote "${content}"`, 5, notificationDispatch)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
