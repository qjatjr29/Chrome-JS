const body = document.querySelector("body");

const IMG_NUM = 3;

function displayImage() {
    const randomNumber = Math.floor(Math.random() * IMG_NUM);
    const background_img = new Image();
    background_img.src = `img/${randomNumber + 1}.jpg`;
    background_img.classList.add("bgimage");
    body.appendChild(background_img);
}


function init() {
    displayImage();
}

init();