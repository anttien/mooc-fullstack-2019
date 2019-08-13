import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {

    const [weather, setWeather] = useState([])

    const lat = country.latlng[0]
    const lng = country.latlng[1]

    const hook = () => {
        console.log('effect')
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=114332134ea7ed53cb7a0e88a863eb5d`)
            .then(response => {
                console.log('promise fulfilled')
                setWeather(response.data)
                console.log(response.data)
            })
    }

    useEffect(hook, [])


    return (
        <div>
            <h2>{country.name}</h2>
            capital {country.capital}
            <br></br>
            population {country.population}
            <h1>languages</h1>
            {country.languages.map(language => <li>{language.name}</li> )}
            <img src={country.flag} height='auto' width='150px'></img>
            <h1>Weather in {country.capital}</h1>
        </div>
    )
}

export default Country