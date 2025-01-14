import { useState } from 'react'

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const Counter = ({text, total, postText}) => {
  return (
    <p>{text} {total}{postText}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral
  const increment = (total, setter) => () => setter(total + 1)
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
    return good / total
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handler={increment(good, setGood)}/>
      <Button text='neutral' handler={increment(neutral, setNeutral)}/>
      <Button text='bad' handler={increment(bad, setBad)}/>
      <h1>statistics</h1>
      <Counter text='good' total={good}/>
      <Counter text='neutral' total={neutral}/>
      <Counter text='bad' total={bad}/>
      <Counter text='total' total={total}/>
      <Counter text='average' total={average()}/>
      <Counter text='positive' total={positiveFeedback()} postText=' %'/>
    </div>
  )
}

export default App