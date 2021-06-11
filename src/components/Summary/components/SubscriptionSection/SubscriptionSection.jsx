import React from "react";

import styles from "./style.scss";

export function SubscriptionSection({ subscription }) {
  if (!subscription) {
    return null;
  }

  return (
    <>
      <div className={styles.Title}>Your Cloud Storage Order</div>
      <div className={styles.InnerWrapper}>
        <div>{subscription?.durationMonths} months</div>
        <div>${subscription?.priceUsdPerGb} per Gb</div>
      </div>
    </>
  );
}
