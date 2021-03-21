const clockContainer = document.querySelector(".function__clock");
const clockText = clockContainer.querySelector("h1");
const DateText = clockContainer.querySelector("h3");
// const nextday=document.querySelector)
const A12Text=document.querySelector(".A12time");
const A24Text=document.querySelector(".A24time");
const nextDay12Title=document.querySelector(".nextday12-header");
const nextDay24Title=document.querySelector(".nextday24-header");
// const DayText = clockContainer.querySelector("h4");

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
    clockText.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    DateText.innerHTML = `${years}. ${month}. ${date} <br> ${day}`;
    if(hours+12>24){
        nextDay12Title.innerText="Tomorrow";
    }
    else{
        nextDay12Title.innerText="Today";
    }
    if(hours+24>24){
        nextDay24Title.innerText="Tomorrow";
    }
    else{
        nextDay24Title.innerText="Today";
    }
    const next12=Math.floor(hours+12 / 24);
    const next24=Math.floor(hours+24 / 24);
    if (next12<12){
        A12Text.innerText=`${next12 < 10 ? `0${next12}` : next12} : 00 AM`;
    }
    else{
        A12Text.innerText=`${next12}: 00  PM`;
    }
    if (next24<12){
        A24Text.innerText=`${next24 < 10 ? `0${next24}` : next24}: 00  AM`;
    }
    else{
        A24Text.innerText=`${next24}: 00  PM`;
    }
    
}


function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();