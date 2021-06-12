import React from "react";
import { Container } from "../../components/Container";
import { Summary } from "../../components/Summary/Summary";

import styles from "./style.scss";

export function Frame({ children }) {
  return (
    <Container>
      <header className={styles.Header}>
        <h1>Welcome to Cloudy</h1>
        <div className={styles.SubTitle}>Your Cloud Storage Service</div>
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
