import React from "react";

export const Button = (props) => {
  return (
    <button
      className={props.className}
      disabled={props.disabled || props.isLoading}
      onClick={() => props.onClick()}
    >
      {props.isLoading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        props.label
      )}
    </button>
  );
};
Button.defaultProps = {
  isLoading: false,
};
