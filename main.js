const todosContainer = document.querySelector('.todo-container');
const addForm = document.querySelector('.todo-form');
const inputTodo = document.querySelector('.todo-input');
const inputRange = document.querySelector('.todo-slider');
const inputDate = document.querySelector('.date-input');
const sortSelect = document.querySelector('.sort-todo');
const sortBtn = document.querySelector('.sort-btn');
const R = document.querySelector('[type=range]');
let todos = [];

function deleteTodo(e) {
  const item = e.target;
  const todo = item.parentElement;
  todos.filter((arrTodo) => todo.id !== arrTodo.id);
  todo.remove();
  localStorage.removeItem(todo.id);
}

function completeTodo(e) {
  const item = e.target;
  const todo = item.parentElement;
  todo.classList.toggle('complete');
  todos.forEach(((arrTodo) => {
    if (todo.id === String(arrTodo.id)) {
      // Set type equal complete if the todo has that class
      const updatedTodo = { ...arrTodo, type: todo.classList[todo.classList.length - 1] };
      localStorage.removeItem(arrTodo.id);
      localStorage.setItem(updatedTodo.id, JSON.stringify(updatedTodo));
      return updatedTodo;
    }
    return arrTodo;
  }));
}

function createTodoItem(todo) {
  // Todo-item
  const todoNode = document.createElement('div');
  todoNode.classList.add('todo__item', todo.type);
  todoNode.id = todo.id;
  // Todo content (text)
  const todoContent = document.createElement('li');
  todoContent.classList.add('todo__content');
  todoContent.innerHTML = todo.content;
  // Time container
  const timeContainer = document.createElement('div');
  timeContainer.classList.add('time-container');
  // Deadline
  const deadlineTime = document.createElement('div');
  deadlineTime.classList.add('deadline-time');
  deadlineTime.innerText = `deadline: ${todo.deadlineTime}`;
  // Create
  const createTime = document.createElement('div');
  createTime.classList.add('create-time');
  createTime.innerText = `created: ${todo.createTime}`;
  timeContainer.appendChild(deadlineTime);
  timeContainer.appendChild(createTime);
  // Priority container
  const priorityContainer = document.createElement('div');
  priorityContainer.classList.add('priority-container');
  const priority = document.createElement('div');
  // Priority icon
  priority.classList.add('priority');
  priority.style.background = `hsl(calc(100 + -20 * ${todo.priority}), 100%, 50%)`;
  priorityContainer.appendChild(priority);
  // Comlete btn
  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete-btn', 'btn');
  const completeIcon = document.createElement('i');
  completeIcon.classList.add('gg-check-o');
  completeBtn.appendChild(completeIcon);
  completeBtn.addEventListener('click', completeTodo);
  // Delete btn
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn', 'btn');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('gg-trash-empty');
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.addEventListener('click', deleteTodo);
  // Adding nodes
  todoNode.appendChild(todoContent);
  todoNode.appendChild(timeContainer);
  todoNode.appendChild(priorityContainer);
  todoNode.appendChild(completeBtn);
  todoNode.appendChild(deleteBtn);

  return todoNode;
}

function getLocalStorageData() {
  if (localStorage.length > 0) {
    const keys = Object.keys(localStorage);
    let i = keys.length - 1;
    while (i + 1) {
      todos.push(JSON.parse(localStorage.getItem(keys[i])));
      i -= 1;
    }
  }
}

// Sort array
function byTodoField(field) {
  if (sortBtn.classList[1] === 'sort-direction') {
    return (a, b) => (+a[field] < +b[field] ? 1 : -1);
  }
  return (a, b) => (+a[field] > +b[field] ? 1 : -1);
}

function prepareTodosToShow(fieldToSort) {
  getLocalStorageData();
  todos.sort(byTodoField(fieldToSort));
  todos.forEach((todo) => {
    const todoNode = createTodoItem(todo);
    todosContainer.appendChild(todoNode);
  });
}

function checkZero(timeVal) {
  return timeVal.toString().length === 1 ? `0${timeVal}` : timeVal;
}

function formatDate(date) {
  return `${checkZero(date.getHours())}:${checkZero(date.getMinutes())} ${checkZero(date.getDate())}.${checkZero(date.getMonth() + 1)}.${date.getFullYear()}`;
}

function addTodo(e) {
  e.preventDefault();
  if (inputTodo.value.trim() !== '') {
    const deadlineTime = new Date(inputDate.value);
    const now = new Date();
    const todo = ({
      content: inputTodo.value,
      type: 'uncompleted',
      priority: inputRange.value,
      deadlineTime: formatDate(deadlineTime),
      createTime: formatDate(now),
      deadlineSort: deadlineTime.getTime(),
      createSort: now.getTime(),
      id: now.getTime(),
    });
    const todoNode = createTodoItem(todo);
    todosContainer.appendChild(todoNode);
    todos.push(todo);
    localStorage.setItem(todo.id, JSON.stringify(todo));
    // Reset form
    R.style.setProperty('--val', 3);
    addForm.reset();
  } else {
    return null;
  }
  return true;
}

// Range style
R.style.setProperty('--val', +R.value);
R.style.setProperty('--max', +R.max);
R.style.setProperty('--min', +R.min);

R.addEventListener('input', () => {
  R.style.setProperty('--val', +R.value);
}, false);

function updateTodos(fieldToSort = 'createSort') {
  todos = [];
  todosContainer.innerHTML = '';
  prepareTodosToShow(fieldToSort);
}

updateTodos();
addForm.addEventListener('submit', addTodo);
sortSelect.addEventListener('click', () => updateTodos(sortSelect.value));
sortBtn.addEventListener('click', () =>  {
    sortBtn.classList.toggle('sort-direction');
    updateTodos(sortSelect.value);
  });
window.addEventListener('storage', updateTodos);
