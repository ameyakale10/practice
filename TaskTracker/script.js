// script.js

// 1. Our main data: an array of task objects
let tasks = [
  { description: "New task is created and added to the list", completed: false },
  { description: "Clicking the checkbox toggles the completeness", completed: false },
  { description: "Delete button will delete the task from the list", completed: false },
  { description: "Complete tasks show at the end with strikethrough", completed: true },
  { description: "Marking incomplete will put it back in pending list", completed: true },
];

// 2. Grab DOM elements
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// 3. Render function: clears and rebuilds the list from tasks[]
function renderTasks() {
  // Remove everything inside <ul>
  taskList.innerHTML = "";

  // Sort tasks so incomplete come first
  const sortedTasks = [...tasks].sort((a, b) => {
    return Number(a.completed) - Number(b.completed);
  });

  // For each task object, create an <li> with checkbox, text, and delete button
  sortedTasks.forEach((task, indexInSorted) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) {
      li.classList.add("completed");
    }

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // Task text
    const span = document.createElement("span");
    span.textContent = task.description;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.className = "task-delete";

    // Find the real index in the original tasks array
    const realIndex = tasks.indexOf(task);

    // Checkbox: toggle completed
    checkbox.addEventListener("change", () => {
      tasks[realIndex].completed = checkbox.checked;
      renderTasks();
    });

    // Delete button: remove the task
    deleteBtn.addEventListener("click", () => {
      tasks.splice(realIndex, 1); // remove 1 item at position realIndex
      renderTasks();
    });

    // Put pieces together
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// 4. Add new task when user presses Enter in the input
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && taskInput.value.trim() !== "") {
    const newTask = {
      description: taskInput.value.trim(),
      completed: false,
    };

    tasks.push(newTask); // update the array
    taskInput.value = ""; // clear the input
    renderTasks(); // re-draw the list
  }
});

// 5. Initial render
renderTasks();
