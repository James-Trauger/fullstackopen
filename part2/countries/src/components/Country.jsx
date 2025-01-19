import CountryInformation from "./CountryInformation"
import ShowButton from "./ShowButton"
import { useState } from "react"

const Country = ({countries}) => {
    const [shownCountry, setShownCountry] = useState('')

    // only show countries when there is less than 10
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    // show country information when ther is only one
    if (countries.length === 1) {
        return <CountryInformation country={countries[0]}/>
    }

    const handleShow = (countryName) => () => setShownCountry(countryName)

    const shownCountries = countries.map(country => {
        const countryName = country.name.common
        const body = countryName === shownCountry ? 
            <CountryInformation country={country} /> :
            <>{countryName} <ShowButton handler={handleShow(countryName)}/></>
        return (
            <li key={countryName}>
                {body}
            </li>
        )
    })

    return (
        <ul>
            {shownCountries}
        </ul>
    )
}

export default Country 