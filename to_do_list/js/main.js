const tasks = [
    {
        title: "Apprendre mon cours de JavaScript",
        priority: 1
    },
    {
        title: "Créer mon compte Github",
        priority: 2
    },
    {
        title: "Répondre à mes emails",
        priority: 3
    }
];

const taskListElement = document.getElementById("task-list");
const addTaskForm = document.getElementById("add-task-form");
const taskTitleInput = document.getElementById("task-title");
const taskPriorityInput = document.getElementById("task-priority");
const deleteTasksButton = document.getElementById("delete-tasks");


function displayTasks() {
    taskListElement.innerHTML = ""; 
    tasks
        .sort((a, b) => a.priority - b.priority) 
        .forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add(`priority-${task.priority}`);

            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.dataset.index = index; 

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${task.title}`));

            listItem.appendChild(label);
            taskListElement.appendChild(listItem);
        });
}

function addTask(event) {
    event.preventDefault();
    const title = taskTitleInput.value.trim();
    const priority = parseInt(taskPriorityInput.value);

    if (title) {
        tasks.push({ title, priority });
        displayTasks();
        addTaskForm.reset(); 
    }
}

function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll("#task-list input[type='checkbox']");
    let deletedCount = 0;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const index = parseInt(checkbox.dataset.index);
            tasks.splice(index - deletedCount, 1); 
            deletedCount++;
        }
    });

    if (deletedCount > 0) {
        alert(`${deletedCount} tâche(s) supprimée(s) avec succès.`);
    }

    displayTasks();
}

addTaskForm.addEventListener("submit", addTask);
deleteTasksButton.addEventListener("click", deleteSelectedTasks);

displayTasks();