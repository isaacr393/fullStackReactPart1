import React from 'react';

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  let total = course.parts.reduce(( prev, current )=> prev + current.exercises, 0)
  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

function Header(props){

    return (
      <header><h1>{props.title}</h1></header>
    )
}

function Content(props){
  let parts = props.parts.map( element => <Part part={element.name} exercise={element.exercises}/> )
  return(
    <>
      {parts}
    </>
  )
}

const Part = ({part, exercise}) => ( 
  <p>{part} {exercise}</p>
)

function Total(props){
  return(
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

export default App;
