import React from "react";
import FunctionContextComponent from "./FunctionContextComponent";
import ThemeProvider from "./ThemeContext";

const UseContextHook = () => {
  return (
    <ThemeProvider>
      <FunctionContextComponent />
    </ThemeProvider>
  );
};

export default UseContextHook;
