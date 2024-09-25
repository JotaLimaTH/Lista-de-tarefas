getTasks();

function addTask() {
    const inputTask = document.getElementById("newTask");
    const newTask = inputTask.value;
    if (newTask.trim() == ""){
        return;
    }
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.push({ task: newTask, finished: 'false' })
    localStorage.setItem('taskList', JSON.stringify(taskList));
    inputTask.value = "";
    getTasks()    
}

function getTasks() {
    const taskListUl = document.getElementById("taskList");
    taskListUl.innerHTML = '';

    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

    taskList.forEach((task, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.innerHTML = task.task;

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Excluir';
        buttonDelete.addEventListener('click', () => deleteTask(index));

        li.appendChild(span);
        li.appendChild(checkbox);
        li.appendChild(buttonDelete);
        taskListUl.appendChild(li);
    });
}

function deleteTask(index) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));

    getTasks();
}

function deleteAllTasks() {
    const taskListUl = document.getElementById("taskList");
    const taskListLi = taskListUl.querySelectorAll("li");
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    let removedCount = 0;
    
    taskListLi.forEach((li, index) => {
        const checkbox = li.querySelector("input[type='checkbox']");
        if (checkbox.checked){
            console.log(`Elemento de index ${index} marcado`);
            taskList.splice(index - removedCount, 1);
            removedCount++;
        }
    })
    localStorage.setItem("taskList", JSON.stringify(taskList));
    getTasks();
}