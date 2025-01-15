import Person from './person'
import Input from './input'
import PersonForm from './personForm'

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: '1', name: 'Arto Hellas', number: '123-4567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [shownPersons, setShownNames] = useState(persons)

  const handleInputChange = (setter) => (event) => setter(event.target.value)
  const handleFilter = (event) => {
    const filter = event.target.value
    setNewFilter(filter)

    // filter the shown persons
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    setShownNames(filteredPersons)
  }

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
    // adjust the filter too
    if (newName.toLowerCase().includes(newFilter.toLowerCase())) {
      setShownNames(shownPersons.concat(newNameObject))
    }
  }

  const nameField = {
    value: newName,
    handler: handleInputChange(setNewName),
  }
  const numberField = {
    value: newNumber,
    handler: handleInputChange(setNewNumber),
  }

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
        {shownPersons.map((p) => <Person key={p.id} person={p} />)}
    </div>
  )
}

export default App