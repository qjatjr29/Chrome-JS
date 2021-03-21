const _location = document.querySelector(".weather_location");
const temperature = document.querySelector(".weather-temperature");
const feelLike = document.querySelector(".weather-feelLike");
const humidity = document.querySelector(".weather-humidity");
const main = document.querySelector(".weather-main");
const _icon=document.querySelector(".weather_icon");
const WEATHER_API_KEY = "e29af268829ec74a36830507fbe43875";
const API_KEY = "e29af268829ec74a36830507fbe43875";
const COORDS = "coords";


const A12temperature = document.querySelector(".A12_weather-temperature");
const A12feelLike = document.querySelector(".A12_weather-feel");
const A12main = document.querySelector(".A12_weather-main");
const A12Img=document.querySelector(".A12-icon")

const A24temperature = document.querySelector(".A24_weather-temperature");
const A24feelLike = document.querySelector(".A24_weather-feel");
const A24main = document.querySelector(".A24_weather-main");
const A24Img=document.querySelector(".A24-icon")


function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getHourWeather(json,hour){
    return json.hourly[hour]
}
function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (json) {
            const Current_temperature = json.current.temp;
            // const Current_location_city = json.current.name;
            // const Current_location_country = json.sys.country;
            const Current_feelLike = json.current.feels_like;
            const Current_humidity = json.current.humidity;
            const Current_main = json.current.weather[0].main;
            const Current_icon=json.current.weather[0].icon;
            // const Current_icon = json.weather[0].icon;
            // _location.innerText = `${Current_location_city} . ${Current_location_country}`;
            temperature.innerText = `${Current_temperature}  ℃`;
            feelLike.innerText = `Feel : ${Current_feelLike} ℃`;
            humidity.innerText = `Humidity : ${Current_humidity} %`;
            main.innerText = `${Current_main} `;
            _icon.src = `http://openweathermap.org/img/wn/${Current_icon}@2x.png`;
            
            const A12H_temperature=getHourWeather(json,12).temp;
            const A12H_feels_like=getHourWeather(json,12).feels_like;
            // const A12H_mainWeather=getHourWeather(json,12).weather[0].main;
            const A12H_icon=getHourWeather(json,12).weather[0].icon;
            const A12H_description=getHourWeather(json,12).weather[0].description;
            const A24H_temperature=getHourWeather(json,24).temp;
            const A24H_feels_like=getHourWeather(json,24).feels_like;
            // const A24H_mainWeather=getHourWeather(json,24).weather[0].main;
            const A24H_icon=getHourWeather(json,24).weather[0].icon;
            const A24H_description=getHourWeather(json,24).weather[0].description;
            console.log(A12H_temperature);
            A12temperature.innerText=`${A12H_temperature}℃`;
            A12feelLike.innerText=`Feel : ${A12H_feels_like}℃`;
            A12main.innerText=`${A12H_description}`;
            A12Img.src = `http://openweathermap.org/img/wn/${A12H_icon}@2x.png`;
            A24temperature.innerText=`${A24H_temperature}℃`;
            A24feelLike.innerText=`Feel : ${A24H_feels_like}℃`;
            A24main.innerText=`${A24H_description}`;
            A24Img.src = `http://openweathermap.org/img/wn/${A24H_icon}@2x.png`;


        });

    // fetch(
    //     `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}=&appid=${API_KEY}&units=metric`)
    //     .then(function (response) {
    //         console.log(response);
    //         return response.json();
    //     })
    //     .then(function (json) {
    //         console.log("mo");
    //         const Current_location_city = json.name;
    //         const Current_location_country = json.country;
    //         _location.innerText = `${Current_location_city} . ${Current_location_country}`;
    //     });


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







// const NextCOORDS = "nextcoords";


// function getNextWeather(lat, lon) {
//     fetch(
//         `http://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${"e29af268829ec74a36830507fbe43875"}`)
//         .then(function (response) {
//             console.log(response);
//             return response.json();
//         });
//         .then(function (json) {
//             const Next_Atemperature = json.main.temp;
//             // const Next_location_city = json.name;
//             // const Next_location_country = json.sys.country;
//             const Next_AfeelLike = json.main.feels_like;
//             const Next_Ahumidity = json.main.humidity;
//             const Next_Amain = json.weather[0].main;
//             // const Current_icon = json.weather[0].icon;
//             _location.innerText = `${Current_location_city} . ${Current_location_country}`;
//             temperature.innerText = `${Current_temperature}  ℃`;
//             feelLike.innerText = `Feel : ${Current_feelLike} ℃`;
//             humidity.innerText = `Humidity : ${Current_humidity} %`;
//             main.innerText = `${Current_main} `;

//         });

// }


// function loadNextCoords() {
//     const loadedNextCoords = localStorage.getItem(COORDS);
//     if (loadedNextCoords === null) {
//         askforCoords();
//     }
//     else {
//         const NextparseCoords = JSON.parse(loadedNextCoords);
//         console.log("next")
//         console.log(NextparseCoords.latitude, NextparseCoords.longitude);
//         getNextWeather(NextparseCoords.latitude, NextparseCoords.longitude);
//     }
// }



// function saveNextCoords(coordsObj) {
//     localStorage.setItem(COORDS, JSON.stringify(coordsObj));
// }







function init() {
    loadCoords();
    // loadNextCoords();
}

init();