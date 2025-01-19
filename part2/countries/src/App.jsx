import { useState, useEffect } from "react"
import Country from './components/Country'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleCountrySearch = (event) => {
    setFilter(event.target.value)
    
  }

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const shownCountries = countries
    .filter(country => {
      return country.name.common.toLowerCase().includes(filter.toLowerCase())
    })

  return (
    <>
      find countries: <input 
        type='text' 
        value={filter}
        onChange={handleCountrySearch}
      />
      <Country countries={shownCountries} />

    </>
  )
}

export default App
