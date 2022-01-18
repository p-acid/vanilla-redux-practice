import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.getElementById("number");

number.innerText = 0;

const ADD = "ADD"; // allocate type by variable => more Safety!
const MINUS = "MINUS";

// action: send to reducer about how to modify state (with dispatch)
const countReducer = (state = 0, action) => {
  // reducer: function modify data
  switch (action.type) {
    case ADD:
      return state + 1;
    case MINUS:
      return state - 1;
    default:
      return state;
  }
};

const countStore = createStore(countReducer); // store: place to store data

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange); // subscribe: detect change about state

const countAction = (type) => {
  return { type: type };
};

const addCount = () => {
  countStore.dispatch(countAction("ADD")); // dispatch: like event to change state * must have type
};

const minusCount = () => {
  countStore.dispatch(countAction("MINUS"));
};

add.addEventListener("click", () => addCount());
minus.addEventListener("click", () => minusCount());

// todo list

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const toDoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const toDoStore = createStore(toDoReducer);

const deleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  toDoStore.dispatch({ type: DELETE_TODO, id: id });
};

const paintToDo = () => {
  const toDos = toDoStore.getState();

  ul.innerHTML = "";

  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", deleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

toDoStore.subscribe(paintToDo);

const addToDo = (toDo) => {
  toDoStore.dispatch({ type: ADD_TODO, payload: toDo });
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  addToDo(toDo);
};

form.addEventListener("submit", onSubmit);
