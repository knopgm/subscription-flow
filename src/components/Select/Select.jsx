import React from "react";

import styles from "./style.scss";

function SelectComponent({ label, options }, ref) {
  return (
    <div>
      <div className={styles.Label}>{label}</div>
      <select className={styles.Selector} ref={ref}>
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
