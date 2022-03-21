import React from 'react'

const People = ({ peopleToShow }) => (
    peopleToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)
  )

export default People