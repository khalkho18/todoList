"use strict";

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

const addTodo = (e) => {
  e.preventDefault();

  if (todoInput.value.trim()) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    saveLocalTodos(todoInput.value);

    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");

    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    editButton.classList.add("edit-btn");

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");

    todoList.appendChild(todoDiv);
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(editButton);
    todoDiv.appendChild(trashButton);

    editButton.onclick = () => {
      editWorking(newTodo);
    };
  } else if (todoInput.value === "") {
    alert("please fill the input field");
  }
};

const editWorking = (e) => {
  const editValue = prompt("edit the select item", e.firstChild.nodeValue);
  e.firstChild.nodeValue = editValue;
};

const deleteTodo = (e) => {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("fall");

    removeLocalTodos(todo);
    todo.addEventListener("transitionend", (e) => {
      todo.remove();
    });
  }

  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("edit");
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
};

const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};
const removeLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
};

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
