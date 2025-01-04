// Elementos del DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Función para cargar las tareas desde localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        addTaskToList(task.text, task.completed, index);
    });
}

// Función para agregar una tarea a la lista
function addTaskToList(taskText, isCompleted, index) {
    const li = document.createElement("li");
    li.classList.toggle("completed", isCompleted);
    
    const taskTextNode = document.createElement("span");
    taskTextNode.textContent = taskText;
    taskTextNode.addEventListener("click", () => toggleTaskCompletion(index));
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteTask(index));
    
    li.appendChild(taskTextNode);
    li.appendChild(deleteButton);
    
    taskList.appendChild(li);
}

// Función para agregar una nueva tarea
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        addTaskToList(taskText, false, tasks.length - 1);
        taskInput.value = "";
    }
}

// Función para marcar tarea como completada
function toggleTaskCompletion(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Función para eliminar tarea
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Event listener para agregar tareas
addTaskButton.addEventListener("click", addTask);

// Cargar tareas al inicio
loadTasks();
