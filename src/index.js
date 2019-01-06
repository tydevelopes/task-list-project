import * as elements from './uiElement';
import * as store from './store';

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  elements.form.addEventListener('submit', addTask);
  // Remove task event. Event delegation is used
  elements.taskList.addEventListener('click', removeTask);
  // Edit task event
  elements.taskList.addEventListener('click', editTask);
  // Clear task event
  elements.clearBtn.addEventListener('click', clearTasks);
  // Filter task event
  elements.filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from local storage
function getTasks() {
  let tasks = store.checkAndGetTask();

  tasks.forEach(task => {
    createTask(task);
  });
}

// Add Task
function addTask(e) {
  e.preventDefault();

  // Prevent empty/whitespace(before/after value) input
  if (elements.taskInput.value.trim() === '') {
    alert("Add a task");
  } else {
    createTask(elements.taskInput.value);

    // Store in local storage
    store.storeTaskInLocalStorage(elements.taskInput.value);
  }
  // Clear input
  elements.taskInput.value = '';
}



// Remove Task. 
// This uses an event delegation, that is the event is attached to a parent, the event only fires when a specific target is clicked.
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    // Remove list item
    e.target.parentElement.parentElement.remove();

    // Remove from local storage
    store.removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Edit task and save to local storage
function editTask(e) {
  console.log(e.target);
  
  if (e.target.parentElement.classList.contains('edit-item')) {
    // Get task item text content
    const oldText = e.target.parentElement.parentElement.textContent;
    // Edit text
    const newText = prompt('Editing', oldText);
    // Only change old text if different from new and not empty
    if (newText && newText !== oldText) {
      const cardContent = e.target.parentElement.parentElement;
      cardContent.textContent = newText;
      createDeleteAndEditLinks(cardContent);

      store.saveEditedTask(newText, oldText);
    }
  }
}

// Clear Tasks
function clearTasks() {
  //taskList.innerHTML = ''; // one way to clear tasks

  // Faster alternative
  while (elements.taskList.firstChild) {
    elements.taskList.removeChild(elements.taskList.firstChild);
  }
  // Clear task from local storage
  store.clearTasksFromLocalStorage();
}



// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // Get all list items and compare to the text entered
  document.querySelectorAll('.card-content').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}



function createTask(task) {

  // add content inside a card
  const card = document.createElement('div');
  const cardContent = document.createElement('div');

  // add classes to the divs
  card.className = 'card';
  cardContent.className = 'card-content';

  // Create text node and append to cardContent 
  cardContent.appendChild(document.createTextNode(task));

  card.appendChild(cardContent);

  createDeleteAndEditLinks(cardContent);

  elements.taskList.appendChild(card);
}

// Create edit and delete links
function createDeleteAndEditLinks(cardContent) {
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

  // append edit/delete links to card content
  cardContent.appendChild(editLink);
  cardContent.appendChild(link);
}








// experimental: same as addTask but with temperate literals
function addTaskAlt (e) {
  e.preventDefault();

  if (elements.taskInput.value.trim() === '') {
    alert("Add a task");
  } else {
    // Create a list
    listItem = `
        <li class="collection-item">
          <div class="card">
            ${elements.taskInput.value}
            <a href="#" class="delete-item secondary-content">
            <i class="fa fa-remove"></i>
            </a>
            <a href="#" class="edit-item secondary-content">
            <i class="fa fa-edit"></i>
            </a>
          </div>
        </li>
        `
    elements.taskList.innerHTML += listItem;
  }
  elements.taskInput.value = '';
}