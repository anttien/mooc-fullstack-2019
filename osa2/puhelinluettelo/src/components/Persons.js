import React from 'react'
import Person from './Person'


const Persons = ({persons, filteredName}) => {
    return (
        persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase())).map(person =>
            <Person
                key={person.name}
                person={person}
            />
        )
    )
}

export default Persons