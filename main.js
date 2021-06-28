const todosContainer = document.querySelector('.todo-container');
const addTodoBtn = document.querySelector('.add-btn');
const inputTodo = document.querySelector('.todo-input');
const btn = document.querySelectorAll('.btn');

let todos = [];

getLocalStorageData();
todos.sort(byTodoField('id'));
todos.forEach(todo => showTodos(todo));

addTodoBtn.addEventListener('click', addTodo);
todosContainer.addEventListener('click', deleteCheck);

function byTodoField(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
}

function getLocalStorageData() {

    keys = Object.keys(localStorage),
    i = keys.length;

    while ( i-- ) {
        todos.push(JSON.parse( localStorage.getItem(keys[i]) ) );
    }
}

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
    todos.push(todo);

    localStorage.setItem(todo.id, JSON.stringify(todo));

    inputTodo.value = '';
    showTodos(todo);

    console.log(todos);
}

function deleteCheck(e) {
    const item = e.target;
    //Delete
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todos.filter(arrTodo => todo.id !== arrTodo.id);
        localStorage.removeItem(todo.id);
        todo.remove();
    }

    //Check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('complete');
        todos.forEach((arrTodo => {
            if (todo.id == arrTodo.id) 
            {
                arrTodo.type = todo.classList[todo.classList.length - 1];
                localStorage.removeItem(arrTodo.id);
                localStorage.setItem(arrTodo.id, JSON.stringify(arrTodo));
            };
        }));
    };
};


