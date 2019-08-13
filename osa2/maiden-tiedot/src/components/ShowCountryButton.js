import React from 'react'
import Country from './Country'

const ShowCountryButton = ({ country }) => {
    const showCountry = () => { return () => (
    <Country
        key={country.numericCode}
        country={country}
    />)}
    return (
        <>
            <button onClick={showCountry()}>show</button>
        </>
    )
}

export default ShowCountryButton