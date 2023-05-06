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
