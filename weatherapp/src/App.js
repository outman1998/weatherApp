import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4690ccbd64f571762271e43a61c113f1`;

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data);
      })
      setLocation('');
    }

  }

  const transformToCelcius = data.main ? (data.main.temp - 32) * 0.5556 + '°C' : null;

  const feelsLike = data.main ? (data.main.feels_like - 32) * 0.5556 + '°C': null;

  return (
    <div className='app'>

      <div className='search'>
        <input 
        type="text"
        onChange={event => setLocation(event.target.value)}
        placeholder="Enter A City"
        onKeyPress={searchLocation}
        value={location}
        />
      </div>

      <div className='container'>

        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            <p>{transformToCelcius}</p>
          </div>
          <div className='description'>
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && 
        <div className='bottom'>
          <div className='feels'>
            {feelsLike}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}</p> : null}
            <p>humidity</p>
          </div>
          <div className='wind'>
          {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>}

      </div>

    </div>
  );
}

export default App;
