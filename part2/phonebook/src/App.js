import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  })

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const matches = persons.filter(person => person.name === newName)

    matches.length > 0
      ? window.alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setSearchFilter(event.target.value)
  
  const peopleToShow = searchFilter
    ? persons.filter(person => person.name.toLowerCase().startsWith(searchFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={searchFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm {...{addPerson, newName, newNumber, handleNameChange, handleNumberChange}}/>
      <h3>Numbers</h3>
      <People peopleToShow={peopleToShow} />
    </div>
  )
}

export default App