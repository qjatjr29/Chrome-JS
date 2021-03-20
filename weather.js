const _location = document.querySelector(".weather_location");
const temperature = document.querySelector(".weather-temperature");
const feelLike = document.querySelector(".weather-feelLike");
const humidity = document.querySelector(".weather-humidity");
const main = document.querySelector(".weather-main");

const WEATHER_API_KEY = "e29af268829ec74a36830507fbe43875";
const COORDS = "coords";

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function getWeather(lat, lon) {
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (json) {
            const Current_temperature = json.main.temp;
            const Current_location_city = json.name;
            const Current_location_country = json.sys.country;
            const Current_feelLike = json.main.feels_like;
            const Current_humidity = json.main.humidity;
            const Current_main = json.weather[0].main;
            // const Current_icon = json.weather[0].icon;
            _location.innerText = `${Current_location_city} . ${Current_location_country}`;
            temperature.innerText = `${Current_temperature}`;
            feelLike.innerText = `${Current_feelLike}`;
            humidity.innerText = `${Current_humidity} %`;
            main.innerText = `${Current_main} `;

        });

}

function Geolocation_success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObject = {
        "latitude": latitude, "longitude": longitude
        // latitude, longitude
    };
    console.log(latitude, longitude);
    saveCoords(coordsObject);
    getWeather(latitude, longitude);
}

function Geolocation_fail() {
    console.log("fail!");
}


function askforCoords() {
    // console.log("ask");
    navigator.geolocation.getCurrentPosition(Geolocation_success, Geolocation_fail);
}


function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askforCoords();
    }
    else {
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords.latitude, parseCoords.longitude);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();