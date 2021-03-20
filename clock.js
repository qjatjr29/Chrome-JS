const clockContainer = document.querySelector(".function__clock");
const clockText = clockContainer.querySelector("h1");
const DateText = clockContainer.querySelector("h3");

const dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


function getTime() {
    const Time = new Date();
    const hours = Time.getHours();
    const minutes = Time.getMinutes();
    const seconds = Time.getSeconds();
    let day = Time.getDay();
    const month = Time.getMonth();
    const years = Time.getFullYear();
    const date = Time.getDate();
    day = dayList[day];
    clockText.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    DateText.innerText = `${years}. ${month}. ${date}  ${day}`;
}


function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();