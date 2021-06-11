import classNames from "classnames";
import React from "react";

import styles from "./style.scss";

export function SubscriptionForm({
  priceUsdPerGb,
  durationMonths,
  onSelect,
  id,
  selected,
}) {
  const handleClick = () => {
    onSelect({ durationMonths, priceUsdPerGb, id });
  };

  return (
    <div className={styles.Wrapper}>
      <div
        className={classNames(styles.InnerWrapper, {
          [styles.Selected]: selected,
        })}
      >
        <div>Plan {durationMonths} months</div>
        <div>${priceUsdPerGb} per Gb</div>
        <button onClick={handleClick}>Select Plan</button>
      </div>
    </div>
  );
}
