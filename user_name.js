const Nameform = document.querySelector(".form__name");
const inputName = Nameform.querySelector("input");
const displayName = document.querySelector(".display_name");

const USER_LS = "currentUser"
const SHOWING_CN = "showing"

function saveName(name_text) {
    localStorage.setItem(USER_LS, name_text);
}

function handleSubmit(event) {
    event.preventDefault();
    const Name_text = inputName.value;
    console.log(Name_text);
    display__name(Name_text);
    saveName(Name_text);
}


function askName() {
    Nameform.classList.add(SHOWING_CN);
    Nameform.addEventListener("submit", handleSubmit);
}

function display__name(name_text) {
    Nameform.classList.remove(SHOWING_CN);
    displayName.classList.add(SHOWING_CN);
    displayName.innerText = `Hello! ${name_text}`;
}


function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askName();
    }
    else {
        display__name(currentUser);
    }
}

function init() {
    loadName();
}

init();