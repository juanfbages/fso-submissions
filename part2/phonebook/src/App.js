import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import People from './components/People'
import peopleService from './services/people'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState({})
  
  const errorMsgStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const successMsgStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const flashMsg = (msg, style, timeout) => {
    setNotificationStyle(style)
    setNotificationMsg(msg)
    setTimeout(() => {
      setNotificationMsg(null)
      setNotificationStyle({})
    }, timeout)
  }
  
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
              flashMsg(`Modified ${newEntry.name}`, successMsgStyle, 5000)
            })
            .catch(error => {
              flashMsg(`Information of ${newEntry.name} has already been removed from server`, errorMsgStyle, 5000)
              setPersons(persons.filter(p => p.id !== newEntry.id))
            })
      }
    } else {
        peopleService
          .create(newEntry)
          .then(returnedNote => {
            setPersons(persons.concat(returnedNote))
            setNewName('')
            setNewNumber('')
            flashMsg(`Added ${newEntry.name}`, successMsgStyle, 5000)
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
      <Notification message={notificationMsg} style={notificationStyle} />
      <Filter searchFilter={searchFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm {...{addPerson, newName, newNumber, handleNameChange, handleNumberChange}}/>
      <h3>Numbers</h3>
      <People peopleToShow={peopleToShow} handleClick={handleClick} />
    </div>
  )
}

export default App