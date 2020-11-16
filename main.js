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
}

function addTodo(e){
  if (todoInput.value === ''){
    alert('add Todo');
  }

  const li = document.createElement('li');
  li.ClassName = 'collection-item';
  li.appendChild(document.createTextNode(todoInput.value));
  const linkDelete = document.createElement('a');
  linkDelete.className = 'delete-item secondary-content';
  linkDelete.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(linkDelete);
  todoList.appendChild(li);

  todoInput.value = '';

  e.preventDefault();
}

function removeItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){

      if(confirm('are you sure you want to delete this To do'));
      e.target.parentElement.parentElement.remove();
  }
}


function removeAll(){
  while(todoList.firstChild){

    todoList.removeChild(todoList.firstChild);
  }
}

function filterTodo(e) {

const text = e.target.value.toLowerCase();
console.log(text)
document.querySelectorAll('.collection-item').forEach(function(todo){
  const item = todo.firstChild.textContent;
  console.log(item)
  if(item.toLowerCase().indexOf(text) !== -1){
    todo.style.display = 'block';
  }else {
    todo.style.display = 'none';
  }

});
}
