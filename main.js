//jshint esversion:6


const form = document.querySelector('#todo-form');
const todoList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const todoInput = document.querySelector('#todo');


loadEventsListeners();

function loadEventsListeners(){

  form.addEventListener('submit', addTodo);

  todoList.addEventListener('click', removeItem);

  clearBtn.addEventListener('click', removeAll);

  filter.addEventListener('keyup', filterTodo);

  document.addEventListener('DOMContentLoaded', getTodos);
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
  todos =[];
  } else {
  todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(todo));
    const linkDelete = document.createElement('a');
    linkDelete.className = 'delete-item secondary-content';
    linkDelete.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(linkDelete);
    todoList.appendChild(li);
  });
}

function addTodo(e){
  if (todoInput.value === ''){
    alert('add Todo');
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(todoInput.value));
  const linkDelete = document.createElement('a');
  linkDelete.className = 'delete-item secondary-content';
  linkDelete.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(linkDelete);
  todoList.appendChild(li);


  storeLocalInfo(todoInput.value);

  todoInput.value = '';



  e.preventDefault();
}

function storeLocalInfo(todo){
let todos;
if(localStorage.getItem('todos') === null){
todos =[];
} else {
todos = JSON.parse(localStorage.getItem('todos'));
}
todos.push(todo);

localStorage.setItem('todos',JSON.stringify(todos));
}

function removeItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){

      if(confirm('are you sure you want to delete this To do'));
      e.target.parentElement.parentElement.remove();

      removeFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeFromLocalStorage(todoItem){
  let todos;
  if(localStorage.getItem('todos') === null){
  todos =[];
  } else {
  todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo, index){
  if (todoItem.textContent === todo){
    todos.splice(index, 1);
  }
});

  localStorage.setItem('todos', JSON.stringify(todos));

}


function removeAll(){
  while(todoList.firstChild){

    todoList.removeChild(todoList.firstChild);
  }
  removeAllFromLocalStorage();
}
function removeAllFromLocalStorage(){
  localStorage.clear();
}

function filterTodo(e) {

const text = e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach(function(li){
  const item = li.firstChild.textContent;
  if(item.toLowerCase().indexOf(text) !== -1){
    li.style.display = 'block';
  }else {
    li.style.display = 'none';
  }

});
}
