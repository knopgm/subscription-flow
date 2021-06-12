import classNames from "classnames";
import React from "react";
import { motion } from "framer-motion";

import styles from "./style.scss";

export function SubscriptionCard({
  packageName,
  priceUsdPerGb,
  durationMonths,
  onSelect,
  id,
  selected,
}) {
  const handleClick = () => {
    onSelect({ packageName, durationMonths, priceUsdPerGb, id });
  };

  return (
    <motion.div
      className={styles.SubscriptionOptions}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex="0"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className={styles.Wrapper}>
        <div
          className={classNames(styles.InnerWrapper, {
            [styles.Selected]: selected,
          })}
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
          <div>${priceUsdPerGb} per Gb</div>
        </div>
      </div>
    </motion.div>
  );
}
