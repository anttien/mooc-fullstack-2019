import React, { useState } from 'react'
import Country from './Country'
import ShowCountryButton from './ShowCountryButton';


const CountryList = ({ countries, filteredName }) => {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filteredName.toLowerCase()));
    const amountOfCountries = filteredCountries.length;

    if (amountOfCountries > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )

    } else if (amountOfCountries < 1) {
        return (
            <div>
                No matches, specify another filter
            </div>
        )
    }
    else if (amountOfCountries == 1) {
        return (
            filteredCountries.map(country =>
                <Country
                    key={country.numericCode}
                    country={country}
                />
            )

        )
    } else {
        return (
            filteredCountries.map(country =>
                <li key={country.numericCode} >{country.name}
                <ShowCountryButton country={country} /></li>
            )
        )

    }

}

export default CountryList