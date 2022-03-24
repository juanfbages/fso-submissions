import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'
import SearchBar from './components/SearchBar'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const countriesAPIURL = 'https://restcountries.com/v2/all'
    axios
      .get(countriesAPIURL)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const openWeatherbaseURL = "http://api.openweathermap.org/data/2.5/weather"

    if (countriesToShow.length === 1) {
      var city = countriesToShow[0].capital
      var openWeatherQuery = `?q=${city}&APPID=${api_key}&units=metric`
      
      console.log('fetching weather data')
      axios
      .get(openWeatherbaseURL + openWeatherQuery)
      .then(response => {
        setWeather(response.data)
      })
    }
  }, [countriesToShow])
  
  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
    setCountriesToShow(countries.filter(
      country => country.name.toLowerCase().includes(searchFilter.toLowerCase())))
  }

  return (
    <div>
      <SearchBar 
        searchFilter={searchFilter} 
        handleFilterChange={handleFilterChange} />
      <SearchResult 
        countriesToShow={countriesToShow} 
        handleFilterChange={handleFilterChange}
        weather={weather} />
    </div>
  )
}

export default App;
