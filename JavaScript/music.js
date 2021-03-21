const BGM_button = document.querySelector(".BGM_button");
const BGM_icon =BGM_button.querySelector("i");
const BGM_NUMBER = 5;
var audio = new Audio();


function playBgm() {
    let randomNum = Math.floor(Math.random() * BGM_NUMBER);
    // event.preventDefault();
    console.log("o")
    console.log(randomNum);
    audio.src = `music/${randomNum + 1}.mp3`;
    audio.play();
    BGM_button.classList.add("playing");
    // BGM_button.innerHTML = "PAUSE";
    BGM_icon.classList.replace("fa-music","fa-pause");
    audio.addEventListener("ended", function () {
        randomNum = Math.floor(Math.random() * BGM_NUMBER);
        this.src = `music/${randomNum + 1}.mp3`;
        this.currentTime = 0;
        this.play();
    }, false);
}
function pauseBgm() {
    console.log("x")
    audio.pause();
    // BGM_button.innerHTML = "BGM";
    BGM_icon.classList.replace("fa-pause","fa-music");
    // BGM_button.innerHTML = `<i class="fas fa-music fa-2x"></i>`;

    BGM_button.classList.remove("playing");
}

function checkPlaying(event) {
    event.preventDefault();
    console.log(BGM_button.classList.contains("playing"));
    if (BGM_button.classList.contains("playing")) {
        console.log("x")
        pauseBgm();
    }
    else {
        playBgm();
    }
}

function init() {
    // if (BGM_button.classList.contains("playing") == true) {

    //     BGM_button.addEventListener("click", pauseBgm);
    // }
    // else {
    //     console.log("x")
    //     BGM_button.addEventListener("click", playBgm);
    // }
    BGM_button.addEventListener("click", checkPlaying);

}

init();