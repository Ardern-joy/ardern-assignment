document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = taskText;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Delete';
    closeButton.className = 'close';
    closeButton.onclick = () => {
        taskList.removeChild(li);
        saveTasks();
    };

    li.appendChild(closeButton);
    li.onclick = () => {
        li.classList.toggle('completed');
        saveTasks();
    };

    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll('#taskList li');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = '';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? '' : 'none';
                break;
            case 'pending':
                task.style.display = task.classList.contains('completed') ? 'none' : '';
                break;
        }
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        tasks.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Delete';
        closeButton.className = 'close';
        closeButton.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(closeButton);
        li.onclick = () => {
            li.classList.toggle('completed');
            saveTasks();
        };

        taskList.appendChild(li);
    });
}