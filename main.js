class TodoList {
    constructor() {
        this.tareas = [];
    }

    agregarTarea(tarea) {
        this.tareas.push(tarea);
    }

    eliminarTarea(index) {
        this.tareas.splice(index, 1);
    }

    completarTarea(index) {
        const tarea = this.tareas[index];
        tarea.completed = !tarea.completed;
    }

    editarTarea(index, nuevoTexto) {
        this.tareas[index].text = nuevoTexto;
    }

    obtenerTareas() {
        return this.tareas;
    }
}

class App {
    constructor() {
        this.todoList = new TodoList();

        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        this.completedTaskList = document.getElementById('completedTaskList');
        this.emptyMessage = document.getElementById('emptyMessage');

        this.taskForm.addEventListener('submit', (event) => this.addTask(event));
        this.checkIfEmpty();
    }

    addTask(event) {
        event.preventDefault();

        const taskText = this.taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const task = { text: taskText, completed: false };
        this.todoList.agregarTarea(task);

        this.renderTask(task, this.taskList);
        this.taskInput.value = '';
        this.checkIfEmpty();
    }

    renderTask(task, listElement) {
        const listItem = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        taskSpan.className = 'task-text';
        if (task.completed) {
            taskSpan.classList.add('completed');
        }

        const editButton = document.createElement('button');
        editButton.className = 'btn-edit';
        editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
        editButton.addEventListener('click', () => {
            this.editTask(taskSpan);
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn-delete';
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteButton.addEventListener('click', () => {
            const index = Array.from(listElement.children).indexOf(listItem);
            this.deleteTask(listItem, index, listElement === this.taskList);
        });

        const completeButton = document.createElement('button');
        completeButton.className = 'btn-complete';
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completeButton.addEventListener('click', () => {
            const index = Array.from(listElement.children).indexOf(listItem);
            this.completeTask(listItem, taskSpan, index);
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);

        listElement.appendChild(listItem);
    }

    completeTask(listItem, taskSpan, index) {
        taskSpan.classList.toggle('completed');
        this.todoList.completarTarea(index);

        const task = this.todoList.obtenerTareas()[index];
        listItem.remove();

        if (task.completed) {
            this.renderTask(task, this.completedTaskList);
        } else {
            this.renderTask(task, this.taskList);
        }

        this.checkIfEmpty();
    }

    deleteTask(listItem, index, isActiveList) {
        listItem.remove();
        this.todoList.eliminarTarea(index);

        if (isActiveList) {
            this.checkIfEmpty();
        }
    }

    editTask(taskSpan) {
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

            const index = Array.from(taskSpan.parentElement.parentElement.children).indexOf(taskSpan.parentElement);
            this.todoList.editarTarea(index, newText);
        });

        taskSpan.style.display = 'none';
        taskSpan.parentElement.insertBefore(input, taskSpan.nextSibling);
        taskSpan.parentElement.insertBefore(saveButton, input.nextSibling);
        input.focus();
    }

    checkIfEmpty() {
        if (this.taskList.children.length === 0) {
            this.emptyMessage.style.display = 'block';
        } else {
            this.emptyMessage.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});