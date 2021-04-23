document.addEventListener('DOMContentLoaded', function() {
  let inputTask = document.querySelector("#js-input");
  const inputButton = document.querySelector("#js-input-button");
  const todos = [];

  inputButton.addEventListener('click', function(){
    
    if(inputTask.value === "" || inputTask.value === "undefined" || inputTask.value === null) {
      alert("タスクを入力してください");
    }

    const todo = {
      task: `${inputTask.value}`,
      status: '作業中',
    }

    todos.push(todo);
    displayTodos(todos);
    inputTask.value = "";
  });
});

function displayTodos(array) {
    const table = document.querySelector("#js-table");
    const tableElement = document.createElement("tr");

    tableElement.innerHTML = `<td>${array.length - 1}</td><td>${array[array.length - 1].task}</td><td><button type="button">削除</td>`
    table.appendChild(tableElement);
}