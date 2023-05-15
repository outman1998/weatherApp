import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [background, setBackground] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4690ccbd64f571762271e43a61c113f1`;

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data);

        if(response.data !== undefined) {
          setBackground(true);
        }
      })
      setLocation('');
    }

  }

  const transformToCelcius = data.main ? (data.main.temp - 32) * 0.5556 + '°C' : null;

  const realCelcius = data.main ? transformToCelcius.slice(0, transformToCelcius.indexOf('.')) + '°C' : null; 

  const feelsLike = data.main ? (data.main.feels_like - 32) * 0.5556 + '°C': null;

  const realFeelsLike = data.main ? feelsLike.slice(0, feelsLike.indexOf('.')) : null;


  const unix_timestamp = data.sys ? data.sys.sunset : null;
  const date = new Date(unix_timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const sunset = `${hours}:${minutes}`;



  return (
    <div className='app'>

      <div className='header'>
        <p>Developed by Outman El Mounir</p>
      </div>

      {!background &&       <div className='search'>
        <h1>iWeather</h1>
        <input
        type="text"
        onChange={event => setLocation(event.target.value)}
        placeholder="Type a valid location..."
        onKeyPress={searchLocation}
        value={location}
        />
      </div>}


      {background && 
      <div className='displayContainer'>

        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            <p className='bold celcius'>{realCelcius}</p>
          </div>

          <div className='description'>
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

          <input className='inputcontainer' 
        type="text"
        onChange={event => setLocation(event.target.value)}
        placeholder="Type a valid location..."
        onKeyPress={searchLocation}
        value={location}
        />
        </div>

        {data.name !== undefined && 
        <div className='bottom'>
          <div className='feels'>
            <p className='bold'> {realFeelsLike}°C</p>
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            <p className='bold'>{sunset}</p>
            <p>Sunset</p>
          </div>
        </div>}

      </div>}


    </div>
  );
}

export default App;
