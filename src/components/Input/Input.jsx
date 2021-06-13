import classNames from "classnames";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";

import styles from "./style.scss";

function InputComponent(
  { onChange, onBlur, name, label, type = "text", errorMessage, placeholder },
  ref
) {
  return (
    <div className={styles.Wrapper}>
      <div
        className={classNames(styles.InnerWrapper, {
          [styles.CheckboxWrapper]: type === "checkbox",
        })}
      >
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
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

      {errorMessage && (
        <div className={styles.Error}>
          <BiErrorCircle />
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export const Input = React.forwardRef(InputComponent);
