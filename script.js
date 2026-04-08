let addBtn = document.getElementById("add-btn");
let taskInput = document.getElementById("task-input");
let taskList = document.getElementById("task-list");
let appContainer = document.getElementById("app-container");

let progressTitle = document.getElementById("progress-title");
if (!progressTitle) {
    progressTitle = document.createElement("h2");
    progressTitle.id = "progress-title";
    progressTitle.innerText = "Progress";
    appContainer.insertBefore(progressTitle, taskList);
}

let completedSection = document.getElementById("completed-section");
let completedList = document.getElementById("completed-list");

if (!completedSection) {
    completedSection = document.createElement("div");
    completedSection.id = "completed-section";

    let completedTitle = document.createElement("h2");
    completedTitle.innerText = "Completed List";

    completedList = document.createElement("ul");
    completedList.id = "completed-list";

    completedSection.appendChild(completedTitle);
    completedSection.appendChild(completedList);
    appContainer.appendChild(completedSection);
}

//add task
addBtn.onclick = function() {
    let inputValue = taskInput.value.trim();


    // empty value handling
    if (inputValue === "") {
        alert("Please write a task first");
        return; 
    }

    let listItem = document.createElement("li");
    listItem.className = "task-item";

    let taskText = document.createElement("span");
    taskText.innerText = inputValue;
    taskText.className = "task-text";

    let actionWrap = document.createElement("div");
    actionWrap.className = "task-actions";

    let completeBtn = document.createElement("button");
    completeBtn.innerText = "Complete";
    completeBtn.className = "task-btn complete-btn";

    completeBtn.onclick = function(event) {
        event.stopPropagation();
        listItem.classList.add("completed");
        completeBtn.disabled = true;
        completedList.appendChild(listItem);
    };

    //delete task
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "task-btn delete-btn";

    deleteBtn.onclick = function(event) {
        event.stopPropagation(); 
        listItem.remove();
    };

    //list the item and delete button
    actionWrap.appendChild(completeBtn);
    actionWrap.appendChild(deleteBtn);
    listItem.appendChild(taskText);
    listItem.appendChild(actionWrap);
    taskList.appendChild(listItem);

    
    taskInput.value = "";
};

