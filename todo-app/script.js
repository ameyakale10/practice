let tasks = [];

const newTaskInput = document.getElementById("new-task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const searchInput = document.getElementById("search-input");
const taskList = document.getElementById("task-list");


function createTaskElement(taskText) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "task-text";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  // Delete behavior
  deleteBtn.addEventListener("click", function () {
    li.remove();
    syncTasksToLocalStorage();
  });

  // Edit behavior
  editBtn.addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;

    li.insertBefore(input, span);
    li.removeChild(span);

    editBtn.textContent = "Save";

    editBtn.onclick = function () {
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);

      editBtn.textContent = "Edit";

      syncTasksToLocalStorage();
    };
  });

  return li;
}


function syncTasksToLocalStorage() {
  tasks = [];

  const spans = taskList.querySelectorAll(".task-text");

  spans.forEach(function (span) {
    tasks.push(span.textContent);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


addTaskBtn.addEventListener("click", function () {
  const taskText = newTaskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  newTaskInput.value = "";

  syncTasksToLocalStorage();
});

window.addEventListener("load", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  taskList.innerHTML = "";

  savedTasks.forEach(function (task) {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });

  syncTasksToLocalStorage();
});

searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    const items = taskList.querySelectorAll("li");

    items.forEach(function (li) {
        const text = li.querySelector(".task-text").textContent.toLowerCase();
        if (text.includes(query)) {
            li.style.display = "";
        } else {
            li.style.display = "none";
        }
    });
});



