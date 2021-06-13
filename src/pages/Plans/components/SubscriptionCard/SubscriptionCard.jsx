import React from "react";
import classNames from "classnames";

import styles from "./style.scss";

export function SubscriptionCard({
  packageName,
  priceUsdPerGb,
  durationMonths,
  onSelect,
  id,
  selected,
}) {
  // a callback function to send back to the father the selected informations
  const handleClick = () => {
    onSelect({ packageName, durationMonths, priceUsdPerGb, id });
  };

  return (
    <div
      className={classNames(styles.Wrapper, {
        [styles.Selected]: selected,
      })}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex="0"
    >
      <div className={styles.PackageName}>
        {durationMonths === 3 ? (
          <div>Basic</div>
        ) : durationMonths === 6 ? (
          <div>Pro</div>
        ) : (
          <div>Ultimate</div>
        )}
      </div>

      <div>Plan {durationMonths} months</div>
      <div>
        <span className={styles.Price}>${priceUsdPerGb}</span> per Gb
      </div>
    </div>
  );
}
