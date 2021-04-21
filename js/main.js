document.addEventListener('DOMContentLoaded', function() {
  let inputTask = document.querySelector("#js-input");
  let id = 1;
  const inputButton = document.querySelector("#js-input-button");
  const table = document.querySelector("#js-table");

  inputButton.addEventListener('click', function(){
    
    if(inputTask.value === "" || inputTask.value === "undefined" || inputTask.value === null) {
      alert("タスクを入力してください");
    }

    const tableElement = document.createElement("tr");
    tableElement.innerHTML = `<td>${id}</td><td>${inputTask.value}</td><td><button type="button">削除</td>`
    table.appendChild(tableElement);
    inputTask.value = "";
    id++;
  });

});