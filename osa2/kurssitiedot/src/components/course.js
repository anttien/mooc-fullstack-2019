import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ name }) => (
    <h1>{name}</h1>
)

const Content = ({ parts }) => {
    const rows = () => parts.map(part =>
        <Part key={part.id} part={part} />
    )
    return (
        <>
            {rows()}
        </>
    )
}

const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>
}

const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce((acc, cur) => {
        console.log(acc, cur)
        return acc + cur
    })
    return <p>Total of {total} exercises </p>
}

export default Course