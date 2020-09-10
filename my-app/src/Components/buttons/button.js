//@ts-check
import React from "react";
import "./button.css";

function Button({ label, onclick }) {
  return (
    <div data-testid="button" className="button-style" onClick={onclick}>
      {label}
    </div>
  );
}

export default Button;
