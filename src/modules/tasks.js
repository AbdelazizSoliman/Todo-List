import { markTaskComplete, markTaskIncomplete } from './status.js';

let tasks = [];
const taskList = document.querySelector('#tasks');
const titleElement = document.createElement('span');

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM(task) {
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  if (task.completed) {
    taskElement.classList.add('completed');
  }
  taskElement.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', (event) => {
    const taskId = taskElement.dataset.id;
    if (event.target.checked) {
      markTaskComplete(taskId);
      taskElement.classList.add('completed');
    } else {
      markTaskIncomplete(taskId);
      taskElement.classList.remove('completed');
    }
  });

  const titleElement = document.createElement('span');
  titleElement.className = 'title';
  titleElement.contentEditable = true;
  titleElement.textContent = task.title;
  titleElement.addEventListener('input', () => {
    task.title = titleElement.textContent;
    saveTasksToLocalStorage();
  });

  const deleteButton = document.createElement('span');
  deleteButton.className = 'del';
  deleteButton.appendChild(document.createTextNode('Delete'));
  deleteButton.addEventListener('click', () => {
    deleteTask(task.id);
    taskElement.remove();
  });

  taskElement.appendChild(checkbox);
  taskElement.appendChild(titleElement);
  taskElement.appendChild(deleteButton);
  taskList.appendChild(taskElement);
}

function loadTasks() {
  const data = localStorage.getItem('tasks');
  if (data) {
    const tasksFromStorage = JSON.parse(data);
    tasksFromStorage.forEach(addTaskToDOM);
    tasks = tasksFromStorage;
  } else {
    tasks = [];
  }
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

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id.toString() !== taskId.toString());
  saveTasksToLocalStorage();
}

function getCompletedTasks() {
  return tasks.filter((task) => task.done);
}

const clearCompletedButton = document.querySelector('.clear-completed');
clearCompletedButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  Array.from(taskList.children).forEach((taskElement) => {
    if (taskElement.classList.contains('completed')) {
      taskElement.remove();
    }
  });
  saveTasksToLocalStorage();
});

export {
  addTaskToDOM,
  createNewTask,
  deleteTask,
  loadTasks,
  titleElement,
  getCompletedTasks,
};
