import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
        <button onClick={handleClick}>{text}</button>
)

const DisplayMostVotes = ({points}) => {
    console.log("points: ", points)
    const copy = [...points]
    var mostVotesIndex = 0;
    for(var i = 0; i < copy.length; i++) {
        if (points[i] > points[mostVotesIndex]) {
            mostVotesIndex = i
        }
    }
    console.log("most votes index: ", mostVotesIndex)

    return (
        <>
        <h3>Anecdote with most votes</h3>
        <p>
            {anecdotes[mostVotesIndex]}
            <p>has {points[mostVotesIndex]} votes</p>
        </p>
        </>
    )
}


const App = (props) => {
    
    const [points, setPoints] = useState(props.points)
    const [selected, setSelected] = useState(0)

    const giveRandomAnecdote = () => {
        setSelected(randomNumber(props.anecdotes.length))
    }

    const addVote = () => {
        const copyOfVotes = [...points]
        copyOfVotes[selected] += 1
        setPoints(copyOfVotes)
    }

    return (
        <div>
            <h3>Anecdote of the day</h3>
            <p>{props.anecdotes[selected]}</p>
            <p>has {points[selected]} votes</p>
            <Button handleClick={() => giveRandomAnecdote()} text="next anecdote" />
            <Button handleClick={() => addVote()} text="vote" />
            <DisplayMostVotes points={points}/>
        </div>
    )
}



const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)

function randomNumber(max) {
    return Math.floor(Math.random() * max)
}

ReactDOM.render(
    <App anecdotes={anecdotes} points={points}/>,
    document.getElementById('root')
)