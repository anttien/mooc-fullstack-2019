import React from 'react'

const Person = ({ person, handleDelete }) => {

    return (
        <>{person.name} {person.number} <button onClick={handleDelete(person.id)}>delete</button><br></br></>
    )
}

export default Person