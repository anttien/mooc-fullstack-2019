import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  const hook = () => {
    console.log('effect')
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        })
}

useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => (person.name === newName))
    console.log(nameExists)
    if (nameExists) {
      alert(`${newName} is already added to phonebook.`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
    }

    setNewName('')
    setNewNumber('')
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
      <Persons persons={persons} filteredName={filteredName} />
    </div>
  )

}

export default App