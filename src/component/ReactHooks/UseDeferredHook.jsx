import React, { useMemo, useState } from "react";

const UseDeferredHook = () => {
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      <List input={input} />
    </div>
  );
};
  
export default UseDeferredHook;

function List({ input }) {
  const List_Size = 2000;
  const deferredInput = UseDeferredHook(input);
  const list = useMemo(() => {
    const l = [];
    for (let i = 0; i < List_Size; i++) {
      l.push(<div key={i}>{deferredInput}</div>);
    }
  }, [deferredInput]);

  return list;
}

