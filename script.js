function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function showTemperature(responce) {
  document.querySelector("#search-city").innerHTML = responce.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    responce.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = responce.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    responce.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    responce.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let urlWeather = "https://api.openweathermap.org/data/2.5/weather?";
  let unit = "metric";
  let url = `${urlWeather}&q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showTemperature);
}

function handleCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let urlWeather = "https://api.openweathermap.org/data/2.5/weather?";
  let unit = "metric";
  let latitide = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `${urlWeather}&lat=${latitide}&lon${longitude}appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentData = document.querySelector("#current-data");
let today = new Date();
currentData.innerHTML = formatDate(today);

let form = document.querySelector("#weather-form");
form.addEventListener("submit", handleCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
