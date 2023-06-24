import './style.css';

import { initializeTasks, createNewTask } from './modules/tasks.js';
import {
  markTaskComplete,
  markTaskIncomplete,
  clearCompletedTasks,
} from './modules/status.js';

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

function handleCheckboxChange(e) {
  const taskId = e.target.parentElement.dataset.id;
  if (e.target.checked) {
    markTaskComplete(taskId);
  } else {
    markTaskIncomplete(taskId);
  }
}

function handleClearButtonClick() {
  clearCompletedTasks();
  const taskElements = document.querySelectorAll('.task');
  taskElements.forEach((taskElement) => {
    if (taskElement.classList.contains('done')) {
      taskElement.remove();
    }
  });
}

function setupEventListeners() {
  const checkboxes = document.querySelectorAll('.task input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });

  const clearButton = document.querySelector('.clear');
  clearButton.addEventListener('click', handleClearButtonClick);
}

setupEventListeners();
