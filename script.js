const API_KEY = "97453c013f265647d9de207ae7525aeb";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".weather");

const getWeather = async (city) => {
    weather.innerHTML = `<h2>Loading...</h2>`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        showWeather(data);
    } catch (error) {
        weather.innerHTML = `<h3>Error fetching data</h3>`;
    }
};

const showWeather = (data) => {
    if (data.cod === "404") {
        weather.innerHTML = `<h3>City not found</h3>`;
        return;
    }

    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
        </div>
        <div>
            <h2>${Math.round(data.main.temp)} ℃</h2>
            <h4>${data.weather[0].main}</h4>
            <h3 class="city">${data.name}</h3>
        </div>
        <div class="details">
            <div class="col">
                <img src="assets/humidity.png" alt="Humidity">
                <div>
                    <p class="humidity">${data.main.humidity}%</p>
                    <p>Humidity</p>
                </div>
            </div>
            <div class="col">
                <img src="assets/image.png" alt="Wind Speed">
                <div>
                    <p class="wind">${data.wind.speed} km/h</p>
                    <p>Wind Speed</p>
                </div>
            </div>
        </div>
    `;
};

searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather(searchBox.value);
    }
});
