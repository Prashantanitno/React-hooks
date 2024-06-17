import React from "react";
import { useTheme, useThemeUpdate } from "./ThemeContext";

const FunctionContextComponent = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  const themeStyles = {
    backgroundColor: darkTheme ? "#333" : "#ccc",
    color: darkTheme ? "#ccc" : "#333",
    padding: "2rem",
  };

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div style={themeStyles}>function Theme</div>
    </div>
  );
};

export default FunctionContextComponent;
