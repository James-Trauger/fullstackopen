import { useState } from 'react'

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const StatisticLine = ({text, value, postText}) => {
  return (
    <tr><td>{text} {value}{postText}</td></tr>
  )
}

const Stats = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  
  // calculate the "average" - good=1 neutral=0 bad=-1
  const average = () => {
    if (total === 0) {
      return 0
    }
    return (good - bad) / total
  }
  const positiveFeedback = () => {
    if (total === 0) {
      return 0
    }
    return (good / total) * 100
  }

  // no feedback is given when the total is 0
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='total' value={total}/>
          <StatisticLine text='average' value={average()}/>
          <StatisticLine text='positive' value={positiveFeedback()} postText=' %'/>
        </tbody>
      </table>
    </div>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral
  const increment = (total, setter) => () => setter(total + 1)

  const [selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))
  
  const randomNumber = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const nextAnectdote = () => {
    if (selected >= anecdotes.length-1) {
      setSelected(0)
    } else {
      setSelected(selected + 1)
    }
  }
  const voteSelected = () => {
    const copy = [... votes]
    copy[selected] += 1
    setVote(copy)
  }

  // returns index of the most voted anecdote
  const maxVoted = () => {
    var max = votes[0]
    var maxIdx = 0
    votes.forEach((x, idx) => {
      if (x > max) {
        max = x 
        maxIdx = idx
      }
    })
    return maxIdx
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handler={increment(good, setGood)}/>
      <Button text='neutral' handler={increment(neutral, setNeutral)}/>
      <Button text='bad' handler={increment(bad, setBad)}/>
      <Stats good={good} bad={bad} neutral={neutral} />

      <h1>Anecdote of the day</h1>
      <Button text='vote' handler={voteSelected}/>
      <Button text='next anecdote' handler={nextAnectdote}/>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>

      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[maxVoted()]} votes={votes[maxVoted()]}/>

    </div>
  )
}

export default App