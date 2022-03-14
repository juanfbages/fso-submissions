import { useState } from 'react'

const Button = ({ clickHandler, label }) => (
    <button onClick={clickHandler}>
        {label}
    </button>
)

const AnecdoteDisplay = ({ anecdote, totalVotes }) => (
    <div>
        <p>{anecdote}</p>
        <p>has {totalVotes} votes</p>
    </div>  
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const nextClickHandler = () => setSelected(getRandomInt(0,anecdotes.length))
  const voteClickHandler = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  const findMostVoted = () => votes.findIndex(vote => vote === Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteDisplay anecdote={anecdotes[selected]} totalVotes={votes[selected]}/>
      <Button clickHandler={voteClickHandler} label='vote'/>
      <Button clickHandler={nextClickHandler} label='next anectdote'/>
      <h1>Anecdote with the most votes</h1>
      <AnecdoteDisplay anecdote={anecdotes[findMostVoted()]} totalVotes={votes[findMostVoted()]}/>
    </div>
  )
}

export default App