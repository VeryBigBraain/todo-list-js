const todosContainer = document.querySelector('.todo-container');
const addForm = document.querySelector('.todo-form');
const inputTodo = document.querySelector('.todo-input');
const inputRange = document.querySelector('.todo-slider');
const inputDate = document.querySelector('.date-input');

function createTodoItem(todo) {
  const todoNode = document.createElement('div');
  todoNode.classList.add('todo__item', todo.type);
  todoNode.id = todo.id;
  const todoContent = document.createElement('li');
  todoContent.classList.add('todo__content');
  todoContent.innerHTML = todo.content;
  const priority = document.createElement('div');
  priority.classList.add('priority');
  priority.style.background = `hsl(calc(100 + -20 * ${todo.priority}), 100%, 50%)`;
  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete-btn', 'btn');
  const completeIcon = document.createElement('i');
  completeIcon.classList.add('gg-check-o');
  completeBtn.appendChild(completeIcon);
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn', 'btn');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('gg-trash-empty');
  deleteBtn.appendChild(deleteIcon);
  todoContent.appendChild(priority);
  todoNode.appendChild(todoContent);
  todoNode.appendChild(completeBtn);
  todoNode.appendChild(deleteBtn);

  return todoNode;
}

function addTodo(e) {
  e.preventDefault();
  if (inputTodo.value.trim() !== '') {
    const now = new Date();
    const todo = ({
      id: now.getTime(),
      content: inputTodo.value,
      type: 'uncompleted',
      priority: inputRange.value,
    });
    inputTodo.value = '';
    const todoNode = createTodoItem(todo);
    todosContainer.appendChild(todoNode);
  } else {
    return null;
  }
  return true;
}

addForm.addEventListener('submit', addTodo);

const R = document.querySelector('[type=range]');
R.style.setProperty('--val', +R.value);
R.style.setProperty('--max', +R.max);
R.style.setProperty('--min', +R.min);

R.addEventListener('input', () => {
  R.style.setProperty('--val', +R.value);
}, false);
