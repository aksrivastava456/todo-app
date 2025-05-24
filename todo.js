let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
displayTasks();

function playClickSound() {
    const sound = new Audio('sounds/click.mp3');
    sound.volume = 1;
    sound.play();
}

function addTodo() {
    playClickSound();
    let inputElement = document.querySelector('#todo-input');
    let dateElement = document.querySelector('#todo-date');
    let task = inputElement.value;
    let date = dateElement.value;
    if (task === '' || date === '') return;
    taskList.push({item: task, date: date});
    localStorage.setItem('tasks', JSON.stringify(taskList));
    displayTasks();
    inputElement.value = '';
    dateElement.value = '';
}

function displayTasks() {
    let taskDetails = document.querySelector('.task-details');
    taskDetails.innerHTML = '';
    taskList.sort((a, b) => new Date(a.date) - new Date(b.date));
    for (let i = 0; i < taskList.length; i++) {
        let {item, date} = taskList[i];
        taskDetails.innerHTML += `
            <span>${item}</span>
            <span>${date}</span>
            <button class="delete-btn" onclick="deleteTask(${i})">Delete</button>
        `;
    }
}

function deleteTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    playClickSound();
    displayTasks();
}

function clearAll() {
    playClickSound();
    if (taskList.length === 0) return;
    if (confirm("Are you sure ?")) {
        taskList = [];
        localStorage.removeItem('tasks');
        displayTasks();
    }
}