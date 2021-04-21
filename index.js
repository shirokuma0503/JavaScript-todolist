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
    todoText = todo.text;
  }

  if (todoText.length > 0) {
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("list-group-item"); //作ったliにクラスを追加

    //更新時も表示。liにtodoの情報が存在していて、打ち消し線があったとき
    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    //右クリックで削除する
    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });
    //左クリックで打ち消し線のクラスを追加・削除
    li.addEventListener("click", function (event) {
      li.classList.toggle("text-decoration-line-through"); //toggleはあれば消す・なければ付ける
      saveData();
    });

    ul.appendChild(li); //ulのchildとしてliを追加
    input.value = ""; //打った文字を空にする
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll("li"); //全liタグ取得
  let todos = []; //todos配列を作成
  lists.forEach(list => { //リスト個々を変数listにいれる
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through")
    };
    todos.push(todo);
  });

  localStorage.setItem("todos", JSON.stringify(todos)); //保存
}