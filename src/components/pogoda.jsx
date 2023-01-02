import React, { useState, useEffect } from 'react';

const Pogoda = () => {
  const [forecast, setForecast] = useState({list: []});
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const apikey = "6aa7cd447bd496d76328849ac6af735a"
  

  useEffect(() => {
    if (city.length){fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`)
      .then(response => response.json())
      .then(data => {
        setForecast(data);
      })
      .catch(error => {
        setError(error);
      });}
  }, [city]);


  const handleCityChange = event => {
    setCity(event.target.value);
  };

  

  return (
    <div>
      <h1>5-Day Weather Forecast</h1>
      <label>
        Location:
        <input type="text" value={city} onChange={handleCityChange} />
      </label>
     
      {forecast?.list ?
         forecast.list.map(item => (
          <div key={item.dt}>
            <h2>{item.dt_txt}</h2>
            <p>Temperature: {item.main.temp}°C</p>
            <p>Description: {item.weather[0].description}</p>
          </div>
        ))
        :
        <div>нечего не найдено</div>
    }
    </div>
  );
};

export default Pogoda;
