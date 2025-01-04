// Elementos del DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Función para cargar las tareas desde localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
        addTaskToList(task.text, task.completed, index);
    });
}

// Función para agregar una tarea a la lista
function addTaskToList(taskText, isCompleted, index) {
    const li = document.createElement("li");
    li.classList.toggle("completed", isCompleted);

    // Añadir el texto de la tarea
    const taskTextNode = document.createElement("span");
    taskTextNode.textContent = taskText;
    taskTextNode.addEventListener("click", () => toggleTaskCompletion(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteTask(index));

    li.appendChild(taskTextNode);
    li.appendChild(deleteButton);

    // Añadir animación de lluvia
    taskList.appendChild(li);
    animateRainEffect(li);
}

// Función para agregar una nueva tarea
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        addTaskToList(taskText, false, tasks.length - 1);
        taskInput.value = ""; // Limpiar el campo de entrada
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

// Función para animar la caída de tareas (como lluvia)
function animateRainEffect(li) {
    const startPositionX = Math.random() * window.innerWidth; // Posición aleatoria en X
    const startPositionY = -100; // Comienza fuera de la pantalla por encima (fuera de la vista)
    const endPositionY = window.innerHeight + 50; // Termina fuera de la pantalla por debajo
    const animationDuration = 4 + Math.random() * 4; // Duración aleatoria entre 4 y 8 segundos
    const animationDelay = Math.random() * 2; // Retardo aleatorio para que no caigan todas al mismo tiempo

    // Establecer la posición inicial y el estilo de animación
    li.style.left = `${startPositionX}px`; // Establecer posición aleatoria en X
    li.style.top = `${startPositionY}px`; // Comienza fuera de la pantalla en la parte superior
    li.style.animation = `fall ${animationDuration}s ${animationDelay}s infinite ease-out`;

    // Pausar animación cuando el mouse pasa sobre la tarea
    li.addEventListener("mouseenter", function () {
        li.style.animationPlayState = "paused"; // Detener la animación
    });

    // Reanudar la animación cuando el mouse sale
    li.addEventListener("mouseleave", function () {
        li.style.animationPlayState = "running"; // Reanudar la animación
    });
}

// Event listener para agregar tareas
addTaskButton.addEventListener("click", addTask);

// Cargar tareas al inicio
loadTasks();

