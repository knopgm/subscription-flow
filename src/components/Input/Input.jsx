import classNames from "classnames";
import React from "react";

import styles from "./style.scss";

function InputComponent(
  { onChange, onBlur, name, label, type = "text", errorMessage, placeholder },
  ref
) {
  return (
    <div
      className={classNames({ [styles.CheckboxWrapper]: type === "checkbox" })}
    >
      <div>
        <label>{label}</label>
      </div>
      <div>
        <input
          className={styles.Input}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
          label={label}
          placeholder={placeholder}
        />
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export const Input = React.forwardRef(InputComponent);
