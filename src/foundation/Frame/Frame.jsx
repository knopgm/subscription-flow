import React from "react";
import { Container } from "../../components/Container";
import { Summary } from "../../components/Summary/Summary";
import { BiCloud } from "react-icons/bi";

import styles from "./style.scss";

export function Frame({ children }) {
  return (
    <Container>
      <header className={styles.Header}>
        <span className={styles.Logo}>
          <BiCloud />
        </span>
        <h1>Cloudy</h1>
      </header>
      <div className={styles.Wrapper}>
        <div>{children}</div>
        <div>
          <Summary />
        </div>
      </div>
    </Container>
  );
}
