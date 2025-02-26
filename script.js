// Fetch tasks from localStorage if available
let pendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

function displayTasks() {
  const pendingList = document.getElementById("pending-tasks");
  const completedList = document.getElementById("completed-tasks");

  // Clear the existing list
  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  // Display Pending Tasks
  pendingTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text} <em>(${task.dateAdded})</em></span>
      <button class="complete" onclick="completeTask(${index})">Complete</button>
      <button class="edit" onclick="editTask(${index})">Edit</button>
      <button class="delete" onclick="deleteTask(${index}, 'pending')">Delete</button>
    `;
    pendingList.appendChild(li);
  });

  // Display Completed Tasks
  completedTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text} <em>(${task.dateAdded})</em> - Completed: <em>(${task.dateCompleted})</em></span>
      <button class="edit" onclick="editTask(${index}, 'completed')">Edit</button>
      <button class="delete" onclick="deleteTask(${index}, 'completed')">Delete</button>
    `;
    completedList.appendChild(li);
  });
}

// Add Task
function addTask() {
  const taskInput = document.getElementById("task-input");
  if (taskInput.value.trim() === "") return;

  const task = {
    text: taskInput.value,
    dateAdded: new Date().toLocaleString(),
  };

  pendingTasks.push(task);
  taskInput.value = "";
  saveTasks();
  displayTasks();
}

// Mark Task as Complete
function completeTask(index) {
  const task = pendingTasks.splice(index, 1)[0];
  task.dateCompleted = new Date().toLocaleString();
  completedTasks.push(task);
  saveTasks();
  displayTasks();
}

// Edit Task
function editTask(index, list = "pending") {
  const newText = prompt("Edit your task:", list === "pending" ? pendingTasks[index].text : completedTasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    if (list === "pending") {
      pendingTasks[index].text = newText;
    } else {
      completedTasks[index].text = newText;
    }
    saveTasks();
    displayTasks();
  }
}

// Delete Task
function deleteTask(index, list = "pending") {
  if (list === "pending") {
    pendingTasks.splice(index, 1);
  } else {
    completedTasks.splice(index, 1);
  }
  saveTasks();
  displayTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

// Initial display of tasks
displayTasks();
