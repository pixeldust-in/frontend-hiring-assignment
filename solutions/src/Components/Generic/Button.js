import React from "react";

export const Button = (props) => {
  return (
    <button
      className={props.className}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.label}
    </button>
  );
};
