function addTask() {
    const input = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (input.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = input.value;

    li.onclick = function () {
        li.remove();
    };

    taskList.appendChild(li);
    input.value = "";
}