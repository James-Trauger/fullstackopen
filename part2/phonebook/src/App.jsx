import Person from './person'
import Input from './input'
import PersonForm from './personForm'
import './services/people'

import { useState, useEffect } from 'react'
import people from './services/people'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    people.getAll().then(p => {
      setPersons(p)
      //changeFilter(newFilter)
    }).catch(error => {
      console.log(`error in getAll of persons: ${error}`)
    }) 
  }, [])

  const handleInputChange = (setter) => (event) => setter(event.target.value)
  const changeFilter = (filter) => setNewFilter(filter)

  const handleFilter = (event) => changeFilter(event.target.value, persons)
  const handleAddNewPerson = (event) => {
    event.preventDefault()

    const exists = persons.reduce(
      (acc, person) => acc || person.name === newName,
      false
    )

    // replace the phone number of the person that exists
    if (exists) {
      const existingPerson = persons.find( person => person.name === newName)
      
      if (existingPerson.number != newNumber) {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
          // create new object with different number field
          const newReplacedPerson = { ...existingPerson, number: newNumber }
          people.replaceNumber(newReplacedPerson).then(replacedPerson => {
            setPersons(persons.map(p => p.id === existingPerson.id ? replacedPerson : p))
          })
      }
      } else {
        alert(`${newName} already exists`)
      }
      return
    }
    const newPersonObject = {
      name: newName,
      number: newNumber
    }
    console.log(`creating new person ${newPersonObject}`)
    // add the new person to the server
    people.create(newPersonObject).then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const nameField = {
    value: newName,
    handler: handleInputChange(setNewName),
  }
  const numberField = {
    value: newNumber,
    handler: handleInputChange(setNewNumber),
  }

  const shownPersons = persons.filter( person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()))
    .map((p) => {
      return (
        <Person key={p.id} person={p} deleteHandler={() => {
          console.log('deleting person', p)
          if (window.confirm(`Delete ${p.name} ?`)) {
            people
            .deletePerson(p.id).then(response => {
              console.log(`deleting ${response}`)
              setPersons(persons.filter(x => x.id != response.id))
            })
            .catch(error => {
              console.log(error)
            })
          }
        }}
        />
      )
    })

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