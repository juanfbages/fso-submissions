import React from 'react'

const SearchBar = ({ searchFilter, handleFilterChange }) => (
    <>
        find countries <input value={searchFilter} onChange={handleFilterChange}></input>
    </>
)

export default SearchBar
