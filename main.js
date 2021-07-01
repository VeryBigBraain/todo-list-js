const todosContainer = document.querySelector('.todo-container');
const addTodoBtn = document.querySelector('.add-btn');
const inputTodo = document.querySelector('.todo-input');

function showTodo(todo) {
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
function addTodo(e) {
  e.preventDefault();
  if (inputTodo.value.trim() !== '') {
    const now = new Date();
    const todo = ({
      id: now.getTime(),
      content: inputTodo.value,
      type: 'uncompleted',
    });
    inputTodo.value = '';
    showTodo(todo);
  } else {
    return null;
  }
  return true;
}

addTodoBtn.addEventListener('click', addTodo);
