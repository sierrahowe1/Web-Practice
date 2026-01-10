const timeDisplay = document.getElementById("timeDisplay");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const session = document.getElementById("session");

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const list = document.getElementById("list");
const clear = document.getElementById("clear");

let seconds = 25*60;
let interval = null;
let sessions = 0;

function time() {
    const minutes = String(Math.floor(seconds/60)).padStart(2, "0");
    const sec = String(seconds%60).padStart(2, "0");
    timeDisplay.textContent = `${minutes}:${sec}`;
}

function tick() {
    if(seconds > 0) {
        seconds--;
        time();
    }else {
        clearInterval(interval);
        interval = null;
        sessions++;
        session.textContent = `Sessions completed: ${sessions}`;
        seconds = 25 * 60;
        time();
        alert("Take a short break!");
    }
}

startButton.addEventListener("click", () => {
    if(interval != null) return;
    interval = setInterval(tick, 1000);
});

pauseButton.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
});

resetButton.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    seconds = 25 * 60;
    time();
});

time();