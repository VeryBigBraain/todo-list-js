const todosContainer = document.querySelector('.todo-container');
const todos = [
    {id: 1, content: 'I am not gay', type: 'completed'},
    {id: 2, content: 'Misha is not gay(yes he is)', type: 'uncompleted'}
];

function showTodos() {
    todos.forEach(todo => {
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
    });
};

showTodos();