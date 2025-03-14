const API_KEY = "97453c013f265647d9de207ae7525aeb";
const Api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox =document.querySelector(".search input");
const searchbtn =document.querySelector(".search button");
const weather = document.querySelector(".weather");


const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    return showWeather(data)
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h3> City not found</h3>`
        return;
    }
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            
            <h2>${Math.round(data.main.temp)} ℃</h2>
            <h4> ${data.weather[0].main} </h4>
            <div>
            <h3 class="city">${data.name}</h3> <div>
        </div>
            <div class="details">
                <div class="col">
                    <img src="i1.png" >
                    <div > 
                        <p class="humidity">${data.main.humidity} %</p>
                        <p>humid</p>
                    </div>
                </div>
                <div class="col">
                    <img src = "image.png">
                    <div >
                        <p class="wind">${data.wind.speed}km/h</p>
                        <p >wind speed</p>
    `
}
searchbtn.addEventListener("click",()=>{
    getWeather(searchbox.value);
})
searchbox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather(searchbox.value);
    }
});
