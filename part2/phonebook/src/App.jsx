import Person from './person'
import Input from './input'
import PersonForm from './personForm'
import axios from 'axios'

import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios 
    .get('http://localhost:3001/persons')
    .then((response) => {
      setPersons(response.data)
      changeFilter(newFilter, response.data)
    })
  }, [])

  const handleInputChange = (setter) => (event) => setter(event.target.value)
  const changeFilter = (filter, people) => setNewFilter(filter)

  const handleFilter = (event) => changeFilter(event.target.value, persons)
  const handleAddNewPerson = (event) => {
    event.preventDefault()

    const exists = persons.reduce(
      (acc, person) => acc || person.name === newName,
      false
    )

    if (exists) {
      alert(`"${newName}" is already added to the phonebook`)
      return
    }
    const newNameObject = {
      id: String(persons.length+1),
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newNameObject))
    setNewName('')
    setNewNumber('')
  }

  const nameField = {
    value: newName,
    handler: handleInputChange(setNewName),
  }
  const numberField = {
    value: newNumber,
    handler: handleInputChange(setNewNumber),
  }

  const shownPersons = persons.filter((person) => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()))
    .map((p) => <Person key={p.id} person={p} />)

  return (
    <div>
      <h2>Phonebook</h2>
      <Input label='filter' value={newFilter} onChange={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={handleAddNewPerson}
        nameInput={nameField}
        numberInput={numberField}
      />
      <h2>Numbers</h2>
        {shownPersons}
    </div>
  )
}

export default App