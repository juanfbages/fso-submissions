import React from 'react'

const WeatherDisplay = ({ capital, weather }) => {
  if (Object.keys(weather).length === 0) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>No weather information for {capital}</p>
      </div>)
  }

  const weatherIconbaseURL = "https://openweathermap.org/img/wn/"
  const weatherIconFormat = "@2x.png"
  const weatherIcon = weather.weather[0].icon

  return (
    <>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={weatherIconbaseURL + weatherIcon + weatherIconFormat} alt="wx"/>
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )

}

const CountryInfo = ({ country, weather }) => (
  <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
          {country.languages.map(language => 
              <li key={language.name}>{language.name}</li>
          )}
      </ul>
      <img src={country.flags.png} alt="country flag"/>
      <WeatherDisplay capital={country.capital} weather={weather} />
  </div> 
)

const MultipleResults = ({ countriesToShow, handleFilterChange }) => (
    <>
      {countriesToShow.map(country => 
          <p key={country.name}>
            {country.name} <button 
              value={country.name} 
              onClick={handleFilterChange}>show</button>
          </p>
      )}
    </>
)

const SearchResult = ({ weather, countriesToShow, handleFilterChange }) => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0]
      return (
        <CountryInfo 
          country={country} 
          weather={weather} />
      )
    } else if (countriesToShow.length <= 10) {
      return (
        <MultipleResults 
          countriesToShow={countriesToShow} 
          handleFilterChange={handleFilterChange} />
      )
    } else {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    }
  }

export default SearchResult