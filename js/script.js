let tasks = [];
let hideDoneTasksVar = false;

const addTask = (newTaskContent) => {
  tasks = [...tasks, { content: newTaskContent, done: false }];
  render();
};

const removeTask = (taskIndex) => {
  tasks = [...tasks.slice(0, taskIndex),
  ...tasks.slice(taskIndex + 1),
  ];
  render();
}

const bindRemoveEvents = () => {
  const tasksRemove = document.querySelectorAll(".taskRemove");

  tasksRemove.forEach((toogleRemoveBtn, taskIndex) => {
    toogleRemoveBtn.addEventListener("click", () => {
      removeTask(taskIndex)
    });
  });
}

const toggleTaskDone = (taskIndex) => {
  tasks = [...tasks.slice(0, taskIndex),
  { ...tasks[taskIndex], done: !tasks[taskIndex].done },
  ...tasks.slice(taskIndex + 1)
  ];
  render();
}

const bindToggleDoneEvents = () => {
  const taskDoneBtns = document.querySelectorAll(".taskDone");

  taskDoneBtns.forEach((toogleTaskBtn, taskIndex) => {
    toogleTaskBtn.addEventListener("click", () => {
      toggleTaskDone(taskIndex)
    });
  });
}

const markAllTasksDone = () => {
  tasks = tasks.map((task) => ({
    ...task,
    done: true,
  }));
}

const isDone = (task) => {
  return task.done;
};

const renderTasks = () => {
  const taskToHTML = (task) =>
    `
          <li class="tasksList__item ${hideDoneTasksVar && task.done ? "tasksList__item--hidden" : ""}">
            <button class="taskDone ">${(task.done) ? "✓" : ""}</button>
            <span class="taskContent ${(task.done) ? "taskContent--done" : ""}">${task.content}</span>
            <button class="taskRemove">🗑️</button>
          </li>
        `

  let tasksList = document.querySelector(".js-tasksList");
  tasksList.innerHTML = tasks.map(taskToHTML).join("");
};

const bindButtonsEvents = () => {
  showHideDoneElement = document.querySelector('.js-showHideTasksBtn');
  markAllDoneElement = document.querySelector('.js-markAllDoneBtn');

  if (markAllDoneElement) {
    markAllDoneElement.addEventListener('click', () => {
      markAllTasksDone();
      render();
    });
  }

  if (showHideDoneElement) {
    showHideDoneElement.addEventListener('click', () => {
      hideDoneTasksVar = !hideDoneTasksVar;
      render();
    });
  }
}

const renderBtns = () => {
  const buttonsElement = document.querySelector(".js-buttons");

  if (!tasks.length) {
    buttonsElement.innerHTML = "";
    return;
  };

  buttonsElement.innerHTML = `
     <button class = "js-showHideTasksBtn  buttons" ${!(tasks.some(isDone)) ? "disabled" : ""}> ${hideDoneTasksVar ? "Pokaż" : "Ukryj"} ukończone </button> 
     <button class = "js-markAllDoneBtn buttons"  ${tasks.every(isDone) ? "disabled" : ""}> Ukończ wszystkie </button> 
    `
}

const render = () => {
  renderTasks();
  bindRemoveEvents();
  bindToggleDoneEvents();

  renderBtns();
  bindButtonsEvents();
};

const onSubmit = (event) => {
  event.preventDefault();

  const taskInput = document.querySelector('.js-taskFormInput');
  let taskContent = taskInput.value;

  if (taskContent.trim() !== '') {
    addTask(taskContent);
    taskInput.value = "";
  }

  taskInput.focus();
};

const init = () => {
  render();
  const form = document.querySelector('.js-taskForm');
  form.addEventListener('submit', onSubmit);
}

init();

