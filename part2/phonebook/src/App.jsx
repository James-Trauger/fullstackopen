import Person from './components/Person'
import Input from './components/Input'
import PersonForm from './components/PersonForm'
import './services/people'
import Notification from './components/Notification'

import { useState, useEffect } from 'react'
import people from './services/people'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

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

          // notification of a number change
          setNotification({
            message: `${existingPerson.name}'s number was successfully changed to ${newNumber}`,
            isError: false
            
        })
          // remove message after 5 seconds
          setTimeout(() => {
            setNotification(null)
          }, 5000)
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
      // notification of a person added
      setNotification({
        message: `${newName} was successfully added`,
        isError: false
      })
      // remove message after 5 seconds
      setTimeout(() => {
        setNotification(null)
      },5000)
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
    .map((person) => {
      return (
        <Person key={person.id} person={person} deleteHandler={() => {
          if (window.confirm(`Delete ${person.name} ?`)) {
            people
            .deletePerson(person.id).then(response => {
              console.log(`deleting after confirming ${response.id}`)
              setPersons(persons.filter(p => p.id != person.id))
              setNotification({
                message: `${person.name} successfully deleted`,
                isError: false
              })
            })
            .catch(error => {
              console.log(error)

              // remove the deleted person on the client
              setPersons(persons.filter(p => p.id != person.id))

              // notification for an already deleted user
              setNotification({
                message: `${person.name} has already been deleted`,
                isError: true
              })
            })
          }
        }}
        />
      )
    })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification noti={notification}/>
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