import Weather from "./Weather"
import { useState, useEffect } from "react"
import axios from 'axios'

const CountryInformation = ({country}) => {
    // openweather api key
    const api_key = import.meta.env.VITE_WEATHER_KEY

    const [weatherInfo, setWeatherInfo] = useState(null)

    const [lattitude, longitude] = country.capitalInfo.latlng
    const commonName = country.name.common
    const capital = country.capital[0]
    const population = country.population
    const currencies = Object.entries(country.currencies).map(entry => {
        return entry[1].name
    }).join()
    const languages = Object.entries(country.languages).map(entry => {
        return (<li key={entry[0]}>{entry[1]}</li>)
    })

    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${api_key}`
        axios 
        .get(url)
        .then(response => {
            setWeatherInfo(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    } ,[])

    const weather = weatherInfo === null ?
        <></> :
        <Weather name={capital} info={weatherInfo} />
    
    const flagStyle = {
        fontSize: 500,
        padding: 0,
        margin: 0,
        border: 0,
        display: 'inline-flex'
    }

    return (
        <div>
            <h2>{commonName}</h2>
            <p>capital: {capital}</p>
            <p>population: {population}</p>
            <p>{currencies}</p>
            <h3>languages:</h3>
            <ul>
                {languages}
            </ul>
            <div style={flagStyle}>
                {country.flag}
            </div>
            {weather}
        </div>
    )
}

export default CountryInformation