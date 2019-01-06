// Helper function
export function checkAndGetTask() {
  let tasks = null;
  const storedTasks = localStorage.getItem('tasks')
  if (!storedTasks) {
    tasks = [];    
  } else {
      // local storage only stores strings so it needs to be parsed as JSON. Get stored tasks
      tasks = JSON.parse(storedTasks);
    }
    return tasks;
}

// Store Task
export function storeTaskInLocalStorage(task) {
  let tasks = checkAndGetTask();
  // Add the new task to the list of tasks
  tasks.push(task);
  // Turn the tasks(as JSON) into string and store 
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove from local storage
export function removeTaskFromLocalStorage(taskItem) {
  let tasks = checkAndGetTask();
  // Go through the stored task and if a task matches the text content of the list item deleted, then delete that task from local storage.
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task from local storage
export function clearTasksFromLocalStorage() {
  localStorage.clear();
};

// Save edited task
export function saveEditedTask(newText, oldText) {
  let tasks = checkAndGetTask();
  // Go through the stored task and if a task matches the text content of the list item deleted, then delete that task from local storage.
  tasks.forEach((task, index) => {
    if (oldText === task) {
      tasks.splice(index, 1, newText);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
