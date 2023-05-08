import React, {useState, useEffect} from 'react'
import './TopCities.css';
import axios from 'axios';


export default function TopCities() {

  const [data, setMyData] = useState({});


  const url = "https://api.openweathermap.org/data/2.5/weather?q=tanzania&units=imperial&appid=4690ccbd64f571762271e43a61c113f1";
  

  const fetchData = () => {
    axios.get(url).then((response) => {
      setMyData(response.data)
      console.log(response.data);
    })
  }

  useEffect(() => {
    fetchData()
  }, []);

  const transformToCelcius = data.main ? (data.main.temp - 32) * 0.5556 + '°C' : null;

  const realCelcius = data.main ? transformToCelcius.slice(0, transformToCelcius.indexOf('.')) + '°C' : null; 

  const unix_timestamp = data.sys ? data.sys.sunset : null;
  const date = new Date(unix_timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const sunset = `${hours}:${minutes}`;



  return (
    <>
      <div className='box'>

        <div className='toppen'>
        <p>{data.name}</p>
        <p>{realCelcius}</p>
        </div>

        <div className='bunden'>
        {data.weather ? <p>{data.weather[0].main}</p> : null}
        <p>Sunset: {sunset}</p>
        </div>

      </div>

    </>
  )
}
