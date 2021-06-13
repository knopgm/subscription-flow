import classNames from "classnames";
import React from "react";

import styles from "./style.scss";

export function Button({ children, type, secondary }) {
  return (
    <button
      className={classNames(styles.Button, { [styles.Secondary]: secondary })}
      type={type}
    >
      {children}
    </button>
  );
}
