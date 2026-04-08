const STORAGE_KEY = "todoApp.todos";

const addBtn = document.getElementById("add-btn");
const downloadBtn = document.getElementById("download-btn");
const downloadCompletedBtn = document.getElementById("download-completed-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const completedList = document.getElementById("completed-list");

let tasks = loadTasks();

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

downloadBtn.addEventListener("click", function () {
    downloadFile(buildDownloadText(tasks), "todos-");
});

downloadCompletedBtn.addEventListener("click", function () {
    const completedTasks = tasks.filter(function (task) {
        return task.completed;
    });

    if (completedTasks.length === 0) {
        alert("No completed tasks to download");
        return;
    }

    downloadFile(buildDownloadText(completedTasks), "completed-todos-");
});

renderTasks();

function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        alert("Please write a task first");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(function (task) {
        const item = document.createElement("li");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeBtn = document.createElement("button");
        completeBtn.className = "task-btn complete-btn";
        completeBtn.textContent = "Complete";
        completeBtn.disabled = task.completed;
        completeBtn.addEventListener("click", function () {
            completeTask(task.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "task-btn delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            deleteTask(task.id);
        });

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);
        item.appendChild(text);
        item.appendChild(actions);

        if (task.completed) {
            completedList.appendChild(item);
        } else {
            taskList.appendChild(item);
        }
    });
}

function completeTask(id) {
    tasks = tasks.map(function (task) {
        if (task.id === id) {
            return { ...task, completed: true };
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
        return [];
    }
}

function buildDownloadText(taskData) {
    if (taskData.length === 0) {
        return "No tasks found.";
    }

    return taskData.map(function (task, index) {
        const status = task.completed ? "Completed" : "Pending";
        return (index + 1) + ". " + task.text + " (" + status + ")";
    }).join("\n");
}

function downloadFile(content, prefix) {
    const fileName = prefix + new Date().toISOString().slice(0, 10) + ".txt";
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
}

