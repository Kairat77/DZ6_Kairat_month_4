import React, { useState, useEffect } from 'react';

const Pogoda = () => {
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('Bishkek');
  const [error, setError] = useState(null);
  const apikey = "6aa7cd447bd496d76328849ac6af735a"
  

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`)
      .then(response => response.json())
      .then(data => {
        setForecast(data);
      })
      .catch(error => {
        setError(error);
      });
  }, [city]);

  const handleCityChange = event => {
    setCity(event.target.value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!forecast) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>5-Day Weather Forecast</h1>
      <label>
        Location:
        <input type="text" value={city} onChange={handleCityChange} />
      </label>
      {/* <button onClick={search}>Search</button> */}
      {forecast.list.map(item => (
        <div key={item.dt}>
          <h2>{item.dt_txt}</h2>
          <p>Temperature: {item.main.temp}°C</p>
          <p>Description: {item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Pogoda;
