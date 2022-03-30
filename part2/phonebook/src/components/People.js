import React from 'react'

const People = ({ peopleToShow, handleClick }) => (
    peopleToShow.map(person =>
      <p key={person.id}>
        {person.name} {person.number} <button onClick={handleClick(person)}>delete</button>
      </p>)
  )

export default People