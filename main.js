const toggle = document.getElementById("theme-toggle");
const body = document.body;
const addTask = document.getElementById("add-btn");
const input = document.getElementById("todo-input");
const newTask = document.getElementById("todo-list");
let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    // updateItems();
    addToDo();
  }
});

function addTaskToLocalStorage() {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addNewTasks() {
  const text = input.value.trim();
  if (!text) return;

  const task = {
    id: Date.now(),
    title: text,
    completed: false,
  };

  tasks.push(task);

  addTaskToLocalStorage();
  addToDo();
  input.value = "";
}

// update data from local if a change (حصل ) occurs
function updateTasks(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  addTaskToLocalStorage();
  addToDo();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id != taskId);
  addTaskToLocalStorage();
  addToDo();
}

// this element read item to add item in the page
const readItem = document.getElementById("items-left");
const completed = document.getElementById("clear-completed");
function updateItems() {
  const total = tasks.filter((t) => !t.completed).length;
  readItem.textContent = `${total} read ${total !== 1 ? "s" : ""}item`;
}

// func to add newelemet for task
function addToDo() {
  // const value = input.value.trim();
  // if (value === "") return;

  newTask.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.className = task.completed ? "checked" : "";
    li.innerHTML = `
    <div class="todo-item">
      <div class="left">
        <button class="check-circle"></button>
        <span>${task.title}</span>
      </div>
      <button class="delete-btn">
        <img src="/images/icon-cross.svg" alt"icon-cross">
      </button>
    </div>
    `;
    const check = li.querySelector(".check-circle");
    const delet = li.querySelector(".delete-btn");

    li.className = task.completed ? "completed" : "";
    check.classList.toggle("checked", task.completed);

    check.addEventListener("click", () => {
      // check.classList.toggle("checked");
      // li.classList.toggle("completed");
      // task.completed = check.classList.toggle("checked");
      // task.completed = li.classList.toggle("completed");
      task.completed = !task.completed;
      addToDo();
      addTaskToLocalStorage();
    });

    delet.addEventListener("click", () => {
      // li.remove();
      tasks = tasks.filter((e) => e.id !== task.id);

      addTaskToLocalStorage();
      addToDo();
    });

    newTask.appendChild(li);
  });

  updateItems();
}

addTask.addEventListener("click", addNewTasks);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // addToDo();
    addNewTasks();
  }
});

// TO Delete Element
completed.addEventListener("click", () => {
  document.querySelectorAll(".completed").forEach((el) => el.remove());
  updateItems();
  addTaskToLocalStorage();
  addToDo();
});

// Add theme to body
toggle.addEventListener("click", () => {
  const isheLight = body.classList.contains("light-theme");
  if (isheLight) {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    toggle.src = "images/icon-moon.svg";

    localStorage.setItem("theme", "dark");
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
    toggle.src = "/images/icon-sun.svg";

    localStorage.setItem("theme", "light");
  }
});

const saveTheme = localStorage.getItem("theme");
if (saveTheme === "dark") {
  body.classList.remove("light-theme");
  body.classList.add("dark-theme");
  toggle.src = "images/icon-moon.svg";
} else {
  body.classList.add("light-theme");
  body.classList.remove("dark-theme");
  toggle.src = "/images/icon-sun.svg";
}
