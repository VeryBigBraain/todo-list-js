const todosContainer = document.querySelector('.todo-container');
const addForm = document.querySelector('.todo-form');
const inputTodo = document.querySelector('.todo-input');
const inputRange = document.querySelector('.todo-slider');
const inputDate = document.querySelector('.date-input');

function checkZero(timeVal) {
  return timeVal.toString().length === 1 ? `0${timeVal}` : timeVal;
}

function formatDate(date) {
  return `${checkZero(date.getHours())}:${checkZero(date.getMinutes())} ${checkZero(date.getDate())}.${checkZero(date.getMonth() + 1)}.${date.getFullYear()}`;
}

function deleteTodo(e) {
  const item = e.target;
  const todo = item.parentElement;
  todo.remove();
}

function completeTodo(e) {
  const item = e.target;
  const todo = item.parentElement;
  todo.classList.toggle('complete');
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
  deadlineTime.innerText = `deadline: ${formatDate(todo.deadlineTime)}`;
  // Create
  const createTime = document.createElement('div');
  createTime.classList.add('create-time');
  const now = new Date();
  createTime.innerText = `created: ${formatDate(now)}`;
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
      deadlineTime,
    });
    // Create todo node
    const todoNode = createTodoItem(todo);
    todosContainer.appendChild(todoNode);
    // Reset form
    addForm.reset();
  } else {
    return null;
  }
  return true;
}
// Range style
const R = document.querySelector('[type=range]');
R.style.setProperty('--val', +R.value);
R.style.setProperty('--max', +R.max);
R.style.setProperty('--min', +R.min);
R.addEventListener('input', () => {
  R.style.setProperty('--val', +R.value);
}, false);

addForm.addEventListener('submit', addTodo);
