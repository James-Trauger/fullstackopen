import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'

const BirthYearForm = ({ authors }) => {
  const [born, setBorn] = useState('')
  const [changeAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      console.log(messages)
    },
  })

  const submit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    changeAuthor({ variables: { name: formData.get('selectAuthor'), setBornTo: parseInt(born) } })
    setBorn('')
  }

  return (
    <div>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <label>
          <select name="selectAuthor">
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          born <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default BirthYearForm
