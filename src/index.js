import './style.css';

const taskList = document.querySelector('.content');
if (taskList) {
  const tasks = [
    {
      description: 'wash the dishes',
      completed: false,
      index: 1,
    },
    {
      description: 'complete To Do list',
      completed: false,
      index: 2,
    },
  ];
  const populate = () => {
    tasks
      .sort((a, b) => a.index - b.index)
      .forEach((task) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        const taskContent = document.createElement('span');
        taskContent.innerHTML = task.description;
        const taskAction = document.createElement('div');
        taskAction.innerHTML = '<hr>';
        listItem.appendChild(checkbox);
        listItem.appendChild(taskContent);
        listItem.appendChild(taskAction);
        taskList.appendChild(listItem);
      });
  };

  document.addEventListener('DOMContentLoaded', populate);
}
