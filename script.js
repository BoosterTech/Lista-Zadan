{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    })
    renderTasks();
  }

  const toggleRemoveTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    renderTasks();
  }

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    renderTasks();
  }

  const init = () => {
    const form = document.querySelector('.js-addTaskForm');
    const taskInputField = document.querySelector('.js-addTaskForm__input');

    form.addEventListener('submit', event => {
      event.preventDefault();

      const newTaskContent = document.querySelector('.js-addTaskForm__input').value.trim();

      if (newTaskContent !== '') {
        addNewTask(newTaskContent);
        taskInputField.value = "";
      }

      taskInputField.focus();
    });
  }

  const renderTasks = () => {
    let taskHtmlText = '';

    for (const task of tasks) {
      taskHtmlText += `
       <li class="tasksList__item">
       <button class="js-taskDone"> ${task.done ? "✓" : ""} </button>
       <span class="${task.done ? "task__content--done" : ""}"> ${task.content} </span>
       <button class="js-taskRemove">🗑️</button>
       </li>
     `
    }
    document.querySelector('.js-tasksList').innerHTML = taskHtmlText;

    const toggleDoneButtons = document.querySelectorAll(".js-taskDone");

    toggleDoneButtons.forEach((toggleTaskButton, taskIndex) => {
      toggleTaskButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });

    const toggleRemoveButtons = document.querySelectorAll(".js-taskRemove");

    toggleRemoveButtons.forEach((toggleDoneButton, Index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleRemoveTask(Index);
      });
    });
  }

  init();
}
