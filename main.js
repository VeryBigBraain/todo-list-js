const todosContainer = document.querySelector('.todo-container');
const addTodoBtn = document.querySelector('.add-btn');
const inputTodo = document.querySelector('.todo-input');
const todos = [
    {id: 1, content: 'I am not gay', type: 'completed'},
    {id: 2, content: 'Misha is not gay(yes he is)', type: 'uncompleted'}
];

function showTodos(todo) {
    todoNode = document.createElement('div');
    todoNode.classList.add('todo__item', todo.type);
    todoNode.id = todo.id;  

    todoContent = document.createElement('li');
    todoContent.classList.add('todo__content');
    todoContent.innerHTML = todo.content;

    completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn', 'btn');
    completeIcon = document.createElement('i');
    completeIcon.classList.add('gg-check-o');
    completeBtn.appendChild(completeIcon);
    
    deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn', 'btn');
    deleteIcon = document.createElement('i');
    deleteIcon.classList.add('gg-trash-empty');
    deleteBtn.appendChild(deleteIcon);
    
    todoNode.appendChild(todoContent);
    todoNode.appendChild(completeBtn);
    todoNode.appendChild(deleteBtn);

    todosContainer.appendChild(todoNode);
};

function addTodo(e) {
    e.preventDefault();

    let now = new Date();
    const todo = ({
        id: now.getTime(),
        content: inputTodo.value,
        type: 'uncompleted'
    });

    inputTodo.value = '';
    showTodos(todo);
}

todos.forEach(todo => showTodos(todo));

addTodoBtn.addEventListener('click', addTodo);