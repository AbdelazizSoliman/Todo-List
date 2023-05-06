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
    taskElement.classList.add('done');
  }
  taskElement.dataset.id = task.id;

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

export {
  addTaskToDOM, createNewTask, deleteTask, loadTasks, titleElement,
};
