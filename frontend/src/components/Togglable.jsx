import React, { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, ref) => {
  const [postFormVisible, setPostFormVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
        toggleVisibility: () => {
            setPostFormVisible(!postFormVisible)
        }
    }
  })

  return (
    <>
      <div style={postFormVisible ? { display: "none" } : { display: "" }}>
        <button onClick={() => setPostFormVisible(!postFormVisible)}>
          {props.label}
        </button>
      </div>
      <div style={postFormVisible ? { display: "" } : { display: "none" }}>
        {props.children}
        <button onClick={() => setPostFormVisible(!postFormVisible)}>
          CANCEL
        </button>
      </div>
    </>
  );
})

export default Togglable;
