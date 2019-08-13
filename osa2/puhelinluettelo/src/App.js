import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  // Get persons from db
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))

  }, [])

  // Handle adding of persons to state and db
  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(p => (p.name === newName))
    if (nameExists) {
      const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmation) {
        const person = persons.find(p => p.name === newName)
        const newPerson = { ...person, number: newNumber }
        personService
          .update(person.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
      }
    } else {
      const person = {
        name: newName,
        number: newNumber
      }

      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    personService
      .deletePerson(id)
      .then(
        setPersons(persons.filter(person => person.id !== id))
      )
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilteredName(event.target.value)
  }
  const handleDelete = (id) => {
    return () => {
      const name = persons.filter(person => person.id === id)[0].name
      const confirmation = window.confirm(`Delete ${name} ?`)
      if (confirmation) {
        deletePerson(id)
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filteredName} onChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredName={filteredName} handleDelete={handleDelete} />
    </div>
  )

}

export default App