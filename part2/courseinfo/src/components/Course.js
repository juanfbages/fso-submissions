import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => 
    sum += part.exercises, 0)
  return <p><b>Number of exercises {total}</b></p>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}  
  </>

const Course = ({ course }) => 
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>

export default Course