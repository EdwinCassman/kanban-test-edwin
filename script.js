const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane"); // Example lane
const lanes = document.querySelectorAll(".swim-lane"); // All lanes

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];

    lanes.forEach(lane => {
        const laneTasks = lane.querySelectorAll(".task");
        laneTasks.forEach(task => {
            tasks.push({
                text: task.innerText,
                lane: lane.id, // Store the lane ID
            });
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            createTaskElement(task.text, task.lane);
        });
    }
}

// Function to create a new task element and add it to the correct lane
function createTaskElement(taskText, laneId) {
    const newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = taskText;

    // Drag events for the task
    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });

    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
        saveTasks(); // Save tasks after dragging ends
    });

    // Append the task to the specified lane
    const lane = document.getElementById(laneId);
    if (lane) {
        lane.appendChild(newTask);
    } else {
        console.error(`Lane with id "${laneId}" not found.`);
    }
}


// Load tasks from localStorage when the page loads
window.addEventListener("load", loadTasks);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value;
    if (!value) return;

    // Create and append the new task to the default lane
    createTaskElement(value, "todo-lane"); // Default lane ID (adjust if necessary)

    // Save tasks to localStorage
    saveTasks();

    input.value = "";
});

