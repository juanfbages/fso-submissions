import React from 'react'

const CountryInfo = ({ country }) => (
    <>
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
    </> 
)

const MultipleResults = ({ countriesToShow, handleFilterChange }) => (
    <>
        {countriesToShow.map(country => 
            <p key={country.name}>{country.name} <button value={country.name} onClick={handleFilterChange}>show</button></p>
        )}
    </>
)

const SearchResult = ({ countriesToShow, handleFilterChange }) => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0]
      return (
        <CountryInfo country={country} />
      )
    } else if (countriesToShow.length <= 10) {
      return (
        <MultipleResults countriesToShow={countriesToShow} handleFilterChange={handleFilterChange} />
      )
    } else {
      return (
        <>
          <p>Too many matches, specify another filter</p>
        </>
      )
    }
  }

export default SearchResult