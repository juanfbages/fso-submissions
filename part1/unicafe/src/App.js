import { useState } from 'react'

const Button = ({ clickHandle, label }) => (
  <button onClick={clickHandle}>
    {label}
  </button>
)

const Statisticline = ({ label,value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {

  const average = (good,bad,neutral) => {
    const total = good+bad+neutral
    const sum = (good*1) + (bad*-1)
    return sum/total
  }

  const positive = (good,bad,neutral) => good/(good+bad+neutral)*100 + "%"

  if (good+bad+neutral > 0) {
    return (
      <div>
        <table>
          <tbody>
            <Statisticline label='good' value={good}/>
            <Statisticline label='neutral' value={neutral}/>
            <Statisticline label='bad' value={bad}/>
            <Statisticline label='all' value={good+neutral+bad}/>
            <Statisticline label='average' value={average(good,bad,neutral)}/>
            <Statisticline label='positive' value={positive(good,neutral,bad)}/>
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandle={() => setGood(good + 1)} label='good'/>
      <Button clickHandle={() => setNeutral(neutral + 1)} label='neutral'/>
      <Button clickHandle={() => setBad(bad + 1)} label='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App