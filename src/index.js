import './style.css';

import { initializeTasks, createNewTask } from './modules/tasks.js';

const input = document.querySelector('#new-task-input');
const submitButton = document.querySelector('.add');

initializeTasks();

submitButton.onclick = (e) => {
  e.preventDefault();
  if (input.value !== '') {
    createNewTask(input.value);
    input.value = '';
  }
};
