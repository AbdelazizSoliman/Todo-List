import './style.css';

import {
  createNewTask,
  deleteTask,
  loadTasks,
  titleElement,
  getCompletedTasks,
} from './modules/tasks.js';

const input = document.querySelector('#new-task-input');
const submitButton = document.querySelector('.add');
const taskList = document.querySelector('#tasks');
const filterButton = document.querySelector('#filter-button');
loadTasks();

// Add task
submitButton.onclick = (e) => {
  e.preventDefault();
  if (input.value !== '') {
    createNewTask(input.value);
    input.value = '';
  }
};

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('del')) {
    const { id } = e.target.parentElement.dataset;
    deleteTask(id);
    e.target.parentElement.remove();
  }
  titleElement.focus();
});

filterButton.addEventListener('click', () => {
  const completedTasks = getCompletedTasks();

  completedTasks.forEach((task) => {
    const taskElement = document.querySelector(`[data-id="${task.id}"]`);
    taskElement.remove();
    deleteTask(task.id);
  });
});
