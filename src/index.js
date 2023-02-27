let dateElement = document.querySelector("#date");
let currentTime = new Date();

let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let year = currentTime.getFullYear();
let dayIndex = currentTime.getDay();
let days = ["Sun", "Mon,", "Tue", "Wed", "Thu", "Fri", "Sat"];
dateElement.innerHTML = `${days[dayIndex]} ${hours}:${minutes}, ${year}`;

function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector("#cities").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "c3aea1ac13c726cf9f51e391ac876731";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let cityInput = document.querySelector("#city-input");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function showTemp(response) {
  console.log(response);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  alert("Link clicked");
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);
searchCity("London");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
