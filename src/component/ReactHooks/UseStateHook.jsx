import React, { useState } from "react";

const UseStateHook = () => {
  const [state, setState] = useState({ count: 4, theme: "blue" });
  const count = state.count;
  const theme = state.theme;

  function decrementCount() {
    setState((prevState) => {
      return { ...prevState, count: prevState.count + 1 };
    });
  }

  return <div>UseStateHook</div>;
};

export default UseStateHook;
