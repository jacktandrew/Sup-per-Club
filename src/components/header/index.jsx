import React from 'react'
import './index.css'

module.exports = ({ handleSelect, selected }) => (
  <header>
    <select onChange={handleSelect} value={selected}>
      <option value="all">All</option>
      <option value="bar">Bar</option>
      <option value="grocery_or_supermarket">Grocer</option>
      <option value="restaurant">Restaurant</option>
    </select>
    <h1>SupClub</h1>
    <button>Login</button>
  </header>
)
