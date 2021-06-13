import React from "react";

import styles from "./style.scss";

function SelectComponent({ label, options, onChange, onBlur, name }, ref) {
  return (
    <div className={styles.Wrapper}>
      <label htmlFor={name} className={styles.Label}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={styles.Selector}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}

export const Select = React.forwardRef(SelectComponent);
