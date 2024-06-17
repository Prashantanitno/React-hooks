import React, { useReducer, useState } from "react";

export const ACTIONS = {
  ADD_TOOD: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE: "delete",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TOOD:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
      });
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

const Example = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TOOD, payload: { name, name } });
    setName("");
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.name)}
        />
      </form>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </div>
  );
};

export default Example;

function Todo({ todo, dispatch }) {
  return (
    <>
      <div>
        <span>todo.name</span>
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
          }
        >
          Toggle
        </button>
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
          }
        >
          Delete
        </button>
      </div>
    </>
  );
}
