import './style.css';

import {
  createNewTask,
  deleteTask,
  loadTasks,
  titleElement,
} from './modules/tasks.js';

const input = document.querySelector('#new-task-input');
const submitButton = document.querySelector('.add');
const taskList = document.querySelector('#tasks');
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
