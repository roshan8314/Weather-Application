import React, { useState } from 'react';
import './Weather.css';

const api = {
    key: "3086ba8e5152360098c3c00c18c7f4cb",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                })
        }
    }

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();

        return `${day} ${date} ${months[month]} ${year}`;
    }

    return (
        <div>
            <main>
                <div className='search-box'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='Search...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>
                {weather.main && (
                    <div>
                        <div className='location-box'>
                            <div className='location'>
                                {weather.name}, {weather.sys?.country}
                                <div className='date'>
                                    {dateBuilder(new Date())}
                                </div>
                               
                            </div>
                            <div className='weather-box'>
                                <div className='temp'>
                                    {Math.round(weather.main.temp)}°C
                                </div>
                                <div className='weather'>
                                    {weather.weather[0].main}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Weather;
