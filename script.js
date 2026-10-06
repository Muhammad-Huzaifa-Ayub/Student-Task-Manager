let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
    displayTasks();
});

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    input.value = "";
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveAndRender();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

function clearAllTasks() {
    if (tasks.length === 0) return;
    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        saveAndRender();
    }
}

function setFilter(filter) {
    currentFilter = filter;

    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach(btn => btn.classList.remove("active"));

    const activeBtn = Array.from(buttons).find(
        btn => btn.textContent.toLowerCase() === filter
    );
    if (activeBtn) activeBtn.classList.add("active");

    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    const searchInput = document.getElementById("searchInput");
    const query = searchInput ? searchInput.value.toLowerCase() : "";

    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(query);
        if (currentFilter === "completed") return task.completed && matchesSearch;
        if (currentFilter === "pending") return !task.completed && matchesSearch;
        return matchesSearch;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }

        const leftDiv = document.createElement("div");
        leftDiv.style.display = "flex";
        leftDiv.style.alignItems = "center";
        leftDiv.style.gap = "10px";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id);

        const span = document.createElement("span");
        span.textContent = task.text;

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateCounters();
}

function updateCounters() {
    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");
    const pendingTasks = document.getElementById("pendingTasks");

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    if (totalTasks) totalTasks.textContent = total;
    if (completedTasks) completedTasks.textContent = completed;
    if (pendingTasks) pendingTasks.textContent = pending;
}

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}