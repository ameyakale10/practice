// main.js

// 1. Get all question elements
const questions = document.querySelectorAll(".question");
const items = document.querySelectorAll(".accordion-item");

// 2. Attach a click event to each question
questions.forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement; // the .accordion-item

    // If this item is already open, just close it (optional behavior)
    if (item.classList.contains("open")) {
      item.classList.remove("open");
      return;
    }

    // 3. Close all items
    items.forEach((i) => i.classList.remove("open"));

    // 4. Open the clicked one
    item.classList.add("open");
  });
});
