class Weather {
  constructor(apikey) {
    this.apikey = apikey;
  }

  fetchWeather(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apikey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        console.log("Error fetching weather data: ", error);
      });
  }

  fetchForecast(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&appid=" +
        this.apikey
    )
      .then((response) => response.json())
      .then((data) => this.displayForecast(data))
      .catch((error) => {
        console.log("Error fetching forecast data: ", error);
      });
  }

  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/hr";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  }

  displayForecast(data) {
    const forecastItems = data.list.slice(0, 5);
    const forecastContainer = document.querySelector(".forecast");
    forecastContainer.innerHTML = "";
    forecastItems.forEach((item) => {
      const { dt_txt } = item;
      const { icon } = item.weather[0];
      const { temp } = item.main;
      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");
      forecastItem.innerHTML = `
        <div class="forecast-time">${dt_txt.split(" ")[1]}</div>
        <img class="forecast-icon" src="https://openweathermap.org/img/wn/${icon}.png" />
        <div class="forecast-temp">${temp}°C</div>
      `;
      forecastContainer.appendChild(forecastItem);
    });
  }

  search() {
    const query = document.querySelector(".search-bar").value;
    if (query) {
      this.fetchWeather(query);
      this.fetchForecast(query);
    }
  }
}

const weather = new Weather("2440bc365799e6c0569099749cfaecf1");

document.querySelector(".search button").addEventListener("click", function() {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Denver");
weather.fetchForecast("Denver");