{
    const tasks = [{}];

    const init = () => {
        const form = document.querySelector(".js-addTaskForm");

        form.addEventListener("submit", event => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-addTaskForm__input").value.trim();

            if (newTaskContent === "")
                return;
            console.log(newTaskContent);
        })
    }

    init();
}