import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList.js'
import Filter from './components/Filter.js'

// https://restcountries.eu/rest/v2/all

const App = () => {

    const [countries, setCountries] = useState([])
    const [filteredName, setFilteredName] = useState('')

    const hook = () => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilteredName(event.target.value)
      }

    return (
        <div>
            find countries
            <Filter value={filteredName} onChange={handleFilterChange} />
            <CountryList countries={countries} filteredName={filteredName} />
        </div>

    )

}

export default App