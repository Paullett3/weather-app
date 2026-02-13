import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const fetchWeather = async () => {
    if (!city) return; // Don't search if the input is empty 
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found. Please check the spelling.');
      setWeather(null);
    }
  };

  // Allows pressing "Enter" to search
 // const handleKeyPress = (e) => {
   //{// if (e.key === 'Enter') {
      //fetchWeather();//}
   // }//}
 // };
//
// ... (imports and fetchWeather stay the same)

  return (
    <div className="app">
      <div className="container">
        <h1>WEATHERLY</h1>
        <input 
          type="text" 
          placeholder="Search your city..." 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <button onClick={fetchWeather}>Check Weather</button>

        {error && <p style={{color: '#ffcdd2', marginTop: '15px'}}>{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2 style={{marginTop: '20px'}}>{weather.name}</h2>
            <p className="temp">{Math.round(weather.main.temp)}°</p>
            <p style={{fontSize: '1.2rem', fontWeight: '300'}}>{weather.weather[0].description}</p>
            
            <div className="details" style={{display: 'flex', justifyContent: 'space-around'}}>
              <div>
                <p style={{fontSize: '0.8rem', opacity: '0.8'}}>Humidity</p>
                <p style={{fontWeight: 'bold'}}>{weather.main.humidity}%</p>
              </div>
              <div>
                <p style={{fontSize: '0.8rem', opacity: '0.8'}}>Wind</p>
                <p style={{fontWeight: 'bold'}}>{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;