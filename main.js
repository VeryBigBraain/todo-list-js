const todosContainer = document.querySelector('.todo-container');
const addTodoBtn = document.querySelector('.add-btn');
const inputTodo = document.querySelector('.todo-input');
let todos = [];

function byTodoField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
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

function showTodos(todo) {
  const todoNode = document.createElement('div');
  todoNode.classList.add('todo__item', todo.type);
  todoNode.id = todo.id;
  const todoContent = document.createElement('li');
  todoContent.classList.add('todo__content');
  todoContent.innerHTML = todo.content;
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
  todoNode.appendChild(todoContent);
  todoNode.appendChild(completeBtn);
  todoNode.appendChild(deleteBtn);
  todosContainer.appendChild(todoNode);
}

function prepareTodosToShow() {
  getLocalStorageData();
  todos.sort(byTodoField('id'));
  todos.forEach((todo) => showTodos(todo));
}

function addTodo(e) {
  e.preventDefault();
  const now = new Date();
  const todo = ({
    id: now.getTime(),
    content: inputTodo.value,
    type: 'uncompleted',
  });
  todos.push(todo);
  localStorage.setItem(todo.id, JSON.stringify(todo));
  inputTodo.value = '';
  showTodos(todo);
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

function updateTodos() {
  todos = [];
  todosContainer.innerHTML = '';
  prepareTodosToShow();
}

prepareTodosToShow();
addTodoBtn.addEventListener('click', addTodo);
todosContainer.addEventListener('click', deleteCheck);
window.addEventListener('storage', updateTodos);
