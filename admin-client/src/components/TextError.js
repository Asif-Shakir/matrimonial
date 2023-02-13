import React from "react";

const TextError = (props) => {
  return (
    <span style={{ color: "red", fontSize: "14px" }}>{props.children}</span>
  );
};

export default TextError;
