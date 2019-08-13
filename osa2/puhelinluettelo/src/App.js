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
  const [infoMessage, setInfoMessage] = useState({ message: null, type: null })

  // InfoMessage
  const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    return (
      <div className={type}>
        {message}
      </div>
    )
  }

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
            setInfoMessage(
              {
                message: `Replaced the number of '${person.name}'`,
                type: 'success'
              }
            )
            setTimeout(() => {
              setInfoMessage({ message: null, type: null })
            }, 5000)
          })
          .catch(error => {
            setInfoMessage(
              {
                message: `Information of '${person.name}' has already been removed from the server`,
                type: 'error'
              }
            )
            setTimeout(() => {
              setInfoMessage({ message: null, type: null })
            }, 5000)
            setPersons(persons.filter(n => n.id !== person.id))
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
          setInfoMessage(
            {
              message: `Added '${person.name}'`,
              type: 'success'
            }
          )
          setTimeout(() => {
            setInfoMessage({ message: null, type: null })
          }, 5000)
        }
        )
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    personService
      .deletePerson(id)
      .then(
        setPersons(persons.filter(person => person.id !== id)),
        setInfoMessage(
          {
            message: `Deleted '${person.name}'`,
            type: 'success'
          }
        ),
        setTimeout(() => {
          setInfoMessage({ message: null, type: null })
        }, 5000))
      .catch(error => {
        setInfoMessage(
          {
            message: `Information of '${person.name}' has already been removed from the server`,
            type: 'error'
          }
        )
        setTimeout(() => {
          setInfoMessage({ message: null, type: null })
        }, 5000)
        setPersons(persons.filter(n => n.id !== person.id))
      })
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
      <Notification message={infoMessage.message} type={infoMessage.type} />
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