document.addEventListener('DOMContentLoaded', function() {
  const inputTask = document.getElementById('js-input');
  const inputButton = document.getElementById('js-input-button');
  const deleteButton = document.getElementById('js-delete-button');
  const todos = [];

  inputButton.addEventListener('click', function(){
    
    if(inputTask.value === '' || inputTask.value === undefined || inputTask.value === null) {
      alert("タスクを入力してください");
      return;
    }

    const todo = addTodo(inputTask.value);

    todos.push(todo);
    
    displayTodos(todos);
    
    inputTask.value = "";

  });
});

// 削除ボタンを押下したときにその一列を削除する
function deleteTr(e) {
  // 押下された削除ボタンの列のid
  const trId = e.target.id;
  
  // 押下された削除ボタンの列のtr
  const targetTr = document.getElementById(`tr${trId}`);
  // 押下された削除ボタンの列のtrを消去
  targetTr.remove();

  updateIndex();
}

// 削除ボタンを押下した際にindexの順をふり直す
function updateIndex() {
  // tr要素を取得（idがついているもののみ）
  const tableElement = document.querySelectorAll('[id^="tr"]');

  // indexを振り直す
  tableElement.forEach(function(element, index) {
    element.firstChild.innerHTML = index;
  });
}

// todosの要素todoオブジェクトにタスクを追加
function addTodo(task) {
  const todo = {
    task: task,
    status: '作業中',
  };
  return todo;
}

// 追加されたタスクを画面に表示する
function displayTodos(array) {
    const table = document.getElementById('js-table');
    const tableElement = document.createElement('tr');
    const tableTdStatus = document.createElement('td');
    const tableTdDelete = document.createElement('td');

    const statusElement = createStatusBtn();
    const deleteElement = createDeleteBtn(array);

    array.forEach(function(element, index) {
      tableElement.innerHTML = `<td>${index}</td><td>${element.task}</td>`;
    });

    table.appendChild(tableElement);
    tableElement.id = `tr${array.length - 1}`;
    // 末尾にtd作成
    tableElement.appendChild(tableTdStatus);
    // 作業中ボタン追加
    tableTdStatus.appendChild(statusElement);
    // 末尾にtd作成
    tableElement.appendChild(tableTdDelete);
    // 削除ボタン追加
    tableTdDelete.appendChild(deleteElement);
    deleteElement.id = array.length - 1;
}

// 作業中ボタンを作成する
function createStatusBtn() {
  const statusElement = document.createElement('button');
  statusElement.innerText = '作業中';
  return statusElement;
}

// 削除ボタンを作成する
function createDeleteBtn(todos) {
  const deleteElement = document.createElement('button');
  deleteElement.innerText = '削除';

  // 削除ボタンにクリック関数をもたせる、関数の引数はarrayのtodos
  deleteElement.addEventListener('click' , {name: todos, handleEvent: deleteTr}, false);

  return deleteElement;
}