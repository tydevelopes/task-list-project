// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event. Event delegation is used
  taskList.addEventListener('click', removeTask);
  // Edit task event
  taskList.addEventListener('click', editTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter task event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from local storage
function getTasks() {
  let tasks = checkAndGetTask();

  tasks.forEach(task => {
    createTask(task);
  });
}

// Add Task
function addTask(e) {
  e.preventDefault();

  // Prevent empty/whitespace(before/after value) input
  if (taskInput.value.trim() === '') {
    alert("Add a task");
  } else {
    createTask(taskInput.value);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);
  }
  // Clear input
  taskInput.value = '';
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks = checkAndGetTask();
  // Add the new task to the list of tasks
  tasks.push(task);
  // Turn the tasks(as JSON) into string and store 
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task. 
// This uses an event delegation, that is the event is attached to a parent, the event only fires when a specific target is clicked.
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    // Remove list item
    e.target.parentElement.parentElement.remove();

    // Remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks = checkAndGetTask();
  // Go through the stored task and a task matches the text content of the list item deleted, then delete that task from local storage.
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Edit task and save to local storage
function editTask(e) {
  if (e.target.parentElement.classList.contains('edit-item')) {
    // Get task item text content
    const oldText = e.target.parentElement.parentElement.textContent;
    // Edit text
    const newText = prompt('Editing', oldText);
    // Only change old text if different from new
    if (newText !== oldText) {
      const li = e.target.parentElement.parentElement;
      li.textContent = newText;
      createDeleteAndEditLinks(li);

      saveEditedTask(newText, oldText);
    }
  }
}

// Save edited task
function saveEditedTask(newText, oldText) {
  let tasks = checkAndGetTask();
  // Go through the stored task and a task matches the text content of the list item deleted, then delete that task from local storage.
  tasks.forEach((task, index) => {
    if (oldText === task) {
      tasks.splice(index, 1, newText);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  //taskList.innerHTML = ''; // one way to clear tasks

  // Faster alternative
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear task from local storage
  clearTasksFromLocalStorage();
}

// Clear task from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
};

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // Get all list items and compare to the text entered
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}

// Helper functions
function checkAndGetTask() {
  let tasks = null;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];    
  } else {
      // local storage only stores strings so it needs to be parsed as JSON. Get stored tasks
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function createTask(task) {
  // Create li element
  const li = document.createElement('li');
  // Add class 
  li.classList.add('collection-item');
  // Create text node and append to li 
  li.appendChild(document.createTextNode(task));
  createDeleteAndEditLinks(li);

  // Append the li to the ul
  taskList.appendChild(li);
}

// Create edit and delete links
function createDeleteAndEditLinks(li) {
  // Create new link element 
  const link = document.createElement('a');
  // Add class. Can also use link.className = 'del sec'
  link.classList.add('delete-item', 'secondary-content');
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Create link element for edit
  const editLink = document.createElement('a');
  editLink.classList.add('edit-item', 'secondary-content');
  editLink.innerHTML = '<i class="fa fa-edit"></i>';

  // Append the link to li
  li.appendChild(editLink);
  li.appendChild(link);
}








// experimental: same as addTask but with temperate literals
function addTaskAlt (e) {
  e.preventDefault();

  if (taskInput.value.trim() === '') {
    alert("Add a task");
  } else {
    // Create a list
    listItem = `
        <li class="collection-item">
          ${taskInput.value}
          <a href="#" class="delete-item secondary-content">
          <i class="fa fa-remove"></i>
          </a>
        </li>
        `
    taskList.innerHTML += listItem;
  }
  taskInput.value = '';
}