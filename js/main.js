document.addEventListener('DOMContentLoaded', function() {
  const inputTask = document.getElementById('js-input');
  const inputButton = document.getElementById('js-input-button');
  const deleteButton = document.getElementById('js-delete-button');
  const todos = [];
  const radioAll = document.getElementById('all');
  const radioRunning = document.getElementById('running');
  const radioDone = document.getElementById('done');
  const radioStatus = document.querySelectorAll('input[type="radio"]');

  inputButton.addEventListener('click', function(){
    
    if(inputTask.value === '' || inputTask.value === undefined || inputTask.value === null) {
      alert("タスクを入力してください");
      return;
    }

    const todo = addTodo(inputTask.value);

    todos.push(todo);
    
    displayTodos(todos, radioStatus);
    
    inputTask.value = "";

  });

  radioAll.addEventListener('click' , function() {
    
    document.querySelectorAll('[id^="tr"]').forEach(function(element) {
      element.remove();
    });

    displayTodos(todos, radioStatus);
  });

  radioRunning.addEventListener('click' , function() {

    const statusRunning = todos;

    displayTodos(statusRunning, radioStatus);
  });

  radioDone.addEventListener('click' , function() {
    
    const statusDone = todos;

    displayTodos(statusDone, radioStatus);
  });

});

// 削除ボタンを押下したときにその一列を削除する
function deleteTr(e) {
  // 押下された削除ボタンの列のid
  const trId = e.target.id;

  // todosから指定の要素を削除する
  todos = deleteTodo(trId, this.name);
  // 押下された削除ボタンの列のtr
  const targetTr = document.getElementById(`tr${trId}`);
  // 押下された削除ボタンの列のtrを消去
  targetTr.remove();
  // todoリストのindexを振り直す
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

// todosの消去された要素を消去
function deleteTodo(id, todos) {
  todos.splice(id, 1);
  return todos;
}

function switchStatus(e) {
  todos = this.name;

  // 押下された削除ボタンの列のid
  const statusId = e.target.id;
  const index = statusId.slice(6);
  const targetButton = document.getElementById(statusId);
  
  if(targetButton.innerText === '作業中'){
    targetButton.textContent = '完了';
    todos[index].status = '完了';
  } else {
    targetButton.textContent = '作業中';
    todos[index].status = '作業中';
  }

  const radioStatus = document.querySelectorAll('input[type="radio"]');
  radioStatus.forEach(function(element) {
    if((element.checked === true && element.value === '作業中') || (element.checked === true && element.value === '完了')) {
      const targetTr = document.getElementById(`tr${index}`);
      targetTr.style.display = 'none';
    } else {
      return;
    }
  });
  }

// 追加されたタスクを画面に表示する
function displayTodos(array, radioStatus) {
    const table = document.getElementById('js-table');
        
    document.querySelectorAll('[id^="tr"]').forEach((element) => {
      element.remove();
    });

    radioStatus.forEach(function(element) {
      if(element.checked === true && element.value === '作業中') {
        array = array.map((val) => {
          if(val.status === '作業中') {
            return val;
          }
        });
      } else if(element.checked === true && element.value === '完了') {
        array = array.map((val) => {
          if(val.status === '完了') {
            return val;
          }
        });
      } else {
        return array;
      }
    });

    for(let i = 0; i < array.length; i++) {
      if(array[i] !== undefined) {
        const tableElement = document.createElement('tr');
        const tableTdId = document.createElement('td');
        const tableTdContent = document.createElement('td');
        const tableTdStatus = document.createElement('td');
        const tableTdDelete = document.createElement('td');
        
        const statusElement = createStatusBtn(array, i);
        const deleteElement = createDeleteBtn(array);
  
  
        table.appendChild(tableElement);
        tableElement.id = `tr${i}`;
        
        tableElement.appendChild(tableTdId);
        tableTdId.textContent = i;
        tableElement.appendChild(tableTdContent);
        tableTdContent.textContent = array[i].task;
  
        // 末尾にtd作成
        tableElement.appendChild(tableTdStatus);
        // 作業中ボタン追加
        tableTdStatus.appendChild(statusElement);
        statusElement.id = `status${i}`;
        // 末尾にtd作成
        tableElement.appendChild(tableTdDelete);
        // 削除ボタン追加
        tableTdDelete.appendChild(deleteElement);
        deleteElement.id = i;
      }
    }
}

// 作業中ボタンを作成する
const createStatusBtn = (todos, index) => {
  const statusElement = document.createElement('button');
  statusElement.innerText = todos[index].status;
  // 作業中ボタンにクリック関数をもたせる
  statusElement.addEventListener('click' , {name: todos, handleEvent: switchStatus}, false);
  return statusElement;
}

// 削除ボタンを作成する
const createDeleteBtn = (todos) => {
  const deleteElement = document.createElement('button');
  deleteElement.innerText = '削除';

  // 削除ボタンにクリック関数をもたせる、関数の引数はarrayのtodos
  deleteElement.addEventListener('click' , {name: todos, handleEvent: deleteTr}, false);

  return deleteElement;
}
