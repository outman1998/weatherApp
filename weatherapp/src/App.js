import React from 'react';
import axios from 'axios';

function App() {

  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=4690ccbd64f571762271e43a61c113f1`;

  return (
    <div className='app'>

      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>Copenhagen</p>
          </div>
          <div className='temp'>
            <h1>65*c</h1>
          </div>
          <div className='description'>
            <p>Clouds</p>
          </div>
        </div>

        <div className='bottom'>
          <div className='feels'>
            <p>60*c</p>
          </div>
          <div className='humidity'>
            <p> 20%</p>
          </div>
          <div className='wind'>
            <p> 12PM</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
