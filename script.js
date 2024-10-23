const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const listCounter = document.getElementById('listCounter');
const todoList = document.querySelector('.todoList');
const clearBtn = document.getElementById('clrBtn');

let todoCount = 0;

const addList = (e) => {
  const todoText = input.value.trim();

  if (
    todoText &&
    (e.type === 'click' || (e.type === 'keypress' && e.key === 'Enter'))
  ) {
    addTodoItem(todoText);
    input.value = '';
  }
};

const updateCount = () => {
  listCounter.innerText = todoCount;
};

const addTodoItem = (todoText) => {
  const li = document.createElement('li');
  li.className =
    'flex flex-row justify-between items-center bg-white p-2 rounded-lg';

  const checkIcon = document.createElement('i');
  checkIcon.className =
    'fa-solid fa-square-check hover:scale-95 hover:text-green-500 duration-500 cursor-pointer';
  checkIcon.addEventListener('click', () => toggleIcons(li, checkIcon, span));

  const span = document.createElement('span');
  span.className = 'self-start flex-grow ml-2';
  span.innerText = todoText;

  const delBtn = document.createElement('i');
  delBtn.className =
    'fa-solid fa-trash hover:scale-95 hover:text-red-700 duration-500 cursor-pointer';
  delBtn.addEventListener('click', () => {
    li.remove();
    todoCount--;
    updateCount();
    saveTodos();
  });

  li.appendChild(checkIcon);
  li.appendChild(span);
  li.appendChild(delBtn);
  todoList.appendChild(li);

  todoCount++;
  updateCount();
  saveTodos();
};

const toggleIcons = (li, checkIcon, span) => {
  if (checkIcon.classList.contains('fa-square-check')) {
    checkIcon.classList.remove('fa-square-check');
    checkIcon.classList.add('fa-check-square');
    checkIcon.classList.add('text-green-500');
    span.style.textDecoration = 'line-through';
    if (todoCount > 0) {
      todoCount--;
    }
  } else {
    checkIcon.classList.remove('fa-check-square');
    checkIcon.classList.remove('text-green-500');
    checkIcon.classList.add('fa-square-check');
    span.style.textDecoration = 'none';
    todoCount++;
  }
  updateCount();
  saveTodos();
};

const saveTodos = () => {
  const todos = [];
  todoList.querySelectorAll('li').forEach((li) => {
    const todoText = li.querySelector('span').innerText;
    todos.push(todoText);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
};

const loadTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach((todoText) => addTodoItem(todoText));
};

const onClear = () => {
  const items = document.querySelector('ul');

  while (items.firstChild) {
    items.removeChild(items.firstChild);
  }
  todoCount = 0;
  updateCount();
  localStorage.removeItem('todos');
};

clearBtn.addEventListener('click', onClear);
addBtn.addEventListener('click', addList);
input.addEventListener('keypress', addList);

window.addEventListener('load', loadTodos);
