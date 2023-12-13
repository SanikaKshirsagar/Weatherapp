// WeatherApp.js
import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '0367404c8af5fe308b11ac8f12cc5e64';

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getForecastData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      );
      // Assuming the API returns forecast data as a list
      setWeatherData({ current: weatherData, forecast: response.data.list });
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Weather App</h1>
      <label>
       <b> Enter City:</b>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
      </label>
      <button onClick={getWeatherData} style={{ background: '#4CAF50', color: 'white', padding: '10px', cursor: 'pointer' }}>Get Weather</button>
      <button onClick={getForecastData} style={{ background: '#2196F3', color: 'white', padding: '10px', cursor: 'pointer', marginLeft: '5px' }}>Get Forecast</button>

      {weatherData && weatherData.current && (
        <div style={{ marginTop: '20px' }}>
          <h2>Current Weather in {weatherData.current.name}, {weatherData.current.sys.country}</h2>
          <p><b>Temperature:</b> {weatherData.current.main.temp} °C</p>
          <p><b>Weather:</b> {weatherData.current.weather[0].description}</p>
        </div>
      )}

      {weatherData && weatherData.forecast && (
        <div style={{ marginTop: '20px' }}>
          <h2>Forecast for the Next Week</h2>
          <ul>
            {weatherData.forecast.map((item, index) => (
              <li key={index}>
                <mark>{item.dt_txt}:</mark><br></br> <i>{item.main.temp} °C</i>, <br></br><b> {item.weather[0].description}</b><br></br><br></br>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
