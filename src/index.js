import "./style.css";

const taskList = document.querySelector(".content");
const checkboxSelector = 'input[type="checkbox"]';

if (taskList) {
  const tasks = [
    {
      description: "wash the dishes",
      completed: false,
      index: 1,
    },
    {
      description: "complete To Do list",
      completed: false,
      index: 2,
    },
  ];

  const createListItem = (task) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    const taskContent = document.createElement("span");
    taskContent.innerHTML = task.description;
    const taskAction = document.createElement("div");
    taskAction.innerHTML = "<hr>";
    listItem.appendChild(checkbox);
    listItem.appendChild(taskContent);
    listItem.appendChild(taskAction);
    return listItem;
  };

  const populate = () => {
    const fragment = document.createDocumentFragment();
    tasks
      .sort((a, b) => a.index - b.index)
      .forEach((task) => {
        const listItem = createListItem(task);
        fragment.appendChild(listItem);
      });
    taskList.appendChild(fragment);
  };

  taskList.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.matches(checkboxSelector)) {
      // Handle checkbox click
      const listItem = clickedElement.closest("li");
      const index = Array.from(taskList.children).indexOf(listItem);
      tasks[index].completed = clickedElement.checked;
    }
  });

  document.addEventListener("DOMContentLoaded", populate);
}
