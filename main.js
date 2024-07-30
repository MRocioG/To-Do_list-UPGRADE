document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const completedTaskList = document.getElementById('completedTaskList');
    const emptyMessage = document.getElementById('emptyMessage');

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        addTask(taskText);
        taskInput.value = '';
        checkIfEmpty();
    });

    function addTask(taskText) {
        const listItem = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.className = 'task-text';

        const editButton = document.createElement('button');
        editButton.className = 'btn-edit';
        editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
        editButton.addEventListener('click', () => {
            editTask(taskSpan);
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn-delete';
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteButton.addEventListener('click', () => {
            listItem.remove();
            checkIfEmpty();
        });

        const completeButton = document.createElement('button');
        completeButton.className = 'btn-complete';
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completeButton.addEventListener('click', () => {
            completeTask(listItem, taskText);
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    }

    function completeTask(listItem, taskText) {
        listItem.remove();
        const completedListItem = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.className = 'task-text completed';

        const backToDoButton = document.createElement('button');
        backToDoButton.className = 'btn-back';
        backToDoButton.innerHTML = '<i class="fa-solid fa-circle-arrow-up"></i>';
        backToDoButton.addEventListener('click', () => {
            moveBackToDo(completedListItem, taskText);
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn-delete';
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteButton.addEventListener('click', () => {
            completedListItem.remove();
        });

        completedListItem.appendChild(taskSpan);
        completedListItem.appendChild(backToDoButton);
        completedListItem.appendChild(deleteButton);

        completedTaskList.appendChild(completedListItem);
        checkIfEmpty();
    }

    function moveBackToDo(listItem, taskText) {
        listItem.remove();
        addTask(taskText);
        checkIfEmpty();
    }

    function editTask(taskSpan) {
        const currentText = taskSpan.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';

        const saveButton = document.createElement('button');
        saveButton.className = 'btn-save';
        saveButton.innerHTML = '<i class="fa-regular fa-floppy-disk"></i>';
        saveButton.addEventListener('click', () => {
            const newText = input.value.trim();
            if (newText === '') {
                alert('Task cannot be empty.');
                return;
            }
            taskSpan.textContent = newText;
            taskSpan.style.display = 'inline';
            input.remove();
            saveButton.remove();
        });

        taskSpan.style.display = 'none';
        taskSpan.parentElement.insertBefore(input, taskSpan.nextSibling);
        taskSpan.parentElement.insertBefore(saveButton, input.nextSibling);
        input.focus();
    }

    function checkIfEmpty() {
        if (taskList.children.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
        }
    }

    checkIfEmpty();
});
