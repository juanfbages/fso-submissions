import React from 'react'

const SearchBar = ({ searchFilter, handleFilterChange }) => (
    <div>
        find countries <input value={searchFilter} onChange={handleFilterChange}></input>
    </div>
)

export default SearchBar
