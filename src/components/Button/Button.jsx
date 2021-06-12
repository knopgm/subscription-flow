import React from "react";

import styles from "./style.scss";

export function Button({ children, type }) {
  return (
    <button className={styles.Button} type={type}>
      {children}
    </button>
  );
}
