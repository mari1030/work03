document.addEventListener('DOMContentLoaded', function() {
  const inputTask = document.getElementById('js-input');
  const inputButton = document.getElementById('js-input-button');
  const todos = [];

  inputButton.addEventListener('click', function(){
    
    if(inputTask.value === "" || inputTask.value === undefined || inputTask.value === null) {
      alert("タスクを入力してください");
    }

    const todo = addTodo(inputTask.value);

    todos.push(todo);
    
    displayTodos(todos);
    
    inputTask.value = "";
  });
});

function addTodo(task) {
  const todo = {
    task: task,
    status: '作業中',
  };
  return todo;
}

function displayTodos(array) {
    const table = document.getElementById('js-table');
    const tableElement = document.createElement('tr');

    const statusElement = createStatusBtn();
    const deleteElement = createDeleteBtn();

    tableElement.innerHTML = `<td>${array.length - 1}</td><td>${array[array.length - 1].task}</td><td>${statusElement.outerHTML}</td><td>${deleteElement.outerHTML}</td>`;

    table.appendChild(tableElement);
}

function createStatusBtn() {
  const statusElement = document.createElement('button');
  statusElement.innerText = '作業中';
  return statusElement;
}

function createDeleteBtn() {
  const deleteElement = document.createElement('button');
  deleteElement.innerText = '削除';
  return deleteElement;
}