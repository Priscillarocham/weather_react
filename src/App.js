import React, { useState } from "react";
//appel  api et  son paramètre
const api = {
  key: "8b7c6013e140b306b05189a088bf614b" ,
  base: "https://api.openweathermap.org/data/2.5/"
};

//création d'un objet vide
const weatherObj = {
  name: String, 
  main: {
    feels_like: Number, 
    humidity: Number, 
    temp: Number, 
    temp_max: Number, 
    temp_min: Number
  }, 
  wind: {
    speed: Number
  }, 
  weather:[
    {
      description: String
    }
  ]
}


function App() {
//variable qui stocke les informations saisies par l'utilisateur
const [search, setSearch] = useState(""); 
//variable qui contient les informations reçues par l'api
const [weather, setWeather] = useState(weatherObj);

//méthode qui consomme l'api et transmet ce que l'utilisateur a tapé et reçoit les informations sur la ville
const searchPressed = () => {
  fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
  .then((res) => res.json())
  .then((result) => {
    //réponse api lorsque la ville existe
    if (result.cod === 200) {
      setWeather(result)
    }
    //si l'utilisateur saisit une ville inexistante, nous captons l'erreur de cette manière et affichons une alerte
    if (result.cod === "404") {
      alert("City not found, please choose another one.")
    }
  });
};

//méthode créée pour rechercher la ville en appuyant sur entrée
const validateKeyUp = (e) => { 
  if(e.key === 'Enter') {
    searchPressed()
  }
}

//méthode créée pour mettre ce que l'utilisateur a tapé dans la variable de recherche et effacer l'écran lors de la saisie d'une autre ville
const onChangeHandler = (e) => {
  setSearch(e.target.value)
  setWeather(weatherObj)
}

return (
  <div className="App">
    <div>
      <h1>My App Weather</h1>
      <div className="search">
        <input type="text" placeholder="Enter city/town..." onChange={onChangeHandler} onKeyUp={validateKeyUp}/>
        <button onClick={searchPressed}>OK</button>
      </div>
    </div>
    {weather !== weatherObj && <div className="container">
      <div>
        <h2>{weather.name}</h2>
        <div className="left">
            <h3>{weather.main.temp}°C</h3>
            <p>Feels Like</p>
            <label>{weather.main.feels_like}°C</label>
        </div>
        <div className="right">
          <div>
            <p>{weather.weather[0].description}</p>
            <label>↑ {weather.main.temp_max}°C</label>
            <label>↓ {weather.main.temp_min}°C</label>
          </div>
          <div className="humidity">
            <p>Humidity</p>
            <label>{weather.main.humidity} %</label>
          </div>
          <div className="wind">
            <p>Wind</p>
            <label>{weather.wind.speed} MPH</label>
          </div>
        </div>
      </div>
    </div>}
  </div>
    );
}

export default App;
