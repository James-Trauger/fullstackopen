const Weather = ({name, info}) => {

    const description = info.weather[0].description 
    const icon = info.weather[0].icon 
    const temp = Math.round(info.main.temp - 273)
    
    const listStyle = {
        listStyleType: 'none',
        padding: 0,
        margin: 0
    }
    return (
        <div>
            <h3>Weather in {name}</h3>
            <ul style={listStyle}>
                <li>{description}</li>
                <li>Temperature: {temp}</li>
                <li>
                    <img 
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt='icon representing the weather of the country'
                    />
                </li>
            </ul>
        </div>
    )
}

export default Weather 