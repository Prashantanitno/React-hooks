import React, { useRef, useState } from "react";

const UseRefHook = () => {
  const [name, setName] = useState("");
  const inputRef = useRef();

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.name)}
        type="text"
      />
      <button
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        focus
      </button>
    </div>
  );
};

export default UseRefHook;
