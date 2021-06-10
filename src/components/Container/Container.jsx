import React from "react";

import styles from "./style.scss";

export function Container({ children }) {
  return <div className={styles.Container}>{children}</div>;
}
