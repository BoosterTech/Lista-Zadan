{
    const tasks = [];

    const init = () => {
        const form = document.querySelector(".js-addTaskForm");

        form.addEventListener("submit", event => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-addTaskForm__input").value.trim();

            if (newTaskContent === "") {
                return;
            }
            addNewTask(newTaskContent)

            console.log(newTaskContent);

        })
    }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        renderTasks();
    }

    const renderTasks = () => {
        let taskHtmlText = "";

        for (const task of tasks) {
            taskHtmlText += `
            <li class="tasksList__item" ${task.done ? "style=\"text-decoration: line-through\"" : ""}>
            <button class="js-done"></button>
            ${task.content}
            <button class="js-remove">🗑️</button>
            </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = taskHtmlText;
    }

    init();
}