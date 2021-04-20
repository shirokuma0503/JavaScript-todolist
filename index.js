const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos =   JSON.parse(localStorage.getItem("todos")); //todosからリストを表示
if (todos) {
  todos.forEach(todo => {
    add(todo);
  })
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});

//submitした時にリスト(li)を追加表示する関数
function add(todo) {
  let todoText = input.value;

  //保存されている情報があれば入力された値(input.value)じゃなくてtodo(リスト)表示する
  if (todo) {
    todoText = todo;
  }

  if (todoText.length > 0) {
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("list-group-item"); //作ったliにクラスを追加
    ul.appendChild(li); //ulのchildとしてliを追加
    input.value = ""; //打った文字を空にする
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll("li"); //全liタグ取得
  let todos = []; //todos配列を作成
  lists.forEach(list => { //リスト個々を変数listにいれる
    todos.push(list.innerText); //pushでtodos配列にリストをいれる
  });

  localStorage.setItem("todos", JSON.stringify(todos)); //保存
}