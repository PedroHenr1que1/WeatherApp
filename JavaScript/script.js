const cityName = document.querySelector(".city");
const countryName = document.querySelector(".country");
const cityTemperature = document.querySelector(".temperatures");
const cityTempFeelsLike = document.querySelector(".feels__like");
const cityTempMin = document.querySelector(".temp__min");
const cityTempMax = document.querySelector(".temp__max");
const cityHumidity = document.querySelector(".humidity");
const cityWindSpeed = document.querySelector(".wind__speed");
const weatherMain = document.querySelector(".Weather__Main");
const weatherDescription = document.querySelector(".Weather__Description");
const time = document.querySelector(".time");

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const card = document.querySelector('.card');

const APIkey = "0d1a8f142d6453871776f910261cc0f7";

let timeNow = new Date();
let dia = timeNow.getDate();
let mes = (timeNow.getMonth() + 1);
let ano = timeNow.getFullYear();
let horas = timeNow.getHours();
let minutos = timeNow.getMinutes();

const fetchWeather = async (city) => {
    const APIResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`);
  
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
}

const renderWeather = async (city) => {
    cityName.innerHTML = "Loading...";
    countryName.innerHTML = "";
    cityTemperature.innerHTML = "";
    cityTempMin.innerHTML = "";
    cityTempMax.innerHTML = "";
    cityTempFeelsLike.innerHTML = "";
    cityHumidity.innerHTML = "";
    cityWindSpeed.innerHTML = "";
    weatherMain.innerHTML = "";
    weatherDescription.innerHTML = "";
    time.innerHTML = "";

    const data = await fetchWeather(city);

    if(data){
        card.style.display = "block"
        cityName.innerHTML = `City: ${data.name}`;
        countryName.innerHTML = `${data.sys.country}`;
        cityTemperature.innerHTML = `Temperature: ${(data.main.temp - 273).toFixed(2)}°C or ${((data.main.temp - 273) * 1.8 + 32).toFixed(2)}°F`;
        cityTempMin.innerHTML = `Min Temperature: ${(data.main.temp_min - 273).toFixed(2)}°C or ${((data.main.temp_min - 273) * 1.8 + 32).toFixed(2)}°F`;
        cityTempMax.innerHTML = `Max Temperature: ${(data.main.temp_max - 273).toFixed(2)}°C or ${((data.main.temp_max - 273) * 1.8 + 32).toFixed(2)}°F`;
        cityTempFeelsLike.innerHTML = `Feels Like: ${(data.main.feels_like - 273).toFixed(2)}°C or ${((data.main.feels_like - 273) * 1.8 + 32).toFixed(2)}°F`;
        cityHumidity.innerHTML = `Humidity: ${data.main.humidity}%`;
        cityWindSpeed.innerHTML = `Wind Speed: ${data.wind.speed} km/h`;
        weatherMain.innerHTML = `${data.weather[0].main}`;
        weatherDescription.innerHTML = `${data.weather[0].description}`;
        time.innerHTML = `Updated at: ${dia}/${mes}/${ano} - ${horas}:${minutos}h`
    } else {
        card.style.display = "block"
        card.style.alignItems = "center"
        cityName.innerHTML = "City not found :/";
        countryName.innerHTML = "";
        cityTemperature.innerHTML = "";
        cityTempMin.innerHTML = "";
        cityTempMax.innerHTML = "";
        cityTempFeelsLike.innerHTML = "";
        cityHumidity.innerHTML = "";
        cityWindSpeed.innerHTML = "";
        weatherMain.innerHTML = "";
        weatherDescription.innerHTML = "";
        time.innerHTML = "";
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderWeather(input.value.toLowerCase())
});

