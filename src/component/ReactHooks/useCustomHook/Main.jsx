import React from "react";
import UseLocalStorage from "./useLocalStorage";

const Main = () => {
  //   const [name, setName] = UseLocalStorage("name", () => "");
  const [name, setName] = UseLocalStorage("name", "");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default Main;
