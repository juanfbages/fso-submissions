import React from 'react'

const Filter = ({ searchFilter, handleFilterChange }) => (
    <div>
      filter showing with <input 
        value={searchFilter} 
        onChange={handleFilterChange}>
      </input>
    </div>
  )

export default Filter