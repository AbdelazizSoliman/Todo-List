/* eslint-disable*/
let tasks = [];
const taskList = document.querySelector("#tasks");

function createTitleElement(title) {
  const element = document.createElement("span");
  element.className = "title";
  element.contentEditable = true;
  element.textContent = title;
  return element;
}

function saveTasksToLocalStorage() {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  localStorage.setItem("tasks", JSON.stringify(incompleteTasks));
  console.log("Saved tasks:", incompleteTasks);
}

function handleTitleInput(e) {
  const taskElement = e.target.parentElement;
  const taskId = taskElement.dataset.id;
  const task = tasks.find((task) => task.id.toString() === taskId.toString());
  task.title = e.target.textContent;
  saveTasksToLocalStorage();
}

function createDeleteButton() {
  const element = document.createElement("span");
  element.className = "del";
  element.appendChild(document.createTextNode("Delete"));
  return element;
}

function createCheckbox(completed) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  return checkbox;
}

function markTaskComplete(taskId) {
  const task = tasks.find((task) => task.id.toString() === taskId.toString());
  task.completed = true;
  saveTasksToLocalStorage();

  const taskElement = document.querySelector(`[data-id="${taskId}"]`);
  taskElement.classList.add("done");
}

function markTaskIncomplete(taskId) {
  const task = tasks.find((task) => task.id.toString() === taskId.toString());
  task.completed = false;
  saveTasksToLocalStorage();

  const taskElement = document.querySelector(`[data-id="${taskId}"]`);
  taskElement.classList.remove("done");
}

function handleCheckboxChange(e) {
  const taskId = e.target.parentElement.dataset.id;
  if (e.target.checked) {
    markTaskComplete(taskId);
  } else {
    markTaskIncomplete(taskId);
  }
}

function addTaskToDOM(task) {
  const taskElement = document.createElement("div");
  taskElement.className = "task";
  if (task.completed) {
    taskElement.classList.add("done");
  }
  taskElement.dataset.id = task.id;

  const checkbox = createCheckbox(task.completed);
  checkbox.addEventListener("change", handleCheckboxChange);

  const titleElement = createTitleElement(task.title);
  titleElement.addEventListener("input", handleTitleInput);

  const deleteButton = createDeleteButton();
  taskElement.appendChild(checkbox);
  taskElement.appendChild(titleElement);
  taskElement.appendChild(deleteButton);
  taskList.appendChild(taskElement);

  // update the index prop of each remaining task
  task.index = tasks.length;
  saveTasksToLocalStorage();
}

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks = storedTasks;
    tasks.forEach((task) => {
      addTaskToDOM(task);
    });
  }
  console.log("Loaded tasks:", tasks);
}

function updateTaskIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id.toString() !== taskId.toString());
  updateTaskIndexes();
  saveTasksToLocalStorage();
}

function handleTaskListClick(e) {
  if (e.target.classList.contains("del")) {
    const taskId = e.target.parentElement.dataset.id;
    deleteTask(taskId);
    e.target.parentElement.remove();
    updateTaskIndexes();
  }
}

function setupEventListeners() {
  taskList.addEventListener("click", handleTaskListClick);
}

function initializeTasks() {
  loadTasks();
  setupEventListeners();
}

function createNewTask(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  tasks.push(task);
  addTaskToDOM(task);
  saveTasksToLocalStorage();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  const taskElements = document.querySelectorAll(".done");
  taskElements.forEach((taskElement) => {
    taskElement.remove();
  });
  updateTaskIndexes();
  saveTasksToLocalStorage();
}
export {
  saveTasksToLocalStorage,
  initializeTasks,
  createNewTask,
  deleteTask,
  markTaskComplete,
  markTaskIncomplete,
  clearCompletedTasks,
  tasks, // exporting tasks array for testing purposes
};
