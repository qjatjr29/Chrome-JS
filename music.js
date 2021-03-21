const BGM_button = document.querySelector(".BGM_button");
const BGM_NUMBER = 4;
var audio = new Audio();


function playBgm() {
    const randomNum = Math.floor(Math.random() * BGM_NUMBER);
    // event.preventDefault();
    console.log("o")
    console.log(randomNum);
    audio.src = `music/${randomNum + 1}.mp3`;
    audio.play();
    BGM_button.classList.add("playing");
    BGM_button.innerHTML = "PAUSE";
    audio.addEventListener("ended", function () {
        this.currentTime = 0;
        this.play();
    }, false);
}
function pauseBgm() {
    console.log("x")
    audio.pause();
    BGM_button.innerHTML = "BGM";
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