import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const DisplayHeading = ({ text }) => <h2>{text}</h2>
const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Statistics = (props) => {
    const { good, neutral, bad } = props
    const amountOFFeedbacks = good + bad + neutral

    if (amountOFFeedbacks === 0) {
        return (
            <div>
                No feedback given.
            </div>
        )
    }

    const average = (good - bad) / amountOFFeedbacks
    const positive = ((good / amountOFFeedbacks) * 100).toString().concat(' %')

    return (
        <table>
            <tbody>
            <Statistic text={"Good: "} value={good} />
            <Statistic text={"Neutral: "} value={neutral} />
            <Statistic text={"Bad: "} value={bad} />
            <Statistic text={"All: "} value={amountOFFeedbacks} />
            <Statistic text={"Average: "} value={average} />
            <Statistic text={"Positive: "} value={positive} />
            </tbody>
        </table>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodFeedback = (newValue) => {
        setGood(newValue)
    }
    const neutralFeedback = (newValue) => {
        setNeutral(newValue)
    }
    const badFeedback = (newValue) => {
        setBad(newValue)
    }

    return (
        <div>
            <DisplayHeading text={"Give feedback"} />
            <Button handleClick={() => goodFeedback(good + 1)} text="good" />
            <Button handleClick={() => neutralFeedback(neutral + 1)} text="neutral" />
            <Button handleClick={() => badFeedback(bad + 1)} text="bad" />
            <DisplayHeading text={"Statistics"} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)