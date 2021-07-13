const todosContainer = document.querySelector('.todo-container');
const addForm = document.querySelector('.todo-form');
const inputTodo = document.querySelector('.todo-input');
const inputRange = document.querySelector('.todo-slider');
const inputDate = document.querySelector('.date-input');
let todos = [];

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
  // Delete btn
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn', 'btn');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('gg-trash-empty');
  deleteBtn.appendChild(deleteIcon);
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
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

function prepareTodosToShow() {
  getLocalStorageData();
  todos.sort(byTodoField('id'));
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
      id: now.getTime(),
      content: inputTodo.value,
      type: 'uncompleted',
      priority: inputRange.value,
      deadlineTime: formatDate(deadlineTime),
      createTime: formatDate(now),
    });
    const todoNode = createTodoItem(todo);
    todosContainer.appendChild(todoNode);
    todos.push(todo);
    localStorage.setItem(todo.id, JSON.stringify(todo));
    addForm.reset();
  } else {
    return null;
  }
  return true;
}

function deleteCheck(e) {
  const item = e.target;
  // Delete
  if (item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    todos.filter((arrTodo) => todo.id !== arrTodo.id);
    todo.remove();
    localStorage.removeItem(todo.id);
  }
  // Check mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('complete');
    todos.forEach(((arrTodo) => {
      if (todo.id === String(arrTodo.id)) {
        const updatedTodo = { ...arrTodo, type: todo.classList[todo.classList.length - 1] };
        localStorage.removeItem(arrTodo.id);
        localStorage.setItem(updatedTodo.id, JSON.stringify(updatedTodo));
        return updatedTodo;
      }
      return arrTodo;
    }));
  }
}

// Range style
const R = document.querySelector('[type=range]');
R.style.setProperty('--val', +R.value);
R.style.setProperty('--max', +R.max);
R.style.setProperty('--min', +R.min);

R.addEventListener('input', () => {
  R.style.setProperty('--val', +R.value);
}, false);

function updateTodos() {
  todos = [];
  todosContainer.innerHTML = '';
  prepareTodosToShow();
}

prepareTodosToShow();
addForm.addEventListener('submit', addTodo);
todosContainer.addEventListener('click', deleteCheck);
window.addEventListener('storage', updateTodos);
