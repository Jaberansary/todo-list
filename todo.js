//Selectors:
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");

//event listener:
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);

//functions:
function addTodo(e) {
    if (todoInput.value.trim() === "") {
        e.preventDefault();
        return;
    } else {
        e.preventDefault();
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = `  <li>${todoInput.value}</li>
    <span>
    <i class="far fa-check-square"></i>
     </span>
    <span> <i class="far fa-trash-alt"></i></span>`
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
        console.log(todoInput.value);

        saveLocalTodos({
            id: new Date().getTime(),
            title: todoInput.value,
            isCompleted: false,
        });

        todoInput.value = "";

    }
}
getLocalTodos();


function checkRemove(e) {

    const classList = [...e.target.classList]
    const item = e.target;
    const todoItem = item.parentElement.parentElement;
    const key = todoItem.getAttribute("key");
    const todo = { id: `${key}`, title: "", isCompleted: "" };
    if (classList[1] === "fa-check-square") {
        todoItem.classList.toggle("completed");
        const isCompleted = todoItem.getAttribute("class").includes("completed");
        todo.isCompleted = isCompleted;
        editLocalTodo(todo);
    } else if (classList[1] === "fa-trash-alt") {
        const todoItem = item.parentElement.parentElement;
        removeLocalTodos(todo);

        getLocalTodos();

    }
}

function filterTodos(e) {
    const todos = [...todoList.childNodes];
    console.log(todos);
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

        }
    });
}
//local:
function saveLocalTodos(todo) {

    //let savedTodos = localStorage.getItem("todos") ?
    //JSON.parse(localStorage.getItem("todos")): [];
    let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));

}

function getLocalTodos() {
    todoList.innerHTML = "";
    let savedTodos = localStorage.getItem('todos') ?
        JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        if (todo.isCompleted) {
            todoDiv.classList.add("completed");
        }
        todoDiv.setAttribute("key", `${todo.id}`);
        const newTodo = `  <li>${todo.title}</li>
    <span>
    <i class="far fa-check-square"></i>
     </span>
    <span> <i class="far fa-trash-alt"></i></span>`
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {

    //let savedTodos = localStorage.getItem('todos') ?
    //JSON.parse(localStorage.getItem("todos")): [];
    let savedTodos = JSON.parse(localStorage.getItem("todos"));
    const filteredTodos = savedTodos.filter((t) => t.id !== Number(todo.id));
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
}

function editLocalTodo(todo) {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));

    const index = savedTodos.findIndex((item) => item.id == todo.id);

    const selectedTodo = {...savedTodos[index] };
    selectedTodo.isCompleted = todo.isCompleted;

    const updatedTodos = [...savedTodos];
    updatedTodos[index] = selectedTodo;

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}