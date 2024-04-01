import React, { useState } from "react";
// import HeavyComponent from "./HeavyComponent";
import dynamic from "next/dynamic";

const DynmaicHeavyComponent =dynamic(()=> import('../component/heavy'),{
    ssr:false,
    loading:() => <p>i am fetching</p>
})

const LazyLoading = () => {
  const [shouldShow, setShouldShow] = useState(false);

  return (
    <>
      <div>LazyLoading</div>

      <button onClick={() => setShouldShow(true)}>Click me </button>

      <div>{shouldShow && <DynmaicHeavyComponent />}</div>
    </>
  );
};

export default LazyLoading;
