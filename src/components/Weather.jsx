import React, { useEffect, useState } from 'react';
import './Weather.css';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const toCelsius = (k) => (k - 273.15).toFixed(1);

  const search = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_WEATHER_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("surat");
  }, []);

  return (
    <div className='weather'>

      <div className='search-bar'>
        <input  
          type="text"
          placeholder="Search"
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search(city)}
        />
        <img
          src="/images/search-icon.jpg"
          alt="searchicon"
          onClick={() => search(city)}
        />
      </div>

      {weatherData && (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weather icon"
            className='weather-icon'
          />

          <p className='temperature'>
            {toCelsius(weatherData.main.temp)}°C
          </p>

          <p className='location'>
            {weatherData.name}
          </p>

          <div className='weather-data'>
            <div className='col'>
              <img src="/images/Humidity-icon.png" alt="humidity" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className='col'>
              <img src="/images/Wind-icon.png" alt="wind" />
              <div>
                <p>{weatherData.wind.speed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default Weather;
