import { tasks, saveTasksToLocalStorage } from './tasks.js';

function markTaskComplete(taskId) {
  const task = tasks.find((task) => task.id.toString() === taskId.toString());
  task.completed = true;
  saveTasksToLocalStorage();
}

function markTaskIncomplete(taskId) {
  const task = tasks.find((task) => task.id.toString() === taskId.toString());
  task.completed = false;
  saveTasksToLocalStorage();
}

function clearCompletedTasks() {
  const completedTasks = tasks.filter((task) => task.completed);
  completedTasks.forEach((task) => {
    const taskElement = document.querySelector(`[data-id="${task.id}"]`);
    taskElement.remove();
  });
  tasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage();
}

export { markTaskComplete, markTaskIncomplete, clearCompletedTasks };
