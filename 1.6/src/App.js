import React, { useState } from 'react'

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
  
   
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState( anecdotes.map( anecdote => 0 ) )
  const [anecdoteOfTheDay, setAnecdoteOfTheDay] = useState(0)

  const handleChangeSelectedAnecdote = () => {
    if( selected < anecdotes.length - 1)
      return setSelected(selected + 1)

    return setSelected(0)
  }

  const handleVote = () =>{
    
    let [ ...newArr ] = votes
    newArr[selected]++

    let mostVoted = findMostVoted( newArr )

    setAnecdoteOfTheDay(mostVoted)
    setVotes(newArr)
  }

  const findMostVoted = ( votesArr ) => votesArr.reduce( (prev, current, idx, arr) => current > arr[prev]? idx:prev, 0  ) 

  return (
    <div>
        <Header text="Give Feedback" />
        <Button text="Good" handleClick={ () => setGood( good + 1 ) } />
        <Button text="Neutral" handleClick={ () => setNeutral( neutral  + 1 )} />
        <Button text="Bad" handleClick={ () => setBad( bad + 1 )} />

        <Statistics good={good} neutral={neutral} bad={bad} />

        <AnecdoteOfTheDay anecdote={anecdotes[anecdoteOfTheDay]} votes={votes[anecdoteOfTheDay]}  />
        <Anecdotes anecdotes={anecdotes} selected={selected} votes={votes} handleClick={handleChangeSelectedAnecdote} handleVote={handleVote} />
    </div>
  )
}

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

//Is another Component
const Statistics = ({good, neutral, bad}) => {
  if( good === 0 && neutral === 0 && bad === 0 )
   return (
      <>
      <Header text="Statistics" />
      <span> No Feedback given </span>
      </>
   )

  return(
    <>
      <Header text="Statistics" />
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={bad + good + neutral} />
          <StatisticLine text="Average" value={(( bad + good + neutral ) / 3) +"%"} />
          <StatisticLine text="Positive" value={good !== 0 || neutral !== 0 || bad !== 0
          ?good * 100 / ( bad + good + neutral )+"%"
          :0+"%" } />
        </tbody>
      </table>
      
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return( 
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Anecdotes = ({anecdotes, selected, votes, handleClick, handleVote}) => {
  return(
    <>
      <Header text="Anecdotes" />
      {anecdotes[selected]} <br /> Has {votes[selected]} votes <br />
      <Button handleClick={handleVote} text="Vote Anecdote" />
      <Button handleClick={handleClick} text="Next Anecdote" />
    </>  
  )
}

const AnecdoteOfTheDay = ({anecdote, votes}) => {
  return(
    <>
      <Header text="Anecdote Of The Day" />
      {anecdote} <br /> Has {votes} votes <br />
    </>  
  )
}

export default App

