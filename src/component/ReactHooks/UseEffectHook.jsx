import React, { useEffect } from "react";

const UseEffectHook = () => {
  useEffect(() => {
    console.log("onMount");
  }, []);

  return <div>UseEffectHook</div>;
};

export default UseEffectHook;
 