import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import peopleService from './services/people'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  
  useEffect(() => {
    peopleService
      .getAll()
      .then(allRecords => {
        setPersons(allRecords)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const matches = persons.filter(person => person.name === newName)

    const newEntry = {
      name: newName,
      number: newNumber,
      id: matches.length > 0 ? matches[0].id : Math.max(...persons.map(p => p.id), 0) + 1
    }

    if (matches.length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
          peopleService
            .update(newEntry.id, newEntry)
            .then(returnedEntry => {
              setPersons(persons.map(person => person.id !== newEntry.id ? person : returnedEntry))
            })
      }
    } else {
        peopleService
          .create(newEntry)
          .then(returnedNote => {
            setPersons(persons.concat(returnedNote))
            setNewName('')
            setNewNumber('')
          })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setSearchFilter(event.target.value)

  const handleClick = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      peopleService.removeEntry(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }
  
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
      <People peopleToShow={peopleToShow} handleClick={handleClick} />
    </div>
  )
}

export default App