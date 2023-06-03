const inputTag = document.querySelector('.todoInput');
const buttonTag = document.querySelector('.addBtn');
const todoConTag = document.querySelector('.todoCon');
const editInputTag = document.querySelector('.editInput');

let todoList = [];
loadFromLocalStorage();
renderTodoUI();
buttonTag.addEventListener('click', () => {
  let todayTodo = inputTag.value;
  if (todayTodo == "") {
    alert("Please enter any todo ");
    return;
  }
  inputTag.value = "";
  let todoKey = editInputTag.value ? editInputTag.value : todoList.length;
  localStorage.setItem(todoKey, todayTodo);
  editInputTag.value = "";
  buttonTag.textContent = "Send";
  loadFromLocalStorage();
  renderTodoUI();
});

function loadFromLocalStorage() {
  todoList = [];
  for (let i = 0; i < localStorage.length; i++) {
    let currentIndex = localStorage.key(i);
    let currentTodo = localStorage.getItem(currentIndex);
    todoList[currentIndex] = currentTodo;
  }
}

function renderTodoUI() {
  todoConTag.innerHTML = "";
  let todoHtml = "";
  if (todoList.length == 0) {
    todoHtml = "<li>No todo is found</li>"
  }
  else {
    todoList.forEach((todo, index) => {
      todoHtml += `<li class="listItem">
      <div class="firstListItem">
        <div class="noCon">
          ${index + 1}. 
        </div>
        <div>
          ${todo}
        </div>
      </div>
      <div class="itemBtnCon">
        <button onclick="editItem(${index})" class="editBtn">
          Edit
        </button>
        <button onclick="deleteItem(${index})" class="deleteBtn">
          Delete
        </button>
      </div>
    </li>`;
    });
  }
  todoConTag.innerHTML = todoHtml;
}

function deleteItem(id) {
  if (confirm("Do you wanna delete the item?")) {
    localStorage.removeItem(id);
    loadFromLocalStorage();
    renderTodoUI();
  }
}

function editItem(id) {
  let currentTodo = todoList[id];
  editInputTag.value = id;
  inputTag.value = currentTodo;
  buttonTag.textContent = "Update";
}

