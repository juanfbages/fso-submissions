import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'
import SearchBar from './components/SearchBar'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  })

  const countriesToShow = countries.filter(
    country => country.name.toLowerCase().includes(searchFilter.toLowerCase()))

  const handleFilterChange = (event) => setSearchFilter(event.target.value)

  return (
    <div>
      <SearchBar searchFilter={searchFilter} handleFilterChange={handleFilterChange} />
      <SearchResult countriesToShow={countriesToShow} handleFilterChange={handleFilterChange} />
    </div>
  )
}

export default App;
