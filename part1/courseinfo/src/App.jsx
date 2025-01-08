const Header = (props) => {
  let totalSum = 0
  props.course.parts.map(p => {
    totalSum = totalSum + p.exercises
    return p
  })
  return (
  <div>
    <h1>{props.course.name}</h1>
    <Content parts={props.course.parts} />
    <Total total={totalSum} />
  </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {
        // need to include key to avoid warning
        props.parts.map( (part, i) =>{
          return (
            <Part part={part.name} exercises={part.exercises} key={i} />
          )
      })}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.total}
    </p>
  )
}

const App = () => {
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
    ],
  }



  return (
    <div>
      <Header course={course}/>
    </div>
  )
}

export default App