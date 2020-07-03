import React from "react";

const Spinner = (props) => {
  return (
    <div className={`overlay ${props.componentOverlayCSS}`}>
      <div className="overlay__inner">
        <div className="overlay__content">
          <span className="spinner"></span>
          <span>{props.message}</span>
        </div>
      </div>
    </div>
  );
};
Spinner.defaultProps = {
  message: "Loading...",
  componentOverlayCSS: "",
};
export default Spinner;
