document.getElementById("inputTask")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

// Load tasks when page opens
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTask(task.text, task.completed);
  });
};

function addTask() {
  const input = document.getElementById("inputTask");

  if (input.value.trim() === "") {
    return;
  }

  createTask(input.value, false);
  saveTasks();

  input.value = "";
}

function createTask(text, completed) {
  const newTask = document.createElement("li");
  const taskList = document.getElementById("taskList");
  taskList.appendChild(newTask);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  newTask.appendChild(checkbox);

  const taskText = document.createElement("span");
  taskText.textContent = text;

  if (completed) {
    taskText.style.textDecoration = "line-through";
  }

  newTask.appendChild(taskText);

  checkbox.onclick = function () {
    if (checkbox.checked) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "none";
    }

    saveTasks();
  };

  deleteTask(newTask);
}

function deleteTask(newTask) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  newTask.appendChild(deleteBtn);

  deleteBtn.onclick = function () {
    newTask.remove();
    saveTasks();
  };
}

function saveTasks() {
  const tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.querySelector("input").checked
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}