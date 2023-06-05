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

  const onFormSubmit = (event) => {
    event.preventDefault();

    const taskInputField = document.querySelector('.js-taskFormInput');
    const newTaskContent = document.querySelector('.js-taskFormInput').value.trim();

    if (newTaskContent !== '') {
      addNewTask(newTaskContent);
      taskInputField.value = "";
    }

    taskInputField.focus();
  };

  const init = () => {
    const form = document.querySelector('.js-taskForm');

    form.addEventListener('submit', onFormSubmit);
  }

  const renderTasks = () => {
    let taskHtmlText = '';

    for (const task of tasks) {
      taskHtmlText += `
       <li class="tasksList__item">
        <button class="taskDone"> ${task.done ? "✓" : ""} </button>
        <span class="taskContent ${task.done ? "taskContent--done" : ""}"> ${task.content} </span>
        <button class="taskRemove">🗑️</button>
       </li>
     `
    }
    document.querySelector('.js-tasksList').innerHTML = taskHtmlText;

    const toggleDoneButtons = document.querySelectorAll(".taskDone");

    toggleDoneButtons.forEach((toggleTaskButton, taskIndex) => {
      toggleTaskButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });

    const toggleRemoveButtons = document.querySelectorAll(".taskRemove");

    toggleRemoveButtons.forEach((toggleDoneButton, Index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleRemoveTask(Index);
      });
    });
  }

  init();
}
