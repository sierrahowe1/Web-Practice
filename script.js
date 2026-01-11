const timeDisplay = document.getElementById("timeDisplay");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const sessions = document.getElementById("session");

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
    if(interval !== null) return;
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

let tasks = loadTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const local = localStorage.getItem("tasks");
    if(local) {
        return JSON.parse(local);
    } else {
        return [];
    }
}

function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task) => {
        const paper = document.createElement("li");
        paper.className = "taskItem" + (task.done ? " done" : "");

        const left = document.createElement("div");
        left.textContent = task.text;

        const right = document.createElement("div");

        const toggle = document.createElement("button");
        toggle.className = "secondary";
        toggle.textContent = task.done ? "Undo" : "Done";

        toggle.addEventListener("click", () => {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "secondary";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter((t) => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        right.appendChild(toggle);
        right.appendChild(deleteButton);

        paper.appendChild(left);
        paper.appendChild(right);

        list.appendChild(paper);
    });
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = taskInput.value.trim();
    if(!text) return;

    tasks.push({id: Date.now(), text, done: false});
    taskInput.value = "";
    saveTasks();
    renderTasks();
});

clear.addEventListener("click", () => {
    tasks = tasks.filter((t) => !t.done);
    saveTasks();
    renderTasks();
});

renderTasks();

